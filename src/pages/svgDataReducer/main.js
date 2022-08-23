import {
  getPath,
  filterPath,
  integerPath,
  removeParallel,
  joinPath,
} from "./tool";
export const readFile = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    const originSvgData = reader.result;
    const path = pipeline(originSvgData, [
      getPath,
      filterPath,
      // integerPath,
      removeParallel,
    ]);
    console.log(path);
    const svgStr = joinPath(originSvgData, path);
    console.log(svgStr);
  };
  reader.readAsText(file);
};

export const main = (file) => {
  readFile(file);
};

export const pipeline = (initVal, fnList) => {
  let res = initVal;
  for (let fn of fnList) {
    res = fn(res);
  }
  return res;
};
