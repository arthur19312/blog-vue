import {
  initShaders,
  getUniformLoc,
  createTexture,
  initTexture,
  useBg,
  loadImg,
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
    const u_samplerList = [];
    setImg((image) => {
      console.log(image);
      gl.uniform4fv(gl.getUniformLocation(program, "u_samplerList"));
      draw();
    });
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
