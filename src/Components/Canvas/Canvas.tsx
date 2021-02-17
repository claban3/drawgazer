import React from 'react';
import "./Canvas.css";
import P5 from 'p5';
import p5 from 'p5';
import 'p5';
import { SelectedShape, CanvasSettings } from '../../Types/Figures';
import { AnimatedFigure, CircleFigure, SquareFigure } from '../../Types/ProcessingFigures';

export default function Canvas(/* { settings: CanvasSetting}*/) {
    let myP5: P5;
    let myRef: React.RefObject<HTMLDivElement> = React.createRef();

    /*
     * TODO (delete this and read from props)
     * Mock data 
     */
    let settings: CanvasSettings = {
        selectedFigure: SelectedShape.Circle,
        reset: false
    };

    let Sketch = (p : P5) => {
        // let figures: AnimatedFigure[];
        // let circ: CircleFigure;
        // let circs: CircleFigure[] = [];
        let figs: AnimatedFigure[] = [];
        let COUNTER = 0;


        p.setup = function () {
            p.createCanvas(640, 360);
            figs = [];
        }
        
        p.draw = function () {
            p.background(204);

            for (let i = 0; i < figs.length; i++) {
                figs[i].update();
                figs[i].display();
            }
        }

        p.mousePressed = function () {
            // switch(settings.selectedFigure) {
            //     case SelectedShape.Circle:
            //         let newCirc = new CircleFigure(p.mouseX, p.mouseY, -0.02, 90, p);
            //         figs.push(newCirc);
            //     case SelectedShape.Rectangle:
            //         let newSquare = new SquareFigure(p.mouseX, p.mouseY, -0.02, 90, p);
            //         figs.push(newSquare);
            //     case SelectedShape.Triangle: 
            // }

            if (COUNTER % 2 == 0) {
                let newCirc = new CircleFigure(p.mouseX, p.mouseY, -0.02, 90, p);
                figs.push(newCirc);
                COUNTER++;
            } else {
                let newSquare = new SquareFigure(p.mouseX, p.mouseY, -0.02, 90, p);
                figs.push(newSquare);
                COUNTER++;

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
