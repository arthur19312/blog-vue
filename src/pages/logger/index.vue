<template>
  <canvas id="webgl-logger" width="800" height="600"></canvas>
</template>

<script>
import { defineComponent } from "vue";
import { main, mouse } from "./main";
export default defineComponent({
  name: "logger",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {
    main();
    window.addEventListener("mousemove", mouse);
  },
  unmounted() {
    window.removeEventListener("mousemove", mouse);
  },
});
</script>

<style scoped>
#webgl-logger {
  width: 800px;
  height: 600px;
  margin-top: 8rem;
}
</style>
