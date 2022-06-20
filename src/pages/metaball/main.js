import { initShaders } from "@/lib/webgl/util";
import { VSHADER_SOURCE, FSHADER_SOURCE } from "./shader";

export const WIDTH = 1600;
export const HEIGHT = 1200;
export const PADDING = 200;
export const PADDING2 = 300;
export const BALL_NUM = 10;
export const BALL_NUM2 = 6;
const originBallsData = new Array(BALL_NUM);
const originBallsData2 = new Array(BALL_NUM);

var gl;
export const main = () => {
  const canvas = document.getElementById("webgl-metaball");
  gl = canvas.getContext("webgl");
  if (!gl) {
    console.log("Failed2get rendering context 4 webgl");
    return;
  }

  const program = initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  if (!program) {
    console.log("Failed2init shaders");
    return;
  }

  var bgData = new Float32Array([-1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, -1.0]);
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


  const u_balls = gl.getUniformLocation(program, "u_balls");
  const u_balls2 = gl.getUniformLocation(program, "u_balls2");

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

  initBalls();
  initBalls2();
  setBallsData();
  setBallsData2();

  const step = () => {
    // Update positions and speeds
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
        mb.y = HEIGHT - PADDING ;
        mb.vy = -Math.abs(mb.vy);
      }
    }

    setBallsData();

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

    requestAnimationFrame(step);
  };

  step();
};

const initBalls = () => {
  for (let i = 0; i < BALL_NUM; i++) {
    const r = Math.random() * 80 + 40;
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
