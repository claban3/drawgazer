import { SketchData } from '../Figures';
import { AnimatedFigure } from '../ProcessingFigures';
import { pushNewFigure, collidesCanvasWall, outsideCanvasWall } from './Animation';

export class WobblySwarm extends Animation {
    
    static bounceOffBorder(fig: AnimatedFigure, width, height) {
        let reflect = -1.2;
        if (fig.collideCanvasLeft(width, height)) {
            fig.velocity.x *= reflect;
        }
        
        if (fig.collideCanvasRight(width, height)) {
            fig.velocity.x *= reflect;
        }
        
        if (fig.collideCanvasTop(width, height)) {
            fig.velocity.y *= reflect;
        }
        
        if (fig.collideCanvasBottom(width, height)) {
            fig.velocity.y *= reflect;
        }
    }

    static draw(sketchData: SketchData, p) {
        p.background(sketchData.colorSettings.background);
        let figs = sketchData.figs;

        for (let i = 0; i < figs.length; i++) {
            let accelerationX = 0;
            let accelerationY = 0;
            for (let j = 0; j < figs.length; j++) {
                if (i != j) {
                    var distanceX = figs[j].pos.x - figs[i].pos.x;
                    var distanceY = figs[j].pos.y - figs[i].pos.y;
                    

                    var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
                    if (distance < 1) distance = 1;
    
                    let force = (distance - 200) * figs[j].mass / distance;
                    accelerationX += force * distanceX;
                    accelerationY += force * distanceY;
                }
            }

            var mouseDistanceX = p.mouseX - figs[i].pos.x;
            var mouseDistanceY = p.mouseY - figs[i].pos.y;
            var mouseDistance = Math.sqrt(mouseDistanceX * mouseDistanceX + mouseDistanceY * mouseDistanceY) + 0.1;
            let mouseForce = (mouseDistance + 200) * figs[i].mass / mouseDistance;
            
            accelerationX += mouseForce * mouseDistanceX;
            accelerationY += mouseForce * mouseDistanceY;
            
            figs[i].velocity.x = figs[i].velocity.x * 0.99 + accelerationX * figs[i].mass;
            figs[i].velocity.y = figs[i].velocity.y * 0.99 + accelerationY * figs[i].mass;
            
            WobblySwarm.bounceOffBorder(figs[i], sketchData.canvasWidth, sketchData.canvasHeight);
        
        }

        // remove figures that are outside the canvas
        for (let i = 0; i < sketchData.figs.length; ++i) {
            let fig = sketchData.figs[i];
            if (outsideCanvasWall(fig, sketchData.canvasWidth, sketchData.canvasHeight)) {
                sketchData.figs.splice(i, 1);
            }
        }
        
        figs.forEach(fig => {
            fig.pos.add(fig.velocity);
            fig.display();
        });

        
    }

    static mousePressed(sketchData: SketchData, p) {
        if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
            for (let i = 0; i < 2; i++) {
                let newFig = pushNewFigure(sketchData.selectedFigure, sketchData.figs, p);
                if (newFig) {
                    while (collidesCanvasWall(newFig, sketchData.canvasWidth, sketchData.canvasHeight)) {
                        let origin = p.createVector(sketchData.canvasWidth / 2, sketchData.canvasHeight / 2);
                        let correctVec = origin.sub(newFig.pos).normalize();
                        newFig.pos.add(correctVec);
                    }
                }
            }
        }

        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}