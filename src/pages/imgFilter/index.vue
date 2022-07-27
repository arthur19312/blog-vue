<template>
  <div></div>
  <div class="main-ctn" @mousemove="getCursor">
    <canvas
      id="webgl-filter-before"
      :width="COMPARE_SCALE"
      :height="COMPARE_SCALE"
    ></canvas>
    <canvas
      id="webgl-filter-after"
      :width="COMPARE_SCALE"
      :height="COMPARE_SCALE"
    ></canvas>
  </div>
  <div class="main-ctn" @mousemove="getCursor">
    <canvas id="webgl-filter" :width="SCALE" :height="SCALE"></canvas>
    <canvas id="webgl-filter-bg" :width="SCALE" :height="SCALE"></canvas>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { main } from "./main";
export default defineComponent({
  name: "logger",
  data() {
    return {
      COMPARE_SCALE: 120,
      SCALE: 600,
      bgCtx: null,
    };
  },
  methods: {
    getCursor({ offsetX, offsetY }) {
      this.renderBefore(offsetX, offsetY);
    },
    renderBefore(x, y) {
      const { data } = this.bgCtx.getImageData(
        x > this.SCALE - 3 ? this.SCALE - 3 : x,
        y > this.SCALE - 3 ? this.SCALE - 3 : y,
        3,
        3
      );
      console.log(data);
    },
  },
  computed: {},
  mounted() {
    this.bgCtx = document.getElementById("webgl-filter-bg").getContext("2d");
    const img = new Image();
    img.onload = () => {
      this.bgCtx.drawImage(img, 0, 0, 600, 600);
    };
    img.src = "/assets/img/filter/1.jpg";
    this.renderBefore(0, 0);
  },
  unmounted() {},
});
</script>

<style lang="less" scoped>
.main-ctn {
  position: relative;

  #webgl-filter {
    position: absolute;
    z-index: 1;
  }

  #webgl-filter-bg {
    position: absolute;
    z-index: 2;
  }
}
</style>
