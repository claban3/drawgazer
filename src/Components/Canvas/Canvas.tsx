import React from 'react';
import "./Canvas.css";
// import P5 from 'p5';
// import p5 from 'p5';
import 'p5';
import '../../Types/Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../../Types/ProcessingFigures';
import { CanvasSettings, SelectedShape, SelectedAnimation } from '../../Types/Figures';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';

interface ICanvasProps {
    canvasSettings?: CanvasSettings
}

interface ICanvasState {

}

export default class Canvas extends React.Component<ICanvasProps, ICanvasState> {
    constructor(props) {
        super(props);
    }
    
    //TODO: Create new types module to create types for 
    //      functions defined by the P5Wrapper module.
    sketch = (p) => {
        let figs: AnimatedFigure[] = [];
        let selectedFigure = SelectedShape.None;

        p.setup = function () {
            p.createCanvas(1000, 500);
            figs = [];
        }
        
        p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
            if (props.canvasSettings.selectedFigure) {
                selectedFigure = props.canvasSettings.selectedFigure;
            }
        }
        
        p.draw = function () {
            p.background(204);
            p.fill(100);
            figs.forEach(fig => {
                fig.update(3);
                fig.display();
            });
            
            p.mousePressed = function () {
                switch(selectedFigure) {
                    case SelectedShape.Circle:
                        let newCirc = new CircleFigure(p.mouseX, p.mouseY, -0.02, 50, p);
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
    }
                
    // componentDidMount() {
        // this.myP5 = new p5 (this.sketch, this.myRef.current);
    // }

    render() {
        return <P5Wrapper sketch={this.sketch} canvasSettings={this.props.canvasSettings}/>;
    }
}
