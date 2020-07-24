import Sketch from '../Sketch';
import { Vector } from 'p5';

const TRIANGLE_SIZE = 300;
const ELLIPSE_SIZE = 100;
const STROKE_SIZE = 5;
export default class KanizsaTriangle extends Sketch {
  visibleTriangle: Vector[] = [];
  hiddenTriangle: Vector[] = [];
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.rectMode(p.CENTER);
    let size = TRIANGLE_SIZE - STROKE_SIZE;
    let altitude = (size * Math.sqrt(3)) / 2;

    this.visibleTriangle.push(p.createVector(0, -(altitude * 2) / 3));
    this.visibleTriangle.push(p.createVector(-size / 2, +altitude / 3));
    this.visibleTriangle.push(p.createVector(+size / 2, +altitude / 3));
    altitude = (TRIANGLE_SIZE * Math.sqrt(3)) / 2;

    this.hiddenTriangle.push(p.createVector(0, (altitude * 2) / 3));
    this.hiddenTriangle.push(p.createVector(-TRIANGLE_SIZE / 2, -altitude / 3));
    this.hiddenTriangle.push(p.createVector(+TRIANGLE_SIZE / 2, -altitude / 3));
  }
  draw() {
    const p = this.p;
    p.background(255);
    // p.rotate(p.frameCount * 0.01);
    p.translate(this.center.x, this.center.y);
    p.fill(0).strokeWeight(0);
    p.ellipse(this.hiddenTriangle[0].x, this.hiddenTriangle[0].y, ELLIPSE_SIZE);
    p.ellipse(this.hiddenTriangle[1].x, this.hiddenTriangle[1].y, ELLIPSE_SIZE);
    p.ellipse(this.hiddenTriangle[2].x, this.hiddenTriangle[2].y, ELLIPSE_SIZE);
    p.fill(255).stroke(0).strokeWeight(STROKE_SIZE);
    this.drawTriangle(this.visibleTriangle);
    p.fill(255).stroke(0).strokeWeight(0);
    // p.rotate(p.frameCount * 0.005);
    this.drawTriangle(this.hiddenTriangle);
  }
  drawTriangle(triangle: Vector[]) {
    this.p.triangle(triangle[0].x, triangle[0].y, triangle[1].x, triangle[1].y, triangle[2].x, triangle[2].y);
  }
}
