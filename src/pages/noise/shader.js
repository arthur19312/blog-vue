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
uniform float u_Time;

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
        st = st*2.+.9;
        amplitude *= .5;
    }
    return value;
}


    void main() {
    vec2 pos = vec2(gl_FragCoord)/u_Resolution * u_Scale;
    float n = fbm(pos);
    gl_FragColor = vec4(vec3(n), 1.0);
}
`;
};
