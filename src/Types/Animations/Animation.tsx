import { SelectedAnimation, SelectedShape, SketchData } from '../Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../ProcessingFigures';
import { DownwardGravity } from './DownwardGravity';
import { RadialForce } from './RadialForce';
import { WallBounce } from './WallBounce';

export function pushNewFigure(selectedFigure, figs, p) {
    let s = Math.random() * 50 + 20;
    switch(selectedFigure) {
        case SelectedShape.Circle:
            let newCirc = new CircleFigure(p.mouseX, p.mouseY, -0.02, s, p);
            figs.push(newCirc);
            break;
        case SelectedShape.Rectangle:
            let newSquare = new SquareFigure(p.mouseX, p.mouseY, -0.02, s, p);
            figs.push(newSquare);
            break;
        case SelectedShape.Triangle:
            let newTriangle = new TriangleFigure(p.mouseX, p.mouseY, -0.02, s, p);
            figs.push(newTriangle);
            break;
    }
}

export class Animation {
    static draw(sketchData: SketchData, p) {
        p.background(255);
        p.fill(100);

        switch(sketchData.selectedAnimation) {
            case SelectedAnimation.RadialForce:
                DownwardGravity.draw(sketchData, p);
                break;
            case SelectedAnimation.DownwardGravity:
                DownwardGravity.draw(sketchData, p);

                // RadialForce.draw(sketchData, p);
                break;
            case SelectedAnimation.WallBounce:
                WallBounce.draw(sketchData, p);
                break;
            case SelectedAnimation.None:
                sketchData.figs.forEach(fig => {
                    fig.update(sketchData.canvasWidth, sketchData.canvasHeight);
                    fig.display();
                });
                break;
        }
    }

    static mousePressed(sketchData: SketchData, p) {
        if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
            pushNewFigure(sketchData.selectedFigure, sketchData.figs, p);
        }

        switch(sketchData.selectedAnimation) {
            case SelectedAnimation.RadialForce:
                RadialForce.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.DownwardGravity:
                DownwardGravity.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.WallBounce:
                WallBounce.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.None:
                break; 
        }
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {
        switch(sketchData.selectedAnimation) {
            case SelectedAnimation.RadialForce:
                // RadialForce.mouseReleased(sketchData, p);
                break;
            case SelectedAnimation.DownwardGravity:
                // DownwardGravity.mouseReleased(sketchData, p);
                break;
            case SelectedAnimation.WallBounce:
                // WallBounce.mouseReleased(sketchData, p);
                break;
            case SelectedAnimation.None:
                break; 
        }
    }
}