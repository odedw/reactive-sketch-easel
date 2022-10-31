/// <reference path="../../node_modules/@types/p5/global.d.ts" />
const WIDTH = 4;
const GAP = WIDTH * 2;

const tracks = [];
function setup() {
  createCanvas(600, 600);

  let x = random(-WIDTH, 0);
  while (x < width) {
    let c = lerpColor(color('red'), color('blue'), x / width);
    const t = new Track(x, WIDTH, random(-0.5, 0.5), c);
    tracks.push(t);
    x += t.w + GAP;
  }
  // tracks.push(new Track(width / 2, WIDTH, -0.5));
}

function draw() {
  background(0);

  for (let t of tracks) {
    t.update();
    t.draw();
  }
}
