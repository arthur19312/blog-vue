<template>
  <div class="ctn">
    <div class="main-ctn" @mousemove="getCursor">
      <canvas id="webgl-filter" :width="SCALE" :height="SCALE"></canvas>
      <canvas id="webgl-filter-bg" :width="SCALE" :height="SCALE"></canvas>
    </div>
    <div class="preview">
      <select @change="onSelect">
        <option :value="name" v-for="{ name } in filterList" :key="name">
          {{ name }}
        </option>
      </select>
      <div class="before-ctn">
        <div class="kernel">
          <div
            class="kernel-item"
            v-for="value in filterList[activeIndex].kernel"
            :key="{ value }"
          >
            {{ value }}
          </div>
        </div>
        <canvas
          id="webgl-filter-before"
          :width="COMPARE_SCALE"
          :height="COMPARE_SCALE"
        ></canvas>
      </div>
      <canvas
        id="webgl-filter-after"
        :width="COMPARE_SCALE"
        :height="COMPARE_SCALE"
      ></canvas>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import main, { getMainData } from "./main";
import {
  initBefore,
  initAfter,
  updateBefore,
  updateAfter,
} from "./previewRender";
export default defineComponent({
  name: "filter",
  data() {
    return {
      COMPARE_SCALE: 240,
      SCALE: 600,
      mainCtx: null,
      bgCtx: null,
      filterList: [
        {
          name: "boxBlur",
          desc: "dcsdscd",
          kernel: [
            0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111, 0.111,
          ],
        },
        {
          name: "triangleBlur",
          desc: "dcsdscd",
          kernel: [
            0.0625, 0.125, 0.0625, 0.125, 0.25, 0.125, 0.0625, 0.125, 0.0625,
          ],
        },
        {
          name: "emboss",
          desc: "dcsdscd",
          kernel: [-2, -1, 0, -1, 1, 1, 0, 1, 2],
        },
        {
          name: "sharpness",
          desc: "dcsdscd",
          kernel: [0, -1, 0, -1, 5, -1, 0, -1, 0],
        },
      ],
      activeIndex: 0,
    };
  },
  methods: {
    onSelect(e) {
      this.activeIndex = e.target.selectedIndex;
    },
    getCursor({ offsetX, offsetY }) {
      this.renderBefore(offsetX - 1, offsetY - 1);
      this.renderAfter(offsetX - 1, this.SCALE - offsetY - 2);
    },
    renderBefore(x, y) {
      const imgData = this.bgCtx.getImageData(
        x > this.SCALE - 3 ? this.SCALE - 3 : x,
        y > this.SCALE - 3 ? this.SCALE - 3 : y,
        3,
        3
      );
      updateBefore(imgData);
    },
    renderAfter(x, y) {
      const pixels = getMainData(
        x > this.SCALE - 3 ? this.SCALE - 3 : x,
        y < 2 ? 2 : y
      );
      updateAfter(pixels);
    },
    initPreview() {
      this.bgCtx = document.getElementById("webgl-filter-bg").getContext("2d");
      const img = new Image();
      img.onload = () => {
        this.bgCtx.drawImage(img, 0, 0, 600, 600);
      };
      img.src = "/assets/img/filter/1.jpg";
      initBefore();
      initAfter();
      this.renderBefore(1, 1);
      this.renderAfter(1, 1);
    },
  },
  computed: {},
  mounted() {
    main();
    this.initPreview();
  },
  unmounted() {},
});
</script>

<style lang="less" scoped>
.ctn {
  padding: 2rem;
  display: flex;
  gap: 60px;
}
.preview {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  .before-ctn {
    position: relative;
    width: 240px;
    height: 240px;

    .kernel {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 2;
      top: 0;
      left: 0;
      display: grid;
      grid-template: repeat(3, 1fr) / repeat(3, 1fr);
      font-weight: 600;
      font-size: 1.1rem;
      color: #fff;
    }

    .kernel-item {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    canvas {
      position: absolute;
      z-index: 1;
      top: 0;
      left: 0;
    }
  }
}
.main-ctn {
  position: relative;
  width: 600px;
  height: 600px;

  #webgl-filter {
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
  }

  #webgl-filter-bg {
    position: absolute;
    z-index: 2;
    left: 0;
    top: 0;
  }
}

select {
  padding: 1rem;
  border-radius: 0.5rem;
  border: 0;
  border-right: 14px #fff solid;
  outline: #aaa 1px solid;
  // cursor: pointer;

  &:hover {
    outline: #444 1px solid;
  }
}
</style>
