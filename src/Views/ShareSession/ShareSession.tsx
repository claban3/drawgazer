import { useEffect, useState } from "react";
import './ShareSession.css';
import '../../App.css';

import exit from '../../Images/exit.png';
import share_session from '../../Images/share_session.png';

export default function ShareSession(props) {
    const shareSessionStates = ["closed", "opening", "open", "closing"];
    const [text, setText] = useState(props.token);

    function submitHandler(event) {
        event.preventDefault();
        if(text.length === 8) {
            alert("Submitted: " + text);
            // props.submissionHandler(input);
        }
        else {
            alert("Please enter an 8 character friend ID");
        }
    }
    
    function onChangeHandler(event) {
        setText(event.target.value);
    }

    return (
        <div className="shareSession-outer-container"
             onAnimationEnd={() => props.shareSessionStateChangeHandler()}
             onClick={() => props.shareSessionStateChangeHandler()}
             onTouchEnd={() => props.shareSessionStateChangeHandler()}>
                
            <div className={"shareSession-container " + (shareSessionStates[props.shareSessionState])}
                 onClick={(event) => {event.stopPropagation();}}
                 onTouchEnd={(event) => {event.stopPropagation();}}>

                <img className="shareSession-exit"
                     src={exit}
                     alt="Exit Share Session"
                     onClick={() => props.shareSessionStateChangeHandler()}
                     onTouchEnd={() => props.shareSessionStateChangeHandler()}/>

                <div className="friend-ID-input-container">

                    <div className="prompt">
                        <b>Enter Friend ID to share canvas:</b>
                    </div>

                    <form className="friend-ID-input-box" onSubmit={submitHandler}>

                        <input
                            className="friend-ID-input"
                            type="text"
                            placeholder="Friend ID"
                            value={text}
                            spellCheck="false"
                            onChange={onChangeHandler}
                        />

                        <img className="friend-ID-icon"
                            src={share_session} 
                            alt="Share Session"
                            onClick={submitHandler}
                            onTouchEnd={submitHandler}/>
                    </form>

                </div>

                <p className="friend-ID-local" 
                   id="friend-ID-local">
                        <b>Your Friend ID: 
                        <span className="spn"> {"444444"} </span>
                        </b>
                </p>
                
            </div>
        </div>
    );  
}