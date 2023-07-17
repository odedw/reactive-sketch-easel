import * as poseDetection from '@tensorflow-models/pose-detection';
import * as tf from '@tensorflow/tfjs-core';
// Register one of the TF.js backends.
import '@tensorflow/tfjs-backend-webgl';
// import '@tensorflow/tfjs-backend-wasm';
// tf.setBackend('rn-webgl');

export async function init() {
  // await tf.setBackend('webgpu');
  await tf.ready();
}
export async function getPoses(imgData: ImageData) {
  const detectorConfig = {
    modelType: poseDetection.movenet.modelType.MULTIPOSE_LIGHTNING,
    enableTracking: true,
    trackerType: poseDetection.TrackerType.BoundingBox,
  };
  const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);
  return detector.estimatePoses(imgData);
}
