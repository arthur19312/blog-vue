<template>
  <canvas id="webgl-logger" width="800" height="600"></canvas>
</template>

<script>
import { defineComponent } from "vue";
import { main } from "./main";
export default defineComponent({
  name: "logger",
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
#webgl-logger {
  width: 800px;
  height: 600px;
  margin-top: 8rem;
}
</style>
