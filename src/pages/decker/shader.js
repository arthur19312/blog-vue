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

  mat2 Rot(float a){
    float c = cos(a);float s = sin(a);
    return mat2(c, -s, s, c);
  }

  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }

  float Voronoi(vec2 uv,float t){
    vec2 i = floor(uv);
    vec2 f = fract(uv);
    float dist = 1.;
    for(int x=-1;x<=1;x++){
       for(int y=-1;y<=1;y++){
        vec2 offset = vec2(x,y);
        vec2 p = Hash21(i+offset);
        p=.5+.5*sin(8.*p+t*4.);
        float d =distance(p,f-offset);
        dist=min(dist,d*d) ;
       }
    }
    return clamp(.9-dist,0.,.9);
  }

  vec3 SphereLayer (vec2 uv,float t){
    uv*=3.6;
    vec3 col = vec3(0.);
    float voro = Voronoi(uv,t);
    if(voro<.5){
      voro = pow(voro*2.,1.15)/2.;
    }else{
      voro = 1.-pow((1.-voro)*2.,1.15)/2.;
    }
    
    float twinkle = sin(t*10.)*.2;
    float baseVal = mix(twinkle,1.-twinkle,voro);
    col+= mix(vec3(.1,.2,.3),vec3(.96,1.,1.),voro+twinkle*.5);
    return col;
  }
    void main() {
      vec2 uv = (gl_FragCoord.xy - .5*iResolution.xy) / min(iResolution.y, iResolution.x); // -.5~.5
      vec2 mouse = (iMouse - iResolution.xy*.5)/ min(iResolution.y, iResolution.x)*.2*vec2(1.,-1.);
      float t = iTime;
      vec3 col = vec3(0.)+t*0.;
      col+=SphereLayer(uv,t);
     
      gl_FragColor = vec4(col,1.);
    }
`;
