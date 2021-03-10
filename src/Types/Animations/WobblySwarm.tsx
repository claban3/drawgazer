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
            figs[i].velocity.x = figs[i].velocity.x * 0.99 + accelerationX * figs[i].mass;
            figs[i].velocity.y = figs[i].velocity.y * 0.99 + accelerationY * figs[i].mass;
        }

        figs.forEach(fig => {
            fig.pos.add(fig.velocity);
            fig.display();
        });
    }

    static mousePressed(sketchData: SketchData, p) {
        if (AnimatedFigure.mouseOnCanvas(p, sketchData.canvasWidth, sketchData.canvasHeight)) {
            for (let i = 0; i < 5; i++) {
                pushNewFigure(sketchData.selectedFigure, sketchData.figs, p);
            }
        }

        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}