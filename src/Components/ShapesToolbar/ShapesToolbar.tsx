import './ShapesToolbar.css';
import { SelectedShape } from '../../Types/Figures';


export default function ShapesToolbar(props) 
{
    let triangleHighlight = (props.shapeSelection === SelectedShape.Triangle) ? "shape-selected" : "";
    let rectangleHighlight = (props.shapeSelection === SelectedShape.Rectangle) ? "shape-selected" : "";
    let circleHighlight = (props.shapeSelection === SelectedShape.Circle) ? "shape-selected" : "";

    return (
        <div className="shape-toolbar-container">
            <div className={`shape-selection ${triangleHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedShape.Triangle) }>
                 {/* onTouchEnd = { () => props.selectionHandler(SelectedShape.Triangle)}> */}
                
                <svg className="shape-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.82 147.06">
                    <polygon className="triangle" id="triangle" points="84.91 3 2.6 145.56 167.22 145.56 84.91 3" stroke="#231f20" stroke-miterlimit="10" stroke-width="3"/>
                </svg>

            </div>

            <div className={`shape-selection ${rectangleHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedShape.Rectangle) }>
                 {/* onTouchEnd = { () => props.selectionHandler(SelectedShape.Rectangle) }> */}
                
                <svg className="shape-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147 147">
                    <rect className="square "id="square" x="1.5" y="1.5" width="144" height="144" stroke="#231f20" stroke-miterlimit="10" stroke-width="3"/>
                </svg>

            </div>

            <div className={`shape-selection ${circleHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedShape.Circle) }>
                 {/* onTouchEnd = { () => props.selectionHandler(SelectedShape.Circle) }> */}

                <svg className="shape-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147 147">
                    <circle className="circle" id="circle" cx="73.5" cy="73.5" r="72" stroke="#231f20" stroke-miterlimit="10" stroke-width="3"/>
                </svg>

            </div>

        </div>
    );
}