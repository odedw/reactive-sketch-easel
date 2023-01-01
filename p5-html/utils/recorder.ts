// let recordedFrames = 0;
// let numFrames; // num of frames to record

// function preloadRecorder() {
//   if (!SHOULD_RECORD) return;
//   const scripts = document.getElementsByTagName('script');
//   const filepath = scripts[scripts.length - 1].src;
//   const name = `${new Date().toISOString().split('T')[0]}_${filepath.split('/')[filepath.split('/').length - 2]}`;
//   numFrames = FPS * RECORD_TIME;
//   HME.createH264MP4Encoder().then((enc) => {
//     encoder = enc;
//     encoder.outputFilename = name;
//     encoder.width = WIDTH * pixelDensity();
//     encoder.height = HEIGHT * pixelDensity();
//     encoder.frameRate = FPS;
//     encoder.kbps = 50000; // video quality
//     encoder.groupOfPictures = 10; // lower if you have fast actions.
//     encoder.initialize();
//   });
// }

// function recorderStep() {
//   // keep adding new frame
//   if (SHOULD_RECORD) {
//     encoder.addFrameRgba(drawingContext.getImageData(0, 0, encoder.width, encoder.height).data);
//     recordedFrames++;
//     if (recordedFrames % 100 === 0) {
//       console.log(`Recorded ${recordedFrames} of ${numFrames} frames`);
//     }
//   }
//   // finalize encoding and export as mp4
//   if (recordedFrames === numFrames) {
//     console.log('recording stopped');
//     encoder.finalize();
//     const uint8Array = encoder.FS.readFile(encoder.outputFilename);
//     const anchor = document.createElement('a');
//     anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }));
//     anchor.download = encoder.outputFilename;
//     anchor.click();
//     encoder.delete();
//     noLoop();
//   }
// }
