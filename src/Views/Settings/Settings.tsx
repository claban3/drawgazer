import { useState } from "react";
import ColorCustomization from "../../Components/ColorCustomization/ColorCustomization";
import './Settings.css';
import '../../App.css';

import exit from '../../Images/exit.png';
import AnimationCustomization from "../../Components/AnimationCustomization/AnimationCustomization";

export default function Settings(props) {
    const settingStates = ["closed", "opening", "open", "closing"];
    const tabs = ["color-scheme", "animations", "sound"];
    const [tabSelection, setTabSelection] = useState("color-scheme")

    let colorSchemeUnderline = (tabSelection === tabs[0]) ? "tab-selection" : "";
    let animationsUnderline = (tabSelection === tabs[1]) ? "tab-selection" : "";

    function tabSelectionHandler(newTabSelection) {
        setTabSelection(newTabSelection)
    }

    function onAnimationEnd(event) {
        if(event.target.className.includes("opening")) 
            setTimeout(props.settingStateChangeHandler, 20);    
        else 
            props.settingStateChangeHandler();
    }

    return (
        <div className={"settings-container " + (settingStates[props.settingState]) }
             onAnimationEnd={onAnimationEnd} >

            <div className="settings-side-bar">
                <a  className={"options " + colorSchemeUnderline} 
                    id="color-scheme"
                    onClick={() => tabSelectionHandler(tabs[0])}>

                    Color Scheme
                </a>

                <a  className={"options " + animationsUnderline} 
                    id="animations"
                    onClick={() => tabSelectionHandler(tabs[1])}>

                    Animations
                </a>
            </div>

            { tabSelection === tabs[0] && 
                <ColorCustomization colorChangeHandler={props.colorChangeHandler}
                                    resetColors={props.resetColors}/>
            }

            { tabSelection === tabs[1] &&
                <AnimationCustomization animations={props.animations} 
                                        animationRemoveHandler={props.animationRemoveHandler} 
                                        animationAddHandler={props.animationAddHandler}/>
            }

            <a onClick={() => props.settingStateChangeHandler()}>
                <img className="settings-exit"
                    src={exit}
                    alt="exit settings"/>
            </a>
        </div>
    );  
}