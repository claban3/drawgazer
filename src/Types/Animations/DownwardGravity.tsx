import { SketchData } from '../Figures';

export class DownwardGravity extends Animation {
    static draw(sketchData: SketchData, p) {
        sketchData.figs.forEach(fig => {
          // if (fig.pos.y < sketchData.canvasHeight - 50) {
          if (fig.collideCanvasBottom(sketchData.canvasWidth, sketchData.canvasHeight)) {
            fig.dead = true;
            // fig.collision.play();
          }
          else if(!fig.dead){
            fig.velocity.add(0.05, 0.05);
            fig.pos.y += fig.velocity.y;
            fig.angle += fig.spin;
          }

          fig.display();
        });
    }

    static mousePressed(sketchData: SketchData, p) {
        
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}