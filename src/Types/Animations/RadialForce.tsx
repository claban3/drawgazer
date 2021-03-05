import { SketchData } from '../Figures';
import P5 from 'p5';
import { dir } from 'console';
import { AnimatedFigure } from '../ProcessingFigures';
import p5 from 'p5';
import 'p5collide';
export class RadialForce extends Animation {
    // private static checkAndApplyCollision(node1: AnimatedFigure, node2: AnimatedFigure, p5: P5) {
    //     p5.push();
    //     p5.angleMode(p5.RADIANS);
        
    //     let pos1 = p5.createVector(node1.x, node1.y);
    //     let pos2 = p5.createVector(node2.x, node2.y);

    //     // Get distances between the balls components
    //     let distanceVect: P5.Vector = P5.Vector.sub(pos1, pos2);
    
    //     // Calculate magnitude of the vector separating the balls
    //     let distanceVectMag = distanceVect.mag();
    
    //     // Minimum distance before they are touching
    //     //TODO remove mass and replace with actual radius
    //     let minDistance = node1.mass / p5.PI / 2 + node2.mass / p5.PI / 2;
    
    //     if (distanceVectMag < minDistance) {
    //         let distanceCorrection = (minDistance-distanceVectMag)/2.0;
    //         let d: P5.Vector = distanceVect.copy();
    //         let correctionVector: P5.Vector = d.normalize().mult(distanceCorrection);
    //         pos1 = pos1.add(correctionVector);
    //         pos1 = pos1.sub(correctionVector);
    //         // node1.x = pos1.x;
    //         // node1.y = pos1.y;

    //         // get angle of distanceVect
    //         let theta = distanceVect.heading();
    //         // precalculate trig values
    //         let sine = p5.sin(theta);
    //         let cosine = p5.cos(theta);
    
    //         /* bTemp will hold rotated ball positions. You 
    //         just need to worry about bTemp[1] position*/
    //         let bTemp: P5.Vector[] = [p5.createVector(), p5.createVector()];
    
    //         /* this ball's position is relative to the other
    //         so you can use the vector between them (bVect) as the 
    //         reference point in the rotation expressions.
    //         bTemp[0].position.x and bTemp[0].position.y will initialize
    //         automatically to 0.0, which is what you want
    //         since b[1] will rotate around b[0] */
    //         bTemp[1].x  = cosine * distanceVect.x + sine * distanceVect.y;
    //         bTemp[1].y  = cosine * distanceVect.y - sine * distanceVect.x;
    
    //         // rotate Temporary velocities
    //         let vTemp: P5.Vector[] = [p5.createVector(), p5.createVector()];
            
    //         vTemp[0].x  = cosine * (node1.force.x / node1.mass) + sine * (node1.force.y / node1.mass);
    //         vTemp[0].y  = cosine * (node1.force.y / node1.mass) - sine * (node1.force.x / node1.mass);
    //         vTemp[1].x  = cosine * (node2.force.x / node2.mass) + sine * (node2.force.y / node2.mass);
    //         vTemp[1].y  = cosine * (node2.force.y / node2.mass) - sine * (node2.force.x / node2.mass);
    
    //         /* Now that velocities are rotated, you can use 1D
    //         conservation of momentum equations to calculate 
    //         the final velocity along the x-axis. */
    //         let vFinal: P5.Vector[] = [p5.createVector(), p5.createVector()];
    //         let m1 = node1.mass;
    //         let m2 = node2.mass;
    //         // final rotated velocity for b[0]
    //         vFinal[0].x = ((m1 - m2) * vTemp[0].x + 2 * m2 * vTemp[1].x) / (m1 + m2);
    //         vFinal[0].y = vTemp[0].y;
    
    //         // final rotated velocity for b[0]
    //         vFinal[1].x = ((m2 - m1) * vTemp[1].x + 2 * m1 * vTemp[0].x) / (m1 + m2);
    //         vFinal[1].y = vTemp[1].y;
    
    //         // hack to avoid clumping
    //         bTemp[0].x += vFinal[0].x;
    //         bTemp[1].x += vFinal[1].x;
    
    //         /* Rotate ball positions and velocities back
    //         Reverse signs in trig expressions to rotate 
    //         in the opposite direction */
    //         // rotate balls
    //         let bFinal: P5.Vector[] = [p5.createVector(), p5.createVector()];

    //         bFinal[0].x = cosine * bTemp[0].x - sine * bTemp[0].y;
    //         bFinal[0].y = cosine * bTemp[0].y + sine * bTemp[0].x;
    //         bFinal[1].x = cosine * bTemp[1].x - sine * bTemp[1].y;
    //         bFinal[1].y = cosine * bTemp[1].y + sine * bTemp[1].x;
    
    //         // update balls to screen position
    //         // pos2.x = pos1.x + bFinal[1].x;
    //         // pos2.y = pos1.y + bFinal[1].y;
    
    //         // pos1.add(bFinal[0]);
    //         // node1.x = pos1.x;
    //         // node1.y = pos1.y;
    //         // node2.x = pos2.x;
    //         // node2.y = pos2.y;

    //         // update velocities

    //         let force1x = (cosine * vFinal[0].x - sine * vFinal[0].y) * node1.mass;
    //         let force1y = (cosine * vFinal[0].y + sine * vFinal[0].x) * node1.mass;
    //         let force2x = (cosine * vFinal[1].x - sine * vFinal[1].y) * node2.mass;
    //         let force2y = (cosine * vFinal[1].y + sine * vFinal[1].x) * node2.mass;
            
    //         node1.force.x = force1x > 10 ? force1x : force1x; 
    //         node1.force.y = force1y > 10 ? force1y : force1y;
    //         node2.force.x = force2x > 10 ? force2x : force2x;
    //         node2.force.y = force2y > 10 ? force2y : force2y;

    //         p5.pop();
    //     }
    // }


    // private static applyForces(nodes: AnimatedFigure[], originX, originY, p5: P5) {
    //     let gravityConstant = 1.5;
    //     let mouseConstant =  1;
    //     // var forceConstant = 2000;
    //     // apply force towards centre
    //     nodes.forEach(node => {
    //         let pos = p5.createVector(node.x, node.y);
    //         let origin = p5.createVector(originX, originY);
    //         let gravity_dir = P5.Vector.sub(pos, origin);
    //         let gravity_unit = P5.Vector.div(gravity_dir, gravity_dir.mag());

    //         let gravity = gravity_unit.copy().mult(-1).mult(gravityConstant)
    //         let origin_dist = P5.Vector.dist(origin, pos); 
    //         if (origin_dist > 50 || origin_dist < -50) {
    //             node.force = gravity
    //         }
            
    //     })

    //     nodes.forEach(node => {
    //         let pos = p5.createVector(node.x, node.y);
    //         let mouseOrigin = p5.createVector(p5.mouseX, p5.mouseY);
    //         let gravity_dir = P5.Vector.sub(mouseOrigin, pos);
    //         let gravity_unit = P5.Vector.div(gravity_dir, gravity_dir.mag());

    //         let gravity = gravity_unit.copy().mult(-1).mult(mouseConstant);
    //         node.force.add(gravity);
    //     })
        
    //     // apply repulsive force between nodes
        

    //     // for (let i = 0; i < nodes.length; i++) {
    //     //     for (let j = i + 1; j < nodes.length; j++) {
    //             // let pos = p5.createVector(nodes[i].x, nodes[i].y);
    //             // let posRepel = p5.createVector(nodes[j].x, nodes[j].y);
    //             // let dir = posRepel.copy().sub(pos);
    //             // let force = dir.div(dir.mag() * dir.mag())
    //             // force.mult(forceConstant)
    //             // nodes[i].force.add(force.copy().mult(-1))
    //             // nodes[j].force.add(force)
    //     //     }
    //     // }
    // }

    static draw(sketchData: SketchData, p) {
        // let originX = sketchData.canvasWidth / 2;
        // let originY = sketchData.canvasHeight / 2;
        // this.applyForces(sketchData.figs, originX, originY, p);
        
        
        // let nodes = sketchData.figs;
        // for (let i = 0; i < nodes.length; i++) {
        //     for (let j = i + 1; j < nodes.length; j++) {
        //         this.checkAndApplyCollision(sketchData.figs[i], sketchData.figs[j], p);
        //     }
        // }

        // sketchData.figs.forEach(fig => {
        //     let force = fig.force.copy();
        //     let vel = force.copy();//.div(fig.mass);
        //     // print("VEL", vel, "FORCE", force)
        //     fig.x += vel.x;
        //     fig.y += vel.y;
        //     fig.display();

        // });
    }

    static mousePressed(sketchData: SketchData, p) {
        // return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}