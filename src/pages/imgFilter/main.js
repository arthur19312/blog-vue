import {
  initShaders,
  getUniformLoc,
  initTexture,
  useBg,
} from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./mainShader";
import * as stylizeShader from "./stylizeShader";
const NORMAL = [0, 0, 0, 0, 1, 0, 0, 0, 0];
var gl, program;
var kernel, kernelWeight;
var isKernel = true; //if use general kernel

const computeKernelWeight = () => {
  const res = kernel.reduce((prev, cur) => prev + cur);
  return res <= 0 ? 1 : res;
};
const loadImg = (kernel = NORMAL) => {
  const img = new Image();
  img.onload = () => {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    initTexture(gl, program, 0, "u_sampler", img);
    isKernel && updateKernel(kernel);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };
  img.src = "/assets/img/filter/1.jpg";
};
const main = () => {
  gl = document
    .getElementById("webgl-filter")
    .getContext("webgl", { preserveDrawingBuffer: true });
  initKernel();
};

export const getMainData = (x, y) => {
  const pixels = new Uint8Array(9 * 4);
  gl.readPixels(x, y, 3, 3, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
  return pixels;
};

// 待优化的调用
export const updateKernel = (newKernel) => {
  if (!isKernel) {
    initKernel(newKernel);
  } else {
    kernel = newKernel;
    kernelWeight = computeKernelWeight();
    gl.uniform1fv(gl.getUniformLocation(program, "u_kernel"), kernel);
    gl.uniform1f(getUniformLoc(gl, program, "u_kernelWeight"), kernelWeight);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }
};

export const initStylize = (shaderSrc) => {
  isKernel = false;
  program = initShaders(
    gl,
    stylizeShader[`VSHADER_SOURCE`],
    stylizeShader[`FSHADER_SOURCE_${shaderSrc}`]
  );
  useBg(gl, program);
  loadImg();
};

export const initKernel = (newKernel) => {
  isKernel = true;
  program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  useBg(gl, program);
  loadImg(newKernel);
};

export default main;
