<template>
  <div id="brick"></div>
</template>

<script>
import { defineComponent } from "vue";
import {
  rendererDom,
  startAnimate,
  stopAnimate,
  onMouseWheel,
  onMouseDown,
  onMouseMove,
  onMouseUp,
} from "./3d";

export default defineComponent({
  name: "moon",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {
    if (!import.meta.env.SSR) {
      const dom = document.getElementById("brick");
      dom.appendChild(rendererDom);
      startAnimate();
    }

    window.addEventListener("wheel", onMouseWheel);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  },
  unmounted() {
    if (!import.meta.env.SSR) {
      stopAnimate();
    }

    window.removeEventListener("wheel", onMouseWheel);
    window.removeEventListener("mousedown", onMouseDown);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", onMouseUp);
  },
});
</script>

<style scoped>
#brick {
  position: absolute;
  width: 100%;
  height: 100%;
  /* background-color: black; */
}
</style>
