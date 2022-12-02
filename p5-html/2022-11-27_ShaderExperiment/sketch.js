let screen;
let glitchShader;

function preload() {
  glitchShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(600, 600, WEBGL);
  screen = createGraphics(width, height);

  screen.background(50);
  screen.stroke(255);
  screen.strokeWeight(5);

  shader(glitchShader);
}

function draw() {
  if (mouseIsPressed) {
    screen.line(mouseX, mouseY, pmouseX, pmouseY);
  }

  drawScreen();
}

function drawScreen() {
  glitchShader.setUniform('texture', screen);
  glitchShader.setUniform('noise', getNoiseValue());

  rect(-width / 2, -height / 2, width, height);
}

function getNoiseValue() {
  let v = noise(millis() / 100);
  const cutOff = 0.5;

  if (v < cutOff) {
    return 0;
  }

  v = pow(((v - cutOff) * 1) / (1 - cutOff), 2);

  return v;
}
