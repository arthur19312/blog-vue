export const VSHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

export const FSHADER_SOURCE = ({ fbm }) => {
  return `
	precision lowp float;  
uniform vec2 u_Resolution;
uniform float u_Scale;
uniform float u_IterateRotation;
uniform float u_IterateShift;
uniform float u_Time;
uniform vec3 u_Color1;
uniform vec3 u_Color2;
uniform vec3 u_Color3;
uniform vec3 u_Color4;


float random (in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.98,78.233)))*
        43758.5);
}

float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f*f*(3.0-2.0*f);
    //u = smoothstep(0.,1.,f);

    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

float fbm (in vec2 st) {
    float value = 0.0;
    float amplitude = .5;
    float frequency = 0.;
    for (int i = 0; i < ${fbm}; i++) {
        value += amplitude * noise(st);
        float c = cos(u_IterateRotation),s=sin(u_IterateRotation);
        mat2 rotation = mat2(c,s,-s,c);
        st = rotation*st*2.+u_IterateShift;
        amplitude *= .5;
    }
    return value;
}

vec3 iterateFbm(in vec2 p){
vec2 q = vec2(fbm(p),fbm(p + vec2(5.,2.)+0.142*u_Time));
vec2 r = vec2(fbm(p + 4.*q + vec2(1.,5.)+0.276*u_Time),fbm(p +4.*q + vec2(5.,2.)+0.134*u_Time));
float s = fbm(p+4.*r);


vec3 color = vec3(s);
color = mix(u_Color1,u_Color2,s);
color = mix(color,u_Color3,length(r)/2.);
color = mix(color,u_Color4,q.x/10.);

return color;
// return vec3(fbm(p+4.*r),fbm(p+4.*q),fbm(5.*p));
}


    void main() {
      float c = cos(u_Time/20.),s=sin(u_Time/20.);
        mat2 rotation = mat2(c,s,-s,c);
    vec2 pos = vec2(gl_FragCoord)/u_Resolution * u_Scale;
    vec3 n = iterateFbm(rotation*pos+0.025*u_Time);
    vec3 smn = smoothstep(0.,1.,n);
    gl_FragColor = vec4(n, 1.0);
}
`;
};
