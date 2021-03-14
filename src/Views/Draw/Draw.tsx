import { useEffect, useState } from "react";
import './Draw.css';
import Canvas from '../../Components/Canvas/Canvas';
import ShapesToolbar from '../../Components/ShapesToolbar/ShapesToolbar';
import AnimationToolbar from '../../Components/AnimationToolbar/AnimationToolbar';
import Options from '../../Components/Options/Options';
import { CanvasSettings, SelectedAnimation, SelectedShape, ShapeColors } from "../../Types/Figures";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

export default function Draw(props){
    const [shapeSelection, setShapeSelection] = useState(SelectedShape.None);
    const [animationSelection, setAnimationSelection] = useState(SelectedAnimation.None);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    const [clearCanvas, setClearCanvas] = useState(false);
    // const [colorSettings, setColorSettings] = useState(defaultColorSettings);

    useEffect(() => {
        function handleResize() {
        setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    function shapeSelectionHandler(selection : SelectedShape) {
        if(shapeSelection === selection) setShapeSelection(SelectedShape.None);
        else setShapeSelection(selection);
    }

    function animationSelectionHandler(selection : SelectedAnimation) {
        if(animationSelection === selection) setAnimationSelection(SelectedAnimation.None);
        else setAnimationSelection(selection);
    }
    
    function setClearCanvasHandler() {
        setClearCanvas(!clearCanvas);
    }
    
    let canvasSettings: CanvasSettings = {
      selectedFigure: shapeSelection,
      selectedAnimation: animationSelection,
      colorSettings: props.colorSettings,
      reset: clearCanvas,
      resetInParent: setClearCanvasHandler,
      settingState: props.settingState
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

            <Canvas canvasSettings={canvasSettings}/>
            <Options settingStateChangeHandler={props.settingStateChangeHandler} clearCanvas={setClearCanvasHandler}/>

            <AnimationToolbar   animationSelection={animationSelection}
                                selectionHandler={animationSelectionHandler}/>
        </div>
    );
}