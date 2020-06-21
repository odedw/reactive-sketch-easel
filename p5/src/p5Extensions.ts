import "p5";

declare module "p5" {
  interface p5InstanceExtensions {
    loadSound(
      path: string | any[],
      successCallback?: (...args: any[]) => any,
      errorCallback?: (...args: any[]) => any,
      whileLoading?: (...args: any[]) => any
    ): any;
  }
}
