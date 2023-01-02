<template>
  <div id="lathe"></div>
</template>

<script>
import { rendererDom, startAnimate, updateMouse, refresh } from "./3d";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    if (!import.meta.env.SSR) {
      const dom = document.getElementById("lathe");
      dom.appendChild(rendererDom);
      startAnimate();

      window.addEventListener("mousemove", updateMouse);
      window.addEventListener("click", refresh);
    }
  },
  unmounted() {
    window.removeEventListener("mousemove", updateMouse);
    window.addEventListener("click", refresh);
  },
};
</script>

<style lang="less" scoped>
#lathe {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>
