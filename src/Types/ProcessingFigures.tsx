import P5 from 'p5';

export class AnimatedFigure {
    x: number
    y: number
    speed: number
    angle: number
    p5: P5
    constructor(x, y, s, p5) {
        this.x = x;
        this.y = y;
        this.speed = s;
        this.angle = 0.0;
        this.p5 = p5;
    }
  
    update() {
        this.angle += this.speed;
    }
}

export class CircleFigure extends AnimatedFigure {
    dim: number
    constructor(x, y, s, d, p5) {
      super(x, y, s, p5);
      this.dim = d;
    }
  
    display() {
      this.p5.noStroke();
      this.p5.push();
      this.p5.translate(this.x, this.y);
      this.angle += this.speed;
      this.p5.rotate(this.angle);
      this.p5.ellipse(-this.dim/2, 0, this.dim, this.dim);
      this.p5.ellipse(this.dim/2, 0, this.dim, this.dim);
      this.p5.pop();
    }
  }