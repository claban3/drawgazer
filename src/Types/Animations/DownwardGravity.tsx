import { SketchData } from '../Figures';
import { AnimatedFigure } from '../ProcessingFigures';
import { WallBounce } from './WallBounce';

export class DownwardGravity extends Animation {
    static draw(sketchData: SketchData, p) {
        p.background(255);

        sketchData.figs.forEach(fig => {
          if((fig.collideCanvasLeft(sketchData.canvasWidth, sketchData.canvasHeight) ||
             fig.collideCanvasRight(sketchData.canvasWidth, sketchData.canvasHeight)) &&
             !fig.dead) {
            fig.velocity.x *= -1;
            fig.spin *= -1;
          }

          let nodes = sketchData.figs;
          
          if (!fig.collideCanvasBottom(sketchData.canvasWidth, sketchData.canvasHeight)) {
            fig.velocity.add(0, 0.07);
            fig.pos.add(fig.velocity);
            fig.angle += fig.spin;
          }
          else if(!fig.dead){
            fig.dead = true;
            fig.thud.play();
          }

          fig.display();
        });
    }

    static mousePressed(sketchData: SketchData, p) {
        
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}