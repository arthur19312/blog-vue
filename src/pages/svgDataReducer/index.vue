<template>
  <div class="ctn">
    <object id="svg-reducer-before" data="/assets/img/svg/0.svg"></object>
    <div id="svg-reducer-after"></div>
  </div>
</template>

<script>
import { easeOutQuart } from "@/lib/math/util";
import { main } from "./main";
export default {
  data() {
    return {
      range: 0,
      timeId: 0,
    };
  },
  methods: {
    changeRange(e) {
      this.range = e.clientX / window.screen.width;
      if (this.timeId) {
        clearTimeout(this.timeId);
      }
      this.timeId = setTimeout(() => {
        main(easeOutQuart(this.range) * 90);
      }, 0);
    },
  },
  mounted() {
    if (!import.meta.env.SSR) {
      main(0);
      window.addEventListener("mousemove", this.changeRange);
    }
  },
  unmounted() {
    if (!import.meta.env.SSR) {
      window.removeEventListener("mousemove", this.changeRange);
    }
  },
};
</script>

<style lang="less" scoped>
.root {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ctn {
  margin-top: 14rem;
  display: flex;
  gap: 6rem;
}
</style>
