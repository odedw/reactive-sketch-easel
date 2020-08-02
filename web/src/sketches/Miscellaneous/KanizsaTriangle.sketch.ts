import Sketch from '../Sketch';
import p5, { Vector } from 'p5';
import { gsap } from 'gsap';

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

  draw(p: p5, rotation: number) {
    p.fill(250).stroke(0).strokeWeight(STROKE_SIZE);
    this.drawTriangle(p, this.visibleTriangle);
    p.fill(250).stroke(0).strokeWeight(0);
    p.push();
    p.rotate(rotation);
    this.drawTriangle(p, this.hiddenTriangle);
    p.pop();
  }

  drawTriangle(p: p5, triangle: Vector[]) {
    p.triangle(triangle[0].x, triangle[0].y, triangle[1].x, triangle[1].y, triangle[2].x, triangle[2].y);
  }
}

class Scene1 extends Scene {
  draw(p: p5, rotation: number) {
    p.translate(p.width / 2, p.height / 2);
    p.fill(0).strokeWeight(0);
    p.ellipse(this.hiddenTriangle[0].x, this.hiddenTriangle[0].y, ELLIPSE_SIZE);
    p.ellipse(this.hiddenTriangle[1].x, this.hiddenTriangle[1].y, ELLIPSE_SIZE);
    p.ellipse(this.hiddenTriangle[2].x, this.hiddenTriangle[2].y, ELLIPSE_SIZE);
    super.draw(p, rotation);
  }
}

class Scene2 extends Scene {
  draw(p: p5, rotation: number) {
    p.translate(p.width / 2, p.height / 2);
    p.push();

    super.draw(p, 0);
    p.pop();

    p.fill(0).strokeWeight(0);

    p.push();
    p.translate(this.hiddenTriangle[0].x, this.hiddenTriangle[0].y);
    p.rotate(rotation);
    p.arc(0, 0, ELLIPSE_SIZE, ELLIPSE_SIZE, -p.PI / 3, (p.PI * 4) / 3, p.PIE);
    p.pop();

    p.push();
    p.translate(this.hiddenTriangle[1].x, this.hiddenTriangle[1].y);
    p.rotate(-rotation);
    p.arc(0, 0, ELLIPSE_SIZE, ELLIPSE_SIZE, p.PI / 3, p.PI * 2, p.PIE);
    p.pop();

    p.push();
    p.translate(this.hiddenTriangle[2].x, this.hiddenTriangle[2].y);
    p.rotate(rotation);
    p.arc(0, 0, ELLIPSE_SIZE, ELLIPSE_SIZE, p.PI, (p.PI * 2) / 3, p.PIE);
    p.pop();
  }
}

export default class KanizsaTriangle extends Sketch {
  scenes = [new Scene1(), new Scene2()];
  scene = 1;
  rotation: number = 0;
  create(): p5 {
    return super.create(800, 800);
  }

  rotate() {
    gsap.fromTo(
      this,
      {
        rotation: 0,
      },
      {
        rotation: this.p.PI * 2,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          this.scene = this.scene === 0 ? 1 : 0;
          this.rotate();
        },
      }
    );
  }
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);
    p.rectMode(p.CENTER);
    this.scenes.forEach((s) => s.setup(p));
    this.rotate();
  }
  draw() {
    const p = this.p;
    p.background(250);

    this.scenes[this.scene].draw(p, this.rotation);
  }
}
