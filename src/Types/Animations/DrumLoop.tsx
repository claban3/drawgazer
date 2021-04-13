import { SelectedShape, SketchData } from '../Figures';
import P5 from 'p5';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../ProcessingFigures';
import 'p5collide';
import p5 from 'p5';
import { newFigure } from './Animation';

export class DrumLoop extends Animation {
    static measure_location = 0;
    
    static displaySubdivisions(width, height, numDivisions, p: P5) {

        for (let i = 0; i < numDivisions; ++i) {
            let divisionX = i * (width / numDivisions);
            p.push();
            p.fill(160);
            p.strokeWeight(2);
            p.line(divisionX, 0, divisionX, height);
            p.pop();
        }
    }

    static draw(sketchData: SketchData, p: P5) {
        let width = sketchData.canvasWidth;
        let height = sketchData.canvasHeight;

        p.background(sketchData.colorSettings.background);
        
        // display measure line
        this.displaySubdivisions(width, height, 8, p);

        p.push();
        p.fill(0);
        p.stroke(20);
        p.line(this.measure_location, 0, this.measure_location, height);
        p.pop();
        sketchData.figs.forEach(fig => {
            
            if (fig.collideWithLine(this.measure_location, 0, this.measure_location, height)) {
                fig.drumBeat.play();
            }
            
            fig.display();
        });

        if (this.measure_location > width) {
            this.measure_location = 0;
        } else {
            this.measure_location += 5;
        }

    }

    static mousePressed(sketchData: SketchData, p) {

        if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
            for (let i = 0; i < sketchData.figs.length; ++i) {
                let fig = sketchData.figs[i];
                if(fig.collideWithMouse()) {
                    sketchData.figs.splice(i, 1);
                }
            }
        }

        if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)
            && sketchData.selectedFigure != SelectedShape.None) {
            sketchData.figs.push(newFigure(sketchData.selectedFigure, p.mouseX, p.mouseY, p, 100));
        }
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}