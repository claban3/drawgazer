import './AnimationToolbar.css';
import { animationProperties, SelectedAnimation } from '../../Types/Figures';

export default function AnimationToolbar(props) 
{
     let highlight0 = props.animationSelection === props.animations["animation0"] && props.animations["animation0"] !== SelectedAnimation.None ? "animation-selected" : "";
     let highlight1 = props.animationSelection === props.animations["animation1"] && props.animations["animation1"] !== SelectedAnimation.None ? "animation-selected" : "";
     let highlight2 = props.animationSelection === props.animations["animation2"] && props.animations["animation2"] !== SelectedAnimation.None ? "animation-selected" : "";
    
     return (
          <div className="animation-toolbar-container">
               <div className={`animation-selection ${highlight0}`}
               onClick = { () => props.selectionHandler(props.animations["animation0"]) }>
                    {props.animations["animation0"] !== SelectedAnimation.None &&
                    <img className="animation-icon"
                    src={animationProperties(props.animations["animation0"])["image"]} 
                    alt={props.animations["animation0"]}/>
                    }
               </div>

               <div className={`animation-selection ${highlight1}`}
               onClick = { () => props.selectionHandler(props.animations["animation1"]) }>
                    {props.animations["animation1"] !== SelectedAnimation.None &&
                    <img className="animation-icon"
                    src={animationProperties(props.animations["animation1"])["image"]} 
                    alt={props.animations["animation1"]}/>
                    }
               </div>

               <div className={`animation-selection ${highlight2}`}
               onClick = { () => props.selectionHandler(props.animations["animation2"]) }>
                    {props.animations["animation2"] !== SelectedAnimation.None &&
                    <img className="animation-icon"
                    src={animationProperties(props.animations["animation2"])["image"]} 
                    alt={props.animations["animation2"]}/>
                    }
               </div>
          </div>
     );
}