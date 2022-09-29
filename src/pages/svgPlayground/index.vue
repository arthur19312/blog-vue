<template>
  <div class="ctn">
    <img :src="imgUrl" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: "/assets/img/svg/1.svg",
    };
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.ctn {
  width: 100%;
  height: 100%;
  position: relative;
  text-align: left;
  img {
    padding: 4rem;
  }
}
</style>
