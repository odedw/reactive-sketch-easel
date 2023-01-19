#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform float u_coords[30 * 3];
uniform float u_color1[3];
uniform float u_color2[3];

float sdf_circle(vec2 coord1, vec2 coord2, float r) {
  coord1 -= coord2;
  return length(coord1) - r;
}

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;  
  bool found = false;
  for(int i=0;i < 30 * 3;i += 3) {
    vec2 p = vec2(u_coords[i], u_coords[i+1]);
    float r = u_coords[i+2];
    float d = sdf_circle(uv, p, r);
    if (d < 0.0) {
      found = true;
      break;
    } 
  }
  if (uv.y > 0.5 ^^ uv.x > 0.5) {
    found = !found;
  }
  gl_FragColor = found ? 
    // vec4(1,1,1,1) : 
    // vec4(0,0,0,0);
    vec4(u_color1[0], u_color1[1], u_color1[2], 1) : 
    vec4(u_color2[0], u_color2[1], u_color2[2], 1);
}