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
    BubblePop,
    Stack,
    RadialForce,
    None,
};

interface voidFunc {
    (none: void): void
};

export type ShapeColors = {
    triangle: string,
    rectangle: string,
    circle: string,
};

export type CanvasSettings = {
    selectedFigure: SelectedShape,
    selectedAnimation: SelectedAnimation, 
    colorSettings: ShapeColors,
    reset: Boolean,
    resetInParent: voidFunc
};

export type SketchData = {
    onPressed: Boolean,
    figs: AnimatedFigure[],
    points: P5Wrapper.Vector[],
    colorSettings: ShapeColors,
    selectedFigure: SelectedShape,
    selectedAnimation: SelectedAnimation,
    bufferWidth: number,
    bufferHeight: number,
    canvasHeight: number,
    canvasWidth: number
};