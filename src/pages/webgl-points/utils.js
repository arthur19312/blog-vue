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
  console.log(gl.getProgramParameter(program, gl.LINK_STATUS));
  return program;
};

export const loadShader = (gl, type, source) => {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  console.log(gl.getShaderParameter(shader, gl.COMPILE_STATUS));
  return shader;
};
