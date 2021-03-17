import { useState } from "react";
import './ShareSession.css';
import '../../App.css';

import exit_red from '../../Images/exit-red.png';
import share_session from '../../Images/share_session.png';

export default function ShareSession(props) {
    const shareSessionStates = ["closed", "opening", "open", "closing"];
    const buttons = ["--shareButton"]
    const input = ["--friendIDInput"]

    const [buttonSelection, setButtonSelection] = useState(null);

    function generateLocalID() {
        return 'ABCD';
    }

    function tryFriendID(inputID) {
        
        // Check servers for matching inputID
        return true;
    }

    return (
        <div className={"shareSession-outer-container " + (shareSessionStates[props.shareSessionState]) }
            onAnimationEnd={() => props.shareSessionStateChangeHandler()} >
                
            <div className={"shareSession-container"}>

                <div className="shareSession-exit">    
                    <img
                        src={exit_red}
                        style={{width:30, height:30}}
                        alt="exit shareSessions"
                        onClick={() => props.shareSessionStateChangeHandler()}
                        onTouchEnd={() => props.shareSessionStateChangeHandler()}/>
                </div>

                <div className="friend-ID-input-container">

                    <div className = "prompt">
                        <b>Enter Friend ID to share canvas:</b>
                    </div>

                    <div className="friend-ID-input-box">

                        <input type="text" className="friend-ID-input" id="friend-ID-input" name="friend-ID-input" placeholder="Friend ID"></input>

                        <div className="friend-ID-submit">    
                            <input type="image" src={share_session} alt="Submit" style={{width:25, height:30}}></input>
                        </div>

                    </div>

                </div>

                <p className="friend-ID-local" id="friend-ID-local"><b>Your Friend ID: <span className="spn">{generateLocalID()}</span></b></p>
                
            </div>
        </div>
    );  
}