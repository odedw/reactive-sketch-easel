import Lifx from 'node-lifx-lan';
import * as config from '../../config.json';

Lifx.createDevice({
  mac: config.device.mac,
  ip: config.device.ip,
})
  .then((d: any) => {
    return d
      .setColor({ color: { css: '#457b9d', brightness: 0.8 }, duration: 0 })
      .then(() => d.turnOn({ duration: 0 }));
  })
  .catch((err) => console.log(err))
  .finally(() => process.exit(0));
