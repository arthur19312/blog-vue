import { drawRList, init as initRChart } from "./rchart";
import { drawXnList, init as initXnChart } from "./xnchart";
import { lowp, restrain } from "./utils";
import { initAxis } from "./axis";

const X0 = 0.621;
const XN_ITERATIONS = 100;
const R_ITERATIONS = 4;
const STEP = 0.002;
let xnList = [];
const rList = [];
let r = 0;

export const main = () => {
  initAxis();
  initRChart();
  initXnChart();
  const tick = () => {
    computeByR(r);
    drawXnList(xnList);
    drawRList(rList);
    if (r < R_ITERATIONS) {
      setTimeout(tick, 20);
    }
    r = lowp(r + STEP, 3);
  };
  tick();
};

/** Xn+1 = R * Xn * (1 - Xn) */
export const computeByR = (r) => {
  xnList = [];
  let xn = X0;
  for (let i = 0; i < XN_ITERATIONS; i++) {
    xnList.push({ x: i, y: xn });
    xn = lowp(r * xn * (1 - xn));
  }

  const yList = xnList.map((item) => item.y);
  const restrainedYList = restrain(yList, 0.001);
  rList.push(...restrainedYList.map((y) => ({ x: r, y })));
};

export { xnList, rList, XN_ITERATIONS, R_ITERATIONS };
