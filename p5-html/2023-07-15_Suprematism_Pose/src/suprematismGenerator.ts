import { Pose } from '@tensorflow-models/pose-detection';
import { Graphics } from 'p5';
export function generateSuprematismImage(poses: Pose[], frame: Graphics, inputFrame: Graphics) {
  // frame.image(inputFrame, 0, 0, frame.width, frame.height);
  frame.background(0);
  fill('yellow');
  stroke('black');
  if (!!poses.length) {
    poses.forEach((pose) => {
      pose.keypoints.forEach((keypoint) => {
        const { x, y } = keypoint;
        frame.ellipse(x, y, 10, 10);
      });
    });
  }
}
