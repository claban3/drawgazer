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
                        <div className="unused-animation" onClick={() => props.animationAddHandler("gravity")}>
                            <img className="animation-icon" src={gravity} alt="gravity" />
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={gravity2} alt="gravity2" />
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={radial} alt="radial"/>
                        </div>
                    </div>
                    <div className="unused-animation-row">
                        <div className="unused-animation">
                            <img className="animation-icon" src={radial2} alt="radial2"/>
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={bubbles} alt="bubbles"/>
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={draggedOut} alt="draggedOut"/>
                        </div>
                    </div>
                    <div className="unused-animation-row">
                        <div className="unused-animation">
                            <img className="animation-icon" src={draggedPainting} alt="draggedPainting"/>
                        </div>
                        <div className="unused-animation">
                            <img className="animation-icon" src={freeDraw}alt="freeDraw"/>
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
                    <div className="selected-animation" onClick={() => props.animationRemoveHandler(0)}>
                        <img src={props.animations["animation0"]} alt=""/></div>
                    <div className="selected-animation" onClick={() => props.animationRemoveHandler(1)}>{props.animations["animation1"]}</div>
                    <div className="selected-animation" onClick={() => props.animationRemoveHandler(2)}>{props.animations["animation2"]}</div>
                </div>
            </div>
        </div>
    )
}