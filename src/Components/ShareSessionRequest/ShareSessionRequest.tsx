import './ShareSessionRequest.css';
import '../../App.css';

import { useEffect } from 'react';

export default function ShareSessionRequest(props) {
    const shareSessionRequestStates = ["closed", "opening", "open", "closing"];
    function responseHandler(response) {
        props.shareSessionsRequestStateChangeHandler();
        props.shareSessionCallback(response);
        // props.shareSessionRequestHandler();
        // props.requestHandler(response)
    }

    return (
        <div className={"share-session-request-container " }
             onAnimationEnd={() => props.shareSessionsRequestStateChangeHandler()}>

            <div className="share-session-request-msg">
                <span className="requestId">{props.requestId} ac54fdh0 </span>
                has requested to join your draw session
            </div>

            <div className= "response-container">

                <div className="response accept"
                     onClick={() => responseHandler(true)}>
                        Accept
                </div>

                <div className="response decline"
                     onClick={() => responseHandler(false)}>
                        Decline
                </div>

            </div>

        </div>
    );  
}