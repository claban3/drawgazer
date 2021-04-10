import '../../Types/Figures';
import './Canvas.css';
import 'p5';
import 'react-p5-wrapper';
import * as fileSaver from 'file-saver';
import { Animation, newFigure } from '../../Types/Animations/Animation';
import { SelectedShape, SelectedAnimation, SketchData, ColorSettings } from '../../Types/Figures';
import GIF from 'gif.js.optimized';
import P5Wrapper from 'react-p5-wrapper';
import workerStr from './gifWorker';

let defaultColorSettings: ColorSettings = {
    background: '#FFFFFF',
    triangle: '#ED1C24',
    rectangle: '#28306D',
    circle: '#36A533',
};

function sketch(p) {
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

    function loadSavedFigures() {
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
                        sketchData.figs.push(newFigure(SelectedShape.Circle, fig.x, fig.y, p, fig.d, fig.color));
                        break;
                    case "square":
                        sketchData.figs.push(newFigure(SelectedShape.Rectangle, fig.x, fig.y, p, fig.d, fig.color));
                        break;
                    case "triangle":
                        sketchData.figs.push(newFigure(SelectedShape.Triangle, fig.x, fig.y, p, fig.d, fig.color));
                        break;
                    default:
                        console.log("Canvas received bad JSON from local storage")
                }
            }
        }

        return savedFigs;
    }

    loadSavedFigures();

    let workerBlob = new Blob([workerStr], {
        type: 'application/javascript'
    });

    const fps = 50; // (expected) number of frames per second 
    const sampleRate = 10; // every sampleRate'th frame will be sampled
    const maxSecondsRecorded = 20; // maximum number of seconds for which a gif can be recorded
    let frameCounter = 0; // number of frames saved in the current gif
    let gif;

    let reset = false; // toggles reseting the canvas
    let save = false; // toggles saving a screenshot of the canvas
    let record : boolean = false; // toggles recording a gif of the canvas

    let setClearCanvasInParent = () => { };
    let setSaveCanvasInParent = () => { };
    let setRecordCanvasInParent = (reset) => { };

    let renderer;
    let settingState;
    let shareSessionState;
    let start = false;

    function setupGif(setRecordCanvasInParent) {
        gif = new GIF({
            workers: 6,
            quality: 500,
            workerScript: URL.createObjectURL(workerBlob),
        });

        gif.on('finished', function (blob) {
            window.open(URL.createObjectURL(blob));
            fileSaver.saveAs(blob, "drawgazer.gif");
            setupGif(setRecordCanvasInParent);
            setRecordCanvasInParent(true);
        })
    }

    function updateGif() {
        if (save && renderer) {
            p.save("drawgazer-screenshot");
            save = false;
            setSaveCanvasInParent();
        }

        if (record && renderer) {
            if (frameCounter < fps * maxSecondsRecorded) {
                if (frameCounter % sampleRate == 0) {
                    gif.addFrame(p.canvas, { delay: 1, copy: true });
                }
                frameCounter++;
            }
            else if (frameCounter == fps * maxSecondsRecorded) {
                record = false;
                gif.render();
                frameCounter = 0;
                setRecordCanvasInParent(false);
            }
        }
    }

    p.setup = function () {
        renderer = p.createCanvas(sketchData.canvasWidth, sketchData.canvasHeight);
        renderer.parent("canvas");
        sketchData.points = [];
        Animation.propsHandler(sketchData, p);

        setupGif(setRecordCanvasInParent);
        settingState = 0;
        shareSessionState = 0;
    }

    p.windowResized = function () {
        sketchData.canvasHeight = window.innerHeight * 0.75 - sketchData.bufferHeight;
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
        
        setClearCanvasInParent = props.canvasSettings.resetInParent;
        setSaveCanvasInParent = props.canvasSettings.saveInParent;
        setRecordCanvasInParent = props.canvasSettings.recordInParent;

        shareSessionState = props.canvasSettings.shareSessionState;
        settingState = props.canvasSettings.settingState;

        if (record != props.canvasSettings.record) {
            // this case means that the recording was turned off
            if (record === true) {
                record = false;
                if (gif) gif.render();
                frameCounter = 0;
            }

            record = props.canvasSettings.record;
            setupGif(setRecordCanvasInParent);
        }

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

        updateGif();

        p.mouseClicked = function (event) {
            if (settingState===0 && shareSessionState===0){
                return Animation.mousePressed(sketchData, p);
            }
        }
        
        p.mouseReleased = function() {
            if (settingState===0 && shareSessionState===0){
                Animation.mouseReleased(sketchData, p);
            }
        }

        if (settingState === 0 && shareSessionState===0){

            sketchData.figs.forEach(fig => {
                let width = sketchData.canvasWidth;
                let height = sketchData.canvasHeight;

                if (fig.pos.x < 0) {
                    fig.pos.x = 20;
                    //fig.velocity.x *= -1;
                }
                if (fig.pos.x > width) {
                    fig.pos.x = width - 20;
                    //fig.velocity.x *= -1;
                }
                if (fig.pos.y < 0) {
                    fig.pos.y = 20;
                   // fig.velocity.y *= -1;
                }
                if (fig.pos.y > height) {
                    fig.pos.y = height - 20;
                    //fig.velocity.y *= -1;
                }
            });

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
                canvasSettings={props.canvasSettings} />
        </div>
    );
}