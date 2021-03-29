import { AnimatedFigure } from "./ProcessingFigures";
import P5Wrapper from 'react-p5-wrapper';
// Types of objects to be passed into the canvas component.
import gravity from '../Images/gravity.png';
import gravity2 from '../Images/gravity-v2.png';
import radial from '../Images/radial.png';
import radial2 from '../Images/radial-v2.png';
import bubbles from '../Images/bubbles.png';
import draggedOut from '../Images/draggedout.png';
import draggedPainting from '../Images/draggedPainting.png';
import freeDraw from '../Images/free-draw.png';

export enum SelectedShape {
    None,
    Circle,
    Rectangle, 
    Triangle,
    FreeDraw,
};

export enum SelectedAnimation {
    WobblySwarm,
    DownwardGravity,
    DraggedOut,
    BubblePop,
    RadialForce,
    DraggedPainting,
    WallBounce,
    Stack,
    None,
};

export function animationProperties(anim: SelectedAnimation) {
    switch(anim) {
        case SelectedAnimation.WobblySwarm:
            return {
                "name": "Wobbly Swarm",
                "classname": "wobblySwarm",
                "image": radial2,
            }
        case SelectedAnimation.DownwardGravity:
            return {
                "name": "Downward Gravity",
                "classname": "downwardGravity",
                "image": gravity2,
            }
        case SelectedAnimation.DraggedOut:
            return {
                "name": "Dragged Out",
                "classname": "draggedOut",
                "image": draggedOut,
            }
        case SelectedAnimation.BubblePop:
            return {
                "name": "Bubble Pop",
                "classname": "bubblePop",
                "image": bubbles,
            }
        case SelectedAnimation.RadialForce:
            return {
                "name": "Radial Force",
                "classname": "radialForce",
                "image": radial,
            }
        case SelectedAnimation.DraggedPainting:
            return {
                "name": "Dragged Painting",
                "classname": "draggedPainting",
                "image": draggedPainting,
            }
        case SelectedAnimation.None:
            return {
                "name": "None",
                "classname": "none",
                "image": null,
            }
        default:
            return {
                "name": "Error: Not an animation",
                "classname": "error",
                "image": null,
            }
    }
}

interface voidFunc {
    (none: void): void
};

export type ColorSettings = {
    triangle: string,
    rectangle: string,
    circle: string,
    background: string
};

export type CanvasSettings = {
    selectedFigure: SelectedShape,
    selectedAnimation: SelectedAnimation, 
    colorSettings: ColorSettings,
    reset: Boolean,
    resetInParent: voidFunc,
    settingState: number
};

export type SketchData = {
    onPressed: Boolean,
    figs: AnimatedFigure[],
    points: P5Wrapper.Vector[],
    colorSettings: ColorSettings,
    selectedFigure: SelectedShape,
    selectedAnimation: SelectedAnimation,
    bufferWidth: number,
    bufferHeight: number,
    canvasHeight: number,
    canvasWidth: number
};

export type CustomFigureStyles = {
    randomFill: boolean, 
    stroke: boolean,
    opacity: number
}