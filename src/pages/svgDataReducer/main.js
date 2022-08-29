import {
  getPath,
  filterPath,
  integerPath,
  removeParallel,
  joinPath,
} from "./tool";

var originSvgData = null,
  loadFlag = false;
export const main = (range) => {
  if (!loadFlag) {
    if (originSvgData?.indexOf("svg") > -1) {
      loadFlag = true;
    } else {
      originSvgData =
        document.getElementById("svg-reducer-before").contentDocument
          .firstElementChild.outerHTML;
    }
  }
  const path = pipeline(originSvgData, [
    getPath,
    filterPath,
    // integerPath,
    [removeParallel, range],
  ]);
  const svgStr = joinPath(originSvgData, path);
  document.getElementById("svg-reducer-after").innerHTML = svgStr;
};

export const pipeline = (initVal, fnList) => {
  let res = initVal;
  for (let fn of fnList) {
    Array.isArray(fn) ? (res = fn[0](res, ...fn.slice(1))) : (res = fn(res));
  }
  return res;
};
