#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D u_texture;
uniform vec2 u_circles[1];

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  vec4 color = texture2D(u_texture, uv);
  if (distance(uv, u_circles[0]) < 0.005) {
    gl_FragColor = vec4(1,1,1,1);
  } else {
    gl_FragColor = vec4(0,0,0,0);
  }
}