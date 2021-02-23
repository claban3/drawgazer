import React, { useState } from "react";
import './Draw.css';
import Canvas from '../../Components/Canvas/Canvas';
import ShapesToolbar from '../../Components/ShapesToolbar/ShapesToolbar';
import AnimationToolbar from '../../Components/AnimationToolbar/AnimationToolbar';
import { CanvasSettings, SelectedAnimation, SelectedShape } from "../../Types/Figures";

export default function Draw(){
    const [shapeSelection, setShapeSelection] = useState(SelectedShape.None);
    const [animationSelection, setAnimationSelection] = useState(SelectedAnimation.None);

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
    
    return (
        <div className="draw-container">
            <ShapesToolbar  shapeSelection={shapeSelection}
                            selectionHandler={shapeSelectionHandler} />
            <Canvas canvasSettings={canvasSettings}/>
            <AnimationToolbar  animationSelection={animationSelection}
                            selectionHandler={animationSelectionHandler} />
        </div>
    );  
    // Render Toolbar and canvas component
}