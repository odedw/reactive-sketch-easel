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
