// import { WIDTH ,HEIGHT,BALL_NUM} from './main'

export const VSHADER_SOURCE = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`;
const FSHADER_SOURCE = `
precision highp float;
const int BALL_NUM = 10;
const int BALL_NUM2 = 6;
uniform vec3 u_balls[BALL_NUM];
uniform vec3 u_balls2[BALL_NUM2];
const float WIDTH = 1600.0;
const float HEIGHT = 1200.0;
const float GAP = 12.0;
const float BIOS = 5.0;

void main(){
    float x = gl_FragCoord.x;
    float y = gl_FragCoord.y;
    float v = 0.0;

    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);

    if( x>400.0 && x<1400.0 && y>400.0 && (mod(x,GAP) + mod(y,GAP) < BIOS)){
      float g =  max(1.-y/HEIGHT/2.2,x/WIDTH-0.1);
        gl_FragColor = vec4(g,g,g,1.0);
    }
    
    for (int i = 0; i < BALL_NUM2; i++) {
        vec3 mb = u_balls2[i];
        float dx = mb.x - x;
        float dy = mb.y - y;
        float r = mb.z;
        v += r*r/(dx*dx + dy*dy);
    }
    if (v > 0.8) {
        gl_FragColor = vec4(0.8, y/HEIGHT/1.3,
                                x/WIDTH/1.1, .9);
    }
    v=0.0;


    for (int i = 0; i < BALL_NUM; i++) {
        vec3 mb = u_balls[i];
        float dx = mb.x - x;
        float dy = mb.y - y;
        float r = mb.z;
        v += r*r/(dx*dx + dy*dy);
    }
    if (v > .9) {
        gl_FragColor = vec4(x/WIDTH/1.5, y/HEIGHT,
                                0.8, .9);
    }
  }
`;

export { FSHADER_SOURCE };
