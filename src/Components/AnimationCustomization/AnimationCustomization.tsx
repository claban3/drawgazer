import "./AnimationCustomization.css";
import { useEffect, useState } from "react";
import { animationProperties, SelectedAnimation } from '../../Types/Figures';

export default function AnimationCustomization(props) {

    const [img0, setImg0] = useState();
    const [img1, setImg1] = useState();
    const [img2, setImg2] = useState();

    let imgSetters = [
        setImg0, setImg1, setImg2
    ];

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
        while (anims.length < 3) {
            anims.push(SelectedAnimation.None);
        }
        return (
            <div className="unused-animation-row">
                {
                    anims.map((a, i) => {
                        let sa = SelectedAnimation[a as keyof typeof SelectedAnimation];
                        if (a !== SelectedAnimation.None && sa !== SelectedAnimation.None) {
                            let selected = Object.values(props.animations).includes(sa);
                            let button = selected ? "-" : "+";
                            return <>
                                <a  className={"unused-animation " + (selected ? "animation-selected" : "")} 
                                    key={animationProperties(sa)["classname"]+" "+i} 
                            
                                    onClick={() => {
                                        if (!selected) props.animationAddHandler(sa);
                                        else props.animationRemoveHandler(Object.values(props.animations).indexOf(sa));
                                    }}>

                                    <img className="animation-icon" src={animationProperties(sa)["image"]} alt={animationProperties(sa)["name"]} />
                                    <span>{button}</span>
                                </a>
                            </>
                        } else return <a className="unused-animation" key={"none "+i}></a>
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
        SelectedAnimation.DraggedPainting,
        SelectedAnimation.FillScreenWithFigures,
        SelectedAnimation.DrumLoop
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
    if (animationDivs.length !== 0) {
        animationRows.push(createAnimationRow(animationDivs));
    }

    let button0 = props.animations[0] === SelectedAnimation.None ? "" : "-";
    let button1 = props.animations[1] === SelectedAnimation.None ? "" : "-";
    let button2 = props.animations[2] === SelectedAnimation.None ? "" : "-";
    
    return (
        <div className="animation-customization-container">

            <div className="all-animations-container">
                {animationRows}
            </div>

            <div className="selected-spacer"></div>
            <div className="selected-animations-container">

                <a className="selected-animation" onClick={() => props.animationRemoveHandler(0)}>
                    { img0 &&
                        <>
                            <img className="animation-icon" src={img0} alt=""/>
                            <span>{button0}</span>
                        </>
                    }
                </a>

                <a className="selected-animation" onClick={() => props.animationRemoveHandler(1)}>
                    { img1 &&
                        <>
                            <img className="animation-icon" src={img1} alt=""/>
                            <span>{button1}</span>
                        </>
                    }
                </a>

                <a className="selected-animation" onClick={() => props.animationRemoveHandler(2)}>
                    { img2 &&
                        <>
                            <img className="animation-icon" src={img2} alt=""/>
                            <span>{button2}</span>
                        </>
                    }
                </a>

            </div>

        </div>
    )
}
