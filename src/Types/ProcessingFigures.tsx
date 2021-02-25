import 'p5';
import P5 from 'p5';
// import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';
import { SelectedAnimation } from './Figures';
import useSound from 'use-sound';
//import '*.mp3';
import collisionSFX from '../Sounds/collision.mp3';

export class AnimatedFigure {
  x: number
  y: number
  speed: number
  angle: number
  p5: P5
  yspeed: number
  xspeed: number
  timer: number
  spin: number
  dead: boolean

  // Return -1 or 1 randomly
  randSign() {
    return Math.random() < 0.5 ? -1 : 1
  }

  constructor(x, y, s, p5) {
      this.x = x;
      this.y = y;
      this.speed = s*this.randSign();
      this.angle = 0.0;
      this.p5 = p5;
      this.xspeed = s*this.randSign();
      this.yspeed = s*this.randSign();
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

  belowCanvas(y, height) {
    return (y > height+1);
  }
  aboveCanvas(y, height) {
    return (y < -1);
  }
  leftOfCanvas(x, width) {
    return (x < -1);
  }
  rightOfCanvas(x, width) {
    return (x > width+1);
  }

  collision = new Audio(collisionSFX)

  update(selectedAnimation, mouseX, mouseY, width, height) {
    this.timer -= 1;

    if (this.aboveCanvas(this.y, height)) {
      this.y = 1;
    }
    if (this.belowCanvas(this.y, height)) {
      this.y = height-1;
    }
    if (this.leftOfCanvas(this.x, width)) {
      this.x = 1;
    }
    if (this.rightOfCanvas(this.x, width)) {
      this.x = width-1;
    }

    switch(selectedAnimation) {

      case SelectedAnimation.None:
        this.angle += this.speed;
        break;

      case SelectedAnimation.DownwardGravity:
        if (this.y < height-50) {
          this.speed += 0.05;
          this.y += this.speed;
          this.angle += this.spin;
        }
        else if(!this.dead){
          this.dead = true;
          this.collision.play();
        }
        break;

      case SelectedAnimation.WallBounce:

        if (this.y > height || this.y < 0) {
          this.yspeed = -this.yspeed;
          this.collision.play();
        }
        if (this.x > width || this.x < 0) {
          this.xspeed = -this.xspeed;
          this.collision.play();
        }
        if (this.timer < 0 && this.inRange(this.x, this.y, mouseX, mouseY, 50)) {
          this.timer = 60;
          if (this.below(this.y, mouseY, 50)) {
            this.yspeed = Math.abs(this.yspeed);
            this.collision.play();
          }
          if (this.above(this.y, mouseY, 50)) {
            this.yspeed = -Math.abs(this.yspeed);
            this.collision.play();
          }
          if (this.right(this.x, mouseX, 50)) {
            this.xspeed = Math.abs(this.xspeed);
            this.collision.play();
          }
          if (this.left(this.x, mouseX, 50)) {
            this.xspeed = -Math.abs(this.xspeed);
            this.collision.play();
          }
        }
        this.y += 80*this.yspeed;
        this.x += 80*this.xspeed;
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
    this.p5.fill('#36A533')
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
    this.p5.fill('#28306D')
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
    this.p5.noStroke();
    this.p5.fill('#ED1C24');
    this.p5.translate(this.x, this.y);
    this.p5.rotate(this.angle);
    this.p5.triangle(-this.dim/2, 0, 0, this.dim * this.p5.sin(this.p5.PI/3), this.dim/2, 0);
    this.p5.pop();
  }
}