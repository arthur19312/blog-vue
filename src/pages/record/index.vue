<template>
  <div class="container">
    <div class="header">
      <audio
        id="audioRecord"
        :src="RECORD_PATH"
        type="audio/mpeg"
        controls
        @play="onPlay"
      />
    </div>
    <div class="content">
      <div id="sketchRecord" class="sketch" />
    </div>
  </div>
</template>
<script>
import { p5music } from "./p5music";
export default {
  props: {},
  data() {
    return {
      GLOBAL_P5_AUDIO: {},
      RECORD_PATH: "/assets/record/index.mp3",
    };
  },
  computed: {
    mp3Src() {
      return "/assets/music/" + this.nameList[this.index] + "/index.mp3";
    },
  },
  methods: {
    resumeAudio() {
      this.GLOBAL_P5_AUDIO.resumeContext();
    },
    onPlay() {
      this.resumeAudio();
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.GLOBAL_P5_AUDIO = p5music();
    });
    document.getElementById("audioRecord").volume = 0.5;
    document.getElementById("sketchRecord").innerHTML = "";
  },
  beforeUnmount() {
    document.getElementById("sketchRecord").innerHTML = "";
  },
};
</script>
<style lang="less" scoped>
.content {
  text-align: center;
  padding: 100px;
}

#sketchRecord {
  width: 1250px;
  height: 500px;
}
</style>
