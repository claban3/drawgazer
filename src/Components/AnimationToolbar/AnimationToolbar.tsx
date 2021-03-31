import './AnimationToolbar.css';
import { animationProperties, SelectedAnimation } from '../../Types/Figures';

export default function AnimationToolbar(props) 
{
     let highlight0 = props.animationSelection === props.animations[0] && props.animations[0] !== SelectedAnimation.None ? "animation-selected" : "";
     let highlight1 = props.animationSelection === props.animations[1] && props.animations[1] !== SelectedAnimation.None ? "animation-selected" : "";
     let highlight2 = props.animationSelection === props.animations[2] && props.animations[2] !== SelectedAnimation.None ? "animation-selected" : "";
    
     return (
          <div className="animation-toolbar-container">
               <div className={`animation-selection ${highlight0}`}
               onClick = { () => props.selectionHandler(props.animations[0]) }>
                    {props.animations[0] !== SelectedAnimation.None &&
                    <img className="animation-icon"
                    src={animationProperties(props.animations[0])["image"]} 
                    alt={props.animations[0]}/>
                    }
               </div>

               <div className={`animation-selection ${highlight1}`}
               onClick = { () => props.selectionHandler(props.animations[1]) }>
                    {props.animations[1] !== SelectedAnimation.None &&
                    <img className="animation-icon"
                    src={animationProperties(props.animations[1])["image"]} 
                    alt={props.animations[1]}/>
                    }
               </div>

               <div className={`animation-selection ${highlight2}`}
               onClick = { () => props.selectionHandler(props.animations[2]) }>
                    {props.animations[2] !== SelectedAnimation.None &&
                    <img className="animation-icon"
                    src={animationProperties(props.animations[2])["image"]} 
                    alt={props.animations[2]}/>
                    }
               </div>
          </div>
     );
}