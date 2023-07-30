import { GestureRecognizer, FilesetResolver, DrawingUtils } from '@mediapipe/tasks-vision';
let runningMode = 'IMAGE';
let gestureResult: any = {};
export const getGestures = () => gestureResult;
let gestureRecognizer: GestureRecognizer;
// Before we can use HandLandmarker class we must wait for it to finish
// loading. Machine Learning models can be large and take a moment to
// get everything needed to run.
export const createGestureRecognizer = async () => {
  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm'
  );
  gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        'https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task',
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
  if (!gestureRecognizer) {
    alert('Please wait for gestureRecognizer to load');
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
  // Now let's start detecting the stream.
  if (runningMode === 'IMAGE') {
    runningMode = 'VIDEO';
    await gestureRecognizer.setOptions({ runningMode: 'VIDEO' });
  }
  let nowInMs = Date.now();
  if (video.currentTime !== lastVideoTime) {
    lastVideoTime = video.currentTime;
    const results = gestureRecognizer.recognizeForVideo(video, nowInMs);
    gestureResult = results;
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
