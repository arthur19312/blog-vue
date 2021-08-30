<template>
  <div class="content-container">
    <router-view />
  </div>
</template>

<script lang="ts">
export default {
  name: "content",
};
</script>

<style scoped>
.content-container {
  padding: 4rem;
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>