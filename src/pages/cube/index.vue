<template>
  <canvas id="webgl-cube" width="800" height="800"></canvas>
</template>

<script>
import { main } from "./main";
export default {
  data() {
    return {};
  },
  methods: {},
  mounted() {
    main();
  },
  unmounted() {},
};
</script>

<style lang="less" scoped>
#webgl-cube {
  // cursor: pointer;
  // width: 100vw;
  // height: 100vh;
}
</style>
