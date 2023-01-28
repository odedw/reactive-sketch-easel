#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D u_texture;
uniform float u_coordsX[500];
uniform float u_coordsY[500];

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;
  vec2 closestCoord = vec2(u_coordsX[0],u_coordsY[0]);
  float closestDist = distance(uv, closestCoord);
  for(int i = 1; i < 500; i++) {
    vec2 c = vec2(u_coordsX[i], u_coordsY[i]);
    float d = distance(uv, c);   
    if (d < closestDist) {
      d = closestDist;
      closestCoord = c;
    }
  }

  for(int i = 1; i < 500; i++) {
    vec2 c = vec2(u_coordsX[i], u_coordsY[i]);
    float d = distance(uv, c);
    if (d < 0.01) {
      gl_FragColor = texture2D(u_texture, c);
      return;
    }
  }

    // gl_FragColor = texture2D(u_texture, uv);
    gl_FragColor = vec4(1,1,1,1);
}