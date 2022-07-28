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
uniform sampler2D u_sampler;
    void main() {
        vec4 color = texture2D(u_sampler, v_position/2.+0.5);
        gl_FragColor = color.rgba;
    }
`;
