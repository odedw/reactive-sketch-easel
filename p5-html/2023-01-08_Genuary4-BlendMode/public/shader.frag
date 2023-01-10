#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;
uniform sampler2D u_texture;
uniform float u_xcoords[100];
uniform float u_ycoords[100];
uniform float u_size[100];
uniform vec2 u_resolution;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform vec4 u_color4;
uniform vec4 u_color5;
uniform vec4 u_color6;
uniform vec4 u_color7;
uniform vec4 u_color8;
uniform vec4 u_color9;
uniform vec4 u_color10;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;  
  int count = 0;  
  vec4 color = texture2D(u_texture, uv);
  // if (color.r == 1.0 && color.g == 1.0 && color.b == 1.0) {
  //   gl_FragColor = vec4(0,0,0,1);
  // } else {
    for(int i=0;i<100;++i) {
      float d = distance(uv, vec2(u_xcoords[i], u_ycoords[i]));
      if (d < u_size[i]) count++;
    }
    if (count == 0 ) {
      gl_FragColor = texture2D(u_texture, uv);
    } else {
      int index = int(mod(float(count), 6.0));
      if (index == 0) {
        gl_FragColor = u_color1;
      } else if (index == 1) {
        gl_FragColor = u_color2;
      } else if (index == 2) {
        gl_FragColor = u_color3;
      } else if (index == 3) {
        gl_FragColor = u_color4;
      } else if (index == 4) {
        gl_FragColor = u_color5;
      } else if (index == 5) {
        gl_FragColor = u_color6;
      }
    }
  // }
}