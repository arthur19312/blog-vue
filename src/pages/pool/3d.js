import * as THREE from "@/lib/ThreeJs/three.module";
import { Vector3 } from "@/lib/ThreeJs/three.module";
import { OrbitControls } from "@/lib/ThreeJs/OrbitControls";
import { getComposer } from "./postprocess";
import { VS as CUBE_VS, FS as CUBE_FS } from "./cubeShader";
import { VS as PLANE_VS, FS as PLANE_FS } from "./planeShader";
var controls, cameraHelper;
var scene, renderer, camera, plane;
var composer;
var MOUSE_X, MOUSE_Y;
var buffer0,
  buffer1,
  buffer2 = [];
var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();
var intersectList = [];

const PLANE_WIDTH = 80;
const BUFFER_WIDTH = PLANE_WIDTH + 1;
const BUFFER_AREA = BUFFER_WIDTH * BUFFER_WIDTH - 1;
const BUFFER_LAST_LINE_START = BUFFER_WIDTH * (BUFFER_WIDTH - 1);
const BUFFER_LAST_LINE_END = BUFFER_AREA;

// const c = 0.001; // 波速
// const d = 0.0001; // 距离间隔
const t = 0.02; //时间间隔
const miu = 0.08; //粘滞系数
const c2_d2 = 2500; // c2/d2
const c2t2_d2 = t * t * c2_d2;
const miu_t_2 = miu * t + 2;
const buffer1Param = (4 - 2 * c2t2_d2) / miu_t_2;
const buffer0Param = (miu * t - 2) / miu_t_2;
const bufferParam = (0.5 * c2t2_d2) / miu_t_2;

const BIOS = 0.001;

const doIterate = () => {
  if (buffer2.length) {
    buffer0 = buffer1;
    buffer1 = buffer2;
  }

  let buffer = new Array(BUFFER_WIDTH * BUFFER_WIDTH);

  for (let j = 0; j < BUFFER_WIDTH; j++) {
    for (let i = 0; i < BUFFER_WIDTH; i++) {
      const index = j * BUFFER_WIDTH + i;
      buffer[index] = new THREE.Vector3(buffer1[index].x, buffer1[index].y, 0);
      let val =
        buffer1Param * buffer1[index].z +
        buffer0Param * buffer0[index].z +
        bufferParam *
          (buffer1[
            index + 1 > BUFFER_AREA || (index + 1) % BUFFER_WIDTH === 0
              ? index
              : index + 1
          ].z +
            buffer1[
              index - 1 < 0 || index % BUFFER_WIDTH === 0 ? index : index - 1
            ].z +
            buffer1[
              index + BUFFER_WIDTH <= BUFFER_AREA ? index + BUFFER_WIDTH : index
            ].z +
            buffer1[index - BUFFER_WIDTH >= 0 ? index - BUFFER_WIDTH : index]
              .z);
      buffer[index].z = val * 0.99;
    }
  }

  buffer2 = buffer;
  buffer = null;
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
  renderer.domElement.id = "poolCanvas";
  camera = new THREE.PerspectiveCamera(
    60,
    SCREEN_WIDTH / SCREEN_HEIGHT,
    0.1,
    1000
  );
  camera.position.x = -20;
  camera.position.y = 15;
  camera.position.z = 20;
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
  doIterate();
  // plane.geometry.vertices = buffer2;

  for (let i = 0; i < BUFFER_AREA; i++) {
    plane.geometry.vertices[i] = buffer2[i];
  }
  plane.geometry.verticesNeedUpdate = true;
  plane.geometry.elementsNeedUpdate = true;
  requestAnimationFrame(animate);
  // setTimeout(animate, 50);
  renderer.render(scene, camera);
  composer.render();
}

export const rendererDom = renderer?.domElement;

export const init = () => {
  const geometry = new THREE.BoxGeometry(10, 8, 10).center();
  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
      edgeT: { value: buffer2.slice(0, BUFFER_WIDTH) },
      edgeB: { value: buffer2.slice(BUFFER_LAST_LINE_START) },
      edgeL: { value: buffer2.filter((v, i) => !(i % BUFFER_WIDTH)) },
      edgeT: { value: buffer2.filter((v, i) => !((i + 1) % BUFFER_WIDTH)) },
    },
    vertexShader: CUBE_VS,
    fragmentShader: CUBE_FS,
    transparent: true,
    opacity: 0.3,
  });
  material.extensions.derivatives = true;
  material.extensions.OES_standard_derivatives = true;
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const g = new THREE.PlaneGeometry(20, 20, PLANE_WIDTH, PLANE_WIDTH);
  g.dynamic = true;
  const m = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 1.0 },
      resolution: { value: new THREE.Vector2() },
    },
    vertexShader: PLANE_VS,
    fragmentShader: PLANE_FS,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(g, m);
  plane.rotateX(Math.PI / 2);
  scene.add(plane);
  intersectList.push(plane);

  window.plane = plane;
  window.cube = cube;
  updateGeometry({});
};

export const updateGeometry = ({
  index = BUFFER_AREA / 2,
  power = 2,
  area = 5,
  magicFlag = false,
}) => {
  buffer0 = plane.geometry.vertices;
  plane.geometry.vertices[index].z = power;

  // plane.geometry.vertices[index + 1].z += 2;
  // plane.geometry.vertices[index - 1].z += 2;
  // plane.geometry.vertices[index + BUFFER_WIDTH].z += 2;
  // plane.geometry.vertices[index - BUFFER_WIDTH].z += 2;

  for (let i = -area; i <= area; i++) {
    for (let j = -area; j <= area; j++) {
      // if (!i && !j) continue;
      const dist = i * i + j * j;
      if (dist > area) {
        continue;
      }
      let pos = index + i * BUFFER_WIDTH + j;
      if (index % BUFFER_WIDTH < area && j < 0) {
        pos = 2 * index - pos;
      } else if (pos % BUFFER_WIDTH < area && j > 0) {
        pos = 2 * index - pos;
      }
      if (index + i * BUFFER_WIDTH >= BUFFER_AREA && i > 0) {
        pos = index - i * BUFFER_WIDTH + j;
      } else if (index + i * BUFFER_WIDTH < 0 && i < 0) {
        pos = index - i * BUFFER_WIDTH + j;
      }

      if (pos < 0) {
        pos = 0;
      }
      if (pos >= BUFFER_AREA) {
        pos = BUFFER_AREA - 1;
      }
      // if (i > 0 && j > 0 && magicFlag) pos = -1;
      plane.geometry.vertices[pos].z = power * (1 - dist / (area * area));
    }
  }
  // plane.geometry.verticesNeedUpdate = true;
  if (!magicFlag) buffer1 = plane.geometry.vertices;
};

export const updateMouse = (e) => {};

export const refresh = () => {};

export const onMouseDown = (e) => {
  const { clientX, clientY } = e;
  pointer.set(
    (clientX / window.innerWidth) * 2 - 1,
    -(clientY / window.innerHeight) * 2 + 1
  );
  raycaster.setFromCamera(pointer, camera);
  const intersects = raycaster.intersectObjects(intersectList);
  if (intersects.length) {
    const index = intersects[0].face.a;
    updateGeometry({ index, magicFlag: true });
  }
};
