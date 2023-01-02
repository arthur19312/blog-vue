import * as THREE from "@/lib/ThreeJs/three.module";
import { RenderPass } from "@/lib/ThreeJs/RenderPass";
import { ShaderPass } from "@/lib/ThreeJs/depends/ShaderPass";
import { EffectComposer } from "@/lib/ThreeJs/EffectComposer";

export const getComposer = ({ renderer, scene, camera }) => {
  var composer;

  composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  composer.addPass(getColorPass(renderer));

  return composer;
};

const getColorPass = (renderer) => {
  const colorShader = {
    uniforms: {
      tDiffuse: { value: null },
      color: { value: new THREE.Color(0xffaaf0) },
      uSize: {
        value: new THREE.Vector2(
          renderer.domElement.offsetWidth,
          renderer.domElement.offsetHeight
        ),
      },
    },
    vertexShader: `
      varying vec2 vUv;
      
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform vec3 color;
      uniform sampler2D tDiffuse;
      uniform vec2 uSize;


  vec2 Hash21(vec2 p){
    p = fract(p*vec2(123.31,456.87));
    p+=dot(p,p+40.7);
    return fract(p);
  }
      void main() {
        vec4 preCol = texture2D(tDiffuse, vUv);

        vec2 pos = vec2(mod(gl_FragCoord.x,16.),mod(gl_FragCoord.y,16.));
        float len = length(pos-vec2(8.,8.));
        float edge1 = 1.-step(6.,len);
        float edge = edge1;
        //  float edge1 = (1.-step(12.,abs(pos.y-pos.x)))*(1.-step(12.,abs(pos.y+pos.x-32.)));
        //  float edge2 = (1.-step(2.,abs(pos.x-16.)))+(1.-step(2.,abs(pos.y-16.)));
        //  float edge = edge1+edge2;
        // vec4 col =  step(.15,(Hash21(gl_FragCoord.xy).x))*preCol*clamp(edge,0.,1.);
        vec4 col = preCol*edge;

        if(col.y>col.x && col.y>col.z){
          col.x-=.1;
          col.y+=gl_FragCoord.y/uSize.y/9.;
          col.z+=.8-gl_FragCoord.y/uSize.y/3.;
        }
        if(col.x>col.y && col.x>col.z){
          // col.x-=.1;
          col.x+=(gl_FragCoord.y-uSize.y/2.)/uSize.y/6.;
          col.y-=(gl_FragCoord.y-uSize.y/2.)/uSize.y/12.;
        }

        // if(pos.x<2.||pos.y<2.){
        //   col=vec4(1.,0.,0.,1.);
        // }
        gl_FragColor = col;
        
      }
    `,
  };
  const colorPass = new ShaderPass(colorShader);
  colorPass.renderToScreen = true;

  return colorPass;
};
