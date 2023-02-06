const VS = `
      varying vec2 vUv;
      varying vec3 v_pos;
      void main() {
        vUv = uv;
        v_pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `;
const FS = `

      varying vec2 vUv;
      varying vec3 v_pos;
  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }
      void main() {
        vec4 color =vec4(.1,.7,.8,0.);
        if(v_pos.z<0.){
          float a = smoothstep(-1.,1.,v_pos.z);
          color.x=a-.1;
          color.y=a+.08;
          color.z=a+.2;
        }else{
          float a = smoothstep(1.,-1.,v_pos.z);
          color.x=a-.1;
          color.y=a+.06;
          color.z=a+.2;
        }
          color.w = 1.;
       
      gl_FragColor = color;
        
      }
    `;
export { VS, FS };
