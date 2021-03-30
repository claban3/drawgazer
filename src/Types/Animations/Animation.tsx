import p5 from 'p5';
import { SelectedAnimation, SelectedShape, SketchData } from '../Figures';
import { AnimatedFigure, CircleFigure, SquareFigure, TriangleFigure } from '../ProcessingFigures';
import { DownwardGravity } from './DownwardGravity';
import { WallBounce } from './WallBounce';
import { BubblePop } from './BubblePop';
import { WobblySwarm } from './WobblySwarm';
import { DraggedPainting } from './DraggedPainting';
import { DraggedOut } from './DraggedOut';
import { generateColorSpectrum } from './ColorSampling';
import { FillScreenWithFigures } from './FillScreenWithFigures';

export function pushNewFigure(selectedFigure, figs, p: p5) {
    if (selectedFigure != SelectedShape.None) {
        figs.push(newFigure(selectedFigure, p.mouseX, p.mouseY, p));
    }
}

export function newFigure(selectedFigure, x: number, y: number, p: p5, color?: string) {
    let dimension = Math.random() * 50 + 20;

    switch (selectedFigure) {
        case SelectedShape.Circle:
            if (!color) color = Animation.circleColors[Math.floor(Math.random() * Animation.circleColors.length)];
            return new CircleFigure(x, y, dimension, color, p);

        case SelectedShape.Rectangle:
            if (!color) color = Animation.rectColors[Math.floor(Math.random() * Animation.rectColors.length)];
            return new SquareFigure(x, y, dimension, color, p);

        case SelectedShape.Triangle:
            if (!color) color = Animation.triangleColors[Math.floor(Math.random() * Animation.triangleColors.length)]
            return new TriangleFigure(x, y, dimension, color, p);
        default:
    }
}

export class Animation {

    static rectColors = [];
    static circleColors = [];
    static triangleColors = [];

    static propsHandler(sketchData, p) {
        Animation.rectColors = generateColorSpectrum(sketchData.colorSettings.rectangle);
        Animation.circleColors = generateColorSpectrum(sketchData.colorSettings.circle);
        Animation.triangleColors = generateColorSpectrum(sketchData.colorSettings.triangle);
    }

    static redraw(sketchData: SketchData, p: p5) {
        switch (sketchData.selectedAnimation) {
            case SelectedAnimation.FillScreenWithFigures:
                FillScreenWithFigures.redraw(sketchData, p);
                break;
            default:
                p.frameRate(60);
        }
    }

    static draw(sketchData: SketchData, p) {

        switch (sketchData.selectedAnimation) {
            case SelectedAnimation.BubblePop:
                BubblePop.draw(sketchData, p);
                break;
            case SelectedAnimation.DownwardGravity:
                DownwardGravity.draw(sketchData, p);
                break;
            case SelectedAnimation.DraggedOut:
                DraggedOut.draw(sketchData, p);
                break;
            case SelectedAnimation.DraggedPainting:
                DraggedPainting.draw(sketchData, p);
                break;
            case SelectedAnimation.FillScreenWithFigures:
                FillScreenWithFigures.draw(sketchData, p);
                break;
            case SelectedAnimation.WallBounce:
                WallBounce.draw(sketchData, p);
                break;
            case SelectedAnimation.WobblySwarm:
                WobblySwarm.draw(sketchData, p);
                break;
            case SelectedAnimation.None:
                let color = p.color(sketchData.colorSettings.background);
                color.setAlpha(50);
                p.background(color);
                sketchData.figs.forEach(fig => {
                    fig.display();
                });
                break;
        }
    }

    static mousePressed(sketchData: SketchData, p: p5) {
        if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
            pushNewFigure(sketchData.selectedFigure, sketchData.figs, p);
        }

        switch (sketchData.selectedAnimation) {
            case SelectedAnimation.WobblySwarm:
                WobblySwarm.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.None:
                break;
        }

        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {
        return false;
    }
}