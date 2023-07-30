import { Graphics } from 'p5';

export function generateSuprematismImage(gestureResult: any, frame: Graphics) {
  // frame.image(inputFrame, 0, 0, frame.width, frame.height);
  frame.background(0);
  fill('yellow');
  stroke('black');
  if (!gestureResult?.landmarks?.length) return;

  // console.log(
  //   gestureResult?.landmarks?.length,
  //   gestureResult?.worldLandmarks?.length,
  //   gestureResult?.handednesses?.length,
  //   gestureResult?.gestures?.length
  // );
  for (let landmark of gestureResult.landmarks) {
    for (let marker of landmark) {
      const { x, y } = marker;
      frame.ellipse(x * width, y * height, 10, 10);
    }
  }
  // gestureResult?.landmarks?.[0]?.forEach((landmark: any) => {
  //   const { x, y } = landmark;
  //   frame.ellipse(x * width, y * height, 10, 10);
  // });
}
