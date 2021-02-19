import 'p5';
import p5 from 'p5';
import P5 from 'p5';
import { CanvasSettings, SelectedShape, SelectedAnimation } from './Figures';

export class AnimatedFigure {
  x: number
  y: number
  speed: number
  angle: number
  p5: P5

  // this.pos = pos
  // this.force = createVector(0, 0)
  // this.mass = (2 * PI * size)
  // this.fs = []
  constructor(x, y, s, p5) {
      this.x = x;
      this.y = y;
      this.speed = s;
      this.angle = 0.0;
      this.p5 = p5;
  }

  update(animation: SelectedAnimation) {
    switch (animation) {
      case SelectedAnimation.None:
        break;
      case SelectedAnimation.DownwardGravity:
        break;
      case SelectedAnimation.RadialForce:
        break;
      case SelectedAnimation.Spin:
        this.angle += this.speed;
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
    this.p5.noStroke();
    this.p5.push();
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
    this.p5.noStroke();
    this.p5.push();
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
    this.p5.noStroke();
    this.p5.push();
    this.p5.translate(this.x, this.y);
    this.p5.rotate(this.angle);
    this.p5.triangle(-this.dim/2, 0, 0, this.dim * this.p5.sin(this.p5.PI/3), this.dim/2, 0);
    this.p5.pop();
  }
}

export function applyForces() {

  // apply force towards centre
  nodes.forEach(node => {
    gravity = node.pos.copy().mult(-1).mult(gravityConstant)
    node.force = gravity
  })

  // apply repulsive force between nodes
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      pos = nodes[i].pos
      dir = nodes[j].pos.copy().sub(pos)
      force = dir.div(dir.mag() * dir.mag())
      force.mult(forceConstant)
      nodes[i].force.add(force.copy().mult(-1))
      nodes[j].force.add(force)
    }
  }
}