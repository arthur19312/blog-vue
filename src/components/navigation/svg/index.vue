<template>
  <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <path d="M20,20Q30,100 200,10" fill="green" stroke="red" />
  </svg>
</template>

<script lang="ts">
export default {
  props: {
    path: {
      type: String,
      required: true,
      default: "",
    },
    color: {
      type: String,
      required: true,
      default: "skyblue",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
div {
  color: skyblue;
}
</style>
