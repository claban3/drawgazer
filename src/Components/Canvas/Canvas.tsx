import "./Canvas.css";
import 'p5';
import '../../Types/Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../../Types/ProcessingFigures';
import { SelectedShape, SelectedAnimation } from '../../Types/Figures';
// import { CanvasSettings, SelectedAnimation } from '../../Types/Figures'; //uncomment once used
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';

function sketch (p) {
    let figs: AnimatedFigure[] = [];
    let points: P5Wrapper.Vector[] = [];
    let start = false;
    let selectedFigure = SelectedShape.None;
    let selectedAnimation = SelectedAnimation.WallBounce;
    // ^ Set to WallBounce instead of None for testing purposes
     let bufferWidth = 60;
    let canvasHeight = window.innerHeight - bufferWidth
    let canvasWidth = window.innerWidth * 0.70 - bufferWidth;
    let renderer;

    function inCanvas(mouseX, mouseY, width, height) {

        return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    }

    p.setup = function () {
        renderer = p.createCanvas(canvasWidth, canvasHeight);
        renderer.parent("canvas");
        figs = [];
        points = [];
    }

    p.windowResized = function () {
        canvasHeight = window.innerHeight -  bufferWidth;
        canvasWidth = window.innerWidth * 0.70 - bufferWidth;
        p.resizeCanvas(canvasWidth, canvasHeight);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        selectedFigure = props.canvasSettings.selectedFigure;
        selectedAnimation = props.canvasSettings.selectedAnimation;
    }

    p.draw = function () {
        p.background(204);
        p.fill(100);
        figs.forEach(fig => {
            fig.update(selectedAnimation, p.mouseX, p.mouseY, p.width, p.height);
            fig.display();
        });
        p.mousePressed = function () {
            start = true;
            points = [];
            if (!inCanvas(p.mouseX, p.mouseY, p.width, p.height)) {
                return false;
            }
            let s = Math.random() * 50 + 50;
            switch(selectedFigure) {
                case SelectedShape.Circle:
                    let newCirc = new CircleFigure(p.mouseX, p.mouseY, -0.02, s, p);
                    figs.push(newCirc);
                    break;
                case SelectedShape.Rectangle:
                    let newSquare = new SquareFigure(p.mouseX, p.mouseY, -0.02, s, p);
                    figs.push(newSquare);
                    break;
                case SelectedShape.Triangle:
                    let newTriangle = new TriangleFigure(p.mouseX, p.mouseY, -0.02, s, p);
                    figs.push(newTriangle);
                    break;
            }
            // prevent default
            return false;
        }

        p.mouseReleased = function () {
            start = false;
        }

        if (selectedFigure === SelectedShape.FreeDraw && start) {
            points.push(p.createVector(p.mouseX, p.mouseY));
        }

        p.stroke(255);
        p.noFill();
        p.beginShape();
        for (let i = 0; i<points.length; i++){
            let x = points[i].x;
            let y = points[i].y;

            p.vertex(x, y)
        }
        p.endShape();
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