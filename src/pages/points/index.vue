<template>
  <canvas id="webgl-points" width="800" height="600"></canvas>
</template>

<script>
import {defineComponent} from "vue";
import {main} from "./3d";

export default defineComponent({
  name: "points",
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
#webgl-points {
  width: 800px;
  height: 600px;
  margin-top: 4rem;
}
</style>
