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
    RadialForce,
    DownwardGravity,
    WallBounce,
    None,
}

interface voidFunc {
    (none: void): void
}
export type CanvasSettings = {
    selectedFigure: SelectedShape,
    selectedAnimation: SelectedAnimation, 
    reset: Boolean,
    resetInParent: voidFunc
};

export type SketchData = {
    onPressed: Boolean,
    figs: AnimatedFigure[],
    points: P5Wrapper.Vector[],
    selectedFigure: SelectedShape,
    selectedAnimation: SelectedAnimation,
    bufferWidth: number,
    bufferHeight: number,
    canvasHeight: number,
    canvasWidth: number
}