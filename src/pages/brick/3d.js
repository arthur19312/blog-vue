import * as THREE from "@/lib/ThreeJs/three.module";
import { Vector3 } from "@/lib/ThreeJs/three.module";
import { OrbitControls } from "@/lib/ThreeJs/OrbitControls";
import { getComposer } from "./postprocess";
import { AnimateObj } from "./AnimateObj";

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
const MAX_STEP = 14;
const MIN_STEP = 3;
const START_X = -120;
const START_Y = 70;
const STEP_X = 60;
const STEP_Y = 60;
const MAX_SCROLL_Y = START_Y - 40;
const MIN_SCROLL_Y = START_Y - STEP_Y * 9 + 40;

var animateId, brickAniId;
var scene, renderer, camera;
var composer;
var controls, cameraHelper;
var scrollY = 0;
var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();

var list = new THREE.Group();
var group = new THREE.Group();
var intersectList = [];
var drag = false,
  animateQueue = [];

const state = {
  direction: new Vector3(0, 0, 0),
  position: new Vector3(0, 0, 0),
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
  const directionalLight = new THREE.DirectionalLight(0xddffff, 0.8);
  scene.add(directionalLight);
  const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x80d0f0, 0.3);
  scene.add(hemisphereLight);

  generateBricks();

  composer = getComposer({ renderer, scene, camera });

  animate();
}

function animate() {
  // let gcList = [];
  // animateQueue.forEach((item, index) => {
  //   if (!item.detectAniStatus()) {
  //     gcList.push(index);
  //   }
  // });
  // animateQueue = animateQueue.filter((_, index) => !gcList.includes(index));
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
  // state.size = new Vector3(x, y, z);
  return new THREE.BoxGeometry(x, y, z);
};

const getRandomMaterial = () => {
  // return new THREE.MeshBasicMaterial({
  //   color: new THREE.Color(`rgb(${getColor()}, ${getColor()}, ${getColor()})`),
  // });
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(`rgb(${getColor()}, ${getColor()}, ${getColor()})`),
    metalness: Math.random() / 10,
    roughness: Math.random() / 1.2,
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
    group.position.x = (l % 5) * STEP_X + START_X;
    group.position.y = -Math.floor(l / 5) * STEP_Y + START_Y;
    group.setRotationFromAxisAngle(
      new Vector3(Math.random(), Math.random(), Math.random()).normalize(),
      Math.random() * 10
    );
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
  cube.index = list.children.length - 1;
  group.add(cube);
  intersectList.push(cube);

  if (list.children.length === 50 && group.children.length === 5) {
    clearInterval(brickAniId);
  }
};

export const onMouseWheel = (e) => {
  scrollY -= e.deltaY / 100;
  if (scrollY > MIN_SCROLL_Y && scrollY <= MAX_SCROLL_Y)
    camera.position.y = scrollY;
};
export const onMouseDown = (e) => {
  const { clientX, clientY } = e;
  drag = true;
  pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(intersectList);
  if (intersects.length) {
    animateQueue.push(
      new AnimateObj(
        list.children[intersects[0].object.index],
        clientX,
        clientY
      )
    );
  } else {
    drag = false;
  }
};
export const onMouseUp = (e) => {
  drag = false;
  animateQueue[animateQueue.length - 1].startReset();
};

export const onMouseMove = (e) => {
  const { clientX, clientY } = e;
  if (!drag) {
  } else {
    animateQueue[animateQueue.length - 1].update(clientX, clientY);
  }
};
