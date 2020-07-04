import { WsMessage } from './WsMessage';

export interface SmartLightInterface {
  turnOff: (duration: number) => Promise<void>;
  turnOn: (duration: number) => Promise<void>;
  setColor: (
    hex: string,
    brightness: number,
    duration: number
  ) => Promise<void>;
  blink: (increment: number, duration: number) => Promise<void>;
}

export abstract class SmartLightMessage implements WsMessage {
  abstract message: string;
  static target = 'SmartLight';
  target: string = SmartLightMessage.target;
  duration: number;
  constructor(duration: number = 0) {
    this.duration = duration;
  }
}
export class TurnOnMessage extends SmartLightMessage {
  message = 'turnOn';
}

export class TurnOffMessage extends SmartLightMessage {
  message = 'turnOff';
}

export class SetColorMessage extends SmartLightMessage {
  message = 'setColor';
  hex: string;
  brightness: number;
  constructor(hex: string, brightness: number, duration: number = 0) {
    super(duration);
    this.hex = hex;
    this.brightness = brightness;
  }
}

export class BlinkMessage extends SmartLightMessage {
  message = 'blink';
  increment: number;

  constructor(increment: number = 0.5, duration: number = 0) {
    super(duration);
    this.increment = increment;
  }
}
