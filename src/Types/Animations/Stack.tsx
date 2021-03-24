import { SketchData } from '../Figures';
import { AnimatedFigure } from '../ProcessingFigures';
import { WallBounce } from './WallBounce';

export class Stack extends Animation {
    static draw(sketchData: SketchData, p) {
        sketchData.figs.forEach(fig => {
          if((fig.collideCanvasLeft(sketchData.canvasWidth, sketchData.canvasHeight) ||
             fig.collideCanvasRight(sketchData.canvasWidth, sketchData.canvasHeight)) &&
             !fig.dead) {
            fig.velocity.x *= -1;
            fig.spin *= -1;
            fig.bounce.play()
          }

          let nodes = sketchData.figs;

          let stacked = false;

          for (let i = 0; i < nodes.length; i++) {
            if (AnimatedFigure.collidesWith(nodes[i], fig) && nodes[i] != fig && (nodes[i].dead || fig.dead)) {
              stacked = true;
            }
          }
          
          if (!stacked && !fig.collideCanvasBottom(sketchData.canvasWidth, sketchData.canvasHeight)) {
            fig.velocity.add(0, 0.07);
            fig.pos.add(fig.velocity);
            fig.angle += fig.spin;
            // fig.collision.play();
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