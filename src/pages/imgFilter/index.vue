<template>
  <div class="ctn">
    <div class="main-ctn" @mousemove="getCursor">
      <canvas
        id="webgl-filter"
        :width="SCALE"
        :height="SCALE"
        :style="{ opacity: mainOpacity }"
      ></canvas>
      <canvas id="webgl-filter-bg" :width="SCALE" :height="SCALE"></canvas>
      <div class="compare" @mouseenter="showBg" @mouseleave="showMain">中</div>
    </div>
    <div class="preview">
      <div class="input-group">
        <div class="select-ctn">
          <div class="caption">滤镜</div>
          <select @change="onSelect">
            <option :value="name" v-for="{ name } in filterList" :key="name">
              {{ name }}
            </option>
          </select>
        </div>
        <div v-if="filterList[activeIndex].hasRange">
          <div class="caption">强度</div>
          <input
            type="number"
            :step="1"
            :min="1"
            :max="filterList[activeIndex].max"
            v-model.number="range"
            @change="onRange"
          />
        </div>
      </div>
      <div class="caption">原始</div>
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
      <div class="caption">预览</div>
      <canvas
        id="webgl-filter-after"
        :width="COMPARE_SCALE"
        :height="COMPARE_SCALE"
      ></canvas>
    </div>
  </div>
</template>

<script>
import { defineComponent, toRaw } from "vue";
import main, {
  getMainData,
  updateKernel,
  initStylize,
  updateLevel,
} from "./main";
import {
  initBefore,
  initAfter,
  updateBefore,
  updateAfter,
} from "./previewRender";
import { FILTER_LIST } from "./constant";
export default defineComponent({
  name: "filter",
  data() {
    return {
      mainOpacity: false,
      COMPARE_SCALE: 240,
      SCALE: 600,
      mainCtx: null,
      bgCtx: null,
      filterList: FILTER_LIST,
      activeIndex: 0,
      range: 3,
    };
  },
  methods: {
    showBg() {
      this.mainOpacity = 0;
    },
    showMain() {
      this.mainOpacity = 1;
    },
    onSelect(e) {
      if (this.activeIndex === e.target.selectedIndex) {
        return;
      }
      this.activeIndex = e.target.selectedIndex;
      const filter = this.filterList[this.activeIndex];
      if (filter.kernel) {
        // by kernrl
        updateKernel(toRaw(filter.kernel));
      } else {
        // by stylize shader
        initStylize(filter.shaderSrc);
      }
      this.range = 1;
    },
    onRange(e) {
      const max = this.filterList[this.activeIndex].max;
      this.range = this.range > max ? max : this.range < 1 ? 1 : this.range;
      updateLevel(this.range);
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
  gap: 40px;
}

.preview {
  width: 240px;
  display: flex;
  flex-direction: column;
  // gap: 2.5rem;

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

  canvas {
    border-radius: 2rem;
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

  .compare {
    position: absolute;
    z-index: 4;
    right: 0;
    bottom: 0;
  }
}

select {
  width: 100%;
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 0;
  border-right: 14px #fff solid;
  outline: #aaa 1px solid;
  // cursor: pointer;

  &:hover {
    outline: #444 1px solid;
  }
}

input {
  width: 30px;
  padding: 0.8rem 0 0.8rem 0.8rem;
  border-radius: 0.5rem;
  border: #fff 1px solid;
  border-right: 8px #fff solid;
  outline: #aaa 1px solid;

  &:hover {
    outline: #444 1px solid;
  }
}

.caption {
  text-align: left;
  font-size: 6px;
  color: #aaa;
  padding: 0.8rem 0 0.2rem 0;
}

.input-group {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  gap: 10px;

  .caption {
    padding: 0;
  }
}

.select-ctn {
  width: 100%;
}
</style>
