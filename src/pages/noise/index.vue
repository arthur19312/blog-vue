<template>
  <div class="ctn">
    <canvas id="webgl-noise" width="600" height="600"></canvas>
    <div class="control">
      <div>
        <div class="caption">FBM</div>
        <input type="range" min="1" max="6" v-model.number="fbm" />
      </div>
      <div>
        <div class="caption">规模</div>
        <input type="range" min="1" max="8" v-model.number="scale" />
      </div>
      <div>
        <div class="caption">迭代卷曲</div>
        <input
          type="range"
          min="0"
          max="90"
          step="0.1"
          v-model.number="iterateRotation"
        />
      </div>
      <div>
        <div class="caption">迭代偏移</div>
        <input type="range" min="0" max="1000" v-model.number="iterateShift" />
      </div>
      <div>
        <div class="caption">模式</div>
        <input type="range" min="1" max="2" v-model.number="mode" />
      </div>
      <div>
        <div class="caption">底色</div>
        <input type="color" v-model="color1" />
      </div>
      <div>
        <div class="caption">目标色</div>
        <input type="color" v-model="color2" />
      </div>
      <div>
        <div class="caption">第二梯度色</div>
        <input type="color" v-model="color3" />
      </div>
      <div>
        <div class="caption">第三梯度色</div>
        <input type="color" v-model="color4" />
      </div>
    </div>
  </div>
</template>

<script>
import { main, paramsDispather } from "./main";
export default {
  data() {
    return {
      scale: 5,
      fbm: 8,
      runWithTime: false,
      iterateRotation: 0.5,
      iterateShift: 100,
      mode: 1,
      color1: "#FF000D",
      color2: "#F1FF2E",
      color3: "#ADC2FF",
      color4: "#AE00FF",
    };
  },
  watch: {
    scale(val) {
      paramsDispather("scale", val);
    },
    fbm(val) {
      paramsDispather("fbm", val);
    },
    iterateRotation(val) {
      paramsDispather("iterateRotation", val);
    },
    iterateShift(val) {
      paramsDispather("iterateShift", val);
    },
    mode(val) {
      paramsDispather("mode", val);
      this.switchMode();
    },
    color1(val) {
      paramsDispather("color1", this.hex2rgb(val));
    },
    color2(val) {
      paramsDispather("color2", this.hex2rgb(val));
    },
    color3(val) {
      paramsDispather("color3", this.hex2rgb(val));
    },
    color4(val) {
      paramsDispather("color4", this.hex2rgb(val));
    },
  },

  methods: {
    hex2rgb(str) {
      const r = parseInt(`0x${str.slice(1, 3)}`) / 255;
      const g = parseInt(`0x${str.slice(3, 5)}`) / 255;
      const b = parseInt(`0x${str.slice(5, 7)}`) / 255;
      return [r, g, b];
    },

    init() {
      paramsDispather("scale", this.scale);
      paramsDispather("fbm", this.fbm);
      paramsDispather("iterateRotation", this.iterateRotation);
      paramsDispather("iterateShift", this.iterateShift);
      paramsDispather("color1", this.hex2rgb(this.color1));
      paramsDispather("color2", this.hex2rgb(this.color2));
      paramsDispather("color3", this.hex2rgb(this.color3));
      paramsDispather("color4", this.hex2rgb(this.color4));
    },

    switchMode() {
      let colors = [];
      switch (this.mode) {
        case 1: {
          colors = ["#FF000D", "#F1FF2E", "#ADC2FF", "#AE00FF"];
          break;
        }
        case 2: {
          colors = ["#A8FFB7", "#FFC038", "#D699FF", "#FF4747"];
          break;
        }
      }
      colors.forEach((c, index) => {
        this[`color${index + 1}`] = c;
      });
    },
  },

  mounted() {
    main();
    this.init();
  },
};
</script>

<style lang="less" scoped>
.ctn {
  margin-top: 4rem;
  display: flex;
  text-align: left;
}

.control {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 4rem;
}

.caption {
  font-size: 6px;
  color: #aaa;
  padding: 0.6rem 0 0.2rem 0;
}
</style>
