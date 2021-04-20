import { SelectedShape, SketchData } from '../Figures';
import P5 from 'p5';
import { AnimatedFigure } from '../ProcessingFigures';
import 'p5collide';
import { newFigure } from './Animation';

const MAX_SPEED = 15;

export class Billiards extends Animation {

    static DAMPING = 0.995;

    static draw(sketchData: SketchData, p) {
        console.log("----------------");
        p.background("#FFF");
        
        sketchData.figs.forEach((fig, i) => {
    
            if (fig.velocity.mag() > MAX_SPEED) {
                fig.velocity.normalize().mult(MAX_SPEED);
            }

            let width = sketchData.canvasWidth;
            let height = sketchData.canvasHeight;

            // if (fig.collideCanvasLeft(width, height)) {
            //     fig.velocity.x = Math.abs(fig.velocity.x);
            //     fig.bounce.play();
            // }

            // if (fig.collideCanvasRight(width, height)) {
            //     fig.velocity.x = Math.abs(fig.velocity.x) * -1;
            //     fig.bounce.play();
            // }

            // if (fig.collideCanvasTop(width, height)) {
            //     fig.velocity.y = Math.abs(fig.velocity.y);
            //     fig.bounce.play();
            // }

            // if (fig.collideCanvasLeft(width, height)) {
            //     fig.velocity.y = Math.abs(fig.velocity.y) * -1;
            //     fig.bounce.play();
            // }
        
            // if(fig.collisionCounterY === 0) {
            //     if (fig.collideCanvasTop(width, height) || fig.collideCanvasBottom(width, height)) {
            //         fig.velocity.y *= -1;
            //         // fig.clack.play();
            //         fig.collisionCounterY = 8;
            //     }
            // } else {
            //     fig.collisionCounterY -= 1;
            // }

            if (fig.collideCanvasLeft(width, height)) {
                fig.velocity.x = Math.abs(fig.velocity.x);
            } else if (fig.collideCanvasRight(width, height)) {
                fig.velocity.x = (Math.abs(fig.velocity.x) * -1);
            }

            if (fig.collideCanvasTop(width, height)) {
                fig.velocity.y = Math.abs(fig.velocity.y);
            } else if (fig.collideCanvasBottom(width, height)) {
                fig.velocity.y = (Math.abs(fig.velocity.y) * -1);
            } 

            if (fig.collideWithMouse()) {
                let speed = fig.velocity.mag();
                let repelForce = fig.pos.copy().sub(p.createVector(p.mouseX, p.mouseY)).normalize();
                fig.velocity.add(repelForce.mult(speed));
                fig.clack.play();
            }

            sketchData.figs.forEach((other, j) => {
                if (AnimatedFigure.collidesWith(fig, other) && fig !== other) {
                    console.log("COLLISION:", i, j);

                    if (Math.abs(fig.velocity.mag() - other.velocity.mag()) > 3) {
                        fig.clack.play();
                    }

                    let m1 = fig.mass, m2 = other.mass;
                    // let m1 = (fig.mass + other.mass)/2, m2 = (fig.mass + other.mass)/2;
                    let v1x = fig.velocity.x, v1y = fig.velocity.y;
                    let v2x = other.velocity.x, v2y = other.velocity.y;

                    fig.velocity.x = Math.min((m1 - m2)*(v1x-v2x)/(m1+m2)+v2x, MAX_SPEED);
                    fig.velocity.y = Math.min((m1 - m2)*(v1y-v2y)/(m1+m2)+v2y, MAX_SPEED);
                    other.velocity.x = Math.min((m1 - m2)*(v2x-v1x)/(m1+m2)+v1x, MAX_SPEED);
                    other.velocity.y = Math.min((m1 - m2)*(v2y-v1y)/(m1+m2)+v1y, MAX_SPEED);

                    // other.velocity.x = 2*m1*(v1x-v2x)/(m1+m2)+v2x;
                    // other.velocity.y = 2*m1*(v1y-v2y)/(m1+m2)+v2y;


                }
            });

            fig.velocity.x *= Billiards.DAMPING;
            fig.velocity.y *= Billiards.DAMPING;
            fig.pos.add(fig.velocity);
            fig.display();
        });
    }

    static mousePressed(sketchData: SketchData, p) {
        // if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight))
        // {
        //     if(sketchData.figs.length >= this.NUM_FIGURES) {
        //         this.burst_cache(sketchData.figs[0], sketchData, p);
        //     }
        // }
        return false;
    }

    static hawkeyeMousePressed(sketchData: SketchData, mouseEvent, p) {
        // if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight))
        // {
        //     if(sketchData.figs.length >= this.NUM_FIGURES) {
        //         this.burst_cache(sketchData.figs[0], sketchData, p);
        //     }
        // }
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {
        return false;
    }
}