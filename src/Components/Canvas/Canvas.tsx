import "./Canvas.css";
import 'react-p5-wrapper';
import 'p5';
import '../../Types/Figures';
import GIF from 'gif.js.optimized';
import P5Wrapper from 'react-p5-wrapper';
import workerStr from './gifWorker';
import * as fileSaver from 'file-saver';
import { Animation, newFigure } from '../../Types/Animations/Animation';
import { SelectedShape, SelectedAnimation, SketchData, ColorSettings, HawkeyeMouseEvent } from '../../Types/Figures';
import { useState } from 'react';
import { SyncEvents } from "../../Types/SyncEvents";

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

    function JSONToFigure(fig) {
        switch (fig.type) {
            case "circle":
                return newFigure(SelectedShape.Circle, fig.x, fig.y, p, fig.d, fig.color);
            case "square":
                return newFigure(SelectedShape.Rectangle, fig.x, fig.y, p, fig.d, fig.color);
            case "triangle":
                return newFigure(SelectedShape.Triangle, fig.x, fig.y, p, fig.d, fig.color);
            default:
                console.log("Bad JSON");
                return null;
        }
    }

    function loadSavedFigures() {
        let savedFigs = JSON.parse(localStorage.getItem("savedFigs"));
        if (savedFigs) {
            for (let i = 0; i < savedFigs.length; i++) {
                let JSONfig = savedFigs[i];
                
                if (!JSONfig) {
                    console.log("Canvas received bad JSON from local storage");
                    return;
                }

                // update colors in animation function
                Animation.propsHandler(sketchData, p);

                let fig = JSONToFigure(JSONfig);
                if(fig) sketchData.figs.push(fig);
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
    let record: boolean = false; // toggles recording a gif of the canvas

    let setClearCanvasInParent = () => { };
    let setSaveCanvasInParent = () => { };
    let setRecordCanvasInParent = (reset) => { };
    let syncCanvasHandler = () => { };
    let updateFigs = () => { };

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

    function syncEventHandler(syncEvent) {
        switch (syncEvent.eventType) {
            case(SyncEvents.SetFigures):
                sketchData.figs = [];
                for(let i = 0; i < syncEvent.figs.length; ++i) {
                    let fig = JSONToFigure(syncEvent.figs[i]);
                    if(fig) sketchData.figs.push(fig);
                }
                break;

            case(SyncEvents.AddFigure):
                break;

            default: 
                console.log("Receieved invalid sync event");
                break;
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
        if(props.syncInfo.synced && props.syncInfo.syncEvents.length > 0) {
            syncEventHandler(props.syncInfo.syncEvents[0]);
            props.syncInfo.popSyncEvent();
        }

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
        shareSessionState = props.canvasSettings.shareSessionState;
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

        if (props.canvasSettings.hawkeyeMouseEvent.mousePressed) {
            if (settingState === 0) {
                let mouseEvent = props.canvasSettings.hawkeyeMouseEvent;
                Animation.hawkeyeMousePressed(sketchData, p, mouseEvent, renderer);
            }
        } else if (props.canvasSettings.hawkeyeMouseEvent.mouseFocused) {
            let mouseEvent = props.canvasSettings.hawkeyeMouseEvent;
            Animation.hawkeyeMouseOver(sketchData, p, mouseEvent, renderer);
        }

        props.canvasSettings.hawkeyeMouseEvent.mousePressed = false;
        props.canvasSettings.hawkeyeMouseEvent.mouseFocused = false;
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
            if (settingState === 0) {
                // return Animation.mousePressed(sketchData, p);
            }
        }

        p.mouseReleased = function () {
            if (settingState === 0 && shareSessionState === 0) {
                Animation.mouseReleased(sketchData, p);
            }
        }

        if (settingState === 0 && shareSessionState === 0) {

            sketchData.figs.forEach(fig => {
                let width = sketchData.canvasWidth;
                let height = sketchData.canvasHeight;

                if (fig.pos.x < 0) {
                    fig.pos.x = 20;
                }
                if (fig.pos.x > width) {
                    fig.pos.x = width - 20;
                }
                if (fig.pos.y < 0) {
                    fig.pos.y = 20;
                }
                if (fig.pos.y > height) {
                    fig.pos.y = height - 20;
                }
            });

            Animation.draw(sketchData, p);
            localStorage.setItem("savedFigs", JSON.stringify(sketchData.figs));

        }
    }
}

export default function Canvas(props) {
    const defaultMouseEvent: HawkeyeMouseEvent = {
        mousePressed: false,
        mouseFocused: false,
        mouseX: 0,
        mouseY: 0
    };

    const [hawkeyeMouseEvent, setHawkeyeMouseEvent] = useState(defaultMouseEvent);

    function gridClickedHandler(id) {
        let element = document.getElementById(id);
        let xpos = element.offsetLeft + (element.offsetWidth / 2);
        let ypos = element.offsetTop + (element.offsetHeight / 2);

        let mouseEvent = {
            mousePressed: true,
            mouseFocused: false,
            mouseX: xpos,
            mouseY: ypos
        };

        setHawkeyeMouseEvent(mouseEvent);
    }

    function mouseEnterHandler(id) {
        let element = document.getElementById(id);
        let xpos = element.offsetTop + (element.offsetHeight / 2);
        let ypos = element.offsetLeft + (element.offsetWidth / 2);
        
        let mouseEvent = {
            mousePressed: false,
            mouseFocused: true,
            mouseX: xpos,
            mouseY: ypos
        };

        setHawkeyeMouseEvent(mouseEvent);
    }

    let grid = []
    hawkeyeAccessGrid();
    function hawkeyeAccessGrid() {
        let numCells = 5 * 10; // height and width are 5%
        for (let i = 0; i < numCells; i++) {
            let idStr: string = "cell".concat(i.toString());
            grid.push(
                <a className="hawkeyeCell" id={idStr} key={idStr}
                    onClick={() => gridClickedHandler(idStr)}
                    onFocus={() => mouseEnterHandler(idStr)}
                    onMouseOver={() => mouseEnterHandler(idStr)}>
                </a>
            )
        }
    }

    props.canvasSettings.hawkeyeMouseEvent = hawkeyeMouseEvent;

    return (
        <div className="canvas-container" id="canvas">
            <P5Wrapper
                className="p5Wrapper"
                sketch={sketch}
                canvasSettings={props.canvasSettings} 
                syncInfo={props.syncInfo}/>

            { 
                props.canvasSettings.settingState === 0 && 
                props.canvasSettings.shareSessionState === 0 && 
                <div className="hawkeyeGrid">
                    { grid }
                </div>
            }
        </div>
    );
}