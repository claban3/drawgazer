import './App.css';
import Draw from './Views/Draw/Draw';
import Settings from './Views/Settings/Settings';
import ShareSession from './Views/ShareSession/ShareSession';
import ShareSessionRequest from './Components/ShareSessionRequest/ShareSessionRequest';
import { useEffect, useState } from 'react';
import { ColorSettings, SelectedAnimation } from './Types/Figures';
import { SyncEvent, SyncEvents } from './Types/SyncEvents';
import { UIStateTypes } from './Types/UIStateTypes';
import { generateContrastColors } from '@adobe/leonardo-contrast-colors';
import socket from "./socket.js"

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
const defaultAnimations : SelectedAnimation[] = [
    SelectedAnimation.DownwardGravity,
    SelectedAnimation.WobblySwarm,
    SelectedAnimation.BubblePop,
];

function App() {
    const [draw, setDraw] = useState(true);

    const [settingState, setSettingState] = useState(0);
    const [shareSessionState, setShareSessionState] = useState(0);
    const [shareSessionRequestState, setShareSessionRequestState] = useState(0);
    
    const [newSession, setNewSession] = useState(true);
    const [colors, setColors] = useState(defaultColors); 
    const [resetColors, setResetColors] = useState(false);

    const [animationSelection, setAnimationSelection] = useState(SelectedAnimation.None);
    const [animations, setAnimations] = useState(defaultAnimations);
    
    const [uniqueId, setUniqueId] = useState(null);
    const [syncEvents, setSyncEvents] = useState([]);
    const [syncedWith, setSyncedWith] = useState(null);

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
        socket.on("syncEvent", (data) => syncEventHandler(data));
    },[]);
    
    async function shareCanvasRequestHandler(data, responseCallback) {
        console.log("Received request from " + data.srcId + " to share canvas");

        if(!shareSessionRequestState) {
            shareSessionsRequestStateChangeHandler();
        }
        
        await waitSessionResponse();
        responseCallback(acceptOrDecline);
        if(acceptOrDecline === 1) setSyncedWith(data.srcId);
        acceptOrDecline = 0; // 0 is reset to unselected
    }

    function syncEventHandler(syncEvent) {
        if(syncEvent.eventType === SyncEvents.SetAnimations) {
            console.log("animation sync event")
            setAnimations(syncEvent.animations);
            setAnimationSelection(syncEvent.selectedAnimation)
        }
        else {
            console.log("figure sync event");
            setSyncEvents(prev => [...prev, syncEvent]);
        }
    }

    function popSyncEvent() {
        let temp = [...syncEvents];
        temp.shift();
        setSyncEvents(temp);
    }

    function shareCanvasSubmissionHandler(friendId) {
        let requestData = {
            srcId : uniqueId,
            destId : friendId
        }

        socket.emit("initiateShareCanvas", requestData, (responseData) => {
            if(responseData === 1) {
                setSyncedWith(friendId);

                // Probably not the best way to retrieve figs, but its easier than passing figs down as props
                let figs = JSON.parse(localStorage.getItem("savedFigs")); 

                let setFiguresSyncEvent : SyncEvent = {
                    srcId: uniqueId,
                    destId: friendId,
                    eventType: SyncEvents.SetFigures,
                    figs: figs
                }

                socket.emit("syncEvent", setFiguresSyncEvent);
                
                let setAnimationsSyncEvent : SyncEvent = {
                    srcId: uniqueId,
                    destId: friendId,
                    eventType: SyncEvents.SetAnimations,
                    animations: animations,
                    selectedAnimation: animationSelection,
                }

                socket.emit("syncEvent", setAnimationsSyncEvent);
            } 
            else if(responseData === 2) {
                alert("Request declined");
            }
            else {
                alert("Request timed out");
            }
        });
    }

    function sendSyncEvent(syncEvent : SyncEvent) {
        socket.emit("syncEvent", syncEvent);
    }

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

    function animationSelectionHandler(selection : SelectedAnimation, override?: boolean) {
        if (animationSelection === selection) { 
            setAnimationSelection(SelectedAnimation.None);
            selection = SelectedAnimation.None
        }
        else if (selection !== SelectedAnimation.None || override) setAnimationSelection(selection);

        if(syncedWith !== null) {
            let setAnimationsSyncEvent : SyncEvent = {
                srcId: uniqueId,
                destId: syncedWith,
                eventType: SyncEvents.SetAnimations,
                animations: animations,
                selectedAnimation: selection,
            }
            sendSyncEvent(setAnimationsSyncEvent);
        }
    }

    function animationAddHandler(anim: SelectedAnimation) {
        for (let i = 0; i < 3; i ++) {
            if (animations[i] === SelectedAnimation.None) {
                let temp : SelectedAnimation[] = [...animations]
                temp[i] = anim;
                setAnimations(temp);

                if(syncedWith !== null) {
                    let setAnimationsSyncEvent : SyncEvent = {
                        srcId: uniqueId,
                        destId: syncedWith,
                        eventType: SyncEvents.SetAnimations,
                        animations: temp,
                        selectedAnimation: animationSelection,
                    }
                    sendSyncEvent(setAnimationsSyncEvent);
                }
                return; // Only set first unused animation slot
            }
        }
    }

    function animationRemoveHandler(idx: number) {
        let temp : SelectedAnimation[] = [...animations];
        temp[idx] = SelectedAnimation.None;
        setAnimations(temp);

        if(syncedWith !== null) {
            let setAnimationsSyncEvent : SyncEvent = {
                srcId: uniqueId,
                destId: syncedWith,
                eventType: SyncEvents.SetAnimations,
                animations: temp,
                selectedAnimation: animationSelection,
            }
            sendSyncEvent(setAnimationsSyncEvent);
        }
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
                        settingState={settingState}
                        settingStateChangeHandler={settingStateChangeHandler}
                        shareSessionState={shareSessionState}
                        shareSessionStateChangeHandler={shareSessionStateChangeHandler}

                        animations={animations}
                        animationSelection={animationSelection}
                        animationSelectionHandler={animationSelectionHandler}

                        uniqueId={uniqueId}
                        syncedWith={syncedWith}
                        syncEvents={syncEvents}
                        popSyncEvent={popSyncEvent}
                        sendSyncEvent={sendSyncEvent}/> }
        </>
    );
}

export default App;