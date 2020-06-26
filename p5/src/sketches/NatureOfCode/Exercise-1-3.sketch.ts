import Sketch from "../Sketch";
import { Vector } from "p5";

const SPHERE_SIZE = 70;
export default class ExerciseI9 extends Sketch {
  location!: Vector;
  velocity!: Vector;
  setup() {
    this.p.createCanvas(this.w, this.h, this.p.WEBGL);
    this.location = this.p.createVector(0, 0, 0);
    this.velocity = this.p.createVector(4, 4, 4);
  }
  draw() {
    const p = this.p;
    this.p.background(200);

    p.push();
    p.translate(this.location.x, this.location.y, this.location.z);
    p.rotateZ(p.frameCount * 0.01);
    p.rotateX(p.frameCount * 0.01);
    p.rotateY(p.frameCount * 0.01);
    p.sphere(70);
    p.pop();
    this.location.add(this.velocity);
    if (
      this.location.x > this.w / 2 - SPHERE_SIZE / 2 ||
      this.location.x < -this.w / 2 + SPHERE_SIZE / 2
    ) {
      this.velocity.x = this.velocity.x * -1;
    }
    if (
      this.location.y > this.h / 2 - SPHERE_SIZE / 2 ||
      this.location.y < -this.h / 2 + SPHERE_SIZE / 2
    ) {
      this.velocity.y = this.velocity.y * -1;
    }
    if (
      this.location.z > this.h - SPHERE_SIZE / 2 ||
      this.location.z < 0 + SPHERE_SIZE / 2
    ) {
      this.velocity.z = this.velocity.z * -1;
    }
  }
}
