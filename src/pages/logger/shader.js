export const VSHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position,0.,1.);
}`;

export const FSHADER_SOURCE = `
precision lowp float;

const vec2 scale = vec2(800.,600.);
const int maxRender = 8;
const int maxRenderDecm = 5;
const vec4 bgColor = vec4(1.,.6,.3,1.);
const float baseStep = 4.;
const float stepWidth = baseStep;
const float baseWidth = baseStep*4.;
const float baseHeight = baseStep*5.;
const float totalWidth = baseWidth*(float(maxRender*2+1));
vec2 coord;
vec4 color;

void setColor(vec4 color){
  gl_FragColor = color;
}
void renderMinus(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor(x>0. && x<3.*baseStep && y>2.*baseStep && y<3.*baseStep ? bgColor : color);
}
void renderDot(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor(x>baseStep && x<2.*baseStep && y>0. && y<baseStep ? bgColor : color);
}
void render0(float cursor){
  vec2 bios = coord-vec2(cursor,0.);
  float x = bios.x;float y = bios.y;
  setColor(x>baseStep&&x<2.*baseStep&&y>baseStep&&y<4.*baseStep ? color : x>0.? bgColor : color);
}
void render1(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor((x>0.&&x<baseStep)||(x>2.*baseStep&&x<3.*baseStep) ? color : x>0.? bgColor : color);
}
void render2(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor((x>0.&&x<2.*baseStep&&y>3.*baseStep&&y<4.*baseStep)||(x>baseStep&&x<3.*baseStep&&y>baseStep&&y<2.*baseStep)? color : x>0.? bgColor : color);
}
void render3(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor(x>0.&&x<2.*baseStep&&((y>baseStep&&y<2.*baseStep)||(y>3.*baseStep&&y<4.*baseStep))? color : x>0.? bgColor : color);
}
void render4(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor((x>0.&&x<2.*baseStep&&y>0.&&y<2.*baseStep)||(x>baseStep&&x<2.*baseStep&&y>3.*baseStep)?color:x>0.?bgColor:color);
}
void render5(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor((x>0.&&x<2.*baseStep&&y>baseStep&&y<2.*baseStep)||(x>baseStep&&x<3.*baseStep&&y>3.*baseStep&&y<4.*baseStep)? color : x>0.? bgColor : color);
}
void render6(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor((x>baseStep&&x<2.*baseStep&&y>baseStep&&y<2.*baseStep)||(x>baseStep&&x<3.*baseStep&&y>3.*baseStep&&y<4.*baseStep)?color:x>0.?bgColor:color);
}
void render7(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor(x>0.&&x<2.*baseStep&&y>0.&&y<4.*baseStep?color:x>0.?bgColor:color);
}
void render8(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor(x>baseStep&&x<2.*baseStep&&((y>baseStep&&y<2.*baseStep)||(y>3.*baseStep&&y<4.*baseStep))?color:x>0.?bgColor:color);
}
void render9(float cursor){
  vec2 bios = coord-vec2(cursor,0.);float x = bios.x;float y = bios.y;
  setColor((x>0.&&x<2.*baseStep&&y>baseStep&&y<2.*baseStep)||(x>baseStep&&x<2.*baseStep&&y>3.*baseStep&&y<4.*baseStep)?color:x>0.?bgColor:color);
}
void dispatchRender(float v,float cursor){
  cursor -= baseWidth;
  if(v<1.){
    render0(cursor);
  }else if(v<2.){
    render1(cursor);
  }else if(v<3.){
    render2(cursor);
  }else if(v<4.){
    render3(cursor);
  }else if(v<5.){
    render4(cursor);
  }else if(v<6.){
    render5(cursor);
  }else if(v<7.){
    render6(cursor);
  }else if(v<8.){
    render7(cursor);
  }else if(v<9.){
    render8(cursor);
  }else{
    render9(cursor);
  }
}
void dispatchDot(float cursor){
  cursor -= baseWidth;
  renderDot(cursor);
}
void dispatchMinus(float cursor){
  cursor -= baseWidth;
  renderMinus(cursor);
}
void render(float v,float x){
  float cursor=0.;
  float num;
  if(v<0.){
    cursor += baseWidth;
    if(x<cursor-stepWidth){
      dispatchMinus(cursor);
      return;
    }
  }
  v=abs(v);
  for(int n=1;n<=maxRender;n++){
    cursor += baseWidth;
    num = pow(10.,float(maxRender-n)); 
    if(x<cursor-stepWidth){
      dispatchRender(v/num,cursor);
      return;
    }
    v=mod(v,num);
  }

  cursor += baseWidth;
  if(x<cursor-stepWidth){
    dispatchDot(cursor);
    return;
  }
  v=fract(v);
  for(int n=1;n<=maxRenderDecm;n++){
    cursor += baseWidth;
    v*=10.;
    if(x<cursor-stepWidth){
      dispatchRender(v,cursor);
      return;
    }
    v=fract(v);
  }
}


uniform sampler2D u_sampler;
uniform vec4 u_triangle[3];

float isInTriangle(vec2 newCoord){
  return (cross(vec3(u_triangle[0].xy-newCoord,0.),vec3(u_triangle[0].xy-u_triangle[1].xy,0.)).z<0.
  && cross(vec3(u_triangle[1].xy-newCoord,0.),vec3(u_triangle[1].xy-u_triangle[2].xy,0.)).z<0.
  && cross(vec3(u_triangle[2].xy-newCoord,0.),vec3(u_triangle[2].xy-u_triangle[0].xy,0.)).z<0. )?1.:0.;
}

vec2 getTexCoord(vec2 newCoord){
  float x = mix(u_triangle[0].z,u_triangle[2].z,(u_triangle[2].x-newCoord.x)/(u_triangle[2].x-u_triangle[0].x));
  float y = mix(u_triangle[1].w,u_triangle[2].w,(u_triangle[2].y-newCoord.y)/(u_triangle[2].y-u_triangle[1].y));
  return vec2(x,y);
}

void main(){
  
  float a = -58371.04123;
  coord = vec2(gl_FragCoord.x,gl_FragCoord.y);
  vec2 normalizedCoord = (coord/scale)*2.-1.;

  float flag= isInTriangle(normalizedCoord);
  if(flag>0.5){
    color = texture2D(u_sampler,getTexCoord(normalizedCoord));
    gl_FragColor = mix(color,vec4(normalizedCoord.x+0.6,normalizedCoord.y/2.,(normalizedCoord.x+normalizedCoord.y)*1.1,.8),0.5);
  }else{
    color = vec4(0.,0.,0.,1.);
    gl_FragColor = color;
  }

  if(coord.x<totalWidth && coord.y<baseHeight) {
    render(a,coord.x);
  }
}
`;
