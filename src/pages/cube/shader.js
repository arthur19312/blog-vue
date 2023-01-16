export const VSHADER_SOURCE = `
attribute vec4 a_position;
varying vec3 v_pos;
uniform mat4 u_matrix;
void main() {
  gl_Position = u_matrix * a_position;
  v_pos= (u_matrix * a_position).xyz;
}`;

export const FSHADER_SOURCE = `
#ifdef GL_OES_standard_derivatives
   #extension GL_OES_standard_derivatives : enable
 #endif
	precision lowp float;
  varying vec3 v_pos;

    void main() {
      vec3 normal = normalize(  cross(dFdx(v_pos), dFdy(v_pos))  );
      vec3 len = v_pos;
      gl_FragColor = vec4(normal,1.);
    }
`;
