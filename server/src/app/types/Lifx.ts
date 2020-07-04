export type LifxLanDevice = {
  turnOn(options: { duration: number }): Promise<void>;
  turnOff(options: { duration: number }): Promise<void>;
  setColor(options: { color: LifxLanColor; duration: number }): Promise<void>;
};

export interface LifxLanColor {
  brightness?: number;
  kelvin?: number;
}

export interface LifxLanColorRGB extends LifxLanColor {
  red: number;
  green: number;
  blue: number;
}

export interface LifxLanColorCSS extends LifxLanColor {
  css: string;
}
