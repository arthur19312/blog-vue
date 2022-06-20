const X_STEP = 5;
const Y_STEP = 0.2;
const X_MAX = 30;
const Y_MAX = 1;
const SCALE = 382;
const TICK_LENGTH = 4;
const R_ITERATIONS = 4;
const AREA = 20;
const xmlns = "http://www.w3.org/2000/svg";
const R_STEP = 1;

export const initAxis = () => {
  initTickXnX();
  initTickXnY();
  initTickRX();
  initTickRY();
};

const initTickXnX = () => {
  const xnTickX = document.getElementById("xn-tick-x");
  const svg = document.getElementById("xn-svg");
  let xd = "";
  for (let i = X_STEP; i < X_MAX; i += X_STEP) {
    const x = (i / X_MAX) * SCALE + 18;
    xd += `M ${x} ${SCALE} V ${SCALE + TICK_LENGTH}`;
    svg.appendChild(getTextDom(x, 400, i));
  }
  svg.appendChild(getTextDom(392, 400, "n", "md"));
  xnTickX.setAttribute("d", xd);
};

const initTickXnY = () => {
  const xnTickY = document.getElementById("xn-tick-y");
  const svg = document.getElementById("xn-svg");
  let yd = "";

  svg.appendChild(getTextDom(14, 385, 0));
  for (let i = Y_STEP; i < Y_MAX; i += Y_STEP) {
    const y = (i / Y_MAX) * SCALE + 18;
    yd += `M 18 ${400 - y} H 400`;
    svg.appendChild(getTextDom(5, 404 - y, i.toFixed(1)));
  }
  xnTickY.setAttribute("d", yd);
};

const initTickRX = () => {
  const rTickX = document.getElementById("r-tick-x");
  const svg = document.getElementById("r-svg");
  let xd = "";
  for (let i = R_STEP; i < R_ITERATIONS; i += R_STEP) {
    const x = (i / R_ITERATIONS) * 782 + 18;
    xd += `M ${x} ${SCALE} V ${SCALE + TICK_LENGTH}`;
    svg.appendChild(getTextDom(x, 400, i));
  }
  svg.appendChild(getTextDom(792, 400, "R", "md"));
  rTickX.setAttribute("d", xd);
};

const initTickRY = () => {
  const rTickY = document.getElementById("r-tick-y");
  const svg = document.getElementById("r-svg");
  let yd = "";

  svg.appendChild(getTextDom(14, 385, 0));
  for (let i = Y_STEP; i < Y_MAX; i += Y_STEP) {
    const y = (i / Y_MAX) * SCALE + 18;
    yd += `M 18 ${400 - y} H 800`;
    svg.appendChild(getTextDom(5, 404 - y, i.toFixed(1)));
  }
  rTickY.setAttribute("d", yd);
};

const getTextDom = (x, y, text, classname = "") => {
  const textDom = document.createElementNS(xmlns, "text");
  textDom.setAttributeNS("", "x", x - 5);
  textDom.setAttributeNS("", "y", y);
  classname && textDom.setAttributeNS("", "class", classname);
  textDom.innerHTML = text;
  return textDom;
};
