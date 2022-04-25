<template>
  <div class="sun" id="sun"></div>
</template>

<script>
import { defineComponent } from "vue";
import { display, renderer } from "./3d";
export default defineComponent({
  name: "sun",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {
    const dom = document.getElementById("sun");
    dom.appendChild(renderer.domElement);
    display();
  },
});
</script>

<style scoped>
.sun {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: black;
}
</style>
