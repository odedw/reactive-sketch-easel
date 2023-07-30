import { Pose } from '@tensorflow-models/pose-detection';
import { Graphics } from 'p5';

export function generateSuprematismImage(gestureResult: any, frame: Graphics) {
  // frame.image(inputFrame, 0, 0, frame.width, frame.height);
  frame.background(0);
  fill('yellow');
  stroke('black');
  gestureResult?.landmarks?.[0]?.forEach((landmark: any) => {
    const { x, y } = landmark;
    frame.ellipse(x * width, y * height, 10, 10);
  });
}
