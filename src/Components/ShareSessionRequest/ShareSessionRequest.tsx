import './ShareSessionRequest.css';
import '../../App.css';


export default function ShareSessionRequest(props) {
    const shareSessionRequestStates = ["closed", "opening", "open", "closing"];
    
    async function responseHandler(response) {
        props.shareSessionsRequestStateChangeHandler();
        await props.shareSessionCallback(response);
    }

    return (
        <div className={"share-session-request-container " + shareSessionRequestStates[props.shareSessionRequestState] }
             onAnimationEnd={() => props.shareSessionsRequestStateChangeHandler()}>

            <div className="share-session-request-msg">
                <span className="requestId">{props.requestId} </span>
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