import 'p5';
import p5 from 'p5';
import P5 from 'p5';
// import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import useSound from 'use-sound';
//import '*.mp3';
import collisionSFX from '../Sounds/collision.mp3';
import * as Collides from 'p5collide';

const MAX_SPEED = 10;

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
      this.velocity = p5.createVector(100 * s * this.randSign(),100 * s * this.randSign());
      this.force = p5.createVector(0, 0); 
      this.mass = p5.PI * d;

      this.angle = 0.0;
      this.timer = 60;
      this.spin = 0.02*this.randSign();
      this.dead = false;
  }

  collideWithMouse() {
    return false;
  }
  
  collideCanvasBottom(canvasWidth, canvasHeight) {
    return false;
  }
  
  collideCanvasTop(canvasWidth, canvasHeight) {
    return false;
  }
  
  collideCanvasLeft(canvasWidth, canvasHeight) {
    return false;
  }
  
  collideCanvasRight(canvasWidth, canvasHeight) {
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

  collideWithMouse() {
    return Collides.collidePointCircle(this.p5.mouseX, this.p5.mouseY, this.pos.x, this.pos.y, this.dim);
  }

  collideCanvasBottom(canvasWidth, canvasHeight) {
    return Collides.collideLineCircle(0, canvasHeight, canvasWidth, canvasHeight, this.pos.x, this.pos.y, this.dim);
  }
  
  collideCanvasTop(canvasWidth, canvasHeight) {
    return Collides.collideLineCircle(0, 0, canvasWidth, 0, this.pos.x, this.pos.y, this.dim);
  }

  collideCanvasLeft(canvasWidth, canvasHeight) {
    return Collides.collideLineCircle(0, 0, 0, canvasHeight, this.pos.x, this.pos.y, this.dim);
  }
  
  collideCanvasRight(canvasWidth, canvasHeight) {
    return Collides.collideLineCircle(canvasWidth, 0, canvasWidth, canvasHeight, this.pos.x, this.pos.y, this.dim);
  }

  display() {
    this.p5.push();
    if (this.velocity.mag() > MAX_SPEED) {
      this.velocity.normalize().mult(MAX_SPEED);
    }
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

  collideWithMouse() {
    return Collides.collidePointRect(this.p5.mouseX, this.p5.mouseY, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  collideCanvasBottom(canvasWidth, canvasHeight) {
    return Collides.collideLineRect(0, canvasHeight, canvasWidth, canvasHeight, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  collideCanvasTop(canvasWidth, canvasHeight) {
    return Collides.collideLineRect(0, 0, canvasWidth, 0, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  collideCanvasLeft(canvasWidth, canvasHeight) {
    return Collides.collideLineRect(0, 0, 0, canvasHeight, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  collideCanvasRight(canvasWidth, canvasHeight) {
    return Collides.collideLineRect(canvasWidth, 0, canvasWidth, canvasHeight, this.pos.x, this.pos.y, this.dim, this.dim);
  }
  
  display() {
    this.p5.push();
    if (this.velocity.mag() > MAX_SPEED) {
      this.velocity.normalize().mult(MAX_SPEED);
    }
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

  collideWithMouse() {
    return Collides.collidePointPoly(this.p5.mouseX, this.p5.mouseY, this.corners());
  }

  collideCanvasBottom(canvasWidth, canvasHeight) {
    return Collides.collideLinePoly(0, canvasHeight, canvasWidth, canvasHeight, this.corners());
  }

  collideCanvasTop(canvasWidth, canvasHeight) {
    return Collides.collideLinePoly(0, 0, canvasWidth, 0, this.corners());
  }
  
  collideCanvasLeft(canvasWidth, canvasHeight) {
    return Collides.collideLinePoly(0, 0, 0, canvasHeight, this.corners());
  }
  
  collideCanvasRight(canvasWidth, canvasHeight) {
    return Collides.collideLinePoly(canvasWidth, 0, canvasWidth, canvasHeight, this.corners());
  }

  display() {
    this.p5.push();
    if (this.velocity.mag() > MAX_SPEED) {
      this.velocity.normalize().mult(MAX_SPEED);
    }
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
