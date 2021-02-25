import './AnimationToolbar.css';
import { SelectedAnimation } from '../../Types/Figures';

import radial from '../../Images/radial.png';
import gravity from '../../Images/gravity.png';
import radial2 from '../../Images/radial-v2.png';

export default function AnimationToolbar(props) 
{
    let radialForceHighlight = (props.animationSelection === SelectedAnimation.RadialForce) ? "selected" : "";
    let downwardGravityHighlight = (props.animationSelection === SelectedAnimation.DownwardGravity) ? "selected" : "";
    let wallBounceHighlight = (props.animationSelection === SelectedAnimation.WallBounce) ? "selected" : "";

    return (
        <div className="toolbar-container">
            <div className={`animation-selection ${radialForceHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.RadialForce) }>
                    <img className="animation-icon"
                         src={radial} 
                         height="100px"
                         alt=""/>
            </div>

            <div className={`animation-selection ${downwardGravityHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.DownwardGravity) }>
                    <img className="animation-icon"
                         src={gravity} 
                         height="100px"
                         alt=""/>
            </div>

            <div className={`animation-selection ${wallBounceHighlight}`}
                 onClick = { () => props.selectionHandler(SelectedAnimation.WallBounce) }>
                    <img className="animation-icon"
                         src={radial2} 
                         height="100px"
                         alt=""/>
            </div>
        </div>
    );
}