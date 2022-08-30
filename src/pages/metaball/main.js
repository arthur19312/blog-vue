import { initShaders, createProgram, useBg } from "@/lib/webgl/util";
import Dot2 from "../../lib/math/Dot2";
import Matrix3 from "../../lib/math/Matrix3";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";

export const WIDTH = 1600;
export const HEIGHT = 1200;
export const PADDING = 200;
export const PADDING2 = 300;
export const BALL_NUM = 8;
export const BALL_NUM2 = 6;
const SCALE = 2.8;
const originBallsData = new Array(BALL_NUM);
const originBallsData2 = new Array(BALL_NUM2);
let angle = 0;

const triv1 = new Dot2(-0.7, 0.6);
const triv2 = new Dot2(-0.6, 0.5);
const triv3 = new Dot2(-0.5, 0.7);
var gl, program;
let u_balls, u_balls2;

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

  const ballListLength2 = BALL_NUM2 * 3;
  const ballList2 = new Float32Array(ballListLength2);
  for (let i = 0; i < BALL_NUM2; i++) {
    const ball = originBallsData2[i];
    const listIndex = i * 3;
    ballList2[listIndex] = ball.x;
    ballList2[listIndex + 1] = ball.y;
    ballList2[listIndex + 2] = ball.r;
  }
  gl.uniform3fv(u_balls2, ballList2);
};

const setTriangleData = () => {
  const radian = (Math.PI * angle) / 180;
  const sinn = Math.sin(radian * 2.78);
  const scale = SCALE + sinn * 0.2;
  const deltx = 0.5833333;
  const delty = -0.6166666;

  const mat3 = new Matrix3()
    .translate(deltx, delty)
    .rotate(radian)
    .scale(scale)
    .translate(-deltx, -delty);
  const v1 = triv1.applyMatrix(mat3);
  const v2 = triv2.applyMatrix(mat3);
  const v3 = triv3.applyMatrix(mat3);

  const triangleVertices = new Float32Array([
    v1.x,
    v1.y,
    v2.x,
    v2.y,
    v3.x,
    v3.y,
  ]);
  const u_triangle = gl.getUniformLocation(program, "u_triangle");
  gl.uniform2fv(u_triangle, triangleVertices);
};

const updateBalls = () => {
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
  setBallsData();
};

const initBalls = () => {
  for (let i = 0; i < BALL_NUM; i++) {
    const r = Math.random() * 40 + 60;
    const l = r * 2;
    originBallsData[i] = {
      x: Math.random() * (WIDTH - l) + r,
      y: Math.random() * (HEIGHT - l) + r,
      vx: Math.random() * 5,
      vy: Math.random() * 5,
      r,
    };
  }
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

export const main = () => {
  const canvas = document.getElementById("webgl-metaball");
  gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Failed2get rendering context 4 webgl");
    return;
  }

  program = createProgram(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  gl.useProgram(program);
  useBg(gl, program);

  u_balls = gl.getUniformLocation(program, "u_balls");
  u_balls2 = gl.getUniformLocation(program, "u_balls2");
  initBalls();
  setBallsData();
  setTriangleData();

  const step = () => {
    angle -= 1;
    setTriangleData();
    updateBalls();
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    requestAnimationFrame(step);
  };

  step();
};
