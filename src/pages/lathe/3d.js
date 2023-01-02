import * as THREE from "@/lib/ThreeJs/three.module";
import { Vector3 } from "@/lib/ThreeJs/three.module";
import { OrbitControls } from "@/lib/ThreeJs/OrbitControls";
import { getComposer } from "./postprocess";

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
  renderer.domElement.id = "latheCanvas";
  camera = new THREE.PerspectiveCamera(
    60,
    SCREEN_WIDTH / SCREEN_HEIGHT,
    0.1,
    1000
  );
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 400;

  scene.add(camera);
  // controls = new OrbitControls(camera, renderer.domElement);
  // controls.autoRotate = true;
  // cameraHelper = new THREE.CameraHelper(camera);
  // scene.add(cameraHelper);
}
function startAnimate() {
  lathe();

  composer = getComposer({ renderer, scene, camera });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  // renderer.render(scene, camera);
  composer.render();
}
export const rendererDom = renderer?.domElement;
export { startAnimate };

export const lathe = () => {
  group1 = new THREE.Group();
  scene.add(group1);
  group2 = new THREE.Group();
  scene.add(group2);
  group3 = new THREE.Group();
  scene.add(group3);
  getPoints(8);
  getCone(8);
  getC(12);
};

var coneColorList = [0xe9b2a6, 0xf5a6bd, 0xf9cb9c, 0xefa0a0, 0xf4cccc];

var clist = [0xfff162, 0xfcef34];
export const getCone = (n) => {
  for (let i = 0; i < n; i++) {
    const geometry = new THREE.SphereGeometry(Math.random() * 20 + 10, 8, 8);
    const material = new THREE.MeshBasicMaterial({
      color: coneColorList[Math.floor(Math.random() * 5)],
    });
    const cone = new THREE.Mesh(geometry, material);

    cone.position.x +=
      (i - Math.floor(n / 2)) * 50 + (Math.random() - 0.5) * 20;
    cone.position.y += (Math.random() - 0.5) * 100 + 20;
    cone.position.z += (Math.random() - 0.5) * 180 + 10;
    group2.add(cone);
  }
  const path = new THREE.CatmullRomCurve3(
    group2.children.map((child) => child.position.clone().multiplyScalar(1.5)),
    false,
    "catmullrom",
    0.8
  );
  const geometry = new THREE.TubeGeometry(path, 128, 2, 5, false);
  const material = new THREE.MeshBasicMaterial({ color: 0xe9b2a6 });
  const mesh = new THREE.Mesh(geometry, material);
  // mesh.scale.x = -1.5;
  // mesh.scale.y = 1.5;
  // mesh.scale.z = 1.5;
  group2.add(mesh);
};

export const getC = (n) => {
  for (let i = 0; i < n; i++) {
    const geometry1 = new THREE.TetrahedronGeometry(Math.random() * 15 + 5, 0);
    const material1 = new THREE.MeshBasicMaterial({
      color: clist[Math.floor(Math.random() * 2)],
    });
    const c = new THREE.Mesh(geometry1, material1);

    c.position.x += (i - Math.floor(n / 2)) * 40 + (Math.random() - 0.5) * 20;
    c.position.y += (Math.random() - 0.5) * 100 + 25;
    c.position.z += (Math.random() - 0.5) * 180 + 20;
    c.rotation.z = (Math.random() - 0.5) * 0.2;
    group3.add(c);
  }
};

export const getPoints = (n) => {
  for (let s = 0; s < n; s++) {
    const points = [];
    points.push(new THREE.Vector2(2, -120));
    points.push(new THREE.Vector2(2, -100));
    for (let i = 0; i < 100; i++) {
      points.push(
        new THREE.Vector2(
          Math.random() > 0.2 ? 2 : Math.random() * 50 + 2,
          (i - 48) * 2
        )
      );
    }
    points.push(new THREE.Vector2(2, 106));
    points.push(new THREE.Vector2(2, 120));

    const geometry = new THREE.LatheGeometry(points, 6);
    const material = new THREE.MeshBasicMaterial({ color: 0x22ff81 });

    const lathe = new THREE.Mesh(geometry, material);

    lathe.position.x += (Math.random() - 0.5) * 480;
    lathe.position.y += (Math.random() - 0.5) * 50 + 10;
    lathe.position.z += (Math.random() - 0.5) * 100;
    lathe.rotation.z = (Math.random() - 0.5) * 0.2;
    lathe.rotation.x = (Math.random() - 0.5) * 0.2;
    lathe.rotation.y = (Math.random() - 0.5) * 0.2;
    group1.add(lathe);
  }
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
