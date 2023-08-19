import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { Graphics, Image } from 'p5';
import { chains, pair } from './types';
import { PALETTE } from '../../utils/colors.ts';

const WEIGHTS = [
  0.1, // square
  0.2, // circle
  0.3, // line
  0.4, // rectangle
];

const MEDIAN = 12;
const VARIANCE = 4;

abstract class Shape {
  constructor(public color: any) {}
  draw(frame: Graphics, x: number, y: number, a: number) {
    frame.push();
    frame.translate(x, y);
    frame.rotate(a);
    frame.fill(this.color);
    frame.noStroke();
    this.drawShape(frame);
    frame.pop();
  }

  abstract drawShape(frame: Graphics): void;
}

class Square extends Shape {
  constructor(public color: any, public size: number) {
    super(color);
  }
  drawShape(frame: Graphics) {
    frame.rect(0, 0, this.size, this.size);
  }
}

class Circle extends Shape {
  constructor(public color: any, public size: number) {
    super(color);
  }
  drawShape(frame: Graphics) {
    frame.ellipse(0, 0, this.size, this.size);
  }
}

class Rectangle extends Shape {
  constructor(public color: any, public width: number, public height: number) {
    super(color);
  }
  drawShape(frame: Graphics) {
    frame.rect(0, 0, this.width, this.height);
  }
}

class Line extends Shape {
  orientation: number;
  constructor(public color: any, public width: number) {
    super(color);
    this.orientation = Math.random();
  }
  drawShape(frame: Graphics) {
    frame.rect(0, 0, this.orientation < 0.5 ? 5 : this.width, this.orientation < 0.5 ? this.width : 5);
  }
}
let template: Shape[] = [];

export function generateTemplate() {
  let result: Shape[] = [];
  let numOfShapes = int(randomGaussian(MEDIAN, VARIANCE));
  numOfShapes = numOfShapes > 21 ? 21 : numOfShapes < 5 ? 5 : numOfShapes; //clamp
  const arr = Array.from({ length: 21 }, (_, index) => index)
    .sort(() => Math.random() - 0.5)
    .slice(0, numOfShapes);
  arr.forEach((index) => {
    // for (let index = 0; index < 21; index++) {
    let p = random();
    if (p < WEIGHTS[0]) {
      // console.log(index, 'square');
      result[index] = new Square(random(PALETTE), random(30, 90));
    } else if (p < WEIGHTS[1] + WEIGHTS[1]) {
      // console.log(index, 'circle');
      result[index] = new Circle(random(PALETTE), random(30, 90));
    } else if (p < WEIGHTS[0] + WEIGHTS[1] + WEIGHTS[2]) {
      // console.log(index, 'line');
      result[index] = new Line(random(PALETTE), random(100, 500));
    } else {
      // console.log(index, 'rect');
      result[index] = new Rectangle(random(PALETTE), random(50, 300), random(50, 300));
    }
  });
  console.log('===========================');
  console.log(numOfShapes);
  console.log(arr);

  console.log('===========================');

  template = result;
}

function calculateAngle(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx); // Result in radians
  return angle;
}

export function generateSuprematismImage(result: HandLandmarkerResult, frame: Graphics, img: Image) {
  // if (frameCount === 1) {
  //   template = generateTemplate();
  // }
  frame.image(img, 0, 0, frame.width, frame.height);
  if (!result?.landmarks?.length) return;
  for (let landmark of result.landmarks) {
    for (let i = 0; i < landmark.length; i++) {
      const marker = landmark[i];
      const { x, y } = marker;
      if (!template[i]) continue;

      const pairMarker = landmark[pair[i]];

      const angle = !!pairMarker ? calculateAngle(marker.x, marker.y, pairMarker.x, pairMarker.y) : 0;
      template[i].draw(frame, x * frame.width, y * frame.height, angle);
    }
  }
}
