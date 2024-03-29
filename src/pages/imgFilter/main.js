import {
  initShaders,
  getUniformLoc,
  createTexture,
  initTexture,
  useBg,
  loadImg,
  useBuffer,
} from "@/lib/webgl/util";
import {
  computeKernelWeight,
  initFramebuffers,
  setFramebuffer,
  getMainData as getMainDataHelper,
} from "./helper";
import { SCALE, NORMAL } from "./constant";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./mainShader";
import * as stylizeShader from "./stylizeShader";
var gl, program;
var kernel = NORMAL,
  kernelWeight,
  shaderSrc;
var isKernel = true;
var textures = [],
  framebuffers = [];
var mainImage = null;

const setMainImage = (image) => {
  !mainImage && (mainImage = image);
};

const draw = () => {
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

// 设置主图片
const setImg = (callback) => {
  loadImg("/assets/img/filter/1.jpg", (image) => {
    setMainImage(image);
    callback(image);
  });
};

// gl环境初始化
const main = () => {
  gl = document
    .getElementById("webgl-filter")
    .getContext("webgl", { preserveDrawingBuffer: true });
  initKernel(NORMAL);
};

// 初始化kernel环境
export const initKernel = (newKernel) => {
  isKernel = true;
  program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  useBg(gl, program);
  setImg((image) => {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
    initTexture({ gl, program, image });
    renderKernel(newKernel);
  });
};
// 执行kernel
export const renderKernel = (newKernel) => {
  kernel = newKernel;
  kernelWeight = computeKernelWeight(kernel);
  gl.uniform1fv(gl.getUniformLocation(program, "u_kernel"), kernel);
  gl.uniform1f(getUniformLoc(gl, program, "u_kernelWeight"), kernelWeight);
  draw();
};
// 接收kernel
export const updateKernel = (newKernel = NORMAL) => {
  if (!isKernel) {
    initKernel(newKernel);
  } else {
    renderKernel(newKernel);
  }
};

// 初始化风格化
export const initStylize = (newShaderSrc, needLoadImg = true) => {
  isKernel = false;
  shaderSrc = newShaderSrc;
  program = initShaders(
    gl,
    stylizeShader[`VSHADER_SOURCE`],
    stylizeShader[`FSHADER_SOURCE_${newShaderSrc}`]
  );
  useBg(gl, program);
  if (newShaderSrc === "DIFFUSE_BLUR") {
    let colors = [];
    const ctx = document.getElementById("webgl-filter-bg").getContext("2d");
    colors.push(
      ...ctx.getImageData(0, 0, 1, 1).data,
      ...ctx.getImageData(199, 0, 1, 1).data,
      ...ctx.getImageData(399, 0, 1, 1).data,
      ...ctx.getImageData(599, 0, 1, 1).data,
      ...ctx.getImageData(0, 199, 1, 1).data,
      ...ctx.getImageData(199, 199, 1, 1).data,
      ...ctx.getImageData(399, 199, 1, 1).data,
      ...ctx.getImageData(599, 199, 1, 1).data,
      ...ctx.getImageData(0, 399, 1, 1).data,
      ...ctx.getImageData(199, 399, 1, 1).data,
      ...ctx.getImageData(399, 399, 1, 1).data,
      ...ctx.getImageData(599, 399, 1, 1).data,
      ...ctx.getImageData(0, 599, 1, 1).data,
      ...ctx.getImageData(199, 599, 1, 1).data,
      ...ctx.getImageData(399, 599, 1, 1).data,
      ...ctx.getImageData(599, 599, 1, 1).data
    );
    colors = new Float32Array(colors);
    gl.uniform4fv(gl.getUniformLocation(program, "u_colors"), colors);
    draw();
  } else {
    needLoadImg &&
      setImg((image) => {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
        initTexture({ gl, program, image });
        draw();
      });
  }
};

// 更新强度
export const updateLevel = (level) => {
  const { textures: texs, framebuffers: frames } = initFramebuffers(gl);
  textures = texs;
  framebuffers = frames;
  doIterations(level);
};

// 初始化帧
export const setInitialFrame = (image = mainImage) => {
  const originTexture = createTexture(gl);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.bindTexture(gl.TEXTURE_2D, originTexture);
};

// 执行乒乓
export const doIterations = (level) => {
  setInitialFrame();
  for (let i = 1; i < level; i++) {
    setFramebuffer(gl, framebuffers[i % 2]);
    if (isKernel) {
      renderKernel(kernel);
    } else {
      initStylize(shaderSrc, false);
      draw();
    }
    gl.bindTexture(gl.TEXTURE_2D, textures[i % 2]);
  }
  setFramebuffer(gl, null);
  draw();
  setInitialFrame();
};

// 传递坐标像素数据
export const getMainData = (x, y) => {
  return getMainDataHelper(gl, x, y);
};

export default main;
