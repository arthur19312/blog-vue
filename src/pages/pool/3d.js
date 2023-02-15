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
  buffer1 = [];
var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();
var intersectList = [];
var filterType = "SAND",
  planeGeometry = {};

const PLANE_WIDTH = 90;
const BUFFER_WIDTH = PLANE_WIDTH + 1;
const BUFFER_AREA = BUFFER_WIDTH * BUFFER_WIDTH - 1;
const BUFFER_LAST_LINE_START = BUFFER_WIDTH * (BUFFER_WIDTH - 1);
const BUFFER_LAST_LINE_END = BUFFER_AREA;

const materialMap = {};
var aniId = 0;

export const stopAnimate = () => {
  cancelAnimationFrame(aniId);
  renderer.dispose();
  scene = null;
  camera = null;
};

const switchMiu = () => {
  if (filterType === "SWIMMING_POOL") {
    return 0.006;
  } else if (filterType === "SAND") {
    return 0.0008;
  } else {
    return 0.1;
  }
};

const switchPower = () => {
  if (filterType === "SWIMMING_POOL") {
    return 1.2;
  } else {
    return 5;
  }
};

const BIOS = 0.001;

const doIterate = () => {
  let buffer = new Array(BUFFER_WIDTH * BUFFER_WIDTH);

  for (let j = 0; j < BUFFER_WIDTH; j++) {
    for (let i = 0; i < BUFFER_WIDTH; i++) {
      const index = j * BUFFER_WIDTH + i;
      buffer[index] = new THREE.Vector3(buffer1[index].x, buffer1[index].y, 0);
      let val =
        -buffer0[index].z +
        0.5 *
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
      buffer[index].z = val * 0.995;
    }
  }
  buffer0 = buffer1;
  buffer1 = buffer;
  buffer = null;
};

if (!import.meta.env.SSR) {
  let SCREEN_WIDTH = window.innerWidth;
  let SCREEN_HEIGHT = window.innerHeight;

  var textureLoader = new THREE.TextureLoader();
  var texture = textureLoader.load("assets/img/texture/pool/sky.png");
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
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
  camera.position.x = 30;
  camera.position.y = 0;
  camera.position.z = 30;
  camera.lookAt(new Vector3(0, 0, 0));

  scene.add(camera);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
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

  for (let i = 0; i < BUFFER_AREA; i++) {
    plane.geometry.vertices[i] = buffer1[i];
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
  const geometry = new THREE.BoxGeometry(20, 20, 20).center();

  const material = new THREE.MeshBasicMaterial({ wireframe: true });

  const cube = new THREE.Mesh(geometry, material);
  // scene.add(cube);

  const edges = new THREE.EdgesHelper(cube, 0x444444);
  scene.add(edges);

  planeGeometry = new THREE.PlaneGeometry(20, 20, PLANE_WIDTH, PLANE_WIDTH);
  planeGeometry.dynamic = true;

  if (!materialMap[filterType]) {
    // skyMap.warpS = skyMap.warpT=THREE.RepeatWrapping
    materialMap[filterType] = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
        skyMap: { value: texture },
      },
      vertexShader: PLANE_VS,
      fragmentShader: PLANE_FS[filterType],
      side: THREE.DoubleSide,
      extensions: { derivatives: true },
    });
  }
  const m = materialMap[filterType];
  plane = new THREE.Mesh(planeGeometry, m);
  plane.rotateX(Math.PI / 2);
  scene.add(plane);
  intersectList.push(plane);

  buffer1 = plane.geometry.vertices;
  buffer0 = buffer1;

  window.plane = plane;
  updateGeometry({ power: 12 });
};

export const updateGeometry = ({
  index = BUFFER_AREA / 2,
  power = 2,
  area = 5,
  magicFlag = false,
}) => {
  const vertices = buffer1;
  vertices[index].z = -power;

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
      vertices[pos].z = power * (1 - dist / (area * area));
    }
  }
  // plane.geometry.mergeVertices();
  // plane.geometry.verticesNeedUpdate = true;
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
    updateGeometry({ index, magicFlag: true, power: switchPower() });
  }
};

export const updateFilter = (name) => {
  filterType = name;
  if (!materialMap[filterType]) {
    materialMap[filterType] = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() },
        skyMap: { value: texture },
      },
      vertexShader: PLANE_VS,
      fragmentShader: PLANE_FS[filterType],
      side: THREE.DoubleSide,
      extensions: { derivatives: true },
    });
  }
  plane.material = materialMap[filterType];
};
