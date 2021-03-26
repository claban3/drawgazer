import { useEffect, useState } from "react";
import './ShareSession.css';
import '../../App.css';

import exit from '../../Images/exit.png';
import share_session from '../../Images/share_session.png';

export default function ShareSession(props) {
    const shareSessionStates = ["closed", "opening", "open", "closing"];
    const [text, setText] = useState(props.token);

    function submitHandler() {
        console.log("submission handler text: " + text);
        props.submissionHandler(text);
    }
    
    function onChangeHandler(event) {
        setText(event.target.value);
    }

    return (
        <div className="shareSession-outer-container"
             onAnimationEnd={() => props.shareSessionStateChangeHandler()}
             /*onClick={() => props.shareSessionStateChangeHandler()}*/
             /*onTouchEnd={() => props.shareSessionStateChangeHandler()}*/>
                
            <div className={"shareSession-container " + (shareSessionStates[props.shareSessionState])}>

                <img className="shareSession-exit"
                     src={exit}
                     alt="Exit Share Session"
                     onClick={() => props.shareSessionStateChangeHandler()}
                     onTouchEnd={() => props.shareSessionStateChangeHandler()}/>

                <div className="friend-ID-input-container">

                    <div className="prompt">
                        <b>Enter Friend ID to share canvas:</b>
                    </div>

                    <div className="friend-ID-input-box">

                        <input  className="friend-ID-input" 
                                type="text" 
                                id="friend-ID-input"
                                name="friend-ID-input" 
                                placeholder="Friend ID" 
                                onSubmit={submitHandler}
                                onChange={onChangeHandler}>
                        </input>

                        <img className="friend-ID-icon"
                             src={share_session} 
                             alt="Share Session"
                             onClick={submitHandler}/>
                    </div>

                </div>

                <p className="friend-ID-local" 
                   id="friend-ID-local">
                        <b>Your Friend ID: 
                        <span className="spn"> {props.uniqueId} </span>
                        </b>
                </p>
                
            </div>
        </div>
    );  
}