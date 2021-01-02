export default abstract class Sketch {
  container: HTMLElement;
  w: number;
  h: number;
  create() {
    this.container = document.getElementById('container')!;
    this.w = this.container.clientWidth;
    this.h = this.container.clientHeight;
  }
}
