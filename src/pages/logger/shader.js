export const VSHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = a_position;
}`;

export const PRECISION = `
precision lowp float;
`;

export const CONST_VALUE = `
const baseColor = vec4(1.,.5,0.,1.);
const baseStep = 4.;
`;

/** start with the bottom left */
/** render range for 5 * 3 */
export const RENDER_NUMBER = `
void renderDot(inout vec4 color, vec2 start,vec2 pos){
  vec2 bios = pos-start;
  color = (bios.x>baseStep && bios.x<2.*baseStep && bios.y<baseStep) ? baseColor : color;
}
void render0(inout vec4 color, vec2 start,vec2 pos){
  vec2 bios = pos-start;
  float x = bios.x;float y = bios.y;
  color = (x>0.&&x<3.*baseStep && ((y>0.&&y<baseStep)||(y>4.*baseStep&&y<5.*baseStep))) ? baseColor : color;
}
void render1(inout vec4 color, vec2 start,vec2 pos){
  vec2 bios = pos-start;
  color = (bios.x>baseStep && bios.x<2.*baseStep) ? baseColor : color;
}
void render2(inout vec4 color, vec2 start,vec2 pos){
  vec2 bios = pos-start;
  float x = bios.x;float y = bios.y;
  color = (x>0. && x<3.*baseStep && (y<baseStep || (y>2.*baseStep && y<3.*baseStep) || (y>4.*baseStep && y<5.*baseStep))) ? baseColor : color;
  color = (x>0. && x<baseStep && y>baseStep && y<2.baseStep) ? baseColor : color;
  color = (x>2.*baseStep && x<3.*baseStep && y>3.*baseStep && y<4.baseStep) ? baseColor : color;
}
`;

export const DISPATCH_RENDER = `
void dispatchInteger(float v){

}
void dispatchDot(float v){

}
void dispatchDecimal(float v){

}
void dispatcher(float v){
  if(v>=1.){
    dispatchInteger(v);
  }else{
    dispatchInteger(0.);
  }
  dispatchDot(v);
  dispatchDecimal(v);
}
`;

export const FSHADER_SOURCE = `
void main(){
  
}
`;
