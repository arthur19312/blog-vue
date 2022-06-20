<template>
  <canvas id="webgl-metaball" width="1600" height="1200"></canvas>
</template>

<script>
import { defineComponent } from "vue";
import { main } from "./main";
export default defineComponent({
  name: "metaball",
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
#webgl-metaball {
  width: 800px;
  height: 600px;
  margin-top: 8rem;
}
</style>
