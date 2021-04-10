import './App.css';
import Draw from './Views/Draw/Draw';
import Settings from './Views/Settings/Settings';
import ShareSession from './Views/ShareSession/ShareSession';
import { useEffect, useState } from 'react';
import { ColorSettings, SelectedAnimation } from './Types/Figures';
import { generateContrastColors } from '@adobe/leonardo-contrast-colors';
import { UIStateTypes } from './Types/UIStateTypes';

const defaultColors = {
    "--triangleColor": "#00429D",
    "--squareColor": "#96ffea",
    "--circleColor": "#ff005e",
    "--shapeButtonColor": "#ACABAB", 
    "--shapeButtonHover": "#767676",
    "--shapeButtonSelected": "#484848",
    "--animationButtonColor": "#ACABAB",
    "--animationButtonHover": "#767676",
    "--animationButtonSelected": "#484848",
}

const defaultAnimations = [
    SelectedAnimation.DownwardGravity,
    SelectedAnimation.WobblySwarm,
    SelectedAnimation.BubblePop,
];

function App() {
    const [draw, setDraw] = useState(true);
    const [settingState, setSettingState] = useState(UIStateTypes.Closed);
    const [shareSessionState, setShareSessionState] = useState(UIStateTypes.Closed);
    const [token, setToken] = useState('');

    const [newSession, setNewSession] = useState(true);
    const [colors, setColors] = useState(defaultColors); 
    const [resetColors, setResetColors] = useState(false);

    const [animations, setAnimations] = useState(defaultAnimations);

    useEffect(() => {
        if(newSession) {
            setNewSession(false);
            let savedColors = JSON.parse(localStorage.getItem("savedColors"));
            if(savedColors) {
                setColors(savedColors);
            }

            let savedAnimations = JSON.parse(localStorage.getItem("savedAnimations")); 
            if(savedAnimations) {
                setAnimations(savedAnimations);
            }
        }
        setCSSProperties();
    }, [newSession]);

    useEffect(() => {
        localStorage.setItem("savedColors", JSON.stringify(colors));
        setResetColors( !(JSON.stringify(colors) === JSON.stringify(defaultColors)) );
        setCSSProperties();
    }, [colors]);

    useEffect(() => {
        localStorage.setItem("savedAnimations", JSON.stringify(animations));
    }, [animations])


    function setCSSProperties() {
        document.documentElement.style.setProperty("--triangleColor", colors["--triangleColor"]);
        document.documentElement.style.setProperty("--squareColor", colors["--squareColor"]);
        document.documentElement.style.setProperty("--circleColor", colors["--circleColor"]);

        document.documentElement.style.setProperty("--shapeButtonColor", colors["--shapeButtonColor"]);
        document.documentElement.style.setProperty("--shapeButtonHover", colors["--shapeButtonHover"]);
        document.documentElement.style.setProperty("--shapeButtonSelected", colors["--shapeButtonSelected"]);

        document.documentElement.style.setProperty("--animationButtonColor", colors["--animationButtonColor"]);
        document.documentElement.style.setProperty("--animationButtonHover", colors["--animationButtonHover"]);
        document.documentElement.style.setProperty("--animationButtonSelected", colors["--animationButtonSelected"]);
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

    function submissionHandler() { }

    function animationAddHandler(anim: SelectedAnimation) {
        for (let i = 0; i < 3; i ++) {
            if (animations[i] === SelectedAnimation.None) {
                console.log("Adding animation"+i+" ("+SelectedAnimation[anim]+")");
                setAnimations(prevState=> (
                    {...prevState, [i]: anim}
                ));
                return; // Only set first unused animation slot
            }
        }
        console.log("animationAddHandler called with anim " + anim + " but no animation was set - all animations full?");
    }

    function animationRemoveHandler(idx: number) {
        console.log("Removing animation"+idx+" ("+animations[idx]+")");
        setAnimations(prevState=> (
            {...prevState, [idx]: SelectedAnimation.None}
        ));
    }

    function settingStateChangeHandler() {
        // Closed = 0
        // Opening = 1
        // Open = 2
        // Closing = 3
        setSettingState( (settingState + 1 ) % 4 );
    }

    function shareSessionStateChangeHandler() {
        // Closed = 0
        // Opening = 1
        // Open = 2
        // Closing = 3
        setShareSessionState( (shareSessionState + 1 ) % 4 );
    }

    let canvasColorSettings: ColorSettings = {
        background: "#FFFFFF",
        triangle: colors["--triangleColor"],
        rectangle: colors["--squareColor"],
        circle: colors["--circleColor"],
    };

    return (
        <>
        { (settingState!=UIStateTypes.Closed) && <Settings settingStateChangeHandler={settingStateChangeHandler} 
                                        settingState={settingState}
                                        colorChangeHandler={colorChangeHandler}
                                        resetColors={resetColors}
                                        animations={animations}
                                        animationRemoveHandler={animationRemoveHandler}
                                        animationAddHandler={animationAddHandler}/> }

        { (shareSessionState!=UIStateTypes.Closed) && <ShareSession shareSessionStateChangeHandler={shareSessionStateChangeHandler} 
                                                 shareSessionState={shareSessionState}
                                                 token= {token}
                                                 setToken = {setToken}
                                                 submissionHandler={submissionHandler}/> }

        { draw && <Draw colorSettings={canvasColorSettings}
                        animations={animations}
                        settingStateChangeHandler={settingStateChangeHandler}
                        settingState={settingState}
                        shareSessionStateChangeHandler={shareSessionStateChangeHandler}
                        shareSessionState={shareSessionState}/> }
        </>
    );
}

export default App;
