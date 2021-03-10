import { useState } from "react";
import './ShareSession.css';
import '../../App.css';

import exit from '../../Images/exit.png';

export default function ShareSession(props) {
    const shareSessionStates = ["closed", "opening", "open", "closing"];
    const buttons = ["--shareButton"]
    const input = ["--friendIDInput"]

    const [buttonSelection, setButtonSelection] = useState(null);

    return (
        <div className={"shareSession-container " + (shareSessionStates[props.shareSessionState]) }
             onAnimationEnd={() => props.shareSessionStateChangeHandler()} >

            <div>
                <h3>Enter Friend ID to share canvas:</h3>
            </div>

            <div className="friend-ID-input">
                <input type="text" id="friend-ID-input" name="friend-ID-input" placeholder="Friend ID"></input>
            </div>

            <div className="friend-ID-submit">    
                <input type="submit" id="friend-ID-submit" name="friend-ID-button"></input>
            </div>


            <img className="shareSessions-exit"
                 src={exit}
                 alt="exit shareSessions"
                 onClick={() => props.shareSessionStateChangeHandler()}
                 onTouchEnd={() => props.shareSessionStateChangeHandler()}/>
        </div>
    );  
}