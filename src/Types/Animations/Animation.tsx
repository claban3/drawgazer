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
import { DrumLoop } from './DrumLoop';

export function pushNewFigure(selectedFigure, figs, p: p5) {
    if (selectedFigure != SelectedShape.None) {
        let newFig = newFigure(selectedFigure, p.mouseX, p.mouseY, p); 
        figs.push(newFig);
        return newFig;
    }
}

export function pushNewFigureWithVelocity(selectedFigure, figs, velocity, p: p5) {
    if (selectedFigure != SelectedShape.None) {
        let newFig = newFigure(selectedFigure, p.mouseX, p.mouseY, p);
        newFig.velocity = velocity;
        figs.push(newFig);
    }
}

export function collidesCanvasWall(fig: AnimatedFigure, width, height) {
    return fig.collideCanvasLeft(width, height)
        || fig.collideCanvasRight(width, height)
        || fig.collideCanvasTop(width, height)
        || fig.collideCanvasBottom(width, height);
}

export function outsideCanvasWall(fig: AnimatedFigure, width, height) {
    return fig.pos.x > width || fig.pos.x < 0 
        || fig.pos.y > height || fig.pos.y < 0; 
}

export function newFigure(selectedFigure, x: number, y:number, p: p5, randomSize = true) {
    let dimension = randomSize ? Math.random() * 50 + 60 : 100;
    let color;
    switch(selectedFigure) {
        case SelectedShape.Circle:
            if (!color) color = Animation.getCircleColor();
            return new CircleFigure(x, y, dimension, color, p);
            
        case SelectedShape.Rectangle:
            if (!color) color = Animation.getRectColor();
            return new SquareFigure(x, y, dimension, color, p);

        case SelectedShape.Triangle:
            if (!color) color = Animation.getTriangleColor();
            return new TriangleFigure(x, y, dimension, color, p);
        default:
    }
}
    
export class Animation {

    static rectColors = [];
    static circleColors = [];
    static triangleColors = [];

    static animationNeedsFadeOut(selectedAnimation) {
        switch(selectedAnimation) {
            case SelectedAnimation.DrumLoop:
                return true;
            default:
                return false;
        }
    }

    static propsHandler(sketchData, p) {
        Animation.rectColors = generateColorSpectrum(sketchData.colorSettings.rectangle);
        Animation.circleColors = generateColorSpectrum(sketchData.colorSettings.circle);
        Animation.triangleColors = generateColorSpectrum(sketchData.colorSettings.triangle);
    }

    static getRectColor() : string {
        return Animation.rectColors[Math.floor(Math.random() * Animation.rectColors.length)];
    }

    static getCircleColor() : string {
        return Animation.circleColors[Math.floor(Math.random() * Animation.circleColors.length)];
    }

    static getTriangleColor() : string {
        return Animation.triangleColors[Math.floor(Math.random() * Animation.triangleColors.length)]
    }


    static redraw(sketchData: SketchData, p: p5) {
        switch(sketchData.selectedAnimation) {
            case SelectedAnimation.FillScreenWithFigures:
                FillScreenWithFigures.redraw(sketchData, p);
                break;
            default:
                p.frameRate(60);
        }
    }

    // static redrawTransition(sketchData: SketchData, p: p5) {
    //     if (Animation.animationNeedsFadeOut(sketchData.selectedAnimation)) {
    //         let color = p.color(sketchData.colorSettings.background);
    //         color.setAlpha(255);
    //         p.background(color);
    //     }
    // }

    static draw(sketchData: SketchData, p) {
        switch(sketchData.selectedAnimation) {
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
            case SelectedAnimation.DrumLoop:
                DrumLoop.draw(sketchData, p);
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
        switch(sketchData.selectedAnimation) {
            case SelectedAnimation.WobblySwarm:
                WobblySwarm.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.DrumLoop: 
                DrumLoop.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.BubblePop:
                BubblePop.mousePressed(sketchData, p);
                break;
            case SelectedAnimation.None:
                if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
                    pushNewFigure(sketchData.selectedFigure, sketchData.figs, p);
                }
                break; 
        }

        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {
        return false;
    }
}