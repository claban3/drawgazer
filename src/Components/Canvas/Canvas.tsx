import "./Canvas.css";
import 'p5';
import '../../Types/Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../../Types/ProcessingFigures';
import { CanvasSettings, SelectedShape, SelectedAnimation } from '../../Types/Figures';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';

function sketch (p) {
    let figs: AnimatedFigure[] = [];
    let selectedFigure = SelectedShape.None;
    let bufferWidth = 60;
    let canvasHeight = window.innerHeight - bufferWidth
    let canvasWidth = window.innerWidth * 0.70 - bufferWidth;
    let renderer;

    p.setup = function () {
        renderer = p.createCanvas(canvasWidth, canvasHeight);
        renderer.parent("canvas");
        figs = [];
    }

    p.windowResized = function () {
        canvasHeight = window.innerHeight -  bufferWidth;
        canvasWidth = window.innerWidth * 0.70 - bufferWidth;
        p.resizeCanvas(canvasWidth, canvasHeight);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        selectedFigure = props.canvasSettings.selectedFigure;
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

export default function Canvas(props) {
    return (
        <div className="canvas-container">
            <div className="canvas" id="canvas">
                <P5Wrapper 
                    sketch={sketch}     
                    canvasSettings={props.canvasSettings}/>
            </div>
        </div>
    ); 
}