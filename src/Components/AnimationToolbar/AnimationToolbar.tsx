import './AnimationToolbar.css';
import { SelectedAnimation } from '../../Types/Figures';

import radial from '../../Images/radial-v2.png';
import gravity from '../../Images/gravity-v2.png';

export default function AnimationToolbar(props) 
{
    let radialForceHighlight = (props.animationSelection === SelectedAnimation.RadialForce) ? "selected" : "";
    let downwardGravityHighlight = (props.animationSelection === SelectedAnimation.DownwardGravity) ? "selected" : "";

    return (
        <div className="toolbar-container">
            <div className={`animation-selection ${downwardGravityHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.DownwardGravity) }
                 onTouchEnd = { () => props.selectionHandler(SelectedAnimation.DownwardGravity) }>
                    <img className="animation-icon"
                         src={gravity} 
                         alt="Downward Gravity"/>
            </div>

            <div className={`animation-selection ${radialForceHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.RadialForce) }
                 onTouchEnd = { () => props.selectionHandler(SelectedAnimation.RadialForce) }>
                    <img className="animation-icon"
                         src={radial} 
                         alt="Radial Gravity"/>
            </div>
        </div>
    );
}