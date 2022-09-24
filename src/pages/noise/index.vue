<template>
  <div class="ctn">
    <canvas id="webgl-noise" width="600" height="600"></canvas>
    <div class="control">
      <div>
        <div class="caption">FBM</div>
        <input
          type="range"
          min="1"
          max="6"
          v-model.number="fbm"
          @change="onRange"
        />
      </div>
      <div>
        <div class="caption">规模</div>
        <input
          type="range"
          min="1"
          max="60"
          v-model.number="scale"
          @change="onScaleRange"
        />
      </div>
      <div>
        <div class="caption">FBM</div>
        <input type="checkbox" v-model="runWithTime" />
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
      time: 0,
    };
  },
  watch: {
    scale(val) {
      paramsDispather("scale", val);
    },
    fbm(val) {
      paramsDispather("fbm", val);
    },
    runWithTime(val) {
      paramsDispather("runWithTime", val);
    },
  },

  methods: {
    onScaleRange(e) {},
    onRange(e) {
      console.log(e);
    },
  },
  mounted() {
    main();
  },
};
</script>

<style lang="less" scoped>
.ctn {
  margin-top: 2rem;
  display: flex;
}

.control {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.caption {
  text-align: left;
  font-size: 6px;
  color: #aaa;
  padding: 0.8rem 0 0.2rem 0;
}
</style>
