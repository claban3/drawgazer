import "./Canvas.css";
import 'p5';
import '../../Types/Figures';
import { SelectedShape, SelectedAnimation, SketchData, ColorSettings } from '../../Types/Figures';
import P5Wrapper from 'react-p5-wrapper';
import 'react-p5-wrapper';
import { Animation, newFigure } from '../../Types/Animations/Animation';
import GIF from "gif.js.optimized";
import workerStr from "./gifWorker";
import * as fileSaver from 'file-saver';

let defaultColorSettings: ColorSettings = {
    background: '#FFFFFF',
    triangle: '#ED1C24',
    rectangle: '#28306D',
    circle: '#36A533', 
};

var workerBlob = new Blob([workerStr], {
    type: 'application/javascript'
});

var fps = 60;
var frameCounter = 0;
var seconds = 3;
var gif;

function setupGif() {
    gif = new GIF({
        workers: 6,
        quality: 500,
        workerScript: URL.createObjectURL(workerBlob),
    });

    gif.on('finished', function(blob) {
        console.log("finished");
        window.open(URL.createObjectURL(blob));
        fileSaver.saveAs(blob, "drawgazer.gif");
        setupGif();
    })
}

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
    let save = false;
    let record = false;
    let setClearCanvasInParent = () => {};
    let setSaveCanvasInParent = () => {};
    let setRecordCanvasInParent = () => {};
    
    let renderer;
    let settingState;

    p.setup = function () {
        renderer = p.createCanvas(sketchData.canvasWidth, sketchData.canvasHeight);
        renderer.parent("canvas");
        sketchData.points = [];
        Animation.propsHandler(sketchData, p);

        setupGif();
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
        save = props.canvasSettings.save;
        record = props.canvasSettings.record;
        setClearCanvasInParent = props.canvasSettings.resetInParent;
        setSaveCanvasInParent = props.canvasSettings.saveInParent;
        setRecordCanvasInParent = props.canvasSettings.recordInParent;
        settingState = props.canvasSettings.settingState;
        
        Animation.redraw(sketchData, p);
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

        if(save && renderer) {
            p.save("drawgazer-screenshot");
            save = false;
            setSaveCanvasInParent();
        }

        if(record && renderer) {
            if(frameCounter < fps*seconds) {
                console.log("frame");
                gif.addFrame(p.canvas, {delay: 1, copy: true});

            }
            else if(frameCounter === fps*seconds) {
                gif.render();
                record = false;
                setRecordCanvasInParent();
            }

            frameCounter++;
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

        if (settingState === 0){
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