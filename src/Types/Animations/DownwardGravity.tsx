import { SketchData } from '../Figures';

export class DownwardGravity extends Animation {
    static draw(sketchData: SketchData, p) {
        sketchData.figs.forEach(fig => {
          if(fig.collideCanvasLeft(sketchData.canvasWidth, sketchData.canvasHeight * 2) ||
             fig.collideCanvasRight(sketchData.canvasWidth, sketchData.canvasHeight * 2)) {
            fig.velocity.x *= -1;
          }
          
          if (!fig.collideCanvasBottom(sketchData.canvasWidth, sketchData.canvasHeight)) {
            fig.velocity.add(0, 0.07);
            fig.pos.add(fig.velocity);
            fig.angle += fig.spin;
            // fig.collision.play();
          }
          else if(!fig.dead){
            fig.dead = true;
          }

          fig.display();
        });
    }

    static mousePressed(sketchData: SketchData, p) {
        
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}