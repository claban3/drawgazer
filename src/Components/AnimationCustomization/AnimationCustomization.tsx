import "./AnimationCustomization.css";
import { useEffect, useState } from "react";
import { animationProperties, SelectedAnimation } from '../../Types/Figures';
import gravity from '../../Images/gravity.png';
import gravity2 from '../../Images/gravity-v2.png';
import radial from '../../Images/radial.png';
import radial2 from '../../Images/radial-v2.png';
import bubbles from '../../Images/bubbles.png';
import draggedOut from '../../Images/draggedout.png';
import draggedPainting from '../../Images/draggedPainting.png';
import freeDraw from '../../Images/free-draw.png';

export default function AnimationCustomization(props) {

    const [img0, setImg0] = useState();
    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();

    let imgSetters = {
        "animation0": setImg0,
        "animation1": setImg1,
        "animation2": setImg2,
    }

    useEffect(() => {
        for (let animation in props.animations) {
            if (props.animations[animation] !== SelectedAnimation.None) {
                imgSetters[animation](
                    animationProperties(props.animations[animation])["image"]
                );
            }
            else {
                imgSetters[animation](null);
            }
        }
    }, [props.animations]);

    function createAnimationRow(anims) {
        return (
            <div className="unused-animation-row">
                {
                    anims.map((a) => {
                        let sa = SelectedAnimation[a as keyof typeof SelectedAnimation];
                        let selected = Object.values(props.animations).includes(sa) ? "animation-selected" : "";
                        return <div className={"unused-animation " + selected} onClick={() => props.animationAddHandler(sa)}>
                                <img className="animation-icon" src={animationProperties(sa)["image"]} alt={animationProperties(sa)["name"]} />
                        </div>
                    })
                }
            </div>
        )
    }

    let animationDivs = [];
    let animationRows = [];
    let allAnimations = [
        SelectedAnimation.WobblySwarm,
        SelectedAnimation.DownwardGravity,
        SelectedAnimation.DraggedOut,
        SelectedAnimation.BubblePop,
        SelectedAnimation.RadialForce,
        SelectedAnimation.DraggedPainting,
        // SelectedAnimation.WallBounce,
        // SelectedAnimation.Stack,
    ]
    for (let a in allAnimations) {
        let sa: SelectedAnimation = SelectedAnimation[a as keyof typeof SelectedAnimation]; //the stupidest type conversion i have ever seen
        animationDivs.push(sa);
        if (animationDivs.length === 3) {
            animationRows.push(createAnimationRow(animationDivs));
            animationDivs = [];
        }
    }

    // The empty unused-animation-row here is just for demonstration purposes,
    // such that the unused animations overflow vertically behind the toolbar
    
    return (
        <div className="animation-customization-container">
            <div className="all-animations-container">
                {animationRows}
                {/* <div className="unused-animation-row">
                    <div className="unused-animation">
                    </div>
                    <div className="unused-animation">
                    </div>
                    <div className="unused-animation">
                    </div>
                </div> */}
            </div>
            <div className="selected-spacer"></div>
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
    )
}