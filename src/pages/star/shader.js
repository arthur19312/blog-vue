export const VSHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

export const FSHADER_SOURCE = `
	precision lowp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;
  const float STAR_LAYER_NUM = 4.;

  mat2 Rot(float a){
    float c = cos(a);float s = sin(a);
    return mat2(c, -s, s, c);
  }

  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+31.7);
    return fract(p);
  }

  float Star(vec2 uv,float flare){
    // light
      float d = length(uv);
      float m = .03/d;
      float size = smoothstep(0.,1.2,m);

      // ray
      float ray = max(0.,1.-abs(uv.x*uv.y*10000.));
      m+=ray*flare*size;
      uv*= Rot(3.141593/4.);
      float ray2 = max(0.,1.-abs(uv.x*uv.y*10000.));
      m+=ray2*flare*.3*size;

      m *= smoothstep(.5,.2,d);
      return m;
  }


  vec3 StarLayer (vec2 uv){
    vec3 col = vec3(0);
     vec2 f = fract(uv) -.5;
      vec2 i = floor(uv);

      for(int x=-1;x<=1;x++){
        for(int y=-1;y<=1;y++){
          vec2 offset = vec2(x,y);
          vec2 n = Hash21(i+offset);
          float size = fract(n.x*647.9);
          float star = Star(f-offset-n+.5,smoothstep(.4,.9,size)*.4) * (sin(iTime*20.+n.y*20.)*.5+.9);
          vec3 color =(sin(size * vec3(.5,.4,.7)*195.)*.3+.7)*vec3(.6,.36,.7)*.75+.25*(.7,.7,.7);
          col+= star*(size+1.)*color;
        }
      }
      return col;
  }

  vec3 renderStar (vec2 uv,vec2 mouse){
    float t = iTime * .3;
    vec3 col = vec3(0);
    uv*= .8*Rot(t);
    for(float i=0.;i<1.;i+=1./STAR_LAYER_NUM){
        float depth = fract(i+t);
        float scale = mix(16.,.5,depth);
        float fade = depth * smoothstep(1.,.8,depth);
        col+= StarLayer(uv * scale+i*249.+ mouse*(i))*fade;
      }
    return col;
  }

    void main() {
      vec2 uv = (gl_FragCoord.xy - .5*iResolution.xy) / min(iResolution.y, iResolution.x);

      vec2 mouse = (iMouse - iResolution.xy*.5)/ min(iResolution.y, iResolution.x)*.2;
      uv+=mouse*1.;
      vec3 col = vec3(0);
      col+= renderStar(uv,mouse);
     
      gl_FragColor = vec4(col,1.);
    }
`;
