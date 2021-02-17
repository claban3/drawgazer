// Types of objects to be passed into the canvas component.

enum CanvasShapes {
    Circle,
    Rectangle, 
    Triangle,
};

type CanvasSettings = {
    selectedFigure: CanvasShapes, 
    reset: Boolean,
};

export { CanvasShapes };