import React, { useEffect, useState } from "react";
import { BrowserView, isBrowser, isMobile, withOrientationChange } from "react-device-detect";
import './Draw.css';
import Canvas from '../../Components/Canvas/Canvas';
import ShapesToolbar from '../../Components/ShapesToolbar/ShapesToolbar';
import AnimationToolbar from '../../Components/AnimationToolbar/AnimationToolbar';
import { CanvasSettings, SelectedAnimation, SelectedShape } from "../../Types/Figures";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}

export default function Draw(){
    const [shapeSelection, setShapeSelection] = useState(SelectedShape.None);
    const [animationSelection, setAnimationSelection] = useState(SelectedAnimation.None);
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

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

    let canvasSettings: CanvasSettings = {
      selectedFigure: shapeSelection,
      selectedAnimation: animationSelection,
      reset: false
    };
    
    
    if(isBrowser) return (
        <div className="draw-container">
            <ShapesToolbar  shapeSelection={shapeSelection}
                    selectionHandler={shapeSelectionHandler} />
            <Canvas canvasSettings={canvasSettings}/>
            <AnimationToolbar  animationSelection={animationSelection}
                            selectionHandler={animationSelectionHandler} />
        </div>
    );
    else {
        if(windowDimensions.width > windowDimensions.height) return (
            <div className="draw-container">
                <ShapesToolbar  shapeSelection={shapeSelection}
                        selectionHandler={shapeSelectionHandler} />
                <Canvas canvasSettings={canvasSettings}/>
                <AnimationToolbar  animationSelection={animationSelection}
                            selectionHandler={animationSelectionHandler} />
            </div> 
        );
        else return ( 

            <h1>
                Please rotate your device to landscape orientation 
                <br/>
                OR 
                <br/>
                Increase the size of your browser
            </h1>
        );
    }
}