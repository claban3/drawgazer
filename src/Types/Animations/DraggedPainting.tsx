import { CustomFigureStyles, SketchData } from '../Figures';
import P5 from 'p5';

export class DraggedPainting extends Animation {

    static draw(sketchData: SketchData, p: P5) {
        let customStyles : CustomFigureStyles = {
            randomFill: true,
            opacity: 0.2,
            stroke: false
        };

        p.angleMode(p.DEGREES);
        sketchData.figs.forEach(fig => {
        
            let width = sketchData.canvasWidth;
            let height = sketchData.canvasHeight;
            
            let dp = p.random(0.98, 0.999);
            let angMult = p.random(10, 50);

            fig.pos.add(fig.velocity);
            fig.velocity.add(fig.acceleration);

            let delta : P5.Vector = p.createVector(fig.pos.x-width/2,fig.pos.y-height/2);
		    // let delta = fig.pos;
            let ang = delta.heading();
		    let rr = delta.mag();

            fig.velocity.x+=-p.sin(ang*angMult+rr/5)/15 + p.random(-1, 2) * p.cos(rr/10)/10
            fig.velocity.y+=-p.cos(ang*angMult+rr/5)/15 + p.sin(rr/10)/10
            fig.acceleration.x= (p.noise(fig.pos.x,fig.pos.y,5)-0.5)*1.1
            fig.acceleration.y= (p.noise(fig.pos.x,fig.pos.y,5000)-0.5)*1.1
            
            fig.velocity.mult(0.95);
            fig.dim *= dp;
            
            fig.displayCustomStyles(customStyles);

        });

        for (let i = 0; i < sketchData.figs.length; i++) {
            if (sketchData.figs[i].dim < 4) {
                sketchData.figs.splice(i, 1);
            }
        }
    }

    static mousePressed(sketchData: SketchData, p) {
        return false;
    }

    static mouseReleased(sketchData: SketchData, p) {

    }
}