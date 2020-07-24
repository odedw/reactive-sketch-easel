import Sketch from '../Sketch';

export default class MusicVisualizer extends Sketch {
  audioIn: any;
  setup() {
    const p = this.p;
    p.createCanvas(this.w, this.h);

    // @ts-ignore
    this.audioIn = new window.p5.AudioIn();
    this.audioIn.start();
    console.log('===========================');
    // this.audioIn.getSources((deviceList) => {
    //   if (deviceList.length > 0) {
    //     //     //set the source to the first item in the deviceList array
    //     //     audioIn.setSource(0);
    //     let currentSource = deviceList[this.audioIn.currentSource];
    //     console.log(currentSource.deviceId);
    //   }
    // });
    // const audioSelect = document.getElementById('audio');
    // let count = 0;
    // navigator.mediaDevices
    //   .enumerateDevices()
    //   .then(function (devices) {
    //     devices.forEach(function (device) {
    //       var option = document.createElement('option');
    //       option.value = device.deviceId;
    //       if (device.kind === 'audioinput') {
    //         count++;
    //         option.text = device.label || 'mic' + count;
    //         audioSelect.appendChild(option);
    //       }
    //     });
    //   })
    //   .catch(function (err) {
    //     console.log(err.name + ': ' + err.message);
    //   });

    // if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
    //   console.log('enumerateDevices() not supported.');
    //   return;
    // }

    // // List cameras and microphones.

    // navigator.mediaDevices
    //   .enumerateDevices()
    //   .then(function (devices) {
    //     devices.forEach(function (device) {
    //       console.log(device.kind + ': ' + device.label + ' id = ' + JSON.stringify(device));
    //     });
    //   })
    //   .catch(function (err) {
    //     console.log(err.name + ': ' + err.message);
    //   });
  }

  draw() {
    const p = this.p;
    p.background(0);
    let vol = this.audioIn.getLevel();
    let size = p.map(vol, 0, 1, 0, p.height) * 10;
    p.fill(0).stroke(255).strokeWeight(30);

    p.ellipse(this.center.x, this.center.y, p.height / 4 + size, p.height / 4 + size);
  }
}
