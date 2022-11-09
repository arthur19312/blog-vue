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
      const int MAX_LENGTH = 3;
      const float BORDER_WIDTH = 1.;
      const vec3 BORDER_COLOR = vec3(.1,.1,.1);
      void main() {
        vec4 preCol = texture2D(tDiffuse, vUv);
        vec3 col = vec3(.9,.9,.9)*.2+vec3(
            preCol.rgb*.6+color*.4)*.8;
        vec2 invSize = 1. / uSize;
            
            float a0=1.;
            for(float x=-BORDER_WIDTH;x<=BORDER_WIDTH;x++){
              for(float y=-BORDER_WIDTH;y<=BORDER_WIDTH;y++){
                vec2 offset = vec2(x,y)*BORDER_WIDTH*invSize;
                vec4 c = texture2D(tDiffuse, vUv+offset);
                if(((preCol.a<.1)&&(c.a>.1))||((preCol.a>.1)&&(c.a<.1))){
                  a0=min(length(offset),a0);
                }
              }
            }
            col = (mix(BORDER_COLOR,col,smoothstep(0.,1.,a0)));
            gl_FragColor = vec4(col,preCol.a);
      }
    `,
  };
  const colorPass = new ShaderPass(colorShader);
  colorPass.renderToScreen = true;

  return colorPass;
};
