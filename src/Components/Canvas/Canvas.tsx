import "./Canvas.css";
import 'p5';
import '../../Types/Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../../Types/ProcessingFigures';
import { CanvasSettings, SelectedShape, SelectedAnimation } from '../../Types/Figures';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';

function sketch (p) {
    let figs: AnimatedFigure[] = [];
    let points: P5Wrapper.Vector[] = [];
    let start = false;
    let selectedFigure = SelectedShape.None;
    let selectedAnimation = SelectedAnimation.WallBounce;
    // ^ Set to WallBounce instead of None for testing purposes

    function inCanvas(mouseX, mouseY, width, height) {

        return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    }

    p.setup = function () {
        p.createCanvas(1000, 500);
        figs = [];
        points = [];
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        selectedFigure = props.canvasSettings.selectedFigure;

        // Uncomment the line below once animation toolbar is integrated, else
        // SelectedAnimation will get updated to None

        //selectedAnimation = props.canvasSettings.selectedAnimation;
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

        p.mouseReleased = function () {
            start = false;
        }

        if (selectedFigure == SelectedShape.FreeDraw && start) {
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
    return <P5Wrapper sketch={sketch}  canvasSettings={props.canvasSettings}/>;
}
