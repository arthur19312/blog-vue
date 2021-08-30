<template>
  <div class="avatar-container">
    <img :src="imgSrc" class="avatar-img" />
    <div class="avatar-text">{{ name }}</div>
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      required: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
      default: "XXX",
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="less" scoped>
.avatar-container {
  display: flex;
  flex-direction: row;
  margin-left: -2px;
  .avatar-img {
    width: 3rem;
    height: 3rem;
    border-radius: 2rem;
  }
  .avatar-text {
    font-size: 1.4rem;
    font-weight: 100;
    line-height: 3rem;
    color: #888;
    padding-left: 1rem;
    text-decoration: underline #aaa 1px;
  }
}
</style>