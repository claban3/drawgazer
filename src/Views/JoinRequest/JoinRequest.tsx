import { useEffect, useState } from "react";
import './JoinRequest.css';
import '../../App.css';

import exit from '../../Images/exit.png';
//import yes from '../../Images/yes.png';
//import no from '../../Images/no.png';

export default function JoinRequest(props) {
    const joinRequestStates = ["closed", "opening", "open", "closing"];

    function yesHandler() {


    }

    function noHandler() {

        props.joinRequestStateChangeHandler();
        props.joinRequestStateChangeHandler();
    }

    return (
        <div className="joinRequest-outer-container"
             onAnimationEnd={() => props.joinRequestStateChangeHandler()}>
                
            <div className={"joinRequest-container " + (joinRequestStates[props.joinRequestState])}>

                <img className="joinRequest-exit"
                     src={exit}
                     alt="Exit JoinRequest"
                     onClick={() => props.joinRequestStateChangeHandler()}
                     onTouchEnd={() => props.joinRequestStateChangeHandler()}/>

                <b> {1234} has requested to join.</b>
                <b>Sync Sessions?</b>

                <div className= "joinRequest-selection-container">

                    <img className="yes-icon"
                                //src={} 
                                alt="Join Request"
                                onClick={yesHandler}/>

                    <img className="no-icon"
                                //src={} 
                                alt="Join Request"
                                onClick={noHandler}/>
                </div>
            </div>
        </div>
    );  
}