import { initShaders, createProgram } from "@/lib/webgl/util";
import {
  VSHADER_SOURCE,
  FSHADER_SOURCE,
  VSHADER_SOURCE_TRI,
  FSHADER_SOURCE_TRI,
  VSHADER_SOURCE_BALL,
  FSHADER_SOURCE_BALL,
  VSHADER_SOURCE_BALL2,
  FSHADER_SOURCE_BALL2,
} from "./shader";

export const WIDTH = 1600;
export const HEIGHT = 1200;
export const PADDING = 200;
export const PADDING2 = 300;
export const BALL_NUM = 8;
export const BALL_NUM2 = 6;
const SCALE = 2.8;
const originBallsData = new Array(BALL_NUM);
const originBallsData2 = new Array(BALL_NUM);
let angle = 0;

var gl;
let u_xform_addr, u_balls, u_balls2;
var bgData;

const setBallsData = () => {
  const ballListLength = BALL_NUM * 3;
  const ballList = new Float32Array(ballListLength);
  for (let i = 0; i < BALL_NUM; i++) {
    const ball = originBallsData[i];
    const listIndex = i * 3;
    ballList[listIndex] = ball.x;
    ballList[listIndex + 1] = ball.y;
    ballList[listIndex + 2] = ball.r;
  }

  gl.uniform3fv(u_balls, ballList);
};
const setBallsData2 = () => {
  const ballListLength = BALL_NUM2 * 3;
  const ballList = new Float32Array(ballListLength);
  for (let i = 0; i < BALL_NUM2; i++) {
    const ball = originBallsData2[i];
    const listIndex = i * 3;
    ballList[listIndex] = ball.x;
    ballList[listIndex + 1] = ball.y;
    ballList[listIndex + 2] = ball.r;
  }

  gl.uniform3fv(u_balls2, ballList);
};

export const main = () => {
  const canvas = document.getElementById("webgl-metaball");
  gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Failed2get rendering context 4 webgl");
    return;
  }

  const program1 = createProgram(gl, VSHADER_SOURCE_BALL, FSHADER_SOURCE_BALL);
  const program0 = createProgram(
    gl,
    VSHADER_SOURCE_BALL2,
    FSHADER_SOURCE_BALL2
  );
  const program2 = createProgram(gl, VSHADER_SOURCE_TRI, FSHADER_SOURCE_TRI);
  const program3 = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  gl.useProgram(program1);

  bgData = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]);
  var bgBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bgBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bgData, gl.STATIC_DRAW);
  var posAttr = gl.getAttribLocation(program1, "position");
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(
    posAttr,
    2, // position is a vec2
    gl.FLOAT, // each component is a float
    false, // don't normalize values
    2 * 4, // two 4 byte float components per vertex
    0 // offset into each span of vertex data
  );

  u_balls = gl.getUniformLocation(program1, "u_balls");

  initBalls();
  setBallsData();

  gl.useProgram(program0);

  bgData = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]);
  var bgBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bgBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bgData, gl.STATIC_DRAW);
  var posAttr = gl.getAttribLocation(program0, "position");
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(
    posAttr,
    2, // position is a vec2
    gl.FLOAT, // each component is a float
    false, // don't normalize values
    2 * 4, // two 4 byte float components per vertex
    0 // offset into each span of vertex data
  );

  u_balls2 = gl.getUniformLocation(program0, "u_balls2");

  initBalls2();
  setBallsData2();

  gl.useProgram(program2);

  const triangleVertices = new Float32Array([-0.7, 0.6, -0.6, 0.5, -0.5, 0.7]);
  const verticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);
  const a_position = gl.getAttribLocation(program2, "a_position");
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 2 * 4, 0);
  gl.enableVertexAttribArray(a_position);

  const radian = (Math.PI * angle) / 180;
  const cos = Math.cos(radian);
  const sin = Math.sin(radian);
  const sinn = Math.sin(radian * 2.78);
  const scale = SCALE + sinn * 0.4;
  const deltx = 0.5833333;
  const delty = 0.6166666;

  const u_xform = new Float32Array([
    cos * scale,
    sin * scale,
    0,
    -sin * scale,
    cos * scale,
    0,
    deltx * cos * scale + delty * sin * scale - deltx,
    deltx * sin * scale - delty * cos * scale + delty,
    1,
  ]);
  u_xform_addr = gl.getUniformLocation(program2, "u_xform");
  gl.uniformMatrix3fv(u_xform_addr, false, u_xform);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  const step = () => {
    drawBg(program3);
    drawBalls2(program0);
    drawTriangle(program2);
    drawBalls(program1);
    requestAnimationFrame(step);
  };

  step();
};

