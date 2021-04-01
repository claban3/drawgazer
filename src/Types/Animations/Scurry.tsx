import { SketchData } from '../Figures';
import P5 from 'p5';
import { AnimatedFigure } from '../ProcessingFigures';
import 'p5collide';
import { FormGroup } from '@material-ui/core';

export class Scurry extends Animation {

    static draw(sketchData: SketchData, p) {
        p.background(sketchData.colorSettings.background);
        
        let rotFactor = 0.1;
        let jumpFactor = 0.5;

        sketchData.figs.forEach(fig => {
            let width = sketchData.canvasWidth;
            let height = sketchData.canvasHeight;
            
            let mouseOrigin = p.createVector(p.mouseX, p.mouseY);

            if (fig.collideCanvasLeft(width, height) || fig.collideCanvasRight(width, height)) {

                fig.velocity.x = 0;
            }
        
            if (fig.collideCanvasTop(width, height) || fig.collideCanvasBottom(width, height)) {
                
                fig.velocity.y = 0;
            }

            let diff = P5.Vector.sub(fig.pos, mouseOrigin);
            let reverse_diff = P5.Vector.sub(mouseOrigin, fig.pos);

            if (diff.mag() < 250 && (mouseOrigin.x != fig.pos.x && mouseOrigin.y != fig.pos.y)) {

                let dir = diff;
                dir.normalize();

                let new_vel = dir;
                new_vel.setMag(fig.velocity.mag() + 0.25);
                //new_vel.setMag(1.5);

                fig.velocity = new_vel;
                //fig.velocity.add(new_vel)
            }

            else {

                if (fig.velocity.mag() < 0.3) {
                    let dir = reverse_diff;
                    dir.normalize();
                    let new_vel = dir;
                    new_vel.setMag(0.05)
                    fig.velocity.add(new_vel);
                }
            }

            fig.velocity.x *= 0.9;
            fig.velocity.y *= 0.9;

            fig.rotAngle = fig.randSign()*rotFactor;
            fig.velocity.rotate(fig.rotAngle);

            let jump = p.createVector(jumpFactor*fig.randSign(), jumpFactor*fig.randSign());
        
            fig.pos.add(fig.velocity);
            fig.pos.add(jump);
            fig.display();
        });
    }

    static mousePressed(sketchData: SketchData, p) {
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}