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
      color: { value: new THREE.Color(0x88ccff) },
      uSize: {
        value: new THREE.Vector2(
          renderer.domElement.offsetWidth,
          renderer.domElement.offsetHeight
        ),
      },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      
      void main() {
        vUv = uv;
        vNormal=normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      uniform vec3 color;
      uniform sampler2D tDiffuse;
      uniform vec2 uSize;
      const int MAX_LENGTH = 3;
      const float BORDER_WIDTH = 2.;
      const vec3 BORDER_COLOR = vec3(.1,.1,.1);
      void main() {
        vec4 preCol = texture2D(tDiffuse, vUv);
        vec3 col = vec3(.8,.8,.8)*.7+vec3(
            preCol.rgb * color)*.3;
        vec2 invSize = 1. / uSize;
            
            float a0=1.;
            for(int x=-MAX_LENGTH;x<=MAX_LENGTH;x++){
              for(int y=-MAX_LENGTH;y<=MAX_LENGTH;y++){
                vec2 offset = vec2(x,y)*BORDER_WIDTH*invSize;
                vec4 c = texture2D(tDiffuse, vUv+offset);
                if(preCol.a * c.a<.1){
                  a0=min(length(offset),a0);
                }
              }
            }
            col = (mix(BORDER_COLOR,col,smoothstep(0.,1.,a0)));
            gl_FragColor = vec4(vNormal,preCol.a);
      }
    `,
  };
  const colorPass = new ShaderPass(colorShader);
  colorPass.renderToScreen = true;

  return colorPass;
};
