import 'p5';
import P5 from 'p5';
import { SelectedAnimation } from './Figures';

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

  update(selectedAnimation) {
    switch(selectedAnimation) {

      case SelectedAnimation.None:
        this.angle += this.speed;
        break;

      case SelectedAnimation.DownwardGravity:
        if (this.y < 450) {
          this.speed += 0.05;
          this.y += this.speed;
          this.angle += -0.02;
        }
        break;
        
      case SelectedAnimation.RadialForce:
        break;
    }
  }

  display() {}
}

export class CircleFigure extends AnimatedFigure {
  dim: number
  constructor(x, y, s, d, p5) {
    super(x, y, s, p5);
    this.dim = d;
  }

  display() {
    this.p5.push();
    this.p5.noStroke();
    this.p5.translate(this.x, this.y);
    this.p5.rotate(this.angle);
    this.p5.ellipse(-this.dim/2, 0, this.dim, this.dim);
    this.p5.pop();
  }
}

export class SquareFigure extends AnimatedFigure {
  dim: number
  constructor(x, y, s, d, p5) {
    super(x, y, s, p5);
    this.dim = d;
  }

  display() {
    this.p5.push();
    this.p5.noStroke();
    this.p5.translate(this.x, this.y);
    this.p5.rotate(this.angle);
    this.p5.square(-this.dim/2, 0, this.dim);
    this.p5.pop();
  }
}

export class TriangleFigure extends AnimatedFigure {
  dim: number
  constructor(x, y, s, d, p5) {
    super(x, y, s, p5);
    this.dim = d;
  }

  display() {
    this.p5.push();
    this.p5.stroke(100, 200, 240);
    this.p5.noFill();
    this.p5.translate(this.x, this.y);
    this.p5.rotate(this.angle);
    this.p5.triangle(-this.dim/2, 0, 0, this.dim * this.p5.sin(this.p5.PI/3), this.dim/2, 0);
    this.p5.pop();
  }
}