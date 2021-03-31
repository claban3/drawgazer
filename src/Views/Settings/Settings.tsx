import { useState } from "react";
import { ChromePicker } from 'react-color';
import ColorCustomization from "../../Components/ColorCustomization/ColorCustomization";
import './Settings.css';
import '../../App.css';

import exit from '../../Images/exit.png';
import AnimationCustomization from "../../Components/AnimationCustomization/AnimationCustomization";

export default function Settings(props) {
    const settingStates = ["closed", "opening", "open", "closing"];
    const tabs = ["color-scheme", "animations", "sound"];
    const buttons = ["--triangleColor", "--squareColor", "--circleColor", "--shapeButtonColor", "--animationButtonColor"]

    const [tabSelection, setTabSelection] = useState("color-scheme")
    const [buttonSelection, setButtonSelection] = useState(null);
    const [pickerColor, setPickerColor] = useState("#FFFFFF");

    const [originalColors, setOriginalColors] = useState(props.colors);

    let colorSchemeUnderline = (tabSelection === tabs[0]) ? "tab-selection" : "";
    let animationsUnderline = (tabSelection === tabs[1]) ? "tab-selection" : "";
    let soundUnderline = (tabSelection === tabs[2]) ? "tab-selection" : "";

    function tabSelectionHandler(newTabSelection) {
        setTabSelection(newTabSelection)
    }

    return (
        <div className={"settings-container " + (settingStates[props.settingState]) }
             onAnimationEnd={() => props.settingStateChangeHandler()} >

            <div className="settings-side-bar">
                <div className={"options " + colorSchemeUnderline} 
                     id="color-scheme"
                     onClick={() => tabSelectionHandler(tabs[0])}
                     onTouchEnd={() => tabSelectionHandler(tabs[0])}>

                    Color Scheme
                </div>

                <div className={"options " + animationsUnderline} 
                     id="animations"
                     onClick={() => tabSelectionHandler(tabs[1])}
                     onTouchEnd={() => tabSelectionHandler(tabs[1])}>

                    Animations
                </div>
            </div>

            { tabSelection === tabs[0] && 
                <ColorCustomization colorChangeHandler={props.colorChangeHandler}
                                    resetColors={props.resetColors}/>
            }

            { tabSelection === tabs[1] &&
                <AnimationCustomization animations={props.animations} animationRemoveHandler={props.animationRemoveHandler} animationAddHandler={props.animationAddHandler}/>
            }

            <img className="settings-exit"
                 src={exit}
                 alt="exit settings"
                 onClick={() => props.settingStateChangeHandler()}
                 onTouchEnd={() => props.settingStateChangeHandler()}/>
        </div>
    );  
}