const drawBg = (program) => {
  gl.useProgram(program);
  var bgBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bgBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bgData, gl.STATIC_DRAW);
  var posAttr = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(
    posAttr,
    2, // position is a vec2
    gl.FLOAT, // each component is a float
    false, // don't normalize values
    2 * 4, // two 4 byte float components per vertex
    0 // offset into each span of vertex data
  );
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

const drawBalls = (program) => {
  gl.useProgram(program);
  var bgBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bgBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bgData, gl.STATIC_DRAW);
  var posAttr = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(
    posAttr,
    2, // position is a vec2
    gl.FLOAT, // each component is a float
    false, // don't normalize values
    2 * 4, // two 4 byte float components per vertex
    0 // offset into each span of vertex data
  );
  for (var i = 0; i < BALL_NUM; i++) {
    var mb = originBallsData[i];

    mb.x += mb.vx;
    if (mb.x < PADDING) {
      mb.x = PADDING;
      mb.vx = Math.abs(mb.vx);
    } else if (mb.x > WIDTH - PADDING) {
      mb.x = WIDTH - PADDING;
      mb.vx = -Math.abs(mb.vx);
    }
    mb.y += mb.vy;
    if (mb.y < PADDING) {
      mb.y = PADDING;
      mb.vy = Math.abs(mb.vy);
    } else if (mb.y > HEIGHT - PADDING) {
      mb.y = HEIGHT - PADDING;
      mb.vy = -Math.abs(mb.vy);
    }
  }

  setBallsData();

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

const drawBalls2 = (program) => {
  gl.useProgram(program);
  var bgBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bgBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, bgData, gl.STATIC_DRAW);
  var posAttr = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(
    posAttr,
    2, // position is a vec2
    gl.FLOAT, // each component is a float
    false, // don't normalize values
    2 * 4, // two 4 byte float components per vertex
    0 // offset into each span of vertex data
  );
  for (var i = 0; i < BALL_NUM2; i++) {
    var mb = originBallsData2[i];

    mb.x += mb.vx;
    if (mb.x < PADDING2) {
      mb.x = PADDING2;
      mb.vx = Math.abs(mb.vx);
    } else if (mb.x > WIDTH - PADDING2) {
      mb.x = WIDTH - PADDING2;
      mb.vx = -Math.abs(mb.vx);
    }
    mb.y += mb.vy;
    if (mb.y < PADDING2) {
      mb.y = PADDING2;
      mb.vy = Math.abs(mb.vy);
    } else if (mb.y > HEIGHT - PADDING2) {
      mb.y = HEIGHT - PADDING2;
      mb.vy = -Math.abs(mb.vy);
    }
  }

  setBallsData2();
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

const drawTriangle = (program) => {
  gl.useProgram(program);
  const triangleVertices = new Float32Array([-0.7, 0.6, -0.6, 0.5, -0.5, 0.7]);
  const verticesBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, triangleVertices, gl.STATIC_DRAW);
  const a_position = gl.getAttribLocation(program, "a_position");
  gl.vertexAttribPointer(a_position, 2, gl.FLOAT, false, 2 * 4, 0);
  gl.enableVertexAttribArray(a_position);
  // gl.bindBuffer(gl.ARRAY_BUFFER, null);
  angle += 0.75;
  const radian = (Math.PI * angle) / 180;
  const cos = Math.cos(radian);
  const sin = Math.sin(radian);
  const sinn = Math.sin(radian * 2.78);
  const scale = SCALE + sinn * 0.4;
  const deltx = 0.5833333;
  const delty = 0.6166666;

  const u_xform = new Float32Array([
    cos * scale,
    sin * scale,
    0,
    -sin * scale,
    cos * scale,
    0,
    deltx * cos * scale + delty * sin * scale - deltx,
    deltx * sin * scale - delty * cos * scale + delty,
    1,
  ]);
  gl.uniformMatrix3fv(u_xform_addr, false, u_xform);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
};

const initBalls = () => {
  for (let i = 0; i < BALL_NUM; i++) {
    const r = Math.random() * 60 + 80;
    const l = r * 2;
    originBallsData[i] = {
      x: Math.random() * (WIDTH - l) + r,
      y: Math.random() * (HEIGHT - l) + r,
      vx: Math.random() * 5,
      vy: Math.random() * 5,
      r,
    };
  }
};

const initBalls2 = () => {
  for (let i = 0; i < BALL_NUM2; i++) {
    const r = Math.random() * 20 + 120;
    const l = r * 2;
    originBallsData2[i] = {
      x: Math.random() * (WIDTH - l) + r,
      y: Math.random() * (HEIGHT - l) + r,
      vx: Math.random() * 2,
      vy: Math.random() * 2,
      r,
    };
  }
};
