import './AnimationToolbar.css';
import { SelectedAnimation } from '../../Types/Figures';

import gravity from '../../Images/gravity.png';
import gravity2 from '../../Images/gravity-v2.png';
import radial from '../../Images/radial.png';
import radial2 from '../../Images/radial-v2.png';
import bubbles from '../../Images/bubbles.png';
import draggedout from '../../Images/draggedout.png';
import draggedPainting from '../../Images/draggedPainting.png';
import fillScreenWithFigures from '../../Images/fillScreenWithShapes.png';
import drumLoop from '../../Images/Drumloop.png';

export default function AnimationToolbar(props) 
{
    let wobblySwarmHighlight = (props.animationSelection === SelectedAnimation.WobblySwarm) ? "animation-selected" : "";
    let downwardGravityHighlight = (props.animationSelection === SelectedAnimation.DownwardGravity) ? "animation-selected" : "";
    let bubblePopHighlight = (props.animationSelection === SelectedAnimation.BubblePop) ? "animation-selected" : "";
    let draggedPaintingHighlight = (props.animationSelection === SelectedAnimation.DraggedPainting) ? "animation-selected" : "";
    let draggedOutHighlight = (props.animationSelection === SelectedAnimation.DraggedOut) ? "animation-selected" : "";
    let fillScreenHighlight = (props.animationSelection === SelectedAnimation.FillScreenWithFigures) ? "animation-selected" : "";
    let drumLoopHighlight = (props.animationSelection === SelectedAnimation.DrumLoop) ? "animation-selected" : "";

    return (
        <div className="animation-toolbar-container">
            <div className={`animation-selection ${downwardGravityHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.DownwardGravity) }>
                    <img className="animation-icon"
                         src={gravity2} 
                         alt="Downward Gravity"/>
            </div>

            <div className={`animation-selection ${wobblySwarmHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.WobblySwarm) }>
                    <img className="animation-icon"
                         src={radial2} 
                         alt="Wobbly Swarm"/>
            </div>

            <div className={`animation-selection ${bubblePopHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.BubblePop) }>
                    <img className="animation-icon"
                         src={bubbles} 
                         alt="Bubble Pop"/>
            </div>

            <div className={`animation-selection ${draggedOutHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.DraggedOut) }>
                    <img className="animation-icon"
                         src={draggedout} 
                         alt="Dragged Out"/>
            </div>

            <div className={`animation-selection ${draggedPaintingHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.DraggedPainting) }>
                    <img className="animation-icon"
                         src={draggedPainting} 
                         alt="Dragged Painting"/>
            </div>

            <div className={`animation-selection ${fillScreenHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.FillScreenWithFigures) }>
                    <img className="animation-icon"
                         src={fillScreenWithFigures} 
                         alt="Fill Screen with Shapes"/>
            </div>

            <div className={`animation-selection ${drumLoopHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.DrumLoop) }>
                    <img className="animation-icon"
                         src={drumLoop} 
                         alt="Fill Screen with Shapes"/>
            </div>
        </div>
    );
}