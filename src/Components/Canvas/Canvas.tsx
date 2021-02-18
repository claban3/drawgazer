import React from 'react';
import "./Canvas.css";
import P5 from 'p5';
import p5 from 'p5';
import 'p5';
import '../../Types/Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../../Types/ProcessingFigures';
import { CanvasSettings, SelectedShape, SelectedAnimation } from '../../Types/Figures';

export default function Canvas(/* { settings: CanvasSetting}*/) {
    let myP5: P5;
    let myRef: React.RefObject<HTMLDivElement> = React.createRef();

    /*
     * TODO (delete this and read from props)
     * Mock data 
     */
    let settings: CanvasSettings = {
        selectedFigure: SelectedShape.Triangle,
        selectedAnimation: SelectedAnimation.None,
        reset: false
    };

    let Sketch = (p : P5) => {
        let figs: AnimatedFigure[] = [];

        p.setup = function () {
            p.createCanvas(640, 360);
            figs = [];
        }
        
        p.draw = function () {
            p.background(204);

            figs.forEach(fig => {
                fig.update(3);
                fig.display();
            });
        }

        p.mousePressed = function () {
            switch(settings.selectedFigure) {
                case SelectedShape.Circle:
                    let newCirc = new CircleFigure(p.mouseX, p.mouseY, -0.02, 90, p);
                    figs.push(newCirc);
                    break;
                case SelectedShape.Rectangle:
                    let newSquare = new SquareFigure(p.mouseX, p.mouseY, -0.02, 90, p);
                    figs.push(newSquare);
                    break;
                case SelectedShape.Triangle: 
                    let newTriangle = new TriangleFigure(p.mouseX, p.mouseY, -0.02, 90, p);
                    figs.push(newTriangle);
                    break;
            }  

            // prevent default
            return false;
        }
    }
  
    myP5 = new p5(Sketch, myRef.current)
  
    return (
        <div ref={myRef}>

        </div>
    );
}
