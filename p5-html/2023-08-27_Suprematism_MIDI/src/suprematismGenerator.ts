import { Graphics, Vector } from 'p5';
import { chains, pair } from './types';
// @ts-ignore
import { randomPalette, PALETTE } from '../../utils/colors.ts';
// @ts-ignore
import OpenSimplexNoise from '../../utils/OpenSimplexNoise';

const WEIGHTS = [
  0.1, // square
  0.2, // circle
  0.3, // line
  0.4, // rectangle
];

// @ts-ignore
const noise = new OpenSimplexNoise(Date.now());
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
let markerOrder: number[] = [];
let numOfShapes = 0;
let noiseBackground: Graphics;

export function generateTemplate() {
  let result: Shape[] = [];
  numOfShapes = int(randomGaussian(MEDIAN, VARIANCE));
  numOfShapes = numOfShapes > 21 ? 21 : numOfShapes < 5 ? 5 : numOfShapes; //clamp
  markerOrder = Array.from({ length: 21 }, (_, index) => index).sort(() => Math.random() - 0.5);
  markerOrder.forEach((index) => {
    // for (let index = 0; index < 21; index++) {
    let p = random();
    // @ts-ignore
    const c: string = color(random(PALETTE) as string);
    const shapeColor = color(red(c), green(c), blue(c), 255);
    if (p < WEIGHTS[0]) {
      // console.log(index, 'square');
      result[index] = new Square(shapeColor, random(30, 90));
    } else if (p < WEIGHTS[1] + WEIGHTS[1]) {
      // console.log(index, 'circle');
      result[index] = new Circle(shapeColor, random(30, 90));
    } else if (p < WEIGHTS[0] + WEIGHTS[1] + WEIGHTS[2]) {
      // console.log(index, 'line');
      result[index] = new Line(shapeColor, random(100, 500));
    } else {
      // console.log(index, 'rect');
      result[index] = new Rectangle(shapeColor, random(50, 300), random(50, 300));
    }
  });
  // console.log('===========================');
  // console.log(numOfShapes);
  // console.log(arr);

  // console.log('===========================');

  template = result;

  // @ts-ignore
  if (!noiseBackground) noiseBackground = createGraphics(width, height);
  // noiseBackground = createGraphics(width, height);
  // noiseBackground.background(255); // Clear the graphics buffer

  // Generate Perlin noise for the entire buffer
  noiseBackground.loadPixels();
  for (let x = 0; x < noiseBackground.width; x++) {
    for (let y = 0; y < noiseBackground.height; y++) {
      const index = (x + y * noiseBackground.width) * 4;
      const brightness = map(noise.noise3D(x * 0.8, y * 0.8, 0), 0, 1, 230, 255);
      noiseBackground.pixels[index] = brightness;
      noiseBackground.pixels[index + 1] = brightness;
      noiseBackground.pixels[index + 2] = brightness;
      noiseBackground.pixels[index + 3] = 200; // Fully opaque
    }
  }
  noiseBackground.updatePixels();
}

function calculateAngle(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const angle = Math.atan2(dy, dx); // Result in radians
  return angle;
}

export function generateSuprematismImage(points: Vector[], frame: Graphics, showPoints: boolean) {
  // @ts-ignore
  // frame.image(capture, 0, 0, frame.width, frame.height);
  const includedMarkers = markerOrder.slice(0, numOfShapes);
  frame.image(noiseBackground, 0, 0, frame.width, frame.height);
  // if (!result?.landmarks?.length) return;

  for (let i = 0; i < points.length; i++) {
    const marker = points[i];
    const { x, y } = marker;
    if (!template[i]) continue;
    if (!includedMarkers.includes(i)) continue;

    const pairMarker = points[pair[i]];

    const angle = !!pairMarker ? calculateAngle(marker.x, marker.y, pairMarker.x, pairMarker.y) : 0;
    template[i].draw(frame, x * frame.width, y * frame.height, angle);
  }
  if (showPoints) {
    frame.fill(0);
    points.forEach((p) => {
      frame.ellipse(p.x * frame.width, p.y * frame.height, 10, 10);
    });
  }
}

export function randomizeColors() {
  randomPalette();
  template.forEach((shape) => {
    // @ts-ignore
    const c: string = color(random(PALETTE) as string);
    const shapeColor = color(red(c), green(c), blue(c), 255);
    shape.color = shapeColor;
  });
}

export function setNumShapes(n: number) {
  numOfShapes = n;
  // clamp
  numOfShapes = numOfShapes > 21 ? 21 : numOfShapes < 0 ? 0 : numOfShapes;
}

// function drawHand(result: HandLandmarkerResult, frame: Graphics) {
//   stroke('black');
//   for (let landmark of result.landmarks) {
//     for (let chain of chains) {
//       for (let i = 0; i < chain.length - 1; i++) {
//         const marker1 = landmark[chain[i]];
//         const marker2 = landmark[chain[i + 1]];
//         const { x: x1, y: y1 } = marker1;
//         const { x: x2, y: y2 } = marker2;
//         frame.line(x1 * frame.width, y1 * frame.height, x2 * frame.width, y2 * frame.height);
//       }
//     }
//     frame.line(
//       landmark[1].x * frame.width,
//       landmark[1].y * frame.height,
//       landmark[5].x * frame.width,
//       landmark[5].y * frame.height
//     );
//     frame.line(
//       landmark[5].x * frame.width,
//       landmark[5].y * frame.height,
//       landmark[9].x * frame.width,
//       landmark[9].y * frame.height
//     );
//     frame.line(
//       landmark[9].x * frame.width,
//       landmark[9].y * frame.height,
//       landmark[13].x * frame.width,
//       landmark[13].y * frame.height
//     );
//     frame.line(
//       landmark[13].x * frame.width,
//       landmark[13].y * frame.height,
//       landmark[17].x * frame.width,
//       landmark[17].y * frame.height
//     );
//     for (let i = 0; i < landmark.length; i++) {
//       const marker = landmark[i];
//       const { x, y } = marker;
//       frame.ellipse(x * frame.width, y * frame.height, 10, 10);
//     }
//   }
//   noStroke();
// }
