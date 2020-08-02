import Lifx from 'node-lifx-lan';
import * as config from '../../config.json';

const brightness = process.argv.length >= 3 ? parseFloat(process.argv[2]) : 0.8;
Lifx.createDevice({
  mac: config.device.mac,
  ip: config.device.ip,
})
  .then((d: any) => {
    return d.setColor({ color: { css: '#457b9d', brightness }, duration: 500 }).then(() => d.turnOn({ duration: 0 }));
  })
  .catch((err) => console.log(err))
  .finally(() => process.exit(0));
