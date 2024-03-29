import * as HME from 'h264-mp4-encoder';

export class Recorder {
  encoder: any;
  lengthFrames: number;
  enabled: boolean;
  frames = 0;
  webgl: boolean;

  constructor(
    enabled: boolean,
    width: number,
    height: number,
    fps: number,
    lengthFrames: number,
    name: string,
    webgl = false,
    pixelDensity = 1
  ) {
    this.enabled = enabled;
    this.lengthFrames = lengthFrames;
    this.webgl = webgl;
    if (!enabled) return;
    HME.createH264MP4Encoder().then((e: any) => {
      this.encoder = e;
      // Must be a multiple of 2.
      this.encoder.outputFilename = name;
      this.encoder.width = width * pixelDensity;
      this.encoder.height = height * pixelDensity;
      this.encoder.frameRate = fps;
      this.encoder.kbps = 50000; // video quality
      this.encoder.groupOfPictures = 10; // lower if you have fast actions.
      this.encoder.initialize();
    });
  }

  step() {
    if (!this.enabled) return;
    if (this.webgl) {
      this.downloadFrame();
    } else {
      // 2d
      // @ts-ignore
      let ctx = document.getElementById('defaultCanvas0').getContext('2d');
      this.encoder.addFrameRgba(ctx.getImageData(0, 0, this.encoder.width, this.encoder.height).data);
    }
    this.frames++;
    if (this.frames >= this.lengthFrames) {
      noLoop();
      console.log('done');
      if (!this.webgl) {
        this.encoder.finalize();
        const uint8Array = this.encoder.FS.readFile(this.encoder.outputFilename);
        const anchor = document.createElement('a');
        anchor.href = URL.createObjectURL(new Blob([uint8Array], { type: 'video/mp4' }));
        anchor.download = `${this.encoder.outputFilename}.mp4`;
        anchor.click();
        this.encoder.delete();
      }
    }
  }

  downloadFrame() {
    var link = document.createElement('a');
    link.download = `frame-${this.frames}.png`;
    // @ts-ignore
    link.href = document.getElementById('defaultCanvas0').toDataURL('image/png');
    link.click();
  }
}
