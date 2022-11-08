import * as THREE from "@/lib/ThreeJs/three.module";
import { Vector3 } from "@/lib/ThreeJs/three.module";
import { OrbitControls } from "@/lib/ThreeJs/OrbitControls";
import { getComposer } from "./postprocess";

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
const MAX_STEP = 10;
const MIN_STEP = 3;
const baseMaterial = new THREE.MeshStandardMaterial({
  color: 0x5588dd,
  metalness: 0.9,
  roughness: 0.22,
});
const START_X = -120;
const START_Y = 70;
const STEP_X = 60;
const STEP_Y = 60;

var animateId, brickAniId;
var scene, renderer, camera;
var composer;
var controls, cameraHelper;
var deltaY = 0;

var list = new THREE.Group();
var group = new THREE.Group();
const state = {
  direction: new Vector3(0, 0, 0),
  position: new Vector3(START_X, START_Y, 0),
  size: new Vector3(0, 0, 0),
};
if (!import.meta.env.SSR) {
  let SCREEN_WIDTH = window.innerWidth;
  let SCREEN_HEIGHT = window.innerHeight;

  scene = new THREE.Scene();
  window.scene = scene;

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearAlpha(0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.id = "brickCanvas";

  camera = new THREE.OrthographicCamera(
    -SCREEN_WIDTH / 2,
    SCREEN_WIDTH / 2,
    SCREEN_HEIGHT / 2,
    -SCREEN_HEIGHT / 2,
    0.1,
    1000
  );

  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 100;
  camera.lookAt(scene.position);
  camera.zoom = 4.25;
  camera.updateProjectionMatrix();

  scene.add(camera);
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.autoRotate = true;
  // cameraHelper = new THREE.CameraHelper(camera);
  // scene.add(cameraHelper);
}

function startAnimate() {
  const light = new THREE.AmbientLight(0xe0e0e0);
  scene.add(light);

  generateBricks();

  composer = getComposer({ renderer, scene, camera });

  animate();
}

function animate() {
  animateId = requestAnimationFrame(animate);
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
  scene.add(list);
  brickAniId = setInterval(getBrick, 100);
};
export const getBrick = () => {
  const f = group.children.length % 5;
  if (!f) {
    group = new THREE.Group();
    list.add(group);
    const l = list.children.length - 1;
    state.position.x = (l % 5) * STEP_X + START_X;
    state.position.y = -Math.floor(l / 5) * STEP_Y + START_Y;
  }
  if (list.children.length === 40) {
    clearInterval(brickAniId);
  }
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
  // state.direction = newDirection;
  // state.position = newPosition;
  group.add(cube);
};

export const onMouseWheel = (e) => {
  deltaY -= e.deltaY / 100;
  if (deltaY > -300 && deltaY < 40) camera.position.y = deltaY;
};
