import { CustomFigureStyles, SketchData } from '../Figures';
import p5 from 'p5';
import { pushNewFigure } from './Animation';

export class DownwardGravity extends Animation {
  static draw(sketchData: SketchData, p: p5) {
    let customStyles : CustomFigureStyles = {
      opacity: 200,
      stroke: false
    };
    
    p.background(255, 30);

    if (p.mouseX != p.pmouseX && p.mouseY != p.pmouseY && Math.round(Math.random() * 2) === 1) {
      pushNewFigure(sketchData.selectedFigure, sketchData.figs, p);
    }

    sketchData.figs.forEach(fig => {

      fig.pos.add(fig.velocity);
      fig.velocity.y += fig.acceleration.y;
      fig.dim *= 0.99;

      if (fig.collideCanvasBottom(sketchData.canvasWidth, sketchData.canvasHeight)) {
        fig.velocity.y *= -1;
        // fig.thud.play();
      }

      if((fig.collideCanvasLeft(sketchData.canvasWidth, sketchData.canvasHeight) ||
          fig.collideCanvasRight(sketchData.canvasWidth, sketchData.canvasHeight)) &&
          !fig.dead) {
        fig.velocity.x *= -1;
        fig.spin *= -1;
      }

      fig.displayCustomStyles(sketchData, customStyles);
    });

    for (let i = 0; i < sketchData.figs.length; i++) {
      if (sketchData.figs[i].dim < 4) {
          sketchData.figs.splice(i, 1);
      }
    }
  }

  static mousePressed(sketchData: SketchData, p) {
      
  }

  static mouseReleased(sketchData: SketchData, p) {

  }
}