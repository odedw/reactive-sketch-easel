import { LifxDevice } from "../LifxDevice";
import * as config from "../../../config.json";
import {
  SmartLightMessage,
  // TurnOnMessage,
  // TurnOffMessage,
  SetColorMessage,
  BlinkMessage,
} from "@reactive-sketch-easel/shared";

export class SmartLightRouter {
  lifxDevice!: LifxDevice;
  public async init(): Promise<void> {
    this.lifxDevice = await LifxDevice.create(
      config.device.ip,
      config.device.mac
    );
    // await this.lifxDevice.turnOn(0);
    // await this.lifxDevice.setColor("#77bfa3", 0.4);
    // const device = this.lifxDevice.lifxLanDevice as any;

    // const colors = "00171f-003459-007ea7-00a8e8".split("-").map((h) => `#${h}`);
    // colors
    //   .map((hex, i) => ({
    //     start: (i * 16) / colors.length,
    //     end: (i * 16) / colors.length + 16 / colors.length - 1,
    //     color: {
    //       css: hex,
    //       brightness: 0.4,
    //     },
    //     duration: 0,
    //     apply: 1,
    //   }))
    //   .forEach(async (zone) => await device.multiZoneSetColorZones(zone));
    // await device.multiZoneSetEffect({
    //   type: 1,
    //   speed: 1000,
    //   duration: 0,
    //   direction: 1,
    // });

    // await device.multiZoneSetColorZones(zones);
  }

  public route(msg: SmartLightMessage) {
    switch (msg.message) {
      case "turnOn":
        this.lifxDevice.turnOn(msg.duration);
        break;
      case "turnOff":
        this.lifxDevice.turnOff(msg.duration);
        break;
      case "setColor":
        let setColorMessage = msg as SetColorMessage;
        this.lifxDevice.setColor(
          setColorMessage.hex,
          setColorMessage.brightness,
          setColorMessage.duration
        );
        break;
      case "blink":
        let blinkMessage = msg as BlinkMessage;
        this.lifxDevice.blink(blinkMessage.increment, blinkMessage.duration);
        break;
      default:
        break;
    }
  }
}

export const smartLightRouter = new SmartLightRouter();
