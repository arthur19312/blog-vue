export const VSHADER_SOURCE = `
attribute vec2 a_position;
varying vec2 v_position;
void main() {
  gl_Position = vec4(a_position,0.,1.);
  v_position = a_position;
}`;

export const FSHADER_SOURCE_GRAY_SCALE = `
precision lowp float;
varying vec2 v_position;
uniform sampler2D u_sampler;
    void main() {
        vec4 color = texture2D(u_sampler, v_position/2.+0.5);
        float gray = dot(color.rgb,vec3(0.299, 0.587, 0.114));
        gl_FragColor = vec4(gray,gray,gray,1.);
    }
`;

export const FSHADER_SOURCE_SEPIA_TONE = `
precision lowp float;
varying vec2 v_position;
uniform sampler2D u_sampler;
    void main() {
        vec4 color = texture2D(u_sampler, v_position/2.+0.5);
        float gray = dot(color.rgb,vec3(0.299, 0.587, 0.114));
        gl_FragColor = mix(color,vec4(gray* vec3(1.2, 1.0, 0.8),1.),0.5);
    }
`;
export const FSHADER_SOURCE_NEGATIVE = `
precision lowp float;
varying vec2 v_position;
uniform sampler2D u_sampler;
    void main() {
        vec4 color = texture2D(u_sampler, v_position/2.+0.5);
        gl_FragColor = vec4(1.-color.rgb,1.);
    }
`;

export const FSHADER_SOURCE_GAUSSIAN_BLUR = `
precision lowp float;
      varying vec2 v_position;
      uniform sampler2D u_sampler;
      vec2 offset[25];
      void main() {
            vec4 sample[25];
            vec2 pos = v_position/2.+0.5;
            vec2 onePixel = vec2(1,1)/vec2(600,600);
            float x = -2.;float y=-2.;
            for (int i = 0; i < 25; i++){
              offset[i]= vec2(x,y);
              sample[i] = texture2D(u_sampler, pos + onePixel*offset[i]);
              x++;
              if(x>2.){
                x=-2.;y++;
              }
            }
              gl_FragColor = (
                          (1.0  * (sample[0] + sample[4]  + sample[20] + sample[24])) +
                          (4.0  * (sample[1] + sample[3]  + sample[5]  + sample[9] + sample[15] + sample[19] + sample[21] + sample[23])) +
                          (7.0  * (sample[2] + sample[10] + sample[14] + sample[22])) +
                          (16.0 * (sample[6] + sample[8]  + sample[16] + sample[18])) +
                          (26.0 * (sample[7] + sample[11] + sample[13] + sample[17])) +
                          (41.0 * sample[12])
                          ) / 273.0;;
          }
`;

export const FSHADER_SOURCE_DILATE = `
precision lowp float;
varying vec2 v_position;
uniform sampler2D u_sampler;
vec2 offset[9];
void main() {
  vec4 maxValue = vec4(0.);
  vec2 pos = v_position/2.+0.5;
  vec2 onePixel = vec2(1,1)/vec2(600,600);
  float x = -1.;float y=-1.;
  for (int i = 0; i < 9; i++){
    offset[i]= vec2(x,y);
    maxValue = max(texture2D(u_sampler, pos + onePixel*offset[i]),maxValue);
    x++;
    if(x>1.){
      x=-1.;y++;
    }
  }
  gl_FragColor = maxValue;
}
`;

export const FSHADER_SOURCE_ERODE = `
precision lowp float;
varying vec2 v_position;
uniform sampler2D u_sampler;
vec2 offset[9];
void main() {
  vec4 minValue = vec4(1.);
  vec2 pos = v_position/2.+0.5;
  vec2 onePixel = vec2(1,1)/vec2(600,600);
  float x = -1.;float y=-1.;
  for (int i = 0; i < 9; i++){
    offset[i]= vec2(x,y);
    minValue = min(texture2D(u_sampler, pos + onePixel*offset[i]),minValue);
    x++;
    if(x>1.){
      x=-1.;y++;
    }
  }
  gl_FragColor = minValue;
}
`;

export const FSHADER_SOURCE_DIFFUSE_BLUR = `
precision lowp float;
      varying vec2 v_position;
      uniform sampler2D u_sampler;
      vec2 offset;
      vec4 sum = vec4(0.);
      void main() {
            vec2 pos = v_position/2.+0.5;
            vec2 onePixel = vec2(1,1)/vec2(600,600);
            float scale = 100.;
            float x = -scale;float y=-scale;
            for (int i = 0; i < 40401; i++){
              offset = vec2(x,y);
              sum+= texture2D(u_sampler, pos + onePixel*offset);
              x++;
              if(x>scale){
                x=-scale;y++;
              }
            }
              gl_FragColor = sum/40401.;
          }
`;
