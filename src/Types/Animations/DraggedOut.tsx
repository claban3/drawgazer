import { SketchData } from '../Figures';

export class DraggedOut extends Animation {
    static draw(sketchData: SketchData, p) {
        sketchData.figs.forEach(fig => {
            let width = sketchData.canvasWidth;
            let height = sketchData.canvasHeight;
            
            if (fig.dead){
                fig.dead = false;
            }

            if (fig.collideCanvasLeft(width, height) || fig.collideCanvasRight(width, height)) {
                fig.velocity.x *= -1;
            }
        
            if (fig.collideCanvasTop(width, height) || fig.collideCanvasBottom(width, height)) {
                fig.velocity.y *= -1;
            }
            
            if (fig.collideWithMouse()) {
                let speed = fig.velocity.mag();
                let repelForce = fig.pos.copy().sub(p.createVector(p.mouseX, p. mouseY)).normalize();
                fig.velocity.add(repelForce.mult(speed));
            }
        
            fig.pos.add(fig.velocity);
            fig.display(sketchData);
        });

    }
}