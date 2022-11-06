<template>
  <!-- <Navigation @displayContent="displayContent($event)" /> -->
  <!-- <Content :style="{ display: displayFlag ? 'flex' : 'none' }" /> -->
  <Content />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      displayFlag: true,
    };
  },
  // methods: {
  //   displayContent(flag: boolean) {
  //     this.displayFlag = flag;
  //   },
  // },
  mounted() {
    document.ondragstart = (e) => {
      e.preventDefault();
      return false;
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 14px;
  text-align: center;
  color: #2c3e50;
  /* padding: 1rem; */
}

body {
  margin: 0;
  padding: 0;

  -webkit-tap-highlight-color: transparent;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
