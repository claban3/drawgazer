import "./Canvas.css";
import 'p5';
import '../../Types/Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../../Types/ProcessingFigures';
import { SelectedShape, SelectedAnimation } from '../../Types/Figures';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';
import { PinDropSharp } from "@material-ui/icons";

function sketch (p) {
    let reset = false;
    let figs: AnimatedFigure[] = [];
    let points: P5Wrapper.Vector[] = [];
    let start = false;
    let selectedFigure = SelectedShape.None;
    let selectedAnimation = SelectedAnimation.WallBounce;
    let setClearCanvasInParent = () => {};
    // ^ Set to WallBounce instead of None for testing purposes
    let bufferWidth = 40;
    let bufferHeight = 40;
    let canvasHeight = window.innerHeight * 0.75 - bufferHeight;
    let canvasWidth = window.innerWidth * 0.85 - bufferWidth;
    let renderer;
    let shareSessionState = 0;

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
        canvasHeight = window.innerHeight * 0.75 - bufferHeight;
        canvasWidth = window.innerWidth * 0.85 - bufferWidth;
        p.resizeCanvas(canvasWidth, canvasHeight);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        selectedFigure = props.canvasSettings.selectedFigure;
        selectedAnimation = props.canvasSettings.selectedAnimation;
        reset = props.canvasSettings.reset;
        setClearCanvasInParent = props.canvasSettings.resetInParent;
        shareSessionState = props.canvasSettings.shareSessionState;
        // Uncomment the line below once animation toolbar is integrated, else
        // SelectedAnimation will get updated to None
        //selectedAnimation = props.canvasSettings.selectedAnimation;
    }

    p.draw = function () {

        p.background(220);
        if (reset) {
            figs = [];
            points = [];
            reset = false;
            setClearCanvasInParent();
        }
        p.fill(100);
        figs.forEach(fig => {
            fig.update(selectedAnimation, p.mouseX, p.mouseY, canvasWidth, canvasHeight);
            fig.display();
        });

        if (shareSessionState != 2) {

            p.mousePressed = function () {

                console.log("HERE")
                console.log(shareSessionState);

                if (shareSessionState == 0) {
                    console.log("HERE0")
                }
                
                if (shareSessionState == 1) {
                    console.log("HERE1")
                }
                
                if (shareSessionState == 2) {
                    console.log("HERE2")
                }
                
                if (shareSessionState == 3) {
                    console.log("HERE3")
                }

                start = true;
                points = [];
                if (!inCanvas(p.mouseX, p.mouseY, canvasWidth, canvasHeight)) {
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
        <div className="canvas-container" id="canvas">
                <P5Wrapper 
                    className="p5Wrapper"
                    sketch={sketch}     
                    canvasSettings={props.canvasSettings}/>
        </div>
    ); 
}
