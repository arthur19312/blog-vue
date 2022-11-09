import * as THREE from "@/lib/ThreeJs/three.module";
import { Box3, Euler, Matrix4, Vector3 } from "../../lib/ThreeJs/three.module";
const axisX = new Vector3(1, 0, 0);
const axisY = new Vector3(0, 1, 0);
const originPoint = new Vector3(0, 0, 0);
class AnimateObj {
  constructor(obj, x, y) {
    this.obj = obj;
    this.originPos = { x, y };
    this.inSpeed = 0.001;
    this.deSpeed = 0.01;
    this.bios = 0.02;
    const box = new THREE.Box3().setFromObject(obj);
    this.pos = box.getCenter();
    this.posNeg = this.pos.clone().negate();
    this.posList = this.obj.children.map((i) => i.position.clone());
    this.posBiosList = this.obj.children.map((i) =>
      i.position.clone().add(this.pos.clone().negate())
    );
  }
  detectAniStatus() {
    return this.obj.rotation.y || this.obj.rotation.x;
  }
  changePosition(item, vec) {
    item.position.x += vec.x;
    item.position.y += vec.y;
    item.position.z += vec.z;
  }

  moveIn(item) {
    this.changePosition(item, this.posNeg);
  }
  moveOut(item) {
    this.changePosition(item, this.pos);
  }

  update(x, y) {
    // this.obj.rotateOnAxis(
    //   new Vector3(0, this.pos.y, 0).normalize(),
    //   (x - this.originPos.x) * this.inSpeed
    // );
    // this.obj.rotateOnAxis(
    //   new Vector3(this.pos.x, 0, 0).normalize(),
    //   (y - this.originPos.y) * this.inSpeed
    // );
    this.obj.children.forEach((item, i) => {
      //   this.moveIn(item);
      //   item.rotation.y += (x - this.originPos.x) * this.inSpeed;
      //   item.rotation.x -= (y - this.originPos.y) * this.inSpeed;
      item.rotateOnAxis(
        new Vector3(0, this.pos.y, 0).normalize(),
        (x - this.originPos.x) * this.inSpeed
      );
      item.rotateOnAxis(
        new Vector3(this.pos.x, 0, 0).normalize(),
        (y - this.originPos.y) * this.inSpeed
      );
      //   item.rotateX((y - this.originPos.y) * this.inSpeed);
      //   this.moveOut(item);
    });
  }
  decrease(n) {
    if (n === 0) return 0;
    if (n > 0) {
      n -= this.deSpeed;
    } else {
      n += this.deSpeed;
    }
    return n;
  }
  decreasePosition() {
    this.obj.children.forEach((item, i) => {
      const { x, y } = item.rotation;
      this.moveIn(item);
      x && (item.rotation.x = this.decrease(x));
      y && (item.rotation.y = this.decrease(y));
      this.moveOut(item);
    });
  }
  reset(obj) {
    const { x, y } = obj.children[0].rotation;
    if (Math.abs(x) < this.bios && Math.abs(y) < this.bios) {
      this.obj.children.forEach((item, i) => {
        this.moveIn(item);
        item.rotation.x = 0;
        item.rotation.y = 0;
        this.moveOut(item);
      });
      clearInterval(this.aniId);
    } else {
      this.decreasePosition();
    }
  }
  startReset() {
    this.aniId = setInterval(() => {
      this.reset(this.obj);
    }, 10);
  }
}

export { AnimateObj };
