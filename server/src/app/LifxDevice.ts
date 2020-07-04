import Lifx from "node-lifx-lan";
import { LifxLanDevice, LifxLanColorCSS } from "./types/Lifx";
import { SmartLightInterface, log, delay } from "@reactive-sketch-easel/shared";
import { performance } from "perf_hooks";

// Lifx.discover()
//   .then((device_list) => {
//     device_list.forEach((device) => {
//       console.log(
//         [device["ip"], device["mac"], device["deviceInfo"]["label"]].join(" | ")
//       );
//     });
//   })
//   .catch((error) => {
//     console.error(error);
//   });
const MAX_REQUESTS_PER_SECOND = 30;
const MS_PER_REQUEST = 1000 / MAX_REQUESTS_PER_SECOND;
export class LifxDevice implements SmartLightInterface {
  lifxLanDevice: LifxLanDevice;
  color!: LifxLanColorCSS;
  requestsPerSecond = 0;
  lastRequestTime: number = 0;

  static create(ip: string, mac: string): Promise<LifxDevice> {
    let instance: LifxDevice;
    log.info("Creating LIFX device");
    return Lifx.createDevice({
      mac,
      ip,
    })
      .then((d: any) => (instance = new LifxDevice(d)))
      .then(() => instance.turnOff(0))
      .then(() => instance.setColor("#FFFFFF", 1, 0))
      .then(() => instance);
  }

  private constructor(lifxLanDevice: LifxLanDevice) {
    this.lifxLanDevice = lifxLanDevice;
    setInterval(() => {
      if (this.requestsPerSecond > 0) {
        log.info(`${this.requestsPerSecond} requests per second`);
      }
      this.requestsPerSecond = 0;
    }, 1000);
  }

  blink(increment: number, duration: number): Promise<void> {
    const brightness = this.color.brightness;
    return this.setColor(
      this.color.css,
      Math.min(1, brightness! + increment),
      0
    )
      .then(() => delay(duration))
      .then(() => this.setColor(this.color.css, brightness!, 0));
  }

  setColor(
    hex: string,
    brightness: number,
    duration: number = 0
  ): Promise<void> {
    const color = { css: hex, brightness } as LifxLanColorCSS;
    return this.performRequest(() =>
      this.lifxLanDevice.setColor({ color, duration }).then(() => {
        this.color = color;
      })
    );
  }

  turnOn(duration: number): Promise<void> {
    return this.performRequest(
      () => this.lifxLanDevice.turnOn({ duration }),
      true // don't throttle turn on request
    );
  }

  turnOff(duration: number): Promise<void> {
    return this.performRequest(
      () => this.lifxLanDevice.turnOff({ duration }),
      true // don't throttle turn off request
    );
  }

  private performRequest(
    request: () => Promise<void>,
    ignoreThrottle: boolean = false
  ): Promise<void> {
    if (ignoreThrottle) {
      return request();
    }
    const now = performance.now();
    if (now - this.lastRequestTime < MS_PER_REQUEST) {
      return Promise.resolve(); // request throttled
    }

    this.lastRequestTime = now;
    return request().catch(() => {}); // ignore timeouts for now
  }
}
