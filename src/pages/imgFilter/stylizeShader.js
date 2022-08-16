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
uniform vec4 u_colors[16];

vec4 getColor(float index){
  int i = int(index);
  if(i==0){return u_colors[0];}
  if(i==1){return u_colors[1];}
  if(i==2){return u_colors[2];}
  if(i==3){return u_colors[3];}
  if(i==4){return u_colors[4];}
  if(i==5){return u_colors[5];}
  if(i==6){return u_colors[6];}
  if(i==7){return u_colors[7];}
  if(i==8){return u_colors[8];}
  if(i==9){return u_colors[9];}
  if(i==10){return u_colors[10];}
  if(i==11){return u_colors[11];}
  if(i==12){return u_colors[12];}
  if(i==13){return u_colors[13];}
  if(i==14){return u_colors[14];}
  if(i==15){return u_colors[15];}
}

vec4 getColors(vec2 pos){
  for(int i=0;i<4;i++){
    for(int j=0;j<4;j++){
      if(i==int(pos.x) && j==int(pos.y)){
        return u_colors[j*4+i];
      }
    }
  }
}
      void main() {
        vec2 pos = v_position/2.+0.5;
        float x=gl_FragCoord.x;float y=600.-gl_FragCoord.y;
        float index = floor(y/200.)*4.+floor(x/200.);float index1 = ceil(y/200.)*4.+floor(x/200.);
        float xx = smoothstep(0.,1.,mod(x,200.)/200.);
        vec4 color1 = mix(getColors(vec2(floor(x/200.),floor(y/200.))),getColor(mod(index+1.,4.)<.1?index:index+1.),xx);
        vec4 color2 = mix(getColor(index1),getColor(mod(index1+1.,4.)<.1?index1:index1+1.),xx);
        gl_FragColor = mix(color1,color2,smoothstep(0.,1.,mod(y,200.)/200.))/254.;
      }
`;
