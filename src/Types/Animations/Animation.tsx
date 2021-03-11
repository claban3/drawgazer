import p5 from 'p5';
import { SelectedAnimation, SelectedShape, SketchData } from '../Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../ProcessingFigures';
import { DownwardGravity } from './DownwardGravity';
import { WallBounce } from './WallBounce';
import { BubblePop } from './BubblePop';
import { WobblySwarm } from './WobblySwarm';

export function pushNewFigure(selectedFigure, figs, p: p5) {
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
            case SelectedAnimation.WobblySwarm:
                WobblySwarm.draw(sketchData, p);
                break;
            case SelectedAnimation.DownwardGravity:
                DownwardGravity.draw(sketchData, p);
                break;
            case SelectedAnimation.WallBounce:
                WallBounce.draw(sketchData, p);
                break;
            case SelectedAnimation.BubblePop:
                BubblePop.draw(sketchData, p)
                break;
            case SelectedAnimation.None:
                sketchData.figs.forEach(fig => {
                    fig.update(sketchData.canvasWidth, sketchData.canvasHeight);
                    fig.display(sketchData);
                });
                break;
        }
    }

    static mousePressed(sketchData: SketchData, p: p5) {
        if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
            pushNewFigure(sketchData.selectedFigure, sketchData.figs, p);
        }

        switch(sketchData.selectedAnimation) {
            case SelectedAnimation.WobblySwarm:
                WobblySwarm.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.DownwardGravity:
                DownwardGravity.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.WallBounce:
                WallBounce.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.BubblePop:
                BubblePop.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.None:
                break; 
        }
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {
        switch(sketchData.selectedAnimation) {
            case SelectedAnimation.WobblySwarm:
                WobblySwarm.mouseReleased(sketchData, p);
                break;
            case SelectedAnimation.DownwardGravity:
                DownwardGravity.mouseReleased(sketchData, p);
                break;
            case SelectedAnimation.WallBounce:
                WallBounce.mouseReleased(sketchData, p);
                break;
            case SelectedAnimation.BubblePop:
                /// WallBounce.mouseReleased(sketchData, p);
                break;
            case SelectedAnimation.None:
                break; 
        }
    }
}