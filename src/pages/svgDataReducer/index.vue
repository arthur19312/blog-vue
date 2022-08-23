<template>
  <div class="ctn">
    <input type="file" @change="handleFile" />
  </div>
</template>

<script>
import { main } from "./main";
export default {
  data() {
    return {
      file: null,
    };
  },
  methods: {
    handleFile(e) {
      main(e.target.files[0]);
    },
  },
};
</script>

<style lang="less" scoped></style>
