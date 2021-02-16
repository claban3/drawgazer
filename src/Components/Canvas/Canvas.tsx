import React from 'react';
import "./Canvas.css";
import p5Types from 'p5';
import P5 from 'p5';
import p5 from 'p5';

class Canvas extends React.Component {
    myP5: P5;
    myRef: React.RefObject<HTMLDivElement>;
    constructor(props : any) {
      super(props)
      this.myRef = React.createRef();
    }
  
    Sketch = (p : P5) => {
  
        let x = 100; 
        let y = 100;
        
        p.setup = function() {
            p.createCanvas(700, 410);
        };
        
        p.draw = function() {
            p.background(255);
            p.fill(100);
            p.rect(x,y,50,50);
        };
    }
  
    componentDidMount() {
      this.myP5 = new p5(this.Sketch, this.myRef.current)
    }
  
    render() {
        return (
        <div ref={this.myRef}>

        </div>
        )
    }
}

export default Canvas;