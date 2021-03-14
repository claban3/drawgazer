import "./ColorCustomization.css";
import { useEffect, useState } from "react";
import { ChromePicker } from 'react-color';

const defaultColors = {
    "--triangleColor": "#FF0000",
    "--squareColor": "#2B3990",
    "--circleColor": "#008000",
    "--shapeButtonColor": "#4A4A4A", 
    "--shapeButtonHover": "#787878",
    "--shapeButtonSelected": "#AFAFAF",
    "--animationButtonColor": "#ACABAB",
    "--animationButtonHover": "#767676",
    "--animationButtonSelected": "#484848",
}

export default function ColorCustomization(props) {
    const [buttonSelection, setButtonSelection] = useState(null);
    const [pickerColor, setPickerColor] = useState("#FFFFFF");
    const buttons = ["--triangleColor", "--squareColor", "--circleColor", "--shapeButtonColor", "--animationButtonColor"]

    function colorPickerChangeHandler(color) {
        if(buttonSelection) {
            setPickerColor(color);
            props.colorChangeHandler(buttonSelection, color);
        }
    }

    function buttonSelectionHandler(newButtonSelection) {
        setButtonSelection(newButtonSelection);
        let buttonColor = document.documentElement.style.getPropertyValue(newButtonSelection);
        setPickerColor(buttonColor);
    }

    return (
        <div className="settings-content">

            <div className="color-picker-container">
                <ChromePicker
                    color={pickerColor}
                    onChange={colorPickerChangeHandler} />
                
                <div className="reset-container">
                    { props.resetColors === true &&
                        <div className="reset-color-button"
                            onClick={() => props.colorChangeHandler("reset")}>
                                reset default
                        </div> 
                    }
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
   ); 
}