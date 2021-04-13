import './Options.css'

import settings from "../../Images/settings.png";
import shareSession from "../../Images/share_session.png";
import camera from "../../Images/camera.png";
import record1 from "../../Images/record.png";
import record2 from "../../Images/record-red.png";
import record3 from "../../Images/spinner.gif";
import trashcan from "../../Images/trashcan.png";


const recordCanvasStates = [record1, record2, record3];
export default function Options(props) {
    return (
        <div className="options-container">

            <a className="wrapper"
               onClick = {() => props.shareSessionStateChangeHandler()}>
                <img className="icon" title="Share Session"
                     src={shareSession}
                     alt=""/>
            </a>

            <a className="wrapper"
               onClick = {() => props.saveCanvas()}>
                <img className="icon" title="Save Canvas"
                     src={camera}
                     alt=""/> 
            </a>

            <a className="wrapper"
               onClick = {() => props.clearCanvas()}>
                <img className="icon" title="Clear Canvas"
                     src={trashcan}
                     alt=""/>
            </a>

            <a className="wrapper"
               onClick = {() => props.settingStateChangeHandler()}>
                <img className="icon" title="Settings"
                     src={settings}
                     alt=""/>
            </a>

            <a className="wrapper"
               onClick = {() => props.recordCanvas()}>
                <img className="icon" title="Record Canvas"
                     src={recordCanvasStates[props.recordCanvasState]}
                     alt=""/>
            </a>

            {/*  <div className="title">drawgazer</div> */}
        </div>
    );
}