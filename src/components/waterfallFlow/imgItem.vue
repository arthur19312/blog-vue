<template>
  <div class="item-content">
    <img :src="imgUrl(imgName)" />
    <div class="date-line">
      <span class="date-text">{{ formatDate(date) }}</span>
    </div>
    <div class="location">{{ formatLocation(location) }}</div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    imgName: {
      required: true,
      default: "",
    },
    date: {
      required: true,
      default: "2020/05/07",
    },
    location: {
      required: true,
      default: "哈西",
    },
  },
  data() {
    return {
      list: {},
    };
  },
  methods: {
    imgUrl(url: string) {
      return "assets/img/potfolio/" + url;
    },
    formatDate(date: string) {
      let [yyyy, mm, dd] = date.split("/");
      if (mm.indexOf("0") == 0) {
        mm = mm[1];
      }
      if (dd.indexOf("0") == 0) {
        dd = dd[1];
      }
      return `${yyyy} 年 ${mm} 月 ${dd} 日`;
    },
    formatLocation(location: string) {
      return location.split("").join(" ");
    },
  },
  setup() {},
};
</script>
<style lang="less" scoped>
.item-content {
  margin-bottom: 1.8rem;
  text-align: center;

  img {
    border-radius: 0.6rem;
    width: 100%;
    height: auto;
  }

  .date-line {
    height: 0;
    border-top: 1px solid lightgrey;
    text-align: center;
    margin: 2rem auto 1rem auto;
    width: 80%;
    color: #bbb;

    .date-text {
      position: relative;
      top: -0.7rem;
      background-color: #fff;
      padding: 0 1rem;
      font-size: 0.8rem;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .location {
    color: gray;
    font-size: 0.9rem;
  }
}
</style>
