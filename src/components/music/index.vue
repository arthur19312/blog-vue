<template>
  <div class="audio-container">
    <img :src="imgSrc" class="cover" />
    <div id="sketch" class="sketch"></div>
  </div>

  <div>
    <audio
      :src="mp3Src"
      type="audio/mpeg"
      controls
      @play="resumeAudio"
      @ended="nextAudio"
    />
  </div>
  <div v-for="(item, index) in nameList" :key="item" @click="checkItem(index)">
    {{ item }}
  </div>
</template>
<script>
import { onMounted } from "@vue/runtime-core";
import { p5music } from "./p5music";
export default {
  props: {},
  data() {
    return {
      index: 0,
      nameList: ["bad_apple", "ninelie"],
    };
  },
  computed: {
    imgSrc() {
      return "/assets/music/" + this.nameList[this.index] + "/index.jpg";
    },
    mp3Src() {
      return "/assets/music/" + this.nameList[this.index] + "/index.mp3";
    },
  },
  methods: {
    checkItem(index) {
      index = index % this.nameList.length;
      this.index = index;
      let audioDom = document.getElementsByTagName("audio")[0];
      audioDom.src = "/assets/music/" + this.nameList[index] + "/index.mp3";
      setTimeout(() => {
        audioDom.play();
      }, 200);
      this.$nextTick(() => {
        this.resumeImg();
      });
    },
    nextAudio() {
      this.checkItem(++this.index);
    },
  },
  setup() {
    let GLOBAL_P5_AUDIO;

    onMounted(() => {
      GLOBAL_P5_AUDIO = p5music();
      //GLOBAL_P5_AUDIO.reloadImg_();
    });

    function resumeImg() {
      GLOBAL_P5_AUDIO.reloadImg_();
    }
    function resumeAudio() {
      GLOBAL_P5_AUDIO.resumeContext();
    }

    return { resumeImg, resumeAudio };
  },
};
</script>
<style lang="less" scoped>
.audio-container {
  position: relative;
  width: 600px;
  height: 600px;
}

.cover {
  position: absolute;
  top: 200px;
  left: 200px;
  z-index: 4;
  width: 200px;
  height: 200px;
  display: block;
  border-radius: 50%;
  animation: rotate-cover 100s infinite;
}

.sketch {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 600px;
  height: 600px;
}
@keyframes rotate-cover {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
