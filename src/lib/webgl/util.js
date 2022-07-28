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
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw "Shader compile failed with: " + gl.getShaderInfoLog(shader);
  }

  return shader;
};

export const useBuffer = (gl, array) => {
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
};

export const getUniformLoc = (gl, program, name) => {
  const loc = gl.getUniformLocation(program, name);
  if (loc == null) throw `getUniformLoc ${name} err`;
  return loc;
};

export const initTexture = (
  gl,
  program,
  index,
  samplerName,
  image,
  isArrayBuffer = false,
  width = 1,
  height = 1,
  border = 0
) => {
  const texture = gl.createTexture();
  gl.activeTexture(gl[`TEXTURE${index}`]);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

  isArrayBuffer
    ? gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        border,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      )
    : gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        image
      );
  gl.uniform1i(getUniformLoc(gl, program, samplerName), index);
};

export const useBg = (gl, program) => {
  const verticesTexCoord = new Float32Array([
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0,
  ]);
  useBuffer(gl, verticesTexCoord);
  const SIZE = verticesTexCoord.BYTES_PER_ELEMENT;
  const a_position = gl.getAttribLocation(program, "a_position");
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, SIZE * 2, 0);
  gl.enableVertexAttribArray(a_position);
};
