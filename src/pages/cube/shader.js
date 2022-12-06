export const VSHADER_SOURCE = `
attribute vec3 a_position;
uniform mat4 u_matrix;
void main() {
  gl_Position = u_matrix * vec4(a_position, 1.0);
}`;

export const FSHADER_SOURCE = `
	precision lowp float;

    void main() {
      gl_FragColor = vec4(1,0,0,1.);
    }
`;
