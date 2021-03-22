import { CustomFigureStyles, SelectedShape, SketchData } from '../Figures';
import P5 from 'p5';
import { newFigure } from './Animation';
import { AnimatedFigure } from '../ProcessingFigures';

export class FillScreenWithFigures extends Animation {
    static NUM_FIGURES = 200;
    static FRAME_RATE = 25;

    static redraw(sketchData: SketchData, p: P5) {
        p.frameRate(this.FRAME_RATE);        
    }

    static draw(sketchData: SketchData, p: P5) {
        let width = sketchData.canvasWidth;
        let height = sketchData.canvasHeight;
        let figs = sketchData.figs;
        
        if (sketchData.selectedFigure == SelectedShape.None) {
            return;
        }

        if(sketchData.figs.length < this.NUM_FIGURES) {
            let pos: P5.Vector = p.createVector(p.random(width), p.random(height));

            let newFig = newFigure(sketchData.selectedFigure, pos.x, pos.y, p);
            let pushAble = true;
            figs.forEach(fig => {
                pushAble = pushAble && !AnimatedFigure.collidesWith(fig, newFig);
            });
            
            if(pushAble) figs.push(newFig);
        }
    
        figs.forEach(fig => {
            fig.display();
        });
    }

    static mousePressed(sketchData: SketchData, p) {
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}