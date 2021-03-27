import './App.css';
import Draw from './Views/Draw/Draw';
import Settings from './Views/Settings/Settings';
import ShareSession from './Views/ShareSession/ShareSession';
import ShareSessionRequest from './Components/ShareSessionRequest/ShareSessionRequest';
import { useEffect, useState } from 'react';
import { ColorSettings } from './Types/Figures';
import { generateContrastColors } from '@adobe/leonardo-contrast-colors';
import useSound from 'use-sound';
import chime from "./Sounds/chime.mp3";
import socket from "./socket.js"

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
    const [shareSessionRequestState, setShareSessionRequestState] = useState(0);
    const [playChime] = useSound(chime);

    const [newSession, setNewSession] = useState(true);
    const [colors, setColors] = useState(defaultColors); 
    const [resetColors, setResetColors] = useState(false);
    const [uniqueId, setUniqueId] = useState(null);

    const [shareSessionCallback, setShareSessionCallback] = useState(() => {}); // TODO

    useEffect(() => {
        socket.on("connect", () => {console.log("Connected with sever");});
        socket.on("uuid", (uuid) => {setUniqueId(uuid); console.log("new uuid: " + uuid);});
        socket.on("shareCanvasRequest", (data, responseCallback) => shareCanvasRequestHandler(data, responseCallback));
    },[]);

    function shareCanvasResponseHandler(responseData) {
        console.log("sharecanvasResponseHandler: " + responseData);
        if(responseData) {
            console.log(responseData.destId + " accepted invitation? " + responseData.response);
        }

    }
    function shareCanvasRequestHandler(data, responseCallback) {
        console.log("Received request from " + data.srcId + " to share canvas");

        if(!shareSessionRequestState) {
            shareSessionsRequestStateChangeHandler();
        }
        
        // On accept/decline: 
            // socket.emit("shareCanvasResponse", "accept/decline");
    }

    // TODO: callback from "shareCanvasRequest" isn't working correctly.
    function sendShareCanvasResponse(response, requestId) {
        let responseData = {
            srcId: uniqueId,
            destId: requestId,
            response: response
        }

        socket.emit("")
    }
    
    function shareCanvasSubmissionHandler(friendId) {
        let requestData = {
            srcId : uniqueId,
            destId : friendId
        }

        console.log("Requesting sync with " + friendId);
        socket.emit("initiateShareCanvas", requestData, (responseData) => {
            shareCanvasResponseHandler(responseData);
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

    function shareSessionsRequestStateChangeHandler() {
        // 0: Closed
        // 1: Opening
        // 2: Open
        // 3: Closing
        if(shareSessionRequestState === 0) playChime(); // TODO: plays at wrong time
        setShareSessionRequestState( (shareSessionRequestState + 1 ) % 4);
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
                                                 submissionHandler={shareCanvasSubmissionHandler}
                                                 uniqueId={uniqueId}/> }


        { (shareSessionRequestState>0) && <ShareSessionRequest 
            shareSessionsRequestStateChangeHandler={shareSessionsRequestStateChangeHandler} 
            shareSessionRequestState={shareSessionRequestState}
            shareSessionCallback={sendShareCanvasResponse}/> }

        { draw && <Draw colorSettings={canvasColorSettings}
                        settingStateChangeHandler={settingStateChangeHandler}
                        settingState={settingState}
                        shareSessionStateChangeHandler={shareSessionStateChangeHandler}
                        shareSessionState={shareSessionState}/> }
        </>
    );
}

export default App;