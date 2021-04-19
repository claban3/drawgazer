import { CustomFigureStyles, SketchData } from '../Figures';
import p5 from 'p5';
import { pushNewFigure, pushNewFigureWithVelocity } from './Animation';
import { AnimatedFigure } from '../ProcessingFigures';

export class DownwardGravity extends Animation {
  static draw(sketchData: SketchData, p: p5) {
    let customStyles: CustomFigureStyles = {
      opacity: 220,
      stroke: true
    };

    let color = p.color(sketchData.colorSettings.background);
    color.setAlpha(70);
    p.background(color);

    if (p.mouseX != p.pmouseX && 
        p.mouseY != p.pmouseY && 
        Math.round(Math.random() * 3) === 1) {
        let pmousePos = p.createVector(p.pmouseX, p.pmouseY);
        let mousePos = p.createVector(p.mouseX, p.mouseY);
        let newFigVel = mousePos.sub(pmousePos).normalize().mult(15);
        pushNewFigureWithVelocity(sketchData.selectedFigure, sketchData.figs, newFigVel, p);
    }

    sketchData.figs.forEach(fig => {
      fig.pos.add(fig.velocity);
      fig.velocity.y += fig.acceleration.y;
      fig.dim *= 0.99;

      if (fig.collideCanvasBottom(sketchData.canvasWidth, sketchData.canvasHeight)) {
        fig.velocity.y *= -1;
        // fig.thud.play();
      }

      if ((fig.collideCanvasLeft(sketchData.canvasWidth, sketchData.canvasHeight) ||
        fig.collideCanvasRight(sketchData.canvasWidth, sketchData.canvasHeight)) &&
        !fig.dead) {
        fig.velocity.x *= -1;
        fig.spin *= -1;
      }

      fig.displayCustomStyles(customStyles);
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

  static hawkeyeMouseOver(sketchData: SketchData, hawkeyeMouseEvent, p) {
    let mouseX = hawkeyeMouseEvent.mouseX;
    let mouseY = hawkeyeMouseEvent.mouseY;
    
    if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
      if (Math.floor(Math.random() * 4) === 0) {
        pushNewFigure(sketchData.selectedFigure, sketchData.figs, mouseX, mouseY, p);
      }
    }
    return false;
  }
}