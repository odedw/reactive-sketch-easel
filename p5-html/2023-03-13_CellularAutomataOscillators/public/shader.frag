#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;

uniform sampler2D u_texture1;
uniform sampler2D u_texture2;
uniform sampler2D u_texture3;
uniform vec4 u_color0;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform vec4 u_color4;
uniform vec4 u_color5;
uniform vec4 u_color6;
uniform vec4 u_color7;
uniform vec4 u_color8;
uniform float u_time; // Declare time as a uniform variable

// float random (in vec2 st) {
//     return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
// }

// const float blurWeights[9] = float[](
//     1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0,
//     2.0 / 16.0, 4.0 / 16.0, 2.0 / 16.0,
//     1.0 / 16.0, 2.0 / 16.0, 1.0 / 16.0
// );
void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // vec2 st = vec2(uv.x * u_time * 0.1, uv.y * u_time * 0.0001);
  //  float n = random(st);
  // uv += (n - 0.5) * 0.01;

  vec4 color1 = texture2D(u_texture1, uv);  
  int c1 = color1.r == 1.0 && color1.g == 1.0 && color1.b == 1.0 ? 1 : 0;
  vec4 color2 = texture2D(u_texture2, uv);
  int c2 = color2.r == 1.0 && color2.g == 1.0 && color2.b == 1.0 ? 1 : 0;
  vec4 color3 = texture2D(u_texture3, uv);
  int c3 = color3.r == 1.0 && color3.g == 1.0 && color3.b == 1.0 ? 1 : 0;
  int sum = c1 + c2 * 2 + c3 * 4;
  vec4 color = u_color0;
  if (sum == 1) {
    color = u_color1;
  } else if (sum == 2) {
    color = u_color2;
  } else if (sum == 3) {
    color = u_color3;
  } else if (sum == 4) {
    color = u_color4;
  } else if (sum == 5) {
    color = u_color5;
  } else if (sum == 6) {
    color = u_color6;
  } else if (sum == 7) {
    color = u_color7;
  } else if (sum == 8) {
    color = u_color8;
  }

// Add some noise to the color output
  // vec2 noiseCoord = vec2(uv.x * 10.0, uv.y * 10.0);
  // float noiseVal = random(uv + vec2(u_time * 0.1, u_time * 0.05)) * 0.5;
  // color += vec4(vec3(noiseVal * 0.7), 0.0);

  gl_FragColor = color;
}