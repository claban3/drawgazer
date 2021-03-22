import { SketchData } from '../Figures';
import P5 from 'p5';
import { AnimatedFigure } from '../ProcessingFigures';
import 'p5collide';
import { findDOMNode } from 'react-dom';

export class BubblePop extends Animation {

    static burst(fig, sketchData) {

        if (fig.timer <= 25) {
            let index = sketchData.figs.indexOf(fig);
            sketchData.figs.splice(index, 1);
            fig.pop.play();
        }
    }

    static draw(sketchData: SketchData, p) {
        p.background(sketchData.colorSettings.background);
        
        let speedFactor = 0.1
        let rotFactor = 0.1

        let to_burst = []
        let nodes = sketchData.figs;

        sketchData.figs.forEach(fig => {
            let width = sketchData.canvasWidth;
            let height = sketchData.canvasHeight;

            fig.timer -= 1;

            // prevent lag and sound spike
            if (fig.dead){

                fig.dead = false;
                fig.timer = 60;
                fig.velocity.y = -5;
            }

            for (let i = 0; i < nodes.length; i++) {
                if (AnimatedFigure.collidesWith(nodes[i], fig) && nodes[i] != fig) {
                        //this.checkAndApplyCollision(nodes[i], nodes[j], p);
                    console.log("triangles collide");
                    if (!to_burst.includes(nodes[i])){
                            to_burst.push(nodes[i])
                    }
                    if (!to_burst.includes(fig)){
                            to_burst.push(fig)
                    }
                }
            }

            if (fig.collideCanvasLeft(width, height) || fig.collideCanvasRight(width, height)) {
                
                if (!to_burst.includes(fig)){
                    to_burst.push(fig)
                }
                //fig.velocity.x *= -1;
            }
        
            if (fig.collideCanvasTop(width, height) || fig.collideCanvasBottom(width, height)) {
                if (!to_burst.includes(fig)){
                    to_burst.push(fig)
                }
                //fig.velocity.y *= -1;
            }
            
            if (fig.collideWithMouse()) {

                if (!to_burst.includes(fig)){
                    to_burst.push(fig)
                }
                //let speed = fig.velocity.mag();
                //let repelForce = fig.pos.copy().sub(p.createVector(p.mouseX, p. mouseY)).normalize();
                //fig.velocity.add(repelForce.mult(speed));
            }

            fig.rotAngle = fig.randSign()*rotFactor;
            fig.velocity.rotate(fig.rotAngle);
            let translation = P5.Vector.mult(fig.velocity, speedFactor);
        
            fig.pos.add(translation);
            fig.display();
        });

        for (let i = 0; i < to_burst.length; i++) {

            this.burst(to_burst[i], sketchData)
        }
    }

    static mousePressed(sketchData: SketchData, p) {
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}