<template>
  <div class="content-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "content",
  mounted() {},
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