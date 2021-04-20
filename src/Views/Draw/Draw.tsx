import { useEffect, useState } from "react";
import './Draw.css';
import Canvas from '../../Components/Canvas/Canvas';
import ShapesToolbar from '../../Components/ShapesToolbar/ShapesToolbar';
import AnimationToolbar from '../../Components/AnimationToolbar/AnimationToolbar';
import Options from '../../Components/Options/Options';
import { CanvasSettings, SelectedAnimation, SelectedShape } from "../../Types/Figures";
import { RecordingStates, nextRecordingState } from '../../Types/UITypes';
import { SyncEvent, SyncEvents, SyncInfo } from "../../Types/SyncEvents";


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

export default function Draw(props){
    const [shapeSelection, setShapeSelection] = useState(SelectedShape.None);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    const [clearCanvas, setClearCanvas] = useState(false);
    const [saveCanvas, setSaveCanvas] = useState(false);
    const [recordCanvasState, setRecordCanvasState] = useState(RecordingStates.Idle);

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (props.animationSelection !== SelectedAnimation.None && 
            props.animations[0] !== props.animationSelection && 
            props.animations[1] !== props.animationSelection && 
            props.animations[2] !== props.animationSelection) {
                props.animationSelectionHandler(SelectedAnimation.None, true);
            }
    }, [props.animations]);

    useEffect(() => {
        if(clearCanvas && syncInfo.synced) {
            let clearFiguresEvent : SyncEvent = {
                srcId: syncInfo.uniqueId,
                destId: syncInfo.syncedWith,
                eventType: SyncEvents.SetFigures,
                figs: []
            }
            syncInfo.sendSyncEvent(clearFiguresEvent);
        }
    }, [clearCanvas])

    function shapeSelectionHandler(selection : SelectedShape) {
        if (shapeSelection === selection) setShapeSelection(SelectedShape.None);
        else setShapeSelection(selection);
    }
 
    function setClearCanvasHandler() {
        setClearCanvas(!clearCanvas);
    }

    function setSaveCanvasHandler() {
        setSaveCanvas(!saveCanvas);
    }

    function setRecordCanvasHandler(reset) {
        if(reset) {
            setRecordCanvasState(RecordingStates.Idle);
        } 
        else {
            setRecordCanvasState(nextRecordingState(recordCanvasState));
        }
    }
    
    let canvasSettings: CanvasSettings = {
      selectedFigure: shapeSelection,
      selectedAnimation: props.animationSelection,
      colorSettings: props.colorSettings,
      reset: clearCanvas,
      save: saveCanvas,
      record: recordCanvasState === RecordingStates.Recording,
      resetInParent: setClearCanvasHandler,
      shareSessionState: props.shareSessionState,
      saveInParent: setSaveCanvasHandler,
      recordInParent: setRecordCanvasHandler, 
      settingState: props.settingState
    };

    let syncInfo : SyncInfo = {
        synced: !(props.syncedWith === null),
        uniqueId: props.uniqueId,
        syncedWith: props.syncedWith,
        syncEvents: props.syncEvents,
        popSyncEvent: props.popSyncEvent,
        sendSyncEvent: props.sendSyncEvent,
    };
    
    // TODO: pull this out to the parent: App.tsx
    if(windowDimensions.height > windowDimensions.width) return ( 
        <h1 id="msg">
            Please rotate your device to landscape orientation 
            <br/>
            OR 
            <br/>
            Increase the size of your browser
        </h1>
    );
    else return (
        <div className="canvas-content">
            <ShapesToolbar      shapeSelection={shapeSelection}
                                selectionHandler={shapeSelectionHandler}/>

            <Canvas canvasSettings={canvasSettings}
                    syncInfo={syncInfo}/>
            
            <Options settingStateChangeHandler={props.settingStateChangeHandler}
                     shareSessionStateChangeHandler={props.shareSessionStateChangeHandler}
                     clearCanvas={setClearCanvasHandler}
                     saveCanvas={setSaveCanvasHandler}
                     recordCanvas={setRecordCanvasHandler}
                     recordCanvasState={recordCanvasState}/>

            <AnimationToolbar   animationSelection={props.animationSelection}
                                selectionHandler={props.animationSelectionHandler}
                                animations={props.animations}/>
        </div>
    );
}