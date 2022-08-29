export default class Dot2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }

  applyMatrix(m) {
    const x = this.x,
      y = this.y,
      e = m.elements;
    this.x = e[0] * x + e[1] * y + e[2];
    this.y = e[3] * x + e[4] * y + e[5];
    return this;
  }
}
