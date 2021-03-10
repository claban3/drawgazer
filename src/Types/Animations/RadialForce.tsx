import { SketchData } from '../Figures';
import P5 from 'p5';
import { dir } from 'console';
import { AnimatedFigure } from '../ProcessingFigures';
import p5 from 'p5';
import 'p5collide';
export class RadialForce extends Animation {
    private static checkAndApplyCollision(node1: AnimatedFigure, node2: AnimatedFigure, p5: P5) {
        let dampening = 0.2;
        let mass1 = 2 * node1.mass / (node1.mass + node2.mass);
        let mass2 = 2 * node2.mass / (node1.mass + node2.mass);

        let pos_delta1 = node1.pos.copy().sub(node2.pos);
        let vel_delta1 = node1.velocity.copy().sub(node2.velocity);

        let pos_delta2 = node2.pos.copy().sub(node1.pos);
        let vel_delta2 = node2.velocity.copy().sub(node1.velocity);
        
        let v1_delta = pos_delta1.mult(vel_delta1.dot(pos_delta1) / pos_delta1.magSq()).mult(mass1);
        let v2_delta = pos_delta2.mult(vel_delta2.dot(pos_delta2) / pos_delta2.magSq()).mult(mass2);

        let mag1 = node1.velocity.sub(v1_delta).mag() * dampening;
        let mag2 = node2.velocity.sub(v2_delta).mag() * dampening;


        // if (mag1 < 0.5) {
        //     node1.velocity = p5.createVector(0, 0);
        // } else {
            node1.velocity.normalize().mult(mag1);
        // }

        // if (mag2 < 0.5) {
            // node2.velocity = p5.createVector(0, 0);
        // } else {
            node2.velocity.normalize().mult(mag2);
        // }
    }


    private static applyForces(nodes: AnimatedFigure[], originX, originY, p5: P5) {
        let gravityConstant = 100;
        let mouseConstant =  500;
        let origin = p5.createVector(originX, originY);
        // var forceConstant = 2000;
        // apply force towards centre
        nodes.forEach(node => {
            let gravity_dir = node.pos.copy().sub(origin);
            // let gravity_unit = gravity_dir.div(gravity_dir.mag());

            let gravity = gravity_dir.mult(-0.07).mult(gravityConstant)
            let origin_dist = P5.Vector.dist(origin, node.pos); 
            if (origin_dist > 10 || origin_dist < -10) {
                node.force = gravity
            }
            
        })

        nodes.forEach(node => {
            let mouseOrigin = p5.createVector(p5.mouseX, p5.mouseY);
            let gravity_dir = mouseOrigin.copy().sub(node.pos);
            let gravity_unit = gravity_dir.div(gravity_dir.mag());

            let gravity = gravity_unit.copy().mult(-1).mult(mouseConstant);
            node.force.add(gravity);
        })
    }

    static draw(sketchData: SketchData, p) {
        let originX = sketchData.canvasWidth / 2;
        let originY = sketchData.canvasHeight / 2;
        this.applyForces(sketchData.figs, originX, originY, p);
        sketchData.figs.forEach(fig => {
            fig.velocity = fig.force.copy().div(fig.mass).copy();
        });        
        
        let nodes = sketchData.figs;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                if (AnimatedFigure.collidesWith(nodes[i], nodes[j])) {
                    this.checkAndApplyCollision(nodes[i], nodes[j], p);
                }
            }
        }

        sketchData.figs.forEach(fig => {
            // print("VEL", vel, "FORCE", force)
            if (fig.dead){
                fig.dead = false;
            }
            fig.pos.add(fig.velocity);
            fig.display(sketchData);
        });

        // for (let i = 0; i < nodes.length; i++) {
        //     for (let j = i + 1; j < nodes.length; j++) {
        //         if (AnimatedFigure.collidesWith(nodes[i], nodes[j])) {
        //             nodes[i].pos.add(nodes[i].velocity.copy().mult(5));
        //             nodes[j].pos.add(nodes[j].velocity.copy().mult(5));
        //             nodes[i].velocity = p.createVector(0,0);
        //             nodes[j].velocity = p.createVector(0,0);
        //         }
        //     }
        // }
        // nodes.forEach(fig => {
        // 
        // });
    }

    static mousePressed(sketchData: SketchData, p) {
        // return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}