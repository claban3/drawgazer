import { AnimatedFigure } from "./ProcessingFigures";
import P5Wrapper from 'react-p5-wrapper';
// Types of objects to be passed into the canvas component.
import gravity from '../Images/gravity.png';
import gravity2 from '../Images/gravity-v2.png';
import radial from '../Images/radial.png';
import radial2 from '../Images/radial-v2.png';
import bubbles from '../Images/bubbles.png';
import scurry from '../Images/scurry.png';
import draggedOut from '../Images/draggedout.png';
import draggedPainting from '../Images/draggedPainting.png';
import drumLoop from '../Images/Drumloop.png';
import freeDraw from '../Images/free-draw.png';
import fillScreenWithShapes from '../Images/fillScreenWithShapes.png'

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
    DrumLoop,
    BubblePop,
    DraggedPainting,
    FillScreenWithFigures,
    WallBounce,
    Stack,
    Scurry,
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
        case SelectedAnimation.DrumLoop:
            return {
                "name": "Drum Loop",
                "classname": "drumloop",
                "image": drumLoop,
            }
        case SelectedAnimation.BubblePop:
            return {
                "name": "Bubble Pop",
                "classname": "bubblePop",
                "image": bubbles,
            }
        case SelectedAnimation.DraggedPainting:
            return {
                "name": "Dragged Painting",
                "classname": "draggedPainting",
                "image": draggedPainting,
            }
        case SelectedAnimation.FillScreenWithFigures:
            return {
                "name": "Fill Screen With Shapes",
                "classname": "fillScreenWithFigures",
                "image": fillScreenWithShapes,
            }
        case SelectedAnimation.Scurry:
            return {
                "name": "Scurry",
                "classname": "scurry",
                "image": scurry,
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
    save: Boolean,
    record: Boolean,
    resetInParent: voidFunc,
    saveInParent: voidFunc,
    recordInParent: voidFunc,
    settingState: number,
    shareSessionState: number
};

export type HawkeyeMouseEvent = {
    mousePressed: Boolean,
    mouseFocused: Boolean,
    mouseX: number,
    mouseY: number
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
    // hawkeyeMouseEvent: HawkeyeMouseEvent
};

export type CustomFigureStyles = {
    stroke: boolean,
    opacity: number
};

// Send on initial canvas sync, add shape event, change animation event
export type SyncData = {
    mouseCell: number,
    figsJSON: string,
    selectedAnimation: SelectedAnimation,
    srcId: string,
    destId: string
};
