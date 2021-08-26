<template>
  <Navigation class="navigation" />
  <router-view />
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";

export default defineComponent({
  name: "App",
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: row;
  padding: 4rem;
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

.navigation {
  width: 16rem;
}
</style>
