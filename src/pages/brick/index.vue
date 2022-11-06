<template>
  <div id="brick"></div>
</template>

<script>
import { defineComponent } from "vue";
import { rendererDom, startAnimate, stopAnimate } from "./3d";

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
  },
  unmounted() {
    if (!import.meta.env.SSR) {
      stopAnimate();
    }
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
