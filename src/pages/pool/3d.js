import * as THREE from "@/lib/ThreeJs/three.module";
import { Vector3 } from "@/lib/ThreeJs/three.module";
import { OrbitControls } from "@/lib/ThreeJs/OrbitControls";
import { getComposer } from "./postprocess";
import { VS as CUBE_VS, FS as CUBE_FS } from "./cubeShader";
import { VS as PLANE_VS, FS as PLANE_FS } from "./planeShader";
var controls, cameraHelper;
var scene, renderer, camera, group1, group2, group3;
var composer;
var MOUSE_X, MOUSE_Y;

if (!import.meta.env.SSR) {
  let SCREEN_WIDTH = window.innerWidth;
  let SCREEN_HEIGHT = window.innerHeight;

  scene = new THREE.Scene();
  window.scene = scene;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearAlpha(0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "poolCanvas";
  camera = new THREE.PerspectiveCamera(
    60,
    SCREEN_WIDTH / SCREEN_HEIGHT,
    0.1,
    1000
  );
  camera.position.x = -15;
  camera.position.y = 10;
  camera.position.z = 15;
  camera.lookAt(new Vector3(0, 0, 0));

  scene.add(camera);
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.autoRotate = true;
  // cameraHelper = new THREE.CameraHelper(camera);
  // scene.add(cameraHelper);
}

export const startAnimate = () => {
  init();

  composer = getComposer({ renderer, scene, camera });

  animate();
};

function animate() {
  requestAnimationFrame(animate);
  // renderer.render(scene, camera);
  composer.render();
}

export const rendererDom = renderer?.domElement;

export const init = () => {
  const geometry = new THREE.BoxGeometry(10, 8, 10).center();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    },
    vertexShader: CUBE_VS,
    fragmentShader: CUBE_FS,
    transparent: true,
    opacity: 0.3,
  });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const g = new THREE.PlaneGeometry(10, 10, 10, 10);
  const m = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    },
    vertexShader: PLANE_VS,
    fragmentShader: PLANE_FS,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(g, m);
  plane.rotateX(Math.PI / 2);
  scene.add(plane);

  window.plane = plane;
};

export const updateMouse = (e) => {
  const curX = e.clientX;
  const curY = e.clientY;

  if (typeof MOUSE_X === "undefined") {
    MOUSE_X = curX;
    MOUSE_Y = curY;
  }
  group1.rotation.y += (curX - MOUSE_X) * 0.0006;
  group1.rotation.x += (curY - MOUSE_Y) * 0.0004;
  group1.position.x -= (curX - MOUSE_X) * 0.08;
  group1.position.y -= (curY - MOUSE_Y) * 0.06;
  group2.rotation.y += (curX - MOUSE_X) * 0.00045;
  group2.rotation.x += (curY - MOUSE_Y) * 0.00035;
  group2.position.x -= (curX - MOUSE_X) * 0.045;
  group2.position.y -= (curY - MOUSE_Y) * 0.035;
  group3.rotation.y += (curX - MOUSE_X) * 0.001;
  group3.rotation.x += (curY - MOUSE_Y) * 0.0008;
  group3.position.x -= (curX - MOUSE_X) * 0.1;
  group3.position.y -= (curY - MOUSE_Y) * 0.06;
  MOUSE_X = curX;
  MOUSE_Y = curY;
};

export const refresh = () => {
  scene.children = scene.children.slice(0, 1);
  lathe();
};
