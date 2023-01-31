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
        
        gl_FragColor = preCol;
        
      }
    `,
  };
  const colorPass = new ShaderPass(colorShader);
  colorPass.renderToScreen = true;

  return colorPass;
};
