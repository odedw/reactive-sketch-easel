#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D u_texture;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
   vec4 color = texture2D(u_texture, uv);

  gl_FragColor = color;
}