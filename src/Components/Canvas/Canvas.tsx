import React from 'react';
import "./Canvas.css";
import p5Types from 'p5';
import P5 from 'p5';
import p5 from 'p5';

export default function Canvas() {
    let myP5: P5;

    let myRef: React.RefObject<HTMLDivElement> = React.createRef();
  
    let Sketch = (p : P5) => {
        // let x = 100; 
        // let y = 100;
        
        // p.setup = function() {
        //     p.createCanvas(700, 410);
        // };
        
        // p.draw = function() {
        //     p.background(255);
        //     p.fill(100);
        //     p.rect(x,y,50,50);
        // };

        let t = 0; // time variable

        p.setup = function () {
          p.createCanvas(600, 600);
          p.noStroke();
          p.fill(40, 200, 40);
        }
        
        p.draw = function () {
          p.background(100, 100); // translucent background (creates trails)
        
          // make a x and y grid of ellipses
          for (let x = 0; x <= p.width; x = x + 30) {
            for (let y = 0; y <= p.height; y = y + 30) {
              // starting point of each circle depends on mouse position
              const xAngle = p.map(p.mouseX, 0, p.width, -4 * p.PI, 4 * p.PI, true);
              const yAngle = p.map(p.mouseY, 0, p.height, -4 * p.PI, 4 * p.PI, true);
              // and also varies based on the particle's location
              const angle = xAngle * (x / p.width) + yAngle * (y / p.height);
        
              // each particle moves in a circle
              const myX = x + 20 * p.cos(2 * p.PI * t + angle);
              const myY = y + 20 * p.sin(2 * p.PI * t + angle);
        
              p.ellipse(myX, myY, 10); // draw particle
            }
          }
        
          t = t + 0.01; // update time
        }
    }
  
    myP5 = new p5(Sketch, myRef.current)
  
    return (
        <div ref={myRef}>

        </div>
    );  
}
