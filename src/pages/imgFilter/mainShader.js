export const VSHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_position;
void main() {
  gl_Position = vec4(a_position,0.,1.);
  v_position = a_position;
}`;

export const FSHADER_SOURCE = ` 
      precision lowp float;
      varying vec2 v_position;
      uniform float u_kernel[9];
      uniform float u_kernelWeight;
      uniform sampler2D u_sampler;
          void main() {
            vec2 coord = v_position/2.+0.5;
            vec2 onePixel = vec2(1,1)/vec2(600,600);
            vec4 sum = texture2D(u_sampler, coord+onePixel*vec2(-1.,-1.))*u_kernel[0]+
            texture2D(u_sampler, coord+onePixel*vec2(0,-1))*u_kernel[1]+
            texture2D(u_sampler, coord+onePixel*vec2(0,1))*u_kernel[2]+
            texture2D(u_sampler, coord+onePixel*vec2(-1,0))*u_kernel[3]+
            texture2D(u_sampler, coord+onePixel*vec2(0,0))*u_kernel[4]+
            texture2D(u_sampler, coord+onePixel*vec2(1,0))*u_kernel[5]+
            texture2D(u_sampler, coord+onePixel*vec2(-1,1))*u_kernel[6]+
            texture2D(u_sampler, coord+onePixel*vec2(0,1))*u_kernel[7]+
            texture2D(u_sampler, coord+onePixel*vec2(1,1))*u_kernel[8];
            gl_FragColor = 0.*texture2D(u_sampler, coord+onePixel*vec2(0,0))*u_kernel[4]+1.*vec4((sum/u_kernelWeight).rgb,1.);
          }
`;
