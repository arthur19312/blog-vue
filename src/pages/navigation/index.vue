<template>
  <div class="navContainer">
    <Popper v-for="item in navList" :key="item.name" :title="item.name" />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      navList: [
        { name: "lead" },
        { name: "github" },
        { name: "diary" },
        { name: "kaomoji" },
        { name: "contact" },
      ],
    };
  },
};
</script>

<style scoped>
.navContainer {
  padding: 4rem;
  text-align: left;
}
</style>