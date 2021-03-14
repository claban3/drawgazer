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

export function pushNewFigure(selectedFigure, figs, sketchData: SketchData, p: p5) {
    let s = Math.random() * 50 + 20;
    let color;

    switch(selectedFigure) {
        case SelectedShape.Circle:
            color = Animation.circleColors[Math.floor(Math.random() * Animation.circleColors.length)];
            let newCirc = new CircleFigure(p.mouseX, p.mouseY, -0.02, s, color, p);
            figs.push(newCirc);
            break;
            
        case SelectedShape.Rectangle:
            color = Animation.rectColors[Math.floor(Math.random() * Animation.rectColors.length)];
            let newSquare = new SquareFigure(p.mouseX, p.mouseY, -0.02, s, color, p);
            figs.push(newSquare);
            break;

        case SelectedShape.Triangle:
            color = Animation.triangleColors[Math.floor(Math.random() * Animation.triangleColors.length)]
            let newTriangle = new TriangleFigure(p.mouseX, p.mouseY, -0.02, s, color, p);
            figs.push(newTriangle);
            break;
    }
}

export class Animation {

    static rectColors = [];
    static circleColors = [];
    static triangleColors = [];

    static propsHandler(sketchData, p) {
        // p.background(255);
        Animation.rectColors = generateColorSpectrum(sketchData.colorSettings.rectangle);
        Animation.circleColors = generateColorSpectrum(sketchData.colorSettings.circle);
        Animation.triangleColors = generateColorSpectrum(sketchData.colorSettings.triangle);
    }

    static draw(sketchData: SketchData, p) {
        switch(sketchData.selectedAnimation) {
            case SelectedAnimation.WobblySwarm:
                WobblySwarm.draw(sketchData, p);
                break;
            case SelectedAnimation.DownwardGravity:
                DownwardGravity.draw(sketchData, p);
                break;
            case SelectedAnimation.DraggedOut:
                DraggedOut.draw(sketchData, p);
                break;
            case SelectedAnimation.WallBounce:
                WallBounce.draw(sketchData, p);
                break;
            case SelectedAnimation.BubblePop:
                BubblePop.draw(sketchData, p);
                break;
            case SelectedAnimation.DraggedPainting:
                DraggedPainting.draw(sketchData, p);
                break;
            case SelectedAnimation.None:
                p.background(255);
                sketchData.figs.forEach(fig => {
                    fig.update(sketchData.canvasWidth, sketchData.canvasHeight);
                    fig.display(sketchData);
                });
                break;
        }
    }

    static mousePressed(sketchData: SketchData, p: p5) {
        if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
            pushNewFigure(sketchData.selectedFigure, sketchData.figs, sketchData, p);
        }

        switch(sketchData.selectedAnimation) {
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