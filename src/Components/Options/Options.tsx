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
            <div className="icons-container">
                
                <div className="icon" title="Share Session"
                     onClick = {() => props.toggleShareSessions()}
                     onTouchEnd = {() => props.toggleShareSession()}> 

                    <img className="icon"
                         src={shareSession}
                         alt=""/>
                </div>

                <div className="icon" title="Settings"
                     onClick = {() => props.settingStateChangeHandler()}
                     onTouchEnd = {() => props.settingStateChangeHandler()}>

                    <img className="icon"
                         src={settings}
                         alt=""/>
                </div>

                <div className="icon" title="Save Canvas"
                     onClick = {() => props.saveCanvas()}
                     onTouchEnd = {() => props.saveCanvas()}>

                    <img className="icon"
                         src={camera}
                         alt=""/> 
                </div>

                <div className="icon" title="Record Canvas"
                     onClick = {() => props.recordCanvas()}
                     onTouchEnd = {() => props.recordCanvas()}> 
                
                    <img className="icon"
                         src={record}
                        alt=""/>
                </div>

                <div className="icon" title="Clear Canvas"
                     onClick = {() => props.clearCanvas()}
                     onTouchEnd = {() => props.clearCanvas()}>
                    
                    <img className="icon"
                         src={trashcan}
                         alt=""/>
                </div>
            </div>

            <div className="title">drawgazer</div>
        </div>
    );
}