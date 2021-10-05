<template>
  <div class="audio-container">
    <img :src="imgSrc(nameList[index])" class="cover" />
    <div id="sketch" class="sketch"></div>
  </div>

  <div>
    <audio controls @play="playMusic">
      <source :src="oggSrc(nameList[index])" type="audio/ogg" />
      <source :src="mp3Src(nameList[index])" type="audio/mpeg" />
      您的浏览器不支持 audio 元素。
    </audio>
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
      nameList: ["bad_apple"],
    };
  },
  methods: {
    imgSrc: function (name) {
      return "/assets/music/" + name + "/index.jpg";
    },
    mp3Src: function (name) {
      return "/assets/music/" + name + "/index.mp3";
    },
    oggSrc: function (name) {
      return "/assets/music/" + name + "/index.ogg";
    },
    /*playMusic: () => {
      GLOBAL_P5_AUDIO.resumeContext();
    },*/
  },
  setup() {
    let GLOBAL_P5_AUDIO;

    onMounted(() => {
      GLOBAL_P5_AUDIO = p5music();
      //GLOBAL_P5_AUDIO.reloadImg_();
    });

    function playMusic() {
      GLOBAL_P5_AUDIO.resumeContext();
    }

    return { playMusic };
  },
};
</script>
<style lang="less" scoped>
.audio-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 400px;

  .cover {
    position: absolute;
    width: 100px;
    height: 100px;
    z-index: 4;
    width: 200px;
    height: 200px;
    display: block;
    border-radius: 50%;
  }

  .sketch {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    width: 400px;
    height: 400px;
  }
}
</style>
