
precision mediump float;

// grab texcoords from the vertex shader
varying vec2 vTexCoord;

// our textures coming from p5
uniform sampler2D tex0;
uniform sampler2D tex1;
uniform int uframe_count;
uniform float uTime;
uniform float u_random1;
uniform float u_random2;
uniform float u_random3;
uniform float uWidth;
uniform float uHeight;
vec4 palette[3];
uniform vec4 ucolor1;
uniform vec4 ucolor2;
uniform vec4 ucolor3;

// Version 3
float random( vec2 p )
{
  // We need irrationals for pseudo randomness.
  // Most (all?) known transcendental numbers will (generally) work.
  const vec2 r = vec2(
    23.1406926327792690,  // e^pi (Gelfond's constant)
     2.6651441426902251); // 2^sqrt(2) (Gelfond–Schneider constant)
  return fract( cos( mod( 123456789., 1e-7 + 256. * dot(p,r) ) ) );  
}
void main() {
  palette[0] = ucolor1;
  palette[1] = ucolor2;
  palette[2] = ucolor3;
  vec2 uv = vTexCoord;
  // the texture is loaded upside down and backwards by default so lets flip it
  uv.y = 1.0 - uv.y;

  // get the webcam as a vec4 using texture2D
  vec4 tex = texture2D(tex0, uv);

  // get the past webcam frame as a texture
  vec4 past = texture2D(tex1, uv);

  // float delta = (abs(tex.r - past.g) + abs(tex.b - past.b) + abs(tex.g - past.g)) / 3.0;

  // subtract past from tex
  vec3 diff = tex.rgb - past.rgb;

  if (length(diff) > 0.05) {
    // vec2 res = vec2(uWidth, uHeight);
    //  vec2 st = gl_FragCoord.xy/res.xy;

    // st *= 10.0; // Scale the coordinate system by 10
    // vec2 ipos = floor(st);  // get the integer coords
    // vec2 fpos = fract(st);  // get the fractional coords

    // // Assign a random value based on the integer coord
    // vec3 color = vec3(random( ipos ));
    // tex = vec4(color.r, color.g, color.b, 1.0);
    // tex.r = 1.0;
    // tex.g = 1.0;
    // tex.b = 1.0; 
    float a = 3.0; 
    float b = u_random1 + uv.x * random(uv) + uv.y * random(uv);
    
    int index = int(mod(b, a));
    if (index == 0) {
      tex.rgb = ucolor1.rgb;
    } else if (index == 1) {
      tex.rgb = ucolor2.rgb;
    } else  {
      tex.rgb = ucolor3.rgb;
    }
  }
  // lets multiply it by 2 to boost the signal a little bit
  // tex.rgb *= 2.0;

  gl_FragColor = tex;
}