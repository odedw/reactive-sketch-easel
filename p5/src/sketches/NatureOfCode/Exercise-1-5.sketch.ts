import Sketch from "../Sketch";
import p5, { Vector } from "p5";

class Mover {
  location: Vector;
  velocity: Vector;
  acceleration: Vector;
  topspeed = 10;
  constructor(p: p5, l?: Vector, v?: Vector, a?: Vector) {
    this.location = l || p.createVector(0, 0);
    this.velocity = v || p.createVector(0, 0);
    this.acceleration = a || p.createVector(0, 0);
  }

  update(p: p5) {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);
  }

  display(p: p5) {
    p.stroke(0);
    p.fill(255);
    p.ellipse(this.location.x, this.location.y, 16, 16);
  }

  checkEdges(p: p5) {
    if (this.location.x > p.width) {
      this.location.x = 0;
    } else if (this.location.x < 0) {
      this.location.x = p.width;
    }

    if (this.location.y > p.height) {
      this.location.y = 0;
    } else if (this.location.y < 0) {
      this.location.y = p.height;
    }
  }
}

export default class ExerciseI9 extends Sketch {
  mover!: Mover;
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    this.mover = new Mover(this.p, this.center);
  }
  draw() {
    const p = this.p;
    p.background(200);
    if (p.keyIsDown(p.UP_ARROW)) {
      this.mover.acceleration = p.createVector(0.1, 0);
    } else if (p.keyIsDown(p.DOWN_ARROW)) {
      this.mover.acceleration = p.createVector(-0.1, 0);
    }
    this.mover.update(p);
    this.mover.checkEdges(p);
    this.mover.display(p);
  }
}
