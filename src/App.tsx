import './App.css';
import Draw from './Views/Draw/Draw';
import Settings from './Views/Settings/Settings';
import ShareSession from './Views/ShareSession/ShareSession';
import JoinRequest from './Views/JoinRequest/JoinRequest';
import { useEffect, useState } from 'react';
import { ColorSettings } from './Types/Figures';
import { generateContrastColors } from '@adobe/leonardo-contrast-colors';

import { io } from "socket.io-client";

const defaultColors = {
    "--triangleColor": "#00429D",
    "--squareColor": "#96ffea",
    "--circleColor": "#ff005e",
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
    const [shareSessionState, setShareSessionState] = useState(0);
    const [joinRequestState, setJoinRequestState] = useState(0);
    const [token, setToken] = useState('');

    const [newSession, setNewSession] = useState(true);
    const [colors, setColors] = useState(defaultColors); 
    const [resetColors, setResetColors] = useState(false);
    const [uniqueId, setUniqueId] = useState(null);
    // var socket;
    const socket = io("http://localhost:8000");
    
    useEffect(() => {
        socket.on("connect", () => {console.log("Connected with sever");});
        socket.on("uuid", (uuid) => {setUniqueId(uuid); console.log("new uuid: " + uuid);});
        socket.on("shareCanvasRequest", (data) => shareCanvasRequestHandler(data));
    },[]);

    function shareCanvasRequestHandler(data) {
        console.log("Received request from " + data.src + " to share canvas");
        // Show popup to accept/decline share canvas request
        // On accept/decline: 
            // socket.emit("shareCanvasResponse", "accept/decline");

        // joinRequestStateChangeHandler();
        // joinRequestStateChangeHandler();
    }
    
    function shareCanvasSubmissionHandler(friendId) {
        let requestData = {
            srcId : uniqueId,
            destId : friendId
        }
        console.log("Requesting sync with " + friendId);
        socket.emit("initiateShareCanvas", requestData, (data) => {
            console.log("Recieved ack from server");
        });
    }
    
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

    function settingStateChangeHandler() {
        // 0: Closed
        // 1: Opening
        // 2: Open
        // 3: Closing
        setSettingState( (settingState + 1 ) % 4 );
    }

    function shareSessionStateChangeHandler() {
        // 0: Closed
        // 1: Opening
        // 2: Open
        // 3: Closing
        setShareSessionState( (shareSessionState + 1 ) % 4 );
    }

    function joinRequestStateChangeHandler() {
        // 0: Closed
        // 1: Opening
        // 2: Open
        // 3: Closing
        setJoinRequestState( (joinRequestState + 1 ) % 4 );
    }

    let canvasColorSettings: ColorSettings = {
        background: "#FFFFFF",
        triangle: colors["--triangleColor"],
        rectangle: colors["--squareColor"],
        circle: colors["--circleColor"],
    };

    return (
        <>
        { (settingState>0) && <Settings settingStateChangeHandler={settingStateChangeHandler} 
                                        settingState={settingState}
                                        colorChangeHandler={colorChangeHandler}
                                        resetColors={resetColors}/> }

        { (shareSessionState>0) && <ShareSession shareSessionStateChangeHandler={shareSessionStateChangeHandler} 
                                                 shareSessionState={shareSessionState}
                                                 token= {token}
                                                 setToken = {setToken}
                                                 submissionHandler={shareCanvasSubmissionHandler}
                                                 uniqueId={uniqueId}/> }


        { (joinRequestState>0) && <JoinRequest joinRequestStateChangeHandler={shareSessionStateChangeHandler} 
                                               joinRequestState={shareSessionState}/> }

        { draw && <Draw colorSettings={canvasColorSettings}
                        settingStateChangeHandler={settingStateChangeHandler}
                        settingState={settingState}
                        shareSessionStateChangeHandler={shareSessionStateChangeHandler}
                        shareSessionState={shareSessionState}/> }
        </>
    );
}

export default App;