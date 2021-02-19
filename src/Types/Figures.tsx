// Types of objects to be passed into the canvas component.

export enum SelectedShape {
    None,
    Circle,
    Rectangle, 
    Triangle,
};

export enum SelectedAnimation {
    RadialForce,
    DownwardGravity,
    None,
}

export type CanvasSettings = {
    selectedFigure: SelectedShape,
    selectedAnimation: SelectedAnimation, 
    reset: Boolean,
};