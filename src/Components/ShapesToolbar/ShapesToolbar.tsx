import './ShapesToolbar.css';
import { SelectedShape } from '../../Types/Figures';

export default function ShapesToolbar(props) 
{ 
    return (
        <div className="toolbar-container">
            <div className="shape-selection triangle"
                 onClick = { () => props.selectionHandler(SelectedShape.Triangle) }>
                    Triangle
            </div>

            <div className="shape-selection rectangle"
                 onClick = { () => props.selectionHandler(SelectedShape.Rectangle) }>
                    Square
            </div>

            <div className="shape-selection circle"
                 onClick = { () => props.selectionHandler(SelectedShape.Circle) }>
                    Circle
            </div>

            <div className="shape-selection free-draw">
                    Free Draw
            </div>
        </div>
    );
}