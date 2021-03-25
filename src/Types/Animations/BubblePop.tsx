import { SelectedShape, SketchData } from '../Figures';
import P5 from 'p5';
import { AnimatedFigure } from '../ProcessingFigures';
import 'p5collide';
import { newFigure } from './Animation';

export class BubblePop extends Animation {

    static NUM_FIGURES = 200;
    static CACHE_LIMIT = 100;
    static counter = 0;

    static colorSettingsCache;
    static circleCache = [];
    static squareCache = [];
    static triangleCache = [];

    static burst_cache(fig, sketchData, p) {

        let index = sketchData.figs.indexOf(fig);

        let type : string = fig.getShapeDescriptor().type;
        let dim : number = fig.dim;
        let xpos : number = fig.pos.x;
        let ypos : number = fig.pos.y;

        for(let i=0; i < 3; ++i){
            fig.dim += 5;
            fig.display();
        }
        
        var shape : SelectedShape;
        var cache;
        // var color;
        
        switch(type) {
            case("CIRCLE"):
                cache = this.circleCache;
                shape = SelectedShape.Circle;
                // color = Animation.getCircleColor();
                break;
            case("RECT"):
                xpos += dim/2;
                ypos += dim/2;

                cache = this.squareCache;
                shape = SelectedShape.Rectangle;
                // color = this.getRectColor();
                break;
            case("POLY"):
                cache = this.triangleCache;
                shape = SelectedShape.Triangle;
                // color = this.getTriangleColor();
                break;
        }

        if(dim > 25) { 
            if(shape && sketchData.figs.length + 5 <= this.NUM_FIGURES) {
                let newFig : AnimatedFigure;
                let numNewFigs = dim/10 > 5 ? 5 : Math.floor(dim/10);
                numNewFigs = Math.min(numNewFigs, cache.length);
                for(let i = 0; i < numNewFigs; ++i) {
                    newFig = cache.shift();
                    newFig.pos.x = xpos + ((Math.random() - 0.5) * 2)*dim/2;
                    newFig.pos.y = ypos + ((Math.random() - 0.5) * 2)*dim/2;
                    newFig.dim = dim * (0.3 + Math.random() * 0.3);

                    sketchData.figs.push(newFig);
                }
            }
        }
        let recycleFig = sketchData.figs.splice(index, 1)[0]
        // recycleFig.color = 
        cache.push(recycleFig);
        fig.pop.play();
    }
    
    static burst(fig, sketchData, p) {
        let index = sketchData.figs.indexOf(fig);

        let type : string = fig.getShapeDescriptor().type;
        let dim : number = fig.dim;
        let xpos : number = fig.pos.x;
        let ypos : number = fig.pos.y;

        for(let i=0; i < 3; ++i){
            fig.dim += 5;
            fig.display();
        }

        if(dim > 25) {
            let shape : SelectedShape;

            switch(type) {
                case("CIRCLE"):
                    shape = SelectedShape.Circle;
                    break;
                case("RECT"):
                    xpos += dim/2;
                    ypos += dim/2;
                    shape = SelectedShape.Rectangle;
                    break;
                case("POLY"):
                    shape = SelectedShape.Triangle;
                    break;
            }
            
            if(shape && sketchData.figs.length + 5 <= this.NUM_FIGURES) {
                let newFig : AnimatedFigure;
                let numNewFigs = dim/10 > 5 ? 5 : Math.floor(dim/10);
                for(let i = 0; i < numNewFigs; ++i) {
                    let xOffset = ((Math.random() - 0.5) * 2)*dim/2;
                    let yOffset = ((Math.random() - 0.5) * 2)*dim/2;
                    newFig = newFigure(shape, xpos + xOffset, ypos + yOffset, p);
                    newFig.dim = dim * (0.3 + Math.random() * 0.3);
                    sketchData.figs.push(newFig);
                }
            }
        }
        sketchData.figs.splice(index, 1);
        fig.pop.play();
    }

    static cacheFigures(sketchData, p) {
        if(!this.colorSettingsCache) this.colorSettingsCache = sketchData.colorSettings;
        else {
            if(this.colorSettingsCache.triangle != sketchData.colorSettings.triangle) this.triangleCache = [];
            if(this.colorSettingsCache.rectangle != sketchData.colorSettings.rectangle) this.squareCache = [];
            if(this.colorSettingsCache.circle != sketchData.colorSettings.circle) this.circleCache = [];
            this.colorSettingsCache = sketchData.colorSettings;
        }

        switch(this.counter % 5) {
            case(0): 
                if(this.triangleCache.length < this.CACHE_LIMIT) {
                    this.triangleCache.push(newFigure(SelectedShape.Triangle, 0, 0, p));
                }
                break;
            case(2):
                if(this.squareCache.length < this.CACHE_LIMIT) {
                    this.squareCache.push(newFigure(SelectedShape.Rectangle, 0, 0, p));
                }
                break;
            case(4):
                if(this.circleCache.length < this.CACHE_LIMIT) {
                    this.circleCache.push(newFigure(SelectedShape.Circle, 0, 0, p));
                }
                break;
        }
    }
    static draw(sketchData: SketchData, p) {
        p.background(sketchData.colorSettings.background);
        
        let speedFactor = 0.1
        let rotFactor = 0.1

        let to_burst = []

        this.cacheFigures(sketchData, p);

        sketchData.figs.forEach(fig => {
            let width = sketchData.canvasWidth;
            let height = sketchData.canvasHeight;

            fig.timer -= 1;

            // prevent lag and sound spike

            /*
            for (let i = 0; i < nodes.length; i++) {
                if (AnimatedFigure.collidesWith(nodes[i], fig) && nodes[i] != fig) {
                    let directionVector = fig.pos.copy().sub(nodes[i].pos.copy()).normalize();
                    fig.velocity.mult(p.createVector(directionVector.x,directionVector.y,0));
                    nodes[i].velocity.mult(p.createVector(-1*directionVector.x, -1*directionVector.y, 0));
                }
            }
            */

            if (fig.collideCanvasLeft(width, height) || fig.collideCanvasRight(width, height)) {
                fig.velocity.x *= -1;
            }
        
            if (fig.collideCanvasTop(width, height) || fig.collideCanvasBottom(width, height)) {
                fig.velocity.y *= -1;
            }
            
            if (fig.collideWithMouse()) {
                if (!to_burst.includes(fig) && fig.timer < 0){
                    to_burst.push(fig)
                }
            } 

            fig.rotAngle = fig.randSign()*rotFactor;
            fig.velocity.rotate(fig.rotAngle);
            let translation = P5.Vector.mult(fig.velocity, speedFactor);
        
            fig.pos.add(translation);
            fig.display();
            this.counter++;
        });

        if(to_burst.length > 0) console.log("to burst length: " + to_burst.length);
        for (let i = 0; i < to_burst.length; i++) {
            this.burst_cache(to_burst[i], sketchData,  p)
        }
    }

    static mousePressed(sketchData: SketchData, p) {
        if(sketchData.figs.length >= this.NUM_FIGURES) {
            this.burst(sketchData.figs[0], sketchData, p);
        }
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {
        return false;
    }
}