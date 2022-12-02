#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D texture;
uniform float noise;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  
  vec2 offset = vec2(noise * 0.05, 0.0);
  
  vec3 col;
  col.r = texture2D(texture, uv + offset).r;
  col.g = texture2D(texture, uv).g;
  col.b = texture2D(texture, uv - offset).b;
  
  gl_FragColor = vec4(col, 1.0);
}