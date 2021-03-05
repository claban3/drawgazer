import 'p5';
import p5 from 'p5';
import P5 from 'p5';
// import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import useSound from 'use-sound';
//import '*.mp3';
import collisionSFX from '../Sounds/collision.mp3';
const Collides = require('p5collide');

export class AnimatedFigure {
  p5: P5
  pos: P5.Vector
  force: P5.Vector
  velocity: P5.Vector
  mass: number
  angle: number
  timer: number
  dead: boolean
  spin: number
  dim: number
  collision: HTMLAudioElement = new Audio(collisionSFX)
  // Return -1 or 1 randomly
  randSign() {
    return Math.random() < 0.5 ? -1 : 1
  }

  constructor(x, y, s, d, p5) {
      this.p5 = p5;
      this.pos = p5.createVector(x, y);
      this.velocity = p5.createVector(s * this.randSign(), s * this.randSign());
      this.force = p5.createVector(0, 0); 
      this.mass = p5.PI * d;

      this.angle = 0.0;
      this.timer = 60;
      this.spin = 0.02*this.randSign();
      this.dead = false;
  }

  // Helper Functions
  inRange(x, y, mouseX, mouseY, range) {
    return (x >= mouseX-range && x <= mouseX+range && 
            y >= mouseY-range && y <= mouseY+range);
  }

  below(y, mouseY, range) {
    return (y > mouseY && y < mouseY+range);
  }
  
  above(y, mouseY, range) {
    return (y < mouseY && y > mouseY-range);
  }
  
  left(x, mouseX, range) {
    return (x < mouseX && x > mouseX-range);
  }
  
  right(x, mouseX, range) {
    return (x > mouseX && x < mouseX-range);
  }
  
  collideCanvasBottom(canvasWidth, canvasHeight) {
    return false;
  }

  static mouseOnCanvas(p: P5, canvasWidth, canvasHeight) {
    return (
      p.mouseX < canvasWidth && p.mouseX > 0 && 
      p.mouseY < canvasHeight && p.mouseY > 0
    );
  }
  update(width, height) {
    this.timer -= 1;
  }

  display() {}
}

export class CircleFigure extends AnimatedFigure {
  dim: number
  constructor(x, y, s, d, p5: P5) {
    super(x, y, s, d, p5);
    this.dim = d;
  }

  collideCanvasBottom(canvasWidth, canvasHeight) {
    return Collides.collideLineCircle(0, canvasHeight, canvasWidth, canvasHeight, this.pos.x, this.pos.y, this.dim);
  }

  display() {
    this.p5.push();
    this.p5.stroke(1);
    this.p5.fill('#36A533')
    this.p5.ellipse(this.pos.x, this.pos.y, this.dim, this.dim);
    this.p5.pop();
  }
}

export class SquareFigure extends AnimatedFigure {
  dim: number
  constructor(x, y, s, d, p5) {
    super(x, y, s, d, p5);
    this.dim = d;
  }

  collideCanvasBottom(canvasWidth, canvasHeight) {
    return Collides.collideLineRect(0, canvasHeight, canvasWidth, canvasHeight, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  display() {
    this.p5.push();
    this.p5.noStroke();
    this.p5.fill('#28306D')
    // this.p5.translate(this.pos.x, this.pos.y);
    // this.p5.rotate(this.angle);
    this.p5.square(this.pos.x, this.pos.y, this.dim);
    this.p5.pop();
  }
}

export class TriangleFigure extends AnimatedFigure {
  dim: number
  constructor(x, y, s, d, p5) {
    super(x, y, s, d, p5);
    this.dim = d;
  }
  
  corners(): P5.Vector[] {
    let base_half = (this.dim / 2) * this.p5.cos(30);
    let x1 = this.pos.x - base_half;
    let y1 = this.pos.y - (this.dim / 2);
    
    let x2 = this.pos.x;
    let y2 = this.pos.y + this.dim / 2;
    
    let x3 = this.pos.x + base_half;
    let y3 = this.pos.y + this.dim / 2;

    return [this.p5.createVector(x1,y1), this.p5.createVector(x2,y2), this.p5.createVector(x3,y3)];
  }

  collideCanvasBottom(canvasWidth, canvasHeight) {
    let points = this.corners();
    return Collides.collideLinePoly(0, canvasHeight, canvasWidth, canvasHeight, points);
  }

  display() {
    this.p5.push();
    this.p5.noStroke();
    this.p5.fill('#ED1C24');
    this.p5.angleMode(this.p5.DEGREES);
    let base_half = (this.dim / 2) * this.p5.cos(15);
    let x1 = this.pos.x - base_half;
    let y1 = this.pos.y + (this.dim / 2);
    
    let x2 = this.pos.x;
    let y2 = this.pos.y - (this.dim / 2);
    
    let x3 = this.pos.x + base_half;
    let y3 = this.pos.y + (this.dim / 2);

    this.p5.triangle(x1, y1, x2, y2, x3, y3);
    this.p5.pop();
  }
}
