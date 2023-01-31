const VS = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `;
const FS = `
      varying vec2 vUv;
  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }
      void main() {
        
        gl_FragColor = vec4(.2,.4,.8,.2);
        
      }
    `;
export { VS, FS };
