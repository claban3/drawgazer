import './Options.css'

import settings from "../../Images/settings.png";
import shareSession from "../../Images/share_session.png";
import camera from "../../Images/camera.png";
import record from "../../Images/record.png";
import trashcan from "../../Images/trashcan.png";

export default function Options(props)
{
    return (
        <div className="options-container">

            <img className="icon" title="Share Session"
                 src={shareSession}
                 alt=""
                 onClick = {() => props.toggleShareSessions()}
                 onTouchEnd = {() => props.toggleShareSession()}/>

            <img className="icon" title="Save Canvas"
                 src={camera}
                 alt="" onClick = {() => props.saveCanvas()}
                 onTouchEnd = {() => props.saveCanvas()}/> 

            <img className="icon" title="Clear Canvas"
                 src={trashcan}
                 alt=""
                 onClick = {() => props.clearCanvas()}
                 onTouchEnd = {() => props.clearCanvas()}/>

            <img className="icon" title="Settings"
                 src={settings}
                 alt=""
                 onClick = {() => props.settingStateChangeHandler()}
                 onTouchEnd = {() => props.settingStateChangeHandler()}/>

            <img className="icon" title="Record Canvas"
                 src={record}
                 alt=""
                 onClick = {() => props.recordCanvas()}
                 onTouchEnd = {() => props.recordCanvas()}/>

            {/*  <div className="title">drawgazer</div> */}
        </div>
    );
}