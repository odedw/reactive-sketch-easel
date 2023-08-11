import { HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { Graphics, Image } from 'p5';
import { chains } from './types';

export function generateSuprematismImage(result: HandLandmarkerResult, frame: Graphics, img: Image) {
  // frame.image(inputFrame, 0, 0, frame.width, frame.height);
  frame.image(img, 0, 0, frame.width, frame.height);
  fill('yellow');
  stroke('black');
  if (!result?.landmarks?.length) return;
  for (let landmark of result.landmarks) {
    for (let chain of chains) {
      for (let i = 0; i < chain.length - 1; i++) {
        const marker1 = landmark[chain[i]];
        const marker2 = landmark[chain[i + 1]];
        const { x: x1, y: y1 } = marker1;
        const { x: x2, y: y2 } = marker2;
        frame.line(x1 * frame.width, y1 * frame.height, x2 * frame.width, y2 * frame.height);
      }
    }
  }
  // console.log(
  //   gestureResult?.landmarks?.length,
  //   gestureResult?.landmarks?.[0].length,
  //   gestureResult?.worldLandmarks?.length,
  //   gestureResult?.handednesses?.length,
  //   gestureResult?.gestures?.length
  // );
  // for (let landmark of result.landmarks) {
  //   for (let marker of landmark) {
  //     const { x, y } = marker;
  //     frame.ellipse(x * width, y * height, 10, 10);
  //   }
  // }
}
