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

    const [img0, setImg0] = useState("");
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    let animImages = {
        "gravity": gravity,
        "gravity2": gravity2,
        "radial": radial,
        "radial2": radial2,
        "bubbles": bubbles,
        "draggedOut": draggedOut,
        "draggedPainting": draggedPainting,
        "freeDraw": freeDraw,
    }
    let imgSetters = {
        "animation0": setImg0,
        "animation1": setImg1,
        "animation2": setImg2,
    }

    useEffect(() => {
        for (let animation in props.animations) {
            if (props.animations[animation] !== "none") {
                imgSetters[animation](animImages[props.animations[animation]]);
                console.log(animation, props.animations[animation]);
            }
            else {
                imgSetters[animation]("");
            }
        }
        console.log (img0, img1, img2);
        // if (props.animations["animation0"] === "gravity") {
        //     setImg0(gravity);
        // }
    }, [props.animations]);

    return (
        <div className="settings-content">
            <div className="animation-customization-container">
                <div className="all-animations-container">
                    <div className="unused-animation-row">
                        <div className="unused-animation" onClick={() => props.animationAddHandler("gravity")}>
                            <img className="animation-icon" src={gravity} alt="gravity" />
                        </div>
                        <div className="unused-animation" onClick={() => props.animationAddHandler("gravity2")}>
                            <img className="animation-icon" src={gravity2} alt="gravity2" />
                        </div>
                        <div className="unused-animation" onClick={() => props.animationAddHandler("radial")}>
                            <img className="animation-icon" src={radial} alt="radial"/>
                        </div>
                    </div>
                    <div className="unused-animation-row">
                        <div className="unused-animation" onClick={() => props.animationAddHandler("radial2")}>
                            <img className="animation-icon" src={radial2} alt="radial2"/>
                        </div>
                        <div className="unused-animation" onClick={() => props.animationAddHandler("bubbles")}>
                            <img className="animation-icon" src={bubbles} alt="bubbles"/>
                        </div>
                        <div className="unused-animation" onClick={() => props.animationAddHandler("draggedOut")}>
                            <img className="animation-icon" src={draggedOut} alt="draggedOut"/>
                        </div>
                    </div>
                    <div className="unused-animation-row">
                        <div className="unused-animation" onClick={() => props.animationAddHandler("draggedPainting")}>
                            <img className="animation-icon" src={draggedPainting} alt="draggedPainting"/>
                        </div>
                        <div className="unused-animation" onClick={() => props.animationAddHandler("freeDraw")}>
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
                        <img className="animation-icon" src={img0} alt=""/>
                    </div>
                    <div className="selected-animation" onClick={() => props.animationRemoveHandler(1)}>
                        <img className="animation-icon" src={img1} alt=""/>
                    </div>
                    <div className="selected-animation" onClick={() => props.animationRemoveHandler(2)}>
                        <img className="animation-icon" src={img2} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}