import Sketch from '../Sketch';
import p5, { Vector } from 'p5';

const TRIANGLE_SIZE = 300;
const ELLIPSE_SIZE = 100;
const STROKE_SIZE = 5;

class Scene {
  visibleTriangle: Vector[] = [];
  hiddenTriangle: Vector[] = [];

  setup(p: p5) {
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

  draw(p: p5) {
    p.fill(255).stroke(0).strokeWeight(STROKE_SIZE);
    this.drawTriangle(p, this.visibleTriangle);
    p.fill(255).stroke(0).strokeWeight(0);
    p.push();
    // p.rotate(p.frameCount * 0.01);
    // p.fill(200);
    this.drawTriangle(p, this.hiddenTriangle);
    p.pop();
  }

  drawTriangle(p: p5, triangle: Vector[]) {
    p.triangle(triangle[0].x, triangle[0].y, triangle[1].x, triangle[1].y, triangle[2].x, triangle[2].y);
  }
}

class Scene1 extends Scene {
  draw(p: p5) {
    p.translate(p.width / 2, p.height / 2);
    p.fill(0).strokeWeight(0);
    p.ellipse(this.hiddenTriangle[0].x, this.hiddenTriangle[0].y, ELLIPSE_SIZE);
    p.ellipse(this.hiddenTriangle[1].x, this.hiddenTriangle[1].y, ELLIPSE_SIZE);
    p.ellipse(this.hiddenTriangle[2].x, this.hiddenTriangle[2].y, ELLIPSE_SIZE);
    super.draw(p);
  }
}

class Scene2 extends Scene {
  draw(p: p5) {
    p.translate(p.width / 2, p.height / 2);
    p.push();

    super.draw(p);
    p.pop();

    p.fill(0).strokeWeight(0);
    p.push();
    p.translate(this.hiddenTriangle[0].x, this.hiddenTriangle[0].y);
    // p.rotate(p.frameCount * 0.01);
    p.arc(0, 0, ELLIPSE_SIZE, ELLIPSE_SIZE, -p.PI / 3, (p.PI * 4) / 3, p.PIE);
    p.pop();
    p.push();
    p.translate(this.hiddenTriangle[1].x, this.hiddenTriangle[1].y);
    // p.rotate(p.frameCount * -0.01);

    p.arc(0, 0, ELLIPSE_SIZE, ELLIPSE_SIZE, p.PI / 3, p.PI * 2, p.PIE);
    p.pop();
    p.push();
    p.translate(this.hiddenTriangle[2].x, this.hiddenTriangle[2].y);
    // p.rotate(p.frameCount * 0.01);

    p.arc(0, 0, ELLIPSE_SIZE, ELLIPSE_SIZE, p.PI, (p.PI * 2) / 3, p.PIE);
    p.pop();

    // p.ellipse(this.hiddenTriangle[0].x, this.hiddenTriangle[0].y, ELLIPSE_SIZE);
    // p.ellipse(this.hiddenTriangle[1].x, this.hiddenTriangle[1].y, ELLIPSE_SIZE);
    // p.ellipse(this.hiddenTriangle[2].x, this.hiddenTriangle[2].y, ELLIPSE_SIZE);
  }
}

export default class KanizsaTriangle extends Sketch {
  scene1 = new Scene1();
  scene2 = new Scene2();
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.rectMode(p.CENTER);
    this.scene1.setup(p);
    this.scene2.setup(p);
  }
  draw() {
    const p = this.p;
    p.background(255);
    // this.scene1.draw(p);
    this.scene2.draw(p);
  }
}
