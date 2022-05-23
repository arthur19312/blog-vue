import * as THREE from "@/lib/ThreeJs/three.module";

const PI = Math.PI;
const Z = 0;
const N = 36;
const RADIUS = 30;
const CIRCLE_RADIUS = 2;
const baseMaterial = new THREE.MeshStandardMaterial({
  color: 0x5588dd,
  metalness: 0.9,
  roughness: 0.22,
});
var animateId;

var scene, renderer, camera;
const meshes = [];
camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 200;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.id = "moonCanvas";

function display() {
  scene = new THREE.Scene();
  const light = new THREE.DirectionalLight(0xddddff);
  scene.add(light);

  const point = new THREE.PointLight(0xff4400, 20, 100);
  point.position.set(0, 0, 60);
  scene.add(point);
  const point2 = new THREE.PointLight(0x0055aa, 5, 200);
  point2.position.set(10, 10, 60);
  scene.add(point2);
  const point3 = new THREE.PointLight(0x0011ff, 2, 0);
  point3.position.set(-10, -10, -10);
  scene.add(point3);

  const curve = new THREE.EllipseCurve(
    0,
    0, // ax, aY
    RADIUS,
    RADIUS, // xRadius, yRadius
    0,
    2 * Math.PI, // aStartAngle, aEndAngle
    false, // aClockwise
    0 // aRotation
  );

  const points = curve.getPoints(N);

  const ringGeom = new THREE.TorusGeometry(RADIUS, 1, 4, RADIUS);
  const ring = new THREE.Line(ringGeom, baseMaterial);
  scene.add(ring);

  const baseGroup = getQuatGroup();

  for (let i = 0; i < N; i++) {
    const v = (i / N) * 2 * PI;
    const group = baseGroup.clone(true);
    const { x, y } = points[i];
    group.position.x = x;
    group.position.y = y;
    group.rotation.z = v - (1 / 2) * PI;
    group.rotateOnAxis(new THREE.Vector3(1, 0, 0), v / 4);
    scene.add(group);
    meshes.push(group);
  }
  animate();
}

function animate() {
  animateId = requestAnimationFrame(animate);

  for (let i = 0; i < N; i++) {
    meshes[i].rotateOnAxis(new THREE.Vector3(1, 0, 0), 0.008);
  }
  renderer.render(scene, camera);
}

export { display, renderer, animateId };

function getQuatGroup() {
  const baseGroup = getBaseGroup();
  const group1 = baseGroup.clone(true);
  const group2 = baseGroup.clone(true);
  const group3 = baseGroup.clone(true);
  const group4 = baseGroup.clone(true);

  group2.rotateOnAxis(new THREE.Vector3(1, 0, 0), PI / 2);
  group3.rotateOnAxis(new THREE.Vector3(1, 0, 0), PI);
  group4.rotateOnAxis(new THREE.Vector3(1, 0, 0), (PI * 3) / 2);

  const quatGroup = new THREE.Group();
  quatGroup.add(group1);
  quatGroup.add(group2);
  quatGroup.add(group3);
  quatGroup.add(group4);

  return quatGroup;
}

function getBaseGroup() {
  const cylinGeom = new THREE.CylinderGeometry(
    0.3,
    0.3,
    RADIUS - CIRCLE_RADIUS * 2
  );
  const cylin = new THREE.Mesh(cylinGeom, baseMaterial);

  const ico1Geom = new THREE.IcosahedronGeometry(2, 0);
  const ico1 = new THREE.Mesh(ico1Geom, baseMaterial);
  const ico2Geom = new THREE.IcosahedronGeometry(1.5, 0);
  const ico2 = new THREE.Mesh(ico2Geom, baseMaterial);
  const ico3Geom = new THREE.IcosahedronGeometry(1.2, 0);
  const ico3 = new THREE.Mesh(ico3Geom, baseMaterial);
  const ico4Geom = new THREE.IcosahedronGeometry(1, 0);
  const ico4 = new THREE.Mesh(ico4Geom, baseMaterial);

  const circleGeom = new THREE.CylinderGeometry(
    CIRCLE_RADIUS,
    CIRCLE_RADIUS,
    0.3,
    32
  );
  const circle = new THREE.Mesh(circleGeom, baseMaterial);
  cylin.position.y = (RADIUS - CIRCLE_RADIUS * 2) / 2;
  ico1.position.y = 6;
  ico2.position.y = 12;
  ico3.position.y = 17;
  ico4.position.y = 22;
  circle.position.y = RADIUS - CIRCLE_RADIUS * 1.5;
  circle.rotation.x = PI / 2;

  const group = new THREE.Group();
  group.add(cylin);
  group.add(ico1);
  group.add(ico2);
  group.add(ico3);
  group.add(ico4);
  group.add(circle);

  return group;
}
