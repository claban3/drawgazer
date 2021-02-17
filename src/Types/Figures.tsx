// Types of objects to be passed into the canvas component.

export enum SelectedShape {
    Circle,
    Rectangle, 
    Triangle,
};

export type CanvasSettings = {
    selectedFigure: SelectedShape, 
    reset: Boolean,
};