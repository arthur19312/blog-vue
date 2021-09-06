import {
  WebGLRenderer,
  ObjectLoader,
  Scene,
  PerspectiveCamera,
  PointLight,
  Fog,
  Vector2,
} from "./ThreeJs/three.module";
import { UnrealBloomPass } from "./ThreeJs/UnrealBloomPass";
import { RenderPass } from "./ThreeJs/RenderPass";
import { EffectComposer } from "./ThreeJs/EffectComposer";
import { AfterimagePass } from "./ThreeJs/AfterimagePass";

let index = 0;

const CanvasSizeX = 600,
  CanvasSizeY = 480;

let renderer = new WebGLRenderer({
  antialias: true,
  logarithmicDepthBuffer: true,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(CanvasSizeX, CanvasSizeY);

renderer.domElement.id = "render";

let scene, model, camera, composer;
let loader = new ObjectLoader();
let aniId;
let light1, light2, light3;
let deg = Math.PI / 2;
//let glitchPass = new GlitchPass();

display1();

function display1() {
  if (index != 1) {
    index = 1;

    clearModel();

    scene = new Scene();
    camera = new PerspectiveCamera(50, 1.25, 0.01, 1000);
    camera.position.z = 200;

    loader.load(
      // resource URL
      "assets/scene/scene1.json",
      // onLoad callback
      // Here the loaded data is assumed to be an object
      function (obj) {
        // Add the loaded object to the scene
        model = obj;
        scene.add(obj);
      },
      // onProgress callback
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // onError callback
      function (err) {
        console.error("An error happened" + err);
      }
    );

    let renderPass = new RenderPass(scene, camera);
    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    //composer.addPass( glitchPass);
    animate1();
  }
}

function animate1() {
  aniId = requestAnimationFrame(animate1);

  camera.rotation.y += 0.01;

  camera.position.x = 250 * Math.sin(camera.rotation.y * 1);
  camera.position.z = 250 * Math.cos(camera.rotation.y * 1);

  //renderer.render(scene, camera);

  composer.render();
}

function display2() {
  if (index != 2) {
    index = 2;

    clearModel();

    scene = new Scene();
    scene.fog = new Fog("rgb(225,255,254)", 1000, 3000);
    scene.cache = false;

    camera = new PerspectiveCamera(30, 1.25, 0.1, 4000);
    camera.position.set(10, 10, 1200);

    light1 = new PointLight("rgb(45,200,205)", 0.4, 0, 0);
    light1.position.set(0, 0, 0);
    scene.add(light1);

    light2 = new PointLight("rgb(225,0,90)", 0.8, 0, 0);
    light2.position.set(0, 0, 0);
    scene.add(light2);

    light3 = new PointLight("rgb(205,130,40)", 0.6, 0, 0);
    light3.position.set(0, 0, 0);
    scene.add(light3);

    loader.load(
      // resource URL
      "assets/scene/scene2.json",
      // onLoad callback
      // Here the loaded data is assumed to be an object
      function (obj) {
        // Add the loaded object to the scene
        model = obj;

        obj.scale.multiplyScalar(20);
        scene.add(obj);
      },
      // onProgress callback
      function (xhr) {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      // onError callback
      function (err) {
        console.error("An error happened" + err);
      }
    );

    let renderPass = new RenderPass(scene, camera);

    const params = {
      //exposure: 0.2,
      bloomStrength: 0.7,
      bloomThreshold: 0.2,
      bloomRadius: 0.2,
    };

    //strength radius threshold
    const bloomPass = new UnrealBloomPass(
      new Vector2(CanvasSizeX, CanvasSizeY),
      1.5,
      0.4,
      0.85
    );
    bloomPass.threshold = params.bloomThreshold;
    bloomPass.strength = params.bloomStrength;
    bloomPass.radius = params.bloomRadius;

    const afterimagePass = new AfterimagePass(0.9);

    composer = new EffectComposer(renderer);
    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(afterimagePass);

    animate2();
  }
}

function animate2() {
  aniId = requestAnimationFrame(animate2);

  model.rotation.x += 0.005;
  model.rotation.y += 0.005;

  deg += (1.2 * Math.PI) / 180;
  deg = deg % 360;

  light1.position.x = Math.sin(deg) * 100;
  light1.position.z = Math.cos(deg) * 100;

  light2.position.x = -Math.sin(deg) * 100;
  light2.position.y = -Math.cos(deg) * 100;

  light3.position.y = -Math.sin(deg) * 100;
  light3.position.z = Math.cos(deg) * 100;

  //renderer.render(scene, camera);
  composer.render();
}

function clearModel() {
  if (model) {
    scene.remove(model);
  }
  cancelAnimationFrame(aniId);
  renderer.dispose();

  scene = null;
  camera = null;
}

window.onresize = function () {
  /*
	if (window.innerWidth > 2000) {
		canvasSizeX = 1200;
		canvasSizeY = 960;
	} else if (window.innerWidth > 1350) {
		canvasSizeX = 900;
		canvasSizeY = 720;
	} else if (window.innerWidth > 1200) {
		canvasSizeX = 600;
		canvasSizeY = 480;
	} else if (window.innerWidth < 1200) {
		canvasSizeX = 500;
		canvasSizeY = 400;
	}



	renderer.setSize(canvasSizeX, canvasSizeY);
*/
};

export { display1, display2, renderer };
