import { useState } from "react";
import { ChromePicker } from 'react-color';
import './Settings.css';
import '../../App.css';

import exit from '../../Images/exit.png';

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

    function buttonSelectionHandler(newButtonSelection) {
        setButtonSelection(newButtonSelection);
        let buttonColor = document.documentElement.style.getPropertyValue(newButtonSelection);
        setPickerColor(buttonColor);
    }

    function colorChangeHandler(color) {
        if(buttonSelection) {
            props.colorChangeHandler(buttonSelection, color);
            setPickerColor(color);
        }
    }

    function resetDefaulColor() {
        props.colorChangeHandler('reset');

    }

    function saveColorChanges() {
        setOriginalColors(props.colors);
    }

    function cancelColorChanges() {
        console.log("cancel");
        props.colorChangeHandler('cancel', originalColors)
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

                <div className={"options " + soundUnderline} 
                     id="sound"
                     onClick={() => tabSelectionHandler(tabs[2])}
                     onTouchEnd={() => tabSelectionHandler(tabs[2])}>
                    Sound
                </div>
            </div>

            { tabSelection === tabs[0] && 
                <div className="settings-content">

                    <div className="color-picker-container">
                        <ChromePicker
                            color={pickerColor}
                            onChange={colorChangeHandler} />

                        <div className="save-cancel-reset-buttons">
                            <div className="save-color"
                                 onClick={() => saveColorChanges()}>
                                     save
                            </div>

                            <div className="cancel-color"
                                 onClick={() => cancelColorChanges()}>
                                     cancel
                            </div>

                            <div className="reset-color"
                                 onClick={() => resetDefaulColor()}>
                                     reset
                            </div>
                        </div>
                    </div>

                    <div className="buttons-container">
                        <div className="buttons-row one">

                            <svg  className="shape-icon-settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 169.82 147.06"
                                onClick={() => buttonSelectionHandler(buttons[0])}
                                onTouchEnd={() => buttonSelectionHandler(buttons[0])}>

                                <polygon className="triangle "id="triangle" points="84.91 3 2.6 145.56 167.22 145.56 84.91 3" stroke="#231f20" stroke-miterlimit="10" stroke-width="3"/>
                            </svg>


                            <svg className="shape-icon-settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147 147"
                                onClick={() => buttonSelectionHandler(buttons[1])}
                                onTouchEnd={() => buttonSelectionHandler(buttons[1])}>
                    
                                <rect className="square" id="square" x="1.5" y="1.5" width="144" height="144" stroke="#231f20" stroke-miterlimit="10" stroke-width="3"/>
                            </svg>

                                
                            <svg className="shape-icon-settings" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 147 147"
                                onClick={() => buttonSelectionHandler(buttons[2])}
                                onTouchEnd={() => buttonSelectionHandler(buttons[2])}>

                                <circle className="circle" id="circle" cx="73.5" cy="73.5" r="72" stroke="#231f20" stroke-miterlimit="10" stroke-width="3"/>
                            </svg>

                        </div>

                        <div className="buttons-row two">
                            <div className="shape-button"
                                onClick={() => buttonSelectionHandler(buttons[3])}
                                onTouchEnd={() => buttonSelectionHandler(buttons[3])}>
                                    Shape
                            </div>

                            <div className="animation-button"
                                onClick={() => buttonSelectionHandler(buttons[4])}
                                onTouchEnd={() => buttonSelectionHandler(buttons[4])}>
                                    Animation
                            </div>
                        </div>
                    </div>
                </div> 
            }

            { tabSelection === tabs[1] &&
                <div className="settings-content">
                    {/* TODO: Animations Tab */}
                </div>
            }

            { tabSelection === tabs[2] &&
                <div className="settings-content">
                    {/* TODO: Sound Tab */}
                </div>
            }

            <img className="settings-exit"
                 src={exit}
                 alt="exit settings"
                 onClick={() => props.settingStateChangeHandler()}
                 onTouchEnd={() => props.settingStateChangeHandler()}/>
        </div>
    );  
}