export const initShaders = (gl, vshader, fshader) => {
  const program = createProgram(gl, vshader, fshader);
  gl.useProgram(program);
  return program;
};

export const createProgram = (gl, vshader, fshader) => {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vshader);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fshader);
  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  return program;
};

export const loadShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  console.log(gl.getShaderParameter(shader, gl.COMPILE_STATUS));
  return shader;
};

export const normalize = (num) => {
  return num * 2 - 1;
};

export const lowp = (num, p = 8) => {
  return Number(num.toFixed(p));
};

export const restrain = (arr, bios) => {
  const n = arr.length;
  let testArr = arr.slice((n / 2) * -1);
  const nn = testArr.length - 1;
  /** 单个值收敛 */
  if (testArr.every((item) => Math.abs(item - testArr[nn]) < bios)) {
    return [testArr[nn]];
  }
  /** 多个值收敛 */
  testArr = arr.slice(0, n - 1);
  const testVal = arr[n - 1];
  const s = testArr.findLastIndex((val) => Math.abs(val - testVal) < bios);
  if (s >= 0) {
    return arr.slice((n - s - 1) * -1);
  } else {
    /** 不收敛的情况 */
    return arr;
  }
};
