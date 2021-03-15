import './App.css';
import Draw from './Views/Draw/Draw';
import Settings from './Views/Settings/Settings';
import { useEffect, useState } from 'react';
import { ShapeColors } from './Types/Figures';
import { generateContrastColors } from '@adobe/leonardo-contrast-colors';

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

function App() {
    const [draw, setDraw] = useState(true);
    const [settingState, setSettingState] = useState(0);

    const [newSession, setNewSession] = useState(true);
    const [colors, setColors] = useState(defaultColors); 
    const [resetColors, setResetColors] = useState(false);

    useEffect(() => {
        if(newSession) {
            setNewSession(false);
            let savedColors = JSON.parse(localStorage.getItem("savedColors"));
            if(savedColors) {
                setColors(savedColors);
            }
        }
        setCSSProperties();
    }, [newSession]);

    useEffect(() => {
        localStorage.setItem("savedColors", JSON.stringify(colors));
        setResetColors( !(JSON.stringify(colors) === JSON.stringify(defaultColors)) );
        setCSSProperties();
    }, [colors]);


    function setCSSProperties() {
        document.documentElement.style.setProperty("--triangleColor", colors["--triangleColor"]);
        document.documentElement.style.setProperty("--squareColor", colors["--squareColor"]);
        document.documentElement.style.setProperty("--circleColor", colors["--circleColor"]);

        document.documentElement.style.setProperty("--shapeButtonColor", colors["--shapeButtonColor"])
        document.documentElement.style.setProperty("--shapeButtonHover", colors["--shapeButtonHover"])
        document.documentElement.style.setProperty("--shapeButtonSelected", colors["--shapeButtonSelected"])

        document.documentElement.style.setProperty("--animationButtonColor", colors["--animationButtonColor"])
        document.documentElement.style.setProperty("--animationButtonHover", colors["--animationButtonHover"])
        document.documentElement.style.setProperty("--animationButtonSelected", colors["--animationButtonSelected"])
    }

    function colorChangeHandler(id : string, color : any) { 
        if(id === "reset") {
            setColors(defaultColors);
        }
        else if(id === "--shapeButtonColor" || id === "--animationButtonColor")
        {               
            let contrastColors = generateContrastColors({ colorKeys: [color.hex], base: color.hex, ratios: [2,4], colorspace: "RGB"});

            if(id === "--shapeButtonColor") {
                setColors(prevState => (
                    {...prevState, [id]: color.hex, "--shapeButtonHover": contrastColors[0], "--shapeButtonSelected": contrastColors[1]}
                ));
            }
            else {
                setColors(prevState => (
                    {...prevState, [id]: color.hex, "--animationButtonHover": contrastColors[0], "--animationButtonSelected": contrastColors[1]}
                ));
            }
        }
        else {
            setColors(prevState => (
                {...prevState, [id]: color.hex}
            ));
        }
    }

    function settingStateChangeHandler() {
        // 0: Closed
        // 1: Opening
        // 2: Open
        // 3: Closing
        setSettingState( (settingState + 1 ) % 4 );
    }

    let canvasColorSettings: ShapeColors = {
        triangle: document.documentElement.style.getPropertyValue("--triangleColor"),
        rectangle: document.documentElement.style.getPropertyValue("--squareColor"),
        circle: document.documentElement.style.getPropertyValue("--circleColor"),
    };

    return (
        <>
        { (settingState>0) && <Settings settingStateChangeHandler={settingStateChangeHandler} 
                                        settingState={settingState}
                                        colorChangeHandler={colorChangeHandler}
                                        resetColors={resetColors}/> }

        { draw && <Draw colorSettings={canvasColorSettings} settingStateChangeHandler={settingStateChangeHandler} settingState={settingState}/> }
        </>
    );
}

export default App;
