<template>
  <canvas id="webgl-decker" width="800" height="600"></canvas>
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
#webgl-decker {
}
</style>
