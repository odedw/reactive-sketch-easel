import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { Graphics, Image } from 'p5';
import { chains } from './types';
import { PALETTE } from '../../utils/colors.ts';

// enum Shape {
//   Circle,
//   Square,
// }

abstract class Shape {
  constructor(public color: any) {}
  draw(frame: Graphics, x: number, y: number) {
    frame.fill(this.color);
    frame.noStroke();
  }
}

class Square extends Shape {
  constructor(public color: any, public size: number) {
    super(color);
  }
  draw(frame: Graphics, x: number, y: number) {
    super.draw(frame, x, y);
    frame.rect(x, y, this.size, this.size);
  }
}

class Circle extends Shape {
  constructor(public color: any, public size: number) {
    super(color);
  }
  draw(frame: Graphics, x: number, y: number) {
    super.draw(frame, x, y);
    frame.ellipse(x, y, this.size, this.size);
  }
}

class Rectangle extends Shape {
  constructor(public color: any, public width: number, public height: number) {
    super(color);
  }
  draw(frame: Graphics, x: number, y: number) {
    super.draw(frame, x, y);
    frame.rect(x, y, this.width, this.height);
  }
}

class Line extends Shape {
  orientation: number;
  constructor(public color: any, public width: number) {
    super(color);
    this.orientation = Math.random();
  }
  draw(frame: Graphics, x: number, y: number) {
    super.draw(frame, x, y);
    frame.rect(x, y, this.orientation < 0.5 ? 5 : this.width, this.orientation < 0.5 ? this.width : 5);
  }
}

function generateTemplate(): Shape[] {
  let result: Shape[] = [];
  const numShapes = 3;
  for (const chain of chains) {
    for (const markerIndex of chain) {
      let p = Math.random();
      if (p < 1 / numShapes) {
        result[markerIndex] = new Square(random(PALETTE), random(10, 60));
      } else if (p < 2 / numShapes) {
        result[markerIndex] = new Circle(random(PALETTE), random(10, 60));
      } else if (p < 3 / numShapes) {
        result[markerIndex] = new Line(random(PALETTE), random(100, 300));
      } else {
        result[markerIndex] = new Rectangle(random(PALETTE), random(10, 60), random(10, 60));
      }
    }
  }
  return result;
}

let template: Shape[] = [];
export function generateSuprematismImage(result: HandLandmarkerResult, frame: Graphics, img: Image) {
  if (frameCount === 1) {
    template = generateTemplate();
  }
  frame.image(img, 0, 0, frame.width, frame.height);
  if (!result?.landmarks?.length) return;
  for (let landmark of result.landmarks) {
    for (let i = 0; i < landmark.length; i++) {
      const marker = landmark[i];
      const { x, y } = marker;
      if (!template[i]) return;

      template[i].draw(frame, x * frame.width, y * frame.height);
    }
  }
}
