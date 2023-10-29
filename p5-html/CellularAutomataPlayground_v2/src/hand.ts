import { HandLandmarker, FilesetResolver, HandLandmarkerResult } from '@mediapipe/tasks-vision';
import { Graphics } from 'p5';
let landmarks: any = {};
let handLandmarker: HandLandmarker;

export const getLandmarks = () => landmarks;
// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
export const createHandLandmarker = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
  );
  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
      delegate: 'GPU',
    },
    runningMode: 'VIDEO',
    numHands: 2,
  });
};

let webcamRunning: Boolean = false;
const video = document.getElementById('webcam') as HTMLVideoElement;

// Enable the live webcam view and start detection.
export function enableCam() {
  if (!handLandmarker) {
    alert('Please wait for handLandmarker to load');
    return;
  }

  webcamRunning = true;

  // getUsermedia parameters.
  const constraints = {
    video: true,
  };

  // Activate the webcam stream.
  navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
    video.srcObject = stream;
    video.addEventListener('loadeddata', predictWebcam);
  });
}

const videoHeight = window.innerHeight - 100 + 'px';
const videoWidth = window.innerWidth - 100 + 'px';
let lastVideoTime = -1;
async function predictWebcam() {
  const webcamElement = document.getElementById('webcam') as HTMLVideoElement;
  let nowInMs = Date.now();
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    landmarks = handLandmarker.detectForVideo(video, nowInMs);
  }
  webcamElement.style.height = videoHeight;
  webcamElement.style.width = videoWidth;
  // if (results.landmarks) {
  //   for (const landmarks of results.landmarks) {
  //     drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
  //       color: '#00FF00',
  //       lineWidth: 5,
  //     });
  //     drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
  //   }
  // }
  // canvasCtx.restore();
  // if (results.gestures.length > 0) {
  //   gestureOutput.style.display = 'block';
  //   gestureOutput.style.width = videoWidth;
  //   const categoryName = results.gestures[0][0].categoryName;
  //   const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
  //   gestureOutput.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %`;
  // } else {
  //   gestureOutput.style.display = 'none';
  // }
  // Call this function again to keep predicting when the browser is ready.
  if (webcamRunning === true) {
    window.requestAnimationFrame(predictWebcam);
  }
}
export const chains = [
  [0, 1, 2, 3, 4],
  [0, 5, 6, 7, 8],
  [0, 9, 10, 11, 12],
  [0, 13, 14, 15, 16],
  [0, 17, 18, 19, 20],
];
export function drawHand(result: HandLandmarkerResult) {
  fill(255);
  // frame.background(0);
  stroke(255);
  // frame.ellipse(width / 2, height / 2, 100, 100);
  push();
  scale(-1, 1);
  translate(-width / 2, -height / 2);
  for (let landmark of result?.landmarks || []) {
    for (let chain of chains) {
      for (let i = 0; i < chain.length - 1; i++) {
        const marker1 = landmark[chain[i]];
        const marker2 = landmark[chain[i + 1]];
        const { x: x1, y: y1 } = marker1;
        const { x: x2, y: y2 } = marker2;
        line(x1 * width, y1 * height, x2 * width, y2 * height);
      }
    }
    // circle(landmark[8].x * width, landmark[8].y * height, 10);
    // ellipse(landmark[8].x * frame.width, landmark[8].y * frame.height, 10, 10);
    line(landmark[1].x * width, landmark[1].y * height, landmark[5].x * width, landmark[5].y * height);
    line(landmark[5].x * width, landmark[5].y * height, landmark[9].x * width, landmark[9].y * height);
    line(landmark[9].x * width, landmark[9].y * height, landmark[13].x * width, landmark[13].y * height);
    line(landmark[13].x * width, landmark[13].y * height, landmark[17].x * width, landmark[17].y * height);
    //   // for (let i = 0; i < landmark.length; i++) {
    //   //   const marker = landmark[i];
    //   //   const { x, y } = marker;
    //   //   ellipse(x * width, y * height, 10, 10);
    //   // }
    //   // ellipse(landmark[4].x * width, landmark[4].y * height, 10, 10);
  }
  pop();
}
