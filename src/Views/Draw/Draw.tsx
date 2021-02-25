import React, { useState } from "react";
import './Draw.css';
import Canvas from '../../Components/Canvas/Canvas';
import ShapesToolbar from '../../Components/ShapesToolbar/ShapesToolbar';
import { CanvasSettings, SelectedAnimation, SelectedShape } from "../../Types/Figures";
import HeaderToolbar from '../../Components/HeaderToolbar/Header';

export default function Draw(props) {
    const [shapeSelection, setShapeSelection] = useState(SelectedShape.None);
    const [clearCanvas, setClearCanvas] = useState(false);

    function shapeSelectionHandler(selection : SelectedShape) {
        if(shapeSelection === selection) setShapeSelection(SelectedShape.None);
        else setShapeSelection(selection);
    }

    function setClearCanvasHandler() {
        setClearCanvas(!clearCanvas);
    }
    
    let canvasSettings: CanvasSettings = {
      selectedFigure: shapeSelection,
      selectedAnimation: SelectedAnimation.None,
      reset: clearCanvas,
      resetInParent: setClearCanvasHandler,
    };
    
    return (
        <div>
            <HeaderToolbar resetCanvas={setClearCanvasHandler}/>        
        
            <div className="draw-container">
                <ShapesToolbar  shapeSelection={shapeSelection}
                                selectionHandler={shapeSelectionHandler} />
                <Canvas canvasSettings={canvasSettings}/>
            </div>
        </div>
    );  
    // Render Toolbar and canvas component
}