<template>
  <div id="pool"></div>
</template>

<script>
import {
  rendererDom,
  startAnimate,
  updateMouse,
  refresh,
  onMouseDown,
} from "./3d";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    if (!import.meta.env.SSR) {
      const dom = document.getElementById("pool");
      dom.appendChild(rendererDom);
      startAnimate();
      window.addEventListener("mousedown", onMouseDown);
      // window.addEventListener("mousemove", updateMouse);
      // window.addEventListener("click", refresh);
    }
  },
  unmounted() {
    window.removeEventListener("mousedown", onMouseDown);
    // window.removeEventListener("mousemove", updateMouse);
    // window.addEventListener("click", refresh);
  },
};
</script>

<style lang="less" scoped>
#pool {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
