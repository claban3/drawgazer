import './App.css';
import Draw from './Views/Draw/Draw';
import Settings from './Views/Settings/Settings';
import ShareSession from './Views/ShareSession/ShareSession';
import ShareSessionRequest from './Components/ShareSessionRequest/ShareSessionRequest';
import { useEffect, useState } from 'react';
import { ColorSettings, SelectedAnimation, SyncData } from './Types/Figures';
import { generateContrastColors } from '@adobe/leonardo-contrast-colors';
import { UIStateTypes } from './Types/UIStateTypes';
import useSound from 'use-sound';
import chime from "./Sounds/chime.mp3";
import socket from "./socket.js"
import { FirstPageSharp } from '@material-ui/icons';

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

var acceptOrDecline = 0; // 0 is none, 1 is accept, 2 is decline
const defaultAnimations = [
    SelectedAnimation.DownwardGravity,
    SelectedAnimation.WobblySwarm,
    SelectedAnimation.BubblePop,
];

function App() {
    const [draw, setDraw] = useState(true);
    //const [settingState, setSettingState] = useState(UIStateTypes.Closed);
    //const [shareSessionState, setShareSessionState] = useState(UIStateTypes.Closed);
    const [token, setToken] = useState('');
    const [settingState, setSettingState] = useState(0);
    const [shareSessionState, setShareSessionState] = useState(0);
    const [shareSessionRequestState, setShareSessionRequestState] = useState(0);
    const [playChime] = useSound(chime);

    const [newSession, setNewSession] = useState(true);
    const [colors, setColors] = useState(defaultColors); 
    const [resetColors, setResetColors] = useState(false);
    const [uniqueId, setUniqueId] = useState(null);
    const [figs, setFigs] = useState("[]");
    const [mouseCell, setMouseCell] = useState(0);
    const [animationSelection, setAnimationSelection] = useState(SelectedAnimation.None);
    const [syncStatus, setSyncStatus] = useState(0);
    const [syncedWith, setSyncedWith] = useState(null);
    //const [figs, setFigs] = useState(0);

    // const [shareSessionResponseValue, setShareSessionResponseValue] = useState(0);
    // 0 = none, 1 = accept, 2 = decline
    const timeout = async ms => new Promise(res => setTimeout(res, ms));
    
    async function shareSessionCallback(response) {
        response ? acceptOrDecline = 1 : acceptOrDecline = 2;
    }

    async function waitSessionResponse() {
        while (acceptOrDecline === 0) {
            await timeout(100); // pauses script
        }
    }

    useEffect(() => {
        socket.on("connect", () => {console.log("Connected with sever");});
        socket.on("uuid", (uuid) => {setUniqueId(uuid); console.log("new uuid: " + uuid);});
        socket.on("shareCanvasRequest", (data, callback) => shareCanvasRequestHandler(data, callback));
        socket.on("updateCanvas", (data, callback) => updateCanvasHandler(data, callback));
    },[]);
    
    async function shareCanvasRequestHandler(data, responseCallback) {
        console.log("Received request from " + data.srcId + " to share canvas");

        if(!shareSessionRequestState) {
            shareSessionsRequestStateChangeHandler();
        }
        
        await waitSessionResponse();
        responseCallback(acceptOrDecline);
        setSyncStatus(acceptOrDecline);
        acceptOrDecline = 0; // 0 is reset to unselected
    }

    function updateCanvasHandler(data, responseCallback) {
        console.log("Received update from " + data.srcId);

        

    }

    function shareCanvasSubmissionHandler(friendId) {
        let requestData = {
            srcId : uniqueId,
            destId : friendId
        }

        console.log("Requesting sync with " + friendId);
        setSyncedWith(friendId);
        socket.emit("initiateShareCanvas", requestData, (responseData) => {
            // shareCanvasResponseHandler(responseData);
        });
    }

    function canvasSyncHandler() {
        let syncData: SyncData = {
            mouseCell: mouseCell,
            figsJSON: figs,
            selectedAnimation: animationSelection,
            srcId : uniqueId,
            destId : syncedWith
        }

        console.log("Attempting Update with " + syncedWith);
        socket.emit("syncUpdate", syncData, (responseData) => {
            // do on response
        });
    }
    

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

    function updateFigs(figs: string) {

        setFigs(figs);
        //console.log(figs);
    }

    function settingStateChangeHandler() {
        // Closed = 0
        // Opening = 1
        // Open = 2
        // Closing = 3
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
        { (settingState!=UIStateTypes.Closed) && <Settings settingStateChangeHandler={settingStateChangeHandler} 
                                        settingState={settingState}
                                        colorChangeHandler={colorChangeHandler}
                                        resetColors={resetColors}
                                        animations={animations}
                                        animationRemoveHandler={animationRemoveHandler}
                                        animationAddHandler={animationAddHandler}/> }

        //{ (shareSessionState!=UIStateTypes.Closed) && <ShareSession shareSessionStateChangeHandler={shareSessionStateChangeHandler} 
                                                 //shareSessionState={shareSessionState}
                                                 //token= {token}
                                                 //setToken = {setToken}
                                                 //submissionHandler={submissionHandler}/> }


        { (shareSessionState>0) && <ShareSession shareSessionStateChangeHandler={shareSessionStateChangeHandler} 
                                                 shareSessionState={shareSessionState}
                                                 submissionHandler={shareCanvasSubmissionHandler}
                                                 uniqueId={uniqueId}/> }


        { (shareSessionRequestState>0) && <ShareSessionRequest 
            shareSessionsRequestStateChangeHandler={shareSessionsRequestStateChangeHandler} 
            shareSessionRequestState={shareSessionRequestState}
            shareSessionCallback={shareSessionCallback}
            requestId={uniqueId}/> }

        { draw && <Draw colorSettings={canvasColorSettings}
                        settingStateChangeHandler={settingStateChangeHandler}
                        settingState={settingState}
                        animations={animations}
                        shareSessionStateChangeHandler={shareSessionStateChangeHandler}
                        shareSessionState={shareSessionState}
                        updateFigs={updateFigs}
                        canvasSyncHandler={canvasSyncHandler}
                        figs={figs}/> }
        </>
    );
}

export default App;