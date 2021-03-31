import { AnimatedFigure } from "./ProcessingFigures";
import P5Wrapper from 'react-p5-wrapper';
// Types of objects to be passed into the canvas component.

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
    WallBounce,
    DraggedOut,
    BubblePop,
    Stack,
    RadialForce,
    DraggedPainting,
    FillScreenWithFigures,
    None,
};

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

export type HawkeyeMouseEvent = {
    mousePressed: Boolean,
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
    canvasWidth: number,
    hawkeyeMouseEvent: HawkeyeMouseEvent
};

export type CustomFigureStyles = {
    stroke: boolean,
    opacity: number
}