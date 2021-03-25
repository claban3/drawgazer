import { SketchData } from '../Figures';
import P5 from 'p5';
import { AnimatedFigure } from '../ProcessingFigures';
import 'p5collide';

export class Scurry extends Animation {

    static scare(fig) {

        fig.velocity.x *= 2;
        fig.velocity.y *= 2;
        fig.turnFactor *= 2;
    }

    static draw(sketchData: SketchData, p) {
        p.background(sketchData.colorSettings.background);
        
        let rotFactor = 1.5;
        let speedFactor = -0.1

        let to_scare = []
        let nodes = sketchData.figs;

        sketchData.figs.forEach(fig => {
            let width = sketchData.canvasWidth;
            let height = sketchData.canvasHeight;
            
            let mouseOrigin = p.createVector(p.mouseX, p.mouseY);

            for (let i = 0; i < nodes.length; i++) {
                if (AnimatedFigure.collidesWith(nodes[i], fig) && nodes[i] != fig) {
                    if (!to_scare.includes(nodes[i])){
                            to_scare.push(nodes[i])
                    }
                    if (!to_scare.includes(fig)){
                            to_scare.push(fig)
                    }
                }
            }

            if (fig.collideCanvasLeft(width, height) || fig.collideCanvasRight(width, height)) {
                
                if (!to_scare.includes(fig)){
                    to_scare.push(fig)
                }

                fig.velocity.x *= -1;
            }
        
            if (fig.collideCanvasTop(width, height) || fig.collideCanvasBottom(width, height)) {
                
                if (!to_scare.includes(fig)){
                    to_scare.push(fig)
                }

                fig.velocity.y *= -1;
            }
            
            if (fig.collideWithMouse()) {

                if (!to_scare.includes(fig)){
                    to_scare.push(fig)
                }
            }

            fig.rotAngle = fig.randSign()*rotFactor;
            fig.velocity.rotate(fig.rotAngle);

            fig.velocity.x += 0.1*(mouseOrigin.x - fig.pos.x);
            fig.velocity.y += 0.1*(mouseOrigin.y - fig.pos.y);

            let translation = P5.Vector.mult(fig.velocity, speedFactor);
        
            fig.pos.add(translation);
            fig.display();
        });

        for (let i = 0; i < to_scare.length; i++) {

            this.scare(to_scare[i])
        }
    }

    static mousePressed(sketchData: SketchData, p) {
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}