const VS = `
      varying vec2 vUv;
      varying vec3 vpos;
      varying vec3 vnm;
      void main() {
        vUv = uv;
        vpos= position;
        vnm = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `;
const FS = `

      varying vec2 vUv;
      varying vec3 vpos;
      varying vec3 vnm;
      uniform vec3 edgeT;
      uniform vec3 edgeB;
      uniform vec3 edgeL;
      uniform vec3 edgeR;
  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }

      void main() {
        float a = .6;
        if((vpos.x<0. && vnm.x<0. && vpos.y<vec3(edgeL[0]).z)||(vpos.z>0. && vnm.z>0. && vpos.y<vec3(edgeB[0]).z)){
gl_FragColor = vec4(a,a,a,smoothstep(1.,0.,(vpos.y+4.)/4.));
        }else{
gl_FragColor = vec4(0);
        }
        gl_FragColor = vec4(0);
      }
    `;
export { VS, FS };
