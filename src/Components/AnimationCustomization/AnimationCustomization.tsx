import "./AnimationCustomization.css";
import { useEffect, useState } from "react";
import gravity from '../../Images/gravity.png';
import gravity2 from '../../Images/gravity-v2.png';
import radial from '../../Images/radial.png';
import radial2 from '../../Images/radial-v2.png';
import bubbles from '../../Images/bubbles.png';
import draggedOut from '../../Images/draggedout.png';
import draggedPainting from '../../Images/draggedPainting.png';
import freeDraw from '../../Images/free-draw.png';

export default function AnimationCustomization(props) {
    


    return (
        <div className="settings-content">
            <div className="animation-customization-container">
                <div className="all-animations-container">
                    <div className="unused-animation-row">
                        <div className="unused-animation">
                            <img className="animation-icon" src={gravity}/>
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={gravity2}/>
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={radial}/>
                        </div>
                    </div>
                    <div className="unused-animation-row">
                        <div className="unused-animation">
                            <img className="animation-icon" src={radial2}/>
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={bubbles}/>
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={draggedOut}/>
                        </div>
                    </div>
                    <div className="unused-animation-row">
                        <div className="unused-animation">
                            <img className="animation-icon" src={draggedPainting}/>
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={freeDraw}/>
                        </div>
                        <div className="unused-animation"></div>
                    </div>
                    <div className="unused-animation-row">
                        <div className="unused-animation"></div>
                        <div className="unused-animation"></div>
                        <div className="unused-animation"></div>
                    </div>
                </div>
                <div className="selected-animations-container">
                    <div className="selected-animation"></div>
                    <div className="selected-animation"></div>
                    <div className="selected-animation"></div>
                </div>
            </div>
        </div>
    )
}