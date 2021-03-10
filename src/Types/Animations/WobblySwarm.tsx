import { SketchData } from '../Figures';
import { AnimatedFigure } from '../ProcessingFigures';
import { pushNewFigure } from './Animation';

export class WobblySwarm extends Animation {
    static draw(sketchData: SketchData, p) {
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
            if (figs[i].pos.x < 0) {
                figs[i].pos.x = 0;
                figs[i].velocity.x *= -0.9;
            }
            if (figs[i].pos.x > sketchData.canvasWidth) {
                figs[i].pos.x = sketchData.canvasWidth;
                figs[i].velocity.x *= -0.9;
            }
            if (figs[i].pos.y < 0) {
                figs[i].pos.y = 0;
                figs[i].velocity.y *= -0.9;
            }
            if (figs[i].pos.y > sketchData.canvasHeight) {
                figs[i].pos.y = sketchData.canvasHeight;
                figs[i].velocity.y *= -0.9;
            }
        }

        figs.forEach(fig => {
            fig.pos.add(fig.velocity);
            fig.display();
        });
    }

    static mousePressed(sketchData: SketchData, p) {
        if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
            pushNewFigure(sketchData.selectedFigure, sketchData.figs, p);
        }

        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}