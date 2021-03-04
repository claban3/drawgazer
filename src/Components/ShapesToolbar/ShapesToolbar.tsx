import './ShapesToolbar.css';
import { SelectedShape } from '../../Types/Figures';

import triangle from '../../Images/triangle.png';
import rectangle from '../../Images/square.png';
import circle from '../../Images/circle.png';
// import freeDraw from '../../Images/free-draw.png';

export default function ShapesToolbar(props) 
{
    let triangleHighlight = (props.shapeSelection === SelectedShape.Triangle) ? "selected" : "";
    let rectangleHighlight = (props.shapeSelection === SelectedShape.Rectangle) ? "selected" : "";
    let circleHighlight = (props.shapeSelection === SelectedShape.Circle) ? "selected" : "";
    let freeDrawHighlight = (props.shapeSelection === SelectedShape.FreeDraw) ? "selected" : "";

    return (
        <div className="shape-toolbar-container">
            <div className={`shape-selection ${triangleHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedShape.Triangle) }
                 onTouchEnd = { () => props.selectionHandler(SelectedShape.Triangle) }>
                    <img className="shape-icon"
                         src={triangle} 
                         alt="Triangle"/>
            </div>

            <div className={`shape-selection ${rectangleHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedShape.Rectangle) }
                 onTouchEnd = { () => props.selectionHandler(SelectedShape.Rectangle) }>
                    <img className="shape-icon"
                         src={rectangle} 
                         alt="Rectangle"/>
            </div>

            <div className={`shape-selection ${circleHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedShape.Circle) }
                 onTouchEnd = { () => props.selectionHandler(SelectedShape.Circle) }>
                    <img className="shape-icon"
                         src={circle} 
                         alt="Circle"/>
            </div>

            {/* <div className={`shape-selection ${freeDrawHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedShape.FreeDraw) }
                 onTouchEnd = { () => props.selectionHandler(SelectedShape.FreeDraw) }>
                    <img className="shape-icon"
                         src={freeDraw} 
                         alt="Free Draw"/>
            </div> */}
        </div>
    );
}