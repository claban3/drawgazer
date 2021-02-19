import React from 'react';
import "./Canvas.css";
import P5 from 'p5';
import p5 from 'p5';
import 'p5';
import '../../Types/Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../../Types/ProcessingFigures';
import { CanvasSettings, SelectedShape, SelectedAnimation } from '../../Types/Figures';
import PropTypes from 'prop-types';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';

interface ICanvasProps {
    selectedFigure?: SelectedShape
}
interface ICanvasState {}

export default class Canvas extends React.Component<ICanvasProps, ICanvasState> {
// export default function Canvas(props) {
    // myP5: P5;
    // myRef: React.RefObject<HTMLDivElement> = React.createRef();

    // static propTypes = {
    //     selectedFigure: PropTypes.oneOf(Object.keys(SelectedShape)),
    // };
    /*
     * TODO (delete this and read from props)
     * Mock data 
     */
    constructor(props) {
        super(props);
        // this.myRef = React.createRef();
    }
    
    sketch = (p) => {
        let figs: AnimatedFigure[] = [];
        let selectedFigure = SelectedShape.None;

        p.setup = function () {
            p.createCanvas(1000, 500);
            figs = [];
        }
        
        p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
            if (props.selectedFigure) {
                selectedFigure = props.selectedFigure;
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
        return <P5Wrapper sketch={this.sketch} selectedFigure={this.props.selectedFigure}/>;
        {/* if (this.myP5){
            console.log("render myp5");
            return (<div ref={this.myRef}></div>);
        } else {
            return (<div></div>);
        } */}
    }
}
