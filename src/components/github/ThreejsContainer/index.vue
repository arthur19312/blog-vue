<template>
  <a target="_blank" :href="gitUrl(url)">
    <div id="canvasContainer" ref="threeContainer"></div
  ></a>
  <div class="git-item" style="margin-left: 1rem">
    <div>
      <img
        src="/src/assets/img/github/1.png"
        class="switch-button"
        @click="switchIndex(1)"
      />
    </div>
    <div>
      <img
        src="/src/assets/img/github/2.png"
        class="switch-button"
        @click="switchIndex(2)"
      />
    </div>
  </div>
</template>

<script>
import { display1, display2, renderer } from "./3d";
export default {
  name: "ThreejsContainer",
  data() {
    return {
      url: "interact",
      index: 1,
    };
  },
  methods: {
    switchIndex(num) {
      if (num === 1) {
        this.index = num;
        this.url = "interact";
        display1();
      } else if (num === 2) {
        this.index = num;
        this.url = "Crystal";
        display2();
      }
    },
    gitUrl(url) {
      return "https://github.com/arthur19312/" + url;
    },
  },
  computed: {},
  mounted() {
    let container = document.getElementById("canvasContainer");
    container.appendChild(renderer.domElement);
    display1();
  },
};
</script>

<style scoped>
.switch-button {
  width: 9rem;
  height: 5rem;
  margin-bottom: 0.4rem;
  cursor: pointer;
}
</style>
