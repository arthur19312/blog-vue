<template>
  <div class="ctn">
    <div class="title">
      X <sub>n+1</sub> = R * X<sub>n</sub> * (1 - X<sub>n</sub>)
    </div>
    <div class="flex">
      <div class="canvas-ctn">
        <canvas
          id="xn-chart-canvas"
          class="chart-canvas"
          width="800"
          height="800"
        ></canvas>
        <div id="xn-axis" class="axis">
          <svg
            width="400px"
            height="400px"
            id="xn-svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <!-- <path d="M400 382 H 18 V 0" fill="transparent" stroke="gray" /> -->
            <path d="M400 382 H 18" fill="transparent" stroke="gray" />
            <path id="xn-tick-x" fill="transparent" stroke="gray" />
            <path
              id="xn-tick-y"
              fill="transparent"
              stroke="gray"
              stroke-dasharray="3,3"
            />
          </svg>
        </div>
      </div>
      <div class="canvas-ctn">
        <canvas
          id="r-chart-canvas"
          class="chart-canvas"
          width="1600"
          height="800"
        ></canvas>
        <div id="r-axis" class="axis">
          <svg
            width="800px"
            height="400px"
            id="r-svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M800 382 H 18" fill="transparent" stroke="gray" />
            <path id="r-tick-x" fill="transparent" stroke="gray" />
            <path
              id="r-tick-y"
              fill="transparent"
              stroke="gray"
              stroke-dasharray="3,3"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="desc"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { main } from "./compute";
export default defineComponent({
  name: "webgl",
  data() {
    return {};
  },
  methods: {},
  computed: {},
  mounted() {
    main();
  },
  unmounted() {},
});
</script>
<style>
text {
  fill: gray;
  font-size: 10px;
}

.md {
  fill: #666;
  font-size: 14px;
  font-weight: 600;
}
</style>

<style lang="less" scoped>
.ctn {
  padding: 4rem;
}

svg {
  position: relative;
}

.flex {
  margin-top: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}
.title {
  font-size: 2rem;
  font-weight: 500;
}

.desc {
}

.r {
  width: 800px;
  height: 400px;
}

.xn {
  width: 400px;
  height: 400px;
}

.canvas-ctn {
  position: relative;
  &:first-child {
    margin-right: 2rem;
    .xn();
  }
  &:last-child {
    .r();
  }
}

#r-chart-canvas {
  display: block;

  width: 780px;
  height: 380px;
}
#xn-chart-canvas {
  display: block;
  width: 380px;
  height: 380px;
}

.chart-canvas {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2;
}

.axis {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
</style>
