import React from 'react';
import "./Canvas.css";
import p5Types from 'p5';
import P5 from 'p5';
import p5 from 'p5';
import { SelectedShape, CanvasSettings } from '../../Types/Figures';
import { CircleFigure } from '../../Types/ProcessingFigures';

export default function Canvas(/* { settings: CanvasSetting}*/) {
    let myP5: P5;
    let myRef: React.RefObject<HTMLDivElement> = React.createRef();

    /**
     * TODO (delete this and read from props)
     * Mock data 
     */
    let settings: CanvasSettings = {
        selectedFigure: SelectedShape.Circle,
        reset: false
    };


    let Sketch = (p : P5) => {
        let circs: CircleFigure;

        p.setup = function () {
            p.createCanvas(640, 360);
            circs = new CircleFigure(p.width/2, p.height/2, -0.02, 90.0, p);
        }
        
        p.draw = function () {
            p.background(204);
            circs.update();
            circs.display();
        }
    }
  
    myP5 = new p5(Sketch, myRef.current)
  
    return (
        <div ref={myRef}>

        </div>
    );  
}
