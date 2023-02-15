const VS = `
      varying vec2 vUv;
      varying vec3 i_pos;
      varying vec3 v_pos;
      void main() {
        vUv = uv;
        i_pos = position;
        v_pos =  (modelMatrix * vec4(position, 1)).xyz;
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

 uniform sampler2D skyMap;
      varying vec2 vUv;
      varying vec3 v_pos;
  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }
  
      void main() {
        vec4 color =vec4(.35,.92,.75,1.);
 vec3 normal = normalize(  cross(dFdx(v_pos), dFdy(v_pos))  );
 normal.z = -normal.z;
 float fresnel = clamp(clamp(dot(normalize(cameraPosition-v_pos),normal),0.,1.),0.,1.);
 vec4 sky = texture2D(skyMap, vUv);
        if(v_pos.z<0.){
          float a = smoothstep(.5,-1.2,v_pos.z);
          color.x+=a*.45+.04;
          color.y+=a*.1;
          color.z+=a*.06;
          // color.w=a;
        }else if(v_pos.z>-.2){
          float a = smoothstep(-.2,1.,v_pos.z);
          color.x-=a*.3+.05;
          color.y+=a*.02;
          color.z-=a*.03;
        }

        if(normal.x<.2 && normal.y<.2 && v_pos.z<-.2){
          color+=vec4(.3,.26,.14,0.);
           color.z-=.05;
        }

        if(v_pos.z<.5 && v_pos.z>-.5){
          color.y+=.01;
          color.z+=.01;
        }
        color = color*(1.-fresnel)+ fresnel*vec4(fresnel*sky.rgb,1.);
        // color = vec4(fresnel,fresnel,fresnel,1.);
        color = vec4(normal,1.);

      gl_FragColor = color;
        
      }
    `,

  SAND: `
  #ifdef GL_OES_standard_derivatives
   #extension GL_OES_standard_derivatives : enable
 #endif

      varying vec2 vUv;
      varying vec3 v_pos;
 uniform sampler2D skyMap;
 
  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }
  
      void main() {
        vec4 color =vec4(.3,.76,.68,1.);
         vec3 normal = normalize(cross(dFdx(v_pos), dFdy(v_pos))*.5);
 normal.z = -normal.z;
 vec3 posBios = cameraPosition-v_pos;
 float fresnel = clamp(.85-clamp(dot(normalize(posBios),normal),0.,1.),0.,1.);
 fresnel*=fresnel*fresnel;
 vec4 sky = texture2D(skyMap, vUv);
        if(v_pos.y>-0.1){
          float a = smoothstep(-.1,2.,v_pos.y);
          color.x+=a*.3;
          color.y+=a*.24;
          color.z+=a*.2;
        }else if(v_pos.y<0.3){
          float a = smoothstep(.15,-2.,v_pos.y);
          color.x-=a*.1;
          color.y+=a*.02;
          color.z+=a*.18;
        }

        if(normal.x<.4 && normal.z<.4 && v_pos.y>-.1){
          color+= .5*smoothstep(-.1,1.,v_pos.y)*vec4(.2,.3,-.18,0.);
          //  color.z+=.05;

          if(normal.x<.1 && normal.z<.1 && v_pos.y>.4){
          color+=  .8*smoothstep(.1,2.,v_pos.y)*vec4(.26,.18,.16,0.);
          
        }
        }


        if(v_pos.y<.5 && v_pos.y>-.5){
          color.x-=.02;
          // color.y+=.01;
          color.z+=.05;
        }

color.xyzw*=vec4(1.3,1.08,1.15,1.);

if(posBios.y<0.){
  // fresnel=.8*(1.-fresnel);
}
color = color*(1.-fresnel)+ fresnel*vec4(fresnel*sky.rgb,1.);


 if(normal.x<.2 && normal.z<.2 && v_pos.y>.5){
          color+=.08*fresnel;
        }
color.xyz-=.2*smoothstep(-5.,5.,v_pos.y)*vec3(.0,.1,.12);
color.x+=.1*color.z;
// color.z-=.1*color.y;
color.w-=.1*smoothstep(-5.,5.,v_pos.y);

        // normal.z=v_pos.z;
        // color = vec4(vec3(dot(normalize(cameraPosition-v_pos),normal)),1.);
        // color = vec4(vec3(normalize(cameraPosition-v_pos)),1.);
        // color = vec4(normal,1.);
        // color = vec4(vec3(fresnel),1.);
      gl_FragColor = color;
        
      }
    `,
};
export { VS, FS };
