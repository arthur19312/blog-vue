import * as THREE from "@/lib/ThreeJs/three.module";
import { Vector3 } from "@/lib/ThreeJs/three.module";
import { getComposer } from "./postprocess";

import { OrbitControls } from "@/lib/ThreeJs/OrbitControls";

const DIRECTION_LIST = [
  [1, 0, 0],
  [-1, 0, 0],
  [0, 1, 0],
  [0, -1, 0],
  [0, 0, 1],
  [0, 0, -1],
];
const PI = Math.PI;
const SIZE = 90;
const MAX_STEP = 5;
const MIN_STEP = 1;
const baseMaterial = new THREE.MeshStandardMaterial({
  color: 0x5588dd,
  metalness: 0.9,
  roughness: 0.22,
});
var animateId, brickAniId;
var scene, renderer, camera, controls;
var composer;
const state = {
  direction: new Vector3(0, 0, 0),
  position: new Vector3(0, 0, 0),
  size: new Vector3(0, 0, 0),
};
if (!import.meta.env.SSR) {
  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    10,
    1000
  );
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearAlpha(0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "brickCanvas";
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
  controls.dampingFactor = 0.05;
  controls.screenSpacePanning = false;
  controls.minDistance = 30;
  controls.maxDistance = 500;
  controls.maxPolarAngle = Math.PI / 2;
}

function startAnimate() {
  scene = new THREE.Scene();
  const light = new THREE.AmbientLight(0xe0e0e0);
  scene.add(light);

  generateBricks();

  composer = getComposer({ renderer, scene, camera });

  animate();
}

function animate() {
  animateId = requestAnimationFrame(animate);
  controls.update();
  // renderer.render(scene, camera);
  composer.render();
}

const stopAnimate = () => {
  cancelAnimationFrame(animateId);
};

export { startAnimate, stopAnimate };
export const rendererDom = renderer?.domElement;

const getNextDirection = (back = new THREE.Vector3()) => {
  // return new Vector3().fromArray(
  //   DIRECTION_LIST.filter(
  //     (d) => !new THREE.Vector3().fromArray(d).equals(back)
  //   )[Math.floor(Math.random() * 5)]
  // );
  return new Vector3().fromArray(DIRECTION_LIST[Math.floor(Math.random() * 6)]);
};

const getStep = () => {
  return MIN_STEP + Math.random() * (MAX_STEP - MIN_STEP + 1);
};
const getColor = () => {
  return Math.floor(Math.random() * 128) + 120;
};

const getRandomBox = () => {
  const x = getStep();
  const y = getStep();
  const z = getStep();
  state.size = new Vector3(x, y, z);
  return new THREE.BoxGeometry(x, y, z);
};

const getRandomMaterial = () => {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(`rgb(${getColor()}, ${getColor()}, ${getColor()})`),
  });
};
export const generateBricks = () => {
  brickAniId = setInterval(getBrick, 100);
};

export const getBrick = () => {
  const { position, direction, size } = state;
  const newDirection = getNextDirection(direction.negate());
  const box = getRandomBox();
  const material = getRandomMaterial();
  const cube = new THREE.Mesh(box, material);
  const newPosition = position.add(
    newDirection.multiply(size.add(state.size)).divideScalar(2)
  );
  cube.position.x = newPosition.x;
  cube.position.y = newPosition.y;
  cube.position.z = newPosition.z;
  state.direction = newDirection;
  state.position = newPosition;
  scene.add(cube);

  if (scene.children.length > 500) {
    clearInterval(brickAniId);
  }
};
