import { SketchData } from '../Figures';
import P5 from 'p5';
import { dir } from 'console';
import { AnimatedFigure } from '../ProcessingFigures';
import p5 from 'p5';
import 'p5collide';
export class RadialForce extends Animation {
    private static checkAndApplyCollision(node1: AnimatedFigure, node2: AnimatedFigure, p5: P5) {
        let dampening = 0.2;

        
        let dir1x = Math.abs(node1.velocity.x);
        let dir1y = Math.abs(node1.velocity.y);
        let dir2x = Math.abs(node2.velocity.x);
        let dir2y = Math.abs(node2.velocity.y);

        if (dir1x != dir2x) {
            node1.velocity.x *= -0.2;
            node2.velocity.x *= -0.2;
        }

        if (dir1y != dir2y) {
            node1.velocity.y *= -0.2;
            node2.velocity.y *= -0.2;
        }
    }


    private static applyForces(nodes: AnimatedFigure[], originX, originY, p5: P5) {
        let gravityConstant = 50;
        let mouseConstant =  0.1;
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

        // nodes.forEach(node => {
        //     let mouseOrigin = p5.createVector(p5.mouseX, p5.mouseY);
        //     let gravity_dir = mouseOrigin.copy().sub( node.pos);
        //     let gravity_unit = gravity_dir.div(gravity_dir.mag());

        //     let gravity = gravity_unit.copy().mult(-1).mult(mouseConstant);
        //     node.force.add(gravity);
        // })
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
            fig.display();
        });
        
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