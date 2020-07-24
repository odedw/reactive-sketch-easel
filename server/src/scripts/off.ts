import Lifx from 'node-lifx-lan';
import * as config from '../../config.json';

Lifx.createDevice({
  mac: config.device.mac,
  ip: config.device.ip,
})
  .then((d: any) => {
    return d.turnOff({ duration: 0 });
  })

  .catch((err) => console.log(err))
  .finally(() => process.exit(0));
