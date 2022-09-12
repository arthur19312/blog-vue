export const VSHADER_SOURCE = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

export const FSHADER_SOURCE = `
	precision lowp float;  
    void main() {
          gl_FragColor = vec4(.3,.4,.5,1.0);
        
    }
`;
