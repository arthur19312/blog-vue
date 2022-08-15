export const SCALE = 600;
export const NORMAL = [0, 0, 0, 0, 1, 0, 0, 0, 0];
export const FILTER_LIST = [
  {
    name: "原始 Normal",
    kernel: [0, 0, 0, 0, 1, 0, 0, 0, 0],
    hasRange: false,
  },
  {
    name: "方框模糊 BoxBlur",
    kernel: [0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111],
    hasRange: true,
    max: 60,
  },
  {
    name: "三角模糊 TriangleBlur",
    kernel: [0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625],
    hasRange: true,
    max: 60,
  },
  {
    name: "高斯模糊 Gaussian Blur",
    shaderSrc: "GAUSSIAN_BLUR",
    hasRange: true,
    max: 60,
  },
  {
    name: "弥散模糊 Diffuse Blur",
    shaderSrc: "DIFFUSE_BLUR",
    hasRange: false,
  },
  {
    name: "浮雕 Emboss",
    kernel: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
    hasRange: true,
    max: 3,
  },
  {
    name: "锐化 Sharpen",
    kernel: [0, -1, 0, -1, 5, -1, 0, -1, 0],
    hasRange: true,
    max: 3,
  },
  {
    name: "边缘检测 Edge Detect",
    kernel: [1, 1, 1, 1, -8, 1, 1, 1, 1],
    hasRange: true,
    max: 3,
  },
  {
    name: "灰度 Gray Scale",
    shaderSrc: "GRAY_SCALE",
    hasRange: false,
  },
  {
    name: "怀旧 Sepia Tone",
    shaderSrc: "SEPIA_TONE",
    hasRange: true,
    max: 10,
  },
  {
    name: "反色 Negative",
    shaderSrc: "NEGATIVE",
    hasRange: false,
  },
  {
    name: "膨胀 Dilate",
    shaderSrc: "DILATE",
    hasRange: true,
    max: 20,
  },
  {
    name: "侵蚀 Erode",
    shaderSrc: "ERODE",
    hasRange: true,
    max: 20,
  },
];
