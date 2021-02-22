// import React, { useState } from "react";
// import './Draw.css';
// import Canvas from '../../Components/Canvas/Canvas';
// import ShapesToolbar from '../../Components/ShapesToolbar/ShapesToolbar';
// import { CanvasSettings, SelectedAnimation, SelectedShape } from "../../Types/Figures";

// export default function Draw(){
//     const [shapeSelection, setShapeSelection] = useState(SelectedShape.None);

//     function shapeSelectionHandler(selection : SelectedShape) {
//         if(shapeSelection === selection) setShapeSelection(SelectedShape.None);
//         else setShapeSelection(selection);
//     }

//     let canvasSettings: CanvasSettings = {
//       selectedFigure: shapeSelection,
//       selectedAnimation: SelectedAnimation.None,
//       reset: false
//     };
    
//     return (
//       <div>
//         <h1> Drawing Container </h1>
//         <ShapesToolbar  shapeSelection={shapeSelection}
//                         selectionHandler={shapeSelectionHandler} />
//         <Canvas canvasSettings={canvasSettings}/>
//      </div>
//     );  
//     // Render Toolbar and canvas component
// }