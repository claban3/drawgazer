import './AnimationToolbar.css';
import { SelectedAnimation } from '../../Types/Figures';
import { useEffect, useState } from "react";
import gravity from '../../Images/gravity.png';
import gravity2 from '../../Images/gravity-v2.png';
import radial from '../../Images/radial.png';
import radial2 from '../../Images/radial-v2.png';
import bubbles from '../../Images/bubbles.png';
import draggedOut from '../../Images/draggedout.png';
import draggedPainting from '../../Images/draggedPainting.png';
import freeDraw from '../../Images/free-draw.png';

function animationToString(selectedAnimation: SelectedAnimation) {
     switch(selectedAnimation) {
          case SelectedAnimation.WobblySwarm: return "radial2";
          case SelectedAnimation.DownwardGravity: return "gravity";
          case SelectedAnimation.WallBounce: return "freeDraw";
          case SelectedAnimation.DraggedOut: return "draggedOut";
          case SelectedAnimation.BubblePop: return "bubbles";
          case SelectedAnimation.Stack: return "gravity2";
          case SelectedAnimation.RadialForce: return "radial";
          case SelectedAnimation.DraggedPainting: return "draggedPainting";
          case SelectedAnimation.None: return "none";
          default: return "";
     }
}

function stringToAnimation(anim: string) {
     switch(anim) {
          case "radial2": return SelectedAnimation.WobblySwarm;
          case "gravity": return SelectedAnimation.DownwardGravity;
          case "freeDraw": return SelectedAnimation.WallBounce;
          case "draggedOut": return SelectedAnimation.DraggedOut;
          case "bubbles": return SelectedAnimation.BubblePop;
          case "gravity2": return SelectedAnimation.Stack;
          case "radial": return SelectedAnimation.RadialForce;
          case "draggedPainting": return SelectedAnimation.DraggedPainting;
          case "none": return SelectedAnimation.None;
          default: return SelectedAnimation.None;
     }
}

export default function AnimationToolbar(props) 
{
     let highlight0 = animationToString(props.animationSelection) === props.animations["animation0"] && props.animationSelection !== SelectedAnimation.None ? "animation-selected" : "none";
     let highlight1 = animationToString(props.animationSelection) === props.animations["animation1"] && props.animationSelection !== SelectedAnimation.None ? "animation-selected" : "none";
     let highlight2 = animationToString(props.animationSelection) === props.animations["animation2"] && props.animationSelection !== SelectedAnimation.None ? "animation-selected" : "none";

     // console.log(animationToString(props.animationSelection), props.animations["animation0"]);
//     let wobblySwarmHighlight = (props.animationSelection === SelectedAnimation.WobblySwarm) ? "animation-selected" : "";
//     let downwardGravityHighlight = (props.animationSelection === SelectedAnimation.DownwardGravity) ? "animation-selected" : "";
//     let bubblePopHighlight = (props.animationSelection === SelectedAnimation.BubblePop) ? "animation-selected" : "";
//     let draggedPaintingHighlight = (props.animationSelection === SelectedAnimation.DraggedPainting) ? "animation-selected" : "";
//     let draggedOutHighlight = (props.animationSelection === SelectedAnimation.DraggedOut) ? "animation-selected" : "";

     let animImages = {
          "gravity": gravity,
          "gravity2": gravity2,
          "radial": radial,
          "radial2": radial2,
          "bubbles": bubbles,
          "draggedOut": draggedOut,
          "draggedPainting": draggedPainting,
          "freeDraw": freeDraw,
          "none": "",
          "": "",
     }

     console.log("!",animImages[props.animations["animation0"]]);
    
     return (
          <div className="animation-toolbar-container">
               <div className={`animation-selection ${highlight0}`}
               onClick = { () => props.selectionHandler(stringToAnimation(props.animations["animation0"])) }>
                    {props.animations["animation0"] != "none" &&
                    <img className="animation-icon"
                    src={animImages[props.animations["animation0"]]} 
                    alt={props.animations["animation0"]}/>
                    }
               </div>

               <div className={`animation-selection ${highlight1}`}
               onClick = { () => props.selectionHandler(stringToAnimation(props.animations["animation1"])) }>
                    {props.animations["animation1"] != "none" &&
                    <img className="animation-icon"
                    src={animImages[props.animations["animation1"]]} 
                    alt={props.animations["animation1"]}/>
                    }
               </div>

               <div className={`animation-selection ${highlight2}`}
               onClick = { () => props.selectionHandler(stringToAnimation(props.animations["animation2"])) }>
                    {props.animations["animation2"] != "none" &&
                    <img className="animation-icon"
                    src={animImages[props.animations["animation2"]]} 
                    alt={props.animations["animation2"]}/>
                    }
               </div>
          </div>
     );
}