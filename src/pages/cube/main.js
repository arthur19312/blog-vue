import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";
import glFrame from "@/lib/webgl/Frame";
import {
  createProgram,
  useBg,
  getUniformLoc,
  useBuffer,
} from "@/lib/webgl/util";
import Camera from "../../lib/math/Camera/CameraUtils";
import { PerspectiveCamera } from "@/lib/math/Camera";
import Vector3 from "../../lib/math/Vector3";

const v0 = [-1, 1, -1];
const v1 = [1, 1, -1];
const v2 = [-1, -1, -1];
const v3 = [1, -1, -1];
const v4 = [-1, 1, 1];
const v5 = [1, 1, 1];
const v6 = [-1, -1, 1];
const v7 = [1, -1, 1];

const getTriArr = (v0, v1, v2) => {
  return [...v0, ...v1, ...v2];
};

const getCubeArr = () => {
  return [
    ...getTriArr(v0, v1, v2),
    ...getTriArr(v1, v2, v3),
    ...getTriArr(v5, v1, v3),
    ...getTriArr(v5, v3, v7),
    ...getTriArr(v5, v4, v6),
    ...getTriArr(v5, v6, v7),
    ...getTriArr(v0, v4, v6),
    ...getTriArr(v0, v6, v2),
    ...getTriArr(v5, v4, v0),
    ...getTriArr(v5, v0, v1),
    ...getTriArr(v7, v6, v2),
    ...getTriArr(v7, v2, v3),
  ];
};

const useCube = (gl, program) => {
  const cubePosArr = new Float32Array(getCubeArr().map((i) => i));
  useBuffer(gl, cubePosArr);
  const SIZE = cubePosArr.BYTES_PER_ELEMENT;
  const posLoc = gl.getAttribLocation(program, "a_position");
  gl.vertexAttribPointer(posLoc, 3, gl.FLOAT, false, SIZE * 3, 0);
  gl.enableVertexAttribArray(posLoc);
};

let curGl, curProgram;
const initFunc = (gl, program) => {
  curGl = gl;
  curProgram = program;
};
const updateFunc = (gl, program) => {};

var gl, program;
var camera;
export const main = () => {
  const canvas = document.getElementById("webgl-cube");
  gl = canvas.getContext("webgl");
  gl.getExtension("OES_standard_derivatives");
  program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  gl.useProgram(program);
  useCube(gl, program);
  camera = new PerspectiveCamera({ near: 0.1, far: 10 });
  camera.position.x = 3;
  camera.position.y = 2;
  camera.position.z = 5;
  camera.lookAtOrigin();
  gl.uniformMatrix4fv(
    getUniformLoc(gl, program, "u_matrix"),
    false,
    camera.getArray()
  );
  gl.clearColor(0, 0, 0, 0);
  gl.enable(gl.DEPTH_TEST);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.TRIANGLES, 0, 36);
  // raf(gl);
};

export const raf = () => {
  camera.rotation.y += 0.0001;
  gl.uniformMatrix4fv(
    getUniformLoc(gl, program, "u_matrix"),
    false,
    camera.getArray()
  );
  gl.drawArrays(gl.TRIANGLES, 0, 36);

  setTimeout(raf, 10);
};
