import './AnimationToolbar.css';
import { SelectedAnimation } from '../../Types/Figures';

import gravity from '../../Images/gravity.png';
import gravity2 from '../../Images/gravity-v2.png';
import radial from '../../Images/radial.png';
import radial2 from '../../Images/radial-v2.png';
import bubbles from '../../Images/bubbles.png';

export default function AnimationToolbar(props) 
{
    let wobblySwarmHighlight = (props.animationSelection === SelectedAnimation.WobblySwarm) ? "animation-selected" : "";
    let downwardGravityHighlight = (props.animationSelection === SelectedAnimation.DownwardGravity) ? "animation-selected" : "";
    let bubblePopHighlight = (props.animationSelection === SelectedAnimation.BubblePop) ? "animation-selected" : "";

    return (
        <div className="animation-toolbar-container">
            <div className={`animation-selection ${downwardGravityHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.DownwardGravity) }>
                 {/* onTouchEnd = { () => props.selectionHandler(SelectedAnimation.DownwardGravity) }> */}
                    <img className="animation-icon"
                         src={gravity2} 
                         alt="Downward Gravity"/>
            </div>

            <div className={`animation-selection ${wobblySwarmHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.WobblySwarm) }>
                 {/* onTouchEnd = { () => props.selectionHandler(SelectedAnimation.RadialForce) }> */}
                    <img className="animation-icon"
                         src={radial2} 
                         alt="Wobbly Swarm"/>
            </div>

            <div className={`animation-selection ${bubblePopHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.BubblePop) }>
                 {/* onTouchEnd = { () => props.selectionHandler(SelectedAnimation.WallBounce) }> */}
                    <img className="animation-icon"
                         src={bubbles} 
                         alt="Bubble Pop"/>
            </div>
        </div>
    );
}