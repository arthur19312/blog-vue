<template>
  <canvas id="webgl-star" width="1600" height="1200"></canvas>
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
};
</script>

<style lang="less" scoped>
#webgl-star {
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>
