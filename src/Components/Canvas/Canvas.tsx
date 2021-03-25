import "./Canvas.css";
import 'p5';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';

import '../../Types/Figures';
import { SelectedShape, SelectedAnimation, SketchData, ColorSettings } from '../../Types/Figures';
// import { PinDropSharp } from "@material-ui/icons";
import { Animation, newFigure } from '../../Types/Animations/Animation';
import { CircleFigure, SquareFigure, TriangleFigure } from "../../Types/ProcessingFigures";

let defaultColorSettings: ColorSettings = {
    background: '#FFFFFF',
    triangle: '#ED1C24',
    rectangle: '#28306D',
    circle: '#36A533', 
};

// let setClearCanvasInParent = () => {};

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
    if (savedFigs) {
        for (let i = 0; i < savedFigs.length; i++) {
            let fig = savedFigs[i];
            
            // update colors in animation function
            Animation.propsHandler(sketchData, p);
            
            if (!fig) {
                console.log("Canvas received bad JSON from local storage");
                return;
            }
            
            switch (fig.type) {
                case "circle":
                    sketchData.figs.push(newFigure(SelectedShape.Circle, fig.x, fig.y, p, fig.color));
                    break;
                case "square":
                    sketchData.figs.push(newFigure(SelectedShape.Rectangle, fig.x, fig.y, p, fig.color));
                    break;
                case "triangle":
                    sketchData.figs.push(newFigure(SelectedShape.Triangle, fig.x, fig.y, p, fig.color));
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
    let shareSessionState;
    let start = false;

    p.setup = function () {
        renderer = p.createCanvas(sketchData.canvasWidth, sketchData.canvasHeight);
        renderer.parent("canvas");
        sketchData.points = [];
        Animation.propsHandler(sketchData, p);
        settingState = 0;
        shareSessionState = 0;
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
        shareSessionState = props.canvasSettings.shareSessionState;
        settingState = props.canvasSettings.settingState;

        Animation.redraw(sketchData, p);
        // Uncomment the line below once animation toolbar is integrated, else
        // SelectedAnimation will get updated to None
        //selectedAnimation = props.canvasSettings.selectedAnimation;
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
            if (settingState===0 && shareSessionState===0){
                return Animation.mousePressed(sketchData, p);
            }
        }
        
        p.mouseReleased = function() {
            if (settingState===0 && shareSessionState===0){
                Animation.mouseReleased(sketchData, p);
            }
            // return false;
        }

        if (settingState === 0 && shareSessionState===0){
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