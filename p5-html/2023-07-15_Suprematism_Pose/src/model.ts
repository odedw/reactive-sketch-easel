import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';
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

const videoHeight = '360px';
const videoWidth = '480px';
let lastVideoTime = -1;
async function predictWebcam() {
  const webcamElement = document.getElementById('webcam') as HTMLVideoElement;
  let nowInMs = Date.now();
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    landmarks = handLandmarker.detectForVideo(video, nowInMs);
  }

  // canvasCtx.save();
  // canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

  // canvasElement.style.height = videoHeight;
  webcamElement.style.height = videoHeight;
  // canvasElement.style.width = videoWidth;
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
