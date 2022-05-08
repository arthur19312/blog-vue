<template>
  <canvas id="webgl-canvas" width="800" height="600"></canvas>
</template>

<script>
import { defineComponent } from "vue";
import { main } from "./3d";
export default defineComponent({
  name: "webgl",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {
    main();
  },
  unmounted() {},
});
</script>

<style scoped>
#webgl-canvas {
  position: absolute;
  width: 800px;
  height: 600px;
  z-index: 1;
}
</style>
