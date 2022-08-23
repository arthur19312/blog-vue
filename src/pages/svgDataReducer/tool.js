// "M...C...C...C..."
export const getPath = (str) => {
  const paths = [];
  str
    .split("d=")
    .slice(1)
    .forEach((i) => {
      paths.push(i.split('"')[1]);
    });
  return paths;
};

// [{ start:"M...", path: [[p1,p2,e],...]},...]
export const filterPath = (arr) => {
  const group = [];

  for (let index = 0; index < arr.length; index++) {
    group[index] = {
      start: "",
      path: [],
    };
    group[index].start = arr[index].split(/C/gi)[0];
    const paths = arr[index].split(/C/gi).slice(1);

    for (let i = 0; i < paths.length; i++) {
      group[index].path[i] = paths[i].split(/\s+/g).map(Number);
    }
  }
  return group;
};

// integer polygon
export const integerPath = (group) => {
  group.forEach(({ path }) => {
    path.forEach((p, index) => {
      path[index] = p.map(Math.round);
    });
  });
  return group;
};

// —— O ——
export const removeParallel = (groups) => {
  const bios = 0.3;
  for (let i = 0; i < groups.length; i++) {
    const path = groups[i].path;
    groups[i].path = path.reduce((prevArr, cur, index) => {
      if (prevArr.length < 2) {
        prevArr.push(cur);
      } else {
        // 取前两个点
        const pre = prevArr[prevArr.length - 1];
        const pre2 = prevArr[prevArr.length - 2];
        // 取现在的坐标
        const p0 = { x: pre2[4], y: pre2[5] };
        const p1 = { x: pre[0], y: pre[1] };
        const p2 = { x: pre[2], y: pre[3] };
        const p3 = { x: pre[4], y: pre[5] };
        const q0 = p3;
        const q1 = { x: cur[0], y: cur[1] };
        const q2 = { x: cur[2], y: cur[3] };
        const q3 = { x: cur[4], y: cur[5] };
        // 取斜率
        const sp32 = (p3.x - p2.x) / (p3.y - p2.y);
        const sq10 = (q1.x - q0.x) / (q1.y - q0.y);
        const s1 = Math.abs(sp32 - (p1.x - p0.x) / (p1.y - p0.y));
        const s2 = Math.abs(sp32 - sq10);
        const s3 = Math.abs(sq10 - (q3.x - q2.x) / (q3.y - q2.y));
        // 判断直线
        if (s1 < bios && s2 < bios && s3 < bios) {
          prevArr[prevArr.length - 1] = [p1.x, p1.y, q2.x, q2.y, q3.x, q3.y];
        } else {
          prevArr.push(cur);
        }
      }
      return prevArr;
    }, []);
  }
  return groups;
};

// / O \

// 合并svg path
export const joinPath = (svgData, group) => {
  const s = svgData.split(/d=/gi);
  let res = s[0];
  for (let i = 1; i < s.length; i++) {
    const g = group[i - 1];
    let cStr = "";
    for (let i = 0; i < g.path.length; i++) {
      cStr += `C${g.path[i].join(" ")}`;
    }
    const mStr = `${g.start}${cStr}`;
    const dStr = s[i].split(/\"M[\s\S]+?\"/).join(`d="${mStr}"`);
    res += dStr;
  }
  return res;
};
