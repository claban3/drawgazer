import "./Canvas.css";
import 'p5';
import '../../Types/Figures';
import { SelectedShape, SelectedAnimation, SketchData, ColorSettings } from '../../Types/Figures';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';
import { Animation } from '../../Types/Animations/Animation';
import { CircleFigure, SquareFigure, TriangleFigure } from "../../Types/ProcessingFigures";

let defaultColorSettings: ColorSettings = {
    background: '#FFFFFF',
    triangle: '#ED1C24',
    rectangle: '#28306D',
    circle: '#36A533', 
};

function sketch (p) {
    let sketchData: SketchData = {
        onPressed: false,
        figs: [],
        points: [],
        colorSettings: defaultColorSettings,
        selectedFigure: SelectedShape.None,
        selectedAnimation: SelectedAnimation.None, 
        bufferWidth: 40,
        bufferHeight: 40,
        canvasHeight: window.innerHeight * 0.75 - 40 /* bufferWidth */,
        canvasWidth: window.innerWidth * 0.85 - 40 /* bufferHeight */,
    };


    let savedFigs = JSON.parse(localStorage.getItem("savedFigs"));
    if(savedFigs)
    {
        for(let i=0; i < savedFigs.length; i++) {
            let fig = savedFigs[i];
            switch(fig.type) {
                case "circle":
                    sketchData.figs.push(new CircleFigure(fig.x, fig.y, -0.02, fig.d, p));
                    break;
                case "square":
                    sketchData.figs.push(new SquareFigure(fig.x, fig.y, -0.02, fig.d, p));
                    break;
                case "triangle":
                    sketchData.figs.push(new TriangleFigure(fig.x, fig.y, -0.02, fig.d, p));
                    break;
                default: 
                    console.log("Canvas received bad JSON from local storage")
            }
        }
    }

    let reset = false;
    let setClearCanvasInParent = () => {};
    let renderer;
    let settingState;

    function inCanvas(mouseX, mouseY, width, height) {
        return mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;
    }

    p.setup = function () {
        renderer = p.createCanvas(sketchData.canvasWidth, sketchData.canvasHeight);
        renderer.parent("canvas");
        sketchData.points = [];
        Animation.propsHandler(sketchData, p);

        settingState = 0;
    }

    p.windowResized = function () {
        sketchData.canvasHeight = window.innerHeight * 0.75 -  sketchData.bufferHeight;
        sketchData.canvasWidth = window.innerWidth * 0.85 - sketchData.bufferWidth;
        p.resizeCanvas(sketchData.canvasWidth, sketchData.canvasHeight);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        sketchData.selectedFigure = props.canvasSettings.selectedFigure;
        sketchData.selectedAnimation = props.canvasSettings.selectedAnimation;
        
        if (props.canvasSettings.colorSettings && 
            props.canvasSettings.colorSettings != sketchData.colorSettings) {
                sketchData.colorSettings = props.canvasSettings.colorSettings;
                Animation.propsHandler(sketchData, p);
        }

        reset = props.canvasSettings.reset;
        setClearCanvasInParent = props.canvasSettings.resetInParent;
        settingState = props.canvasSettings.settingState;
    }

    p.draw = function () {
        if (reset) {
            sketchData.figs = [];
            sketchData.points = [];
            reset = false;
            p.background(sketchData.colorSettings.background);
            setClearCanvasInParent();
            localStorage.removeItem("savedFigs");
        }

        p.mouseClicked = function (event) {
            if (settingState===0){
                return Animation.mousePressed(sketchData, p);
            }
        }
        
        p.mouseReleased = function() {
            if (settingState===0){
                Animation.mouseReleased(sketchData, p);
            }
            // return false;
        }

        if (settingState===0){
            Animation.draw(sketchData, p);
            localStorage.setItem("savedFigs", JSON.stringify(sketchData.figs));
        }
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