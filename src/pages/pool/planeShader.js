const VS = `
      varying vec2 vUv;
      varying vec3 v_pos;
      void main() {
        vUv = uv;
        v_pos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `;
const FS = {
  SILK: `

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
          color.z=a+.23;
        }else{
          float a = smoothstep(1.,-1.,v_pos.z);
          color.x=a-.1;
          color.y=a+.06;
          color.z=a+.23;
        }
          color.w = 1.;
       
      gl_FragColor = color;
        
      }
    `,

  SWIMMING_POOL: `
  #ifdef GL_OES_standard_derivatives
   #extension GL_OES_standard_derivatives : enable
 #endif

      varying vec2 vUv;
      varying vec3 v_pos;
  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }
  
      void main() {
        vec4 color =vec4(.6,.92,.8,1.);
 vec3 normal = normalize(  cross(dFdx(v_pos), dFdy(v_pos))  );
        if(v_pos.z<0.){
          float a = smoothstep(.5,-1.2,v_pos.z);
          color.x+=a*.4+.01;
          color.y+=a*.3;
          color.z+=a*.22;
        }else{
          float a = smoothstep(0.,1.,v_pos.z);
          color.x-=a*.2+.05;
          color.y+=a*.01;
          color.z+=a*.01;
        }

        if(normal.x<.1 && normal.y<.1 && v_pos.z<-.3){
          color+=vec4(.2,.26,.14,0.);
           color.z-=.05;
        }

        if(v_pos.z<.5 && v_pos.z>-.5){
          color.y+=.01;
          color.z+=.01;
        }
        // color = vec4(normal,1.);
      gl_FragColor = color;
        
      }
    `,

  SAND: `
  #ifdef GL_OES_standard_derivatives
   #extension GL_OES_standard_derivatives : enable
 #endif

      varying vec2 vUv;
      varying vec3 v_pos;
  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }
  
      void main() {
        vec4 color =vec4(.3,.8,.92,1.);
 vec3 normal = normalize(cross(dFdx(v_pos), dFdy(v_pos)));
        if(v_pos.z<0.2){
          float a = smoothstep(.1,-1.,v_pos.z);
          color.x+=a*.32+.01;
          color.y+=a*.14+.01;
          color.z+=a*.02;
        }else if(v_pos.z>-.1){
          float a = smoothstep(.1,1.5,v_pos.z);
          color.x+=a*.1+.03;
          color.y-=a*.08;
          color.z+=a*.05;
        }

        if(normal.x<.3 && normal.y<.3 && v_pos.z<-.1){
          color+=vec4(.2,.1,-.05,0.);
          //  color.z+=.05;

          if(normal.x<.1 && normal.y<.1 && v_pos.z<-.4){
          color+=vec4(.4,.26,-.02,0.);
          
        }
        }


        if(v_pos.z<.5 && v_pos.z>-.5){
          // color.y+=.01;
          // color.z+=.02;
        }
color.xyz-=vec3(.1,.09,.09);

color.xyzw*=vec4(1.1,1.1,1.05,1.);

      gl_FragColor = color;
        
      }
    `,
};
export { VS, FS };
