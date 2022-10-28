<template>
  <canvas id="webgl-star"></canvas>
</template>

<script>
import { fullScreen, exitFullScreen } from "@/lib/tool";
import { main } from "./main";
export default {
  data() {
    return {};
  },
  methods: {
    escKeydown(e) {
      if (e.keyCode === 13) {
        fullScreen();
      }
      if (e.keyCode === 27 || e.keyCode === 96) {
        exitFullScreen();
      }
    },
  },
  mounted() {
    main();
    document.addEventListener("keydown", this.escKeydown);
  },
  unmounted() {
    document.removeEventListener("keydown", this.escKeydown);
  },
};
</script>

<style lang="less" scoped>
#webgl-star {
  cursor: pointer;
  width: 100vw;
  height: 100vh;
}
</style>
