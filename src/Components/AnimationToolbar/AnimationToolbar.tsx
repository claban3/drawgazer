import './AnimationToolbar.css';
import { SelectedAnimation } from '../../Types/Figures';

import gravity from '../../Images/gravity.png';
import gravity2 from '../../Images/gravity-v2.png';
import radial from '../../Images/radial.png';
import radial2 from '../../Images/radial-v2.png';

export default function AnimationToolbar(props) 
{
    let radialForceHighlight = (props.animationSelection === SelectedAnimation.RadialForce) ? "selected" : "";
    let downwardGravityHighlight = (props.animationSelection === SelectedAnimation.DownwardGravity) ? "selected" : "";
    let wallBounceHighlight = (props.animationSelection === SelectedAnimation.BubblePop) ? "selected" : "";

    return (
        <div className="animation-toolbar-container">
            <div className={`animation-selection ${downwardGravityHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.DownwardGravity) }
                 onTouchEnd = { () => props.selectionHandler(SelectedAnimation.DownwardGravity) }>
                    <img className="animation-icon"
                         src={gravity2} 
                         alt="Downward Gravity"/>
            </div>

            <div className={`animation-selection ${radialForceHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.RadialForce) }
                 onTouchEnd = { () => props.selectionHandler(SelectedAnimation.RadialForce) }>
                    <img className="animation-icon"
                         src={radial2} 
                         alt="Radial Gravity"/>
            </div>

            <div className={`animation-selection ${wallBounceHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.BubblePop) }
                 onTouchEnd = { () => props.selectionHandler(SelectedAnimation.BubblePop) }>
                    <img className="animation-icon"
                         src={radial} 
                         alt="Wall Bounce"/>
            </div>
        </div>
    );
}