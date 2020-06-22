import "p5";
import p5 from "p5";

declare module "p5" {
  interface p5InstanceExtensions {
    loadSound(
      path: string | any[],
      successCallback?: (...args: any[]) => any,
      errorCallback?: (...args: any[]) => any,
      whileLoading?: (...args: any[]) => any
    ): any;

    randomColor(alpha?: number): p5.Color;
  }
}

declare global {
  interface Window {
    p5: p5;
  }
}

//@ts-ignore
window.p5.prototype.randomColor = function (alpha: number = 255): p5.Color {
  return this.color(
    this.random(255),
    this.random(255),
    this.random(255),
    alpha
  );
};
