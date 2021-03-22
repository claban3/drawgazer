import { SketchData } from '../Figures';

export class WallBounce extends Animation {
    static draw(sketchData: SketchData, p) {
        p.background(sketchData.colorSettings.background);
        
        sketchData.figs.forEach(fig => {
            let width = sketchData.canvasWidth;
            let height = sketchData.canvasHeight;
            
            if (fig.dead){
                fig.dead = false;
            }

            if (fig.collideCanvasLeft(width, height) || fig.collideCanvasRight(width, height)) {
                fig.velocity.x *= -1;
                fig.bounce.play();
            }
        
            if (fig.collideCanvasTop(width, height) || fig.collideCanvasBottom(width, height)) {
                fig.velocity.y *= -1;
                fig.bounce.play();
            }
            
            if (fig.collideWithMouse()) {
                let speed = fig.velocity.mag();
                let repelForce = fig.pos.copy().sub(p.createVector(p.mouseX, p. mouseY)).normalize();
                fig.velocity.add(repelForce.mult(speed));
                fig.bounce.play();
            }
        
            fig.pos.add(fig.velocity);
            fig.display();
        });

    }

    static mousePressed(sketchData: SketchData, p) {
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}