<template>
  <div class="music-container">
    <div>
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
          autoplay="autoplay"
        />
      </div>
    </div>
    <div class="namelist-ctn">
    <div class="namelist">
      <div
        v-for="(item, index) in nameList"
        :key="item"
        @click="checkItem(index)"
        class="nameitem"
      >
        {{ item }}
      </div>
    </div>
    </div>
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
      nameList: [
        "ninelie",
        "night_voyager",
        "nimble_as_lightning",
        "inner_universe",
        "rise",
        "dance_tonight",
        "bad_apple",
        "little_princess",
        "inferno",
        "lost_in_paradise",
        "glassy_sky",
        "una_mattina",
        "sun_also_rises",
        "city_of_stars",
        "mystery_of_love",
      ],
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
      document.getElementsByTagName("audio")[0].volume = 0.6
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
.music-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}
.audio-container {
  position: relative;
  width: 600px;
  height: 600px;
  margin-top: -1rem;
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
.namelist-ctn{
  width: 380px;
  overflow: hidden;
  margin-left: 6rem;
}

.namelist {
  font-size: 14px;
  line-height: 28px;
  width: 400px;
  height: 510px;
  overflow-y: scroll;
  .nameitem {
    cursor: pointer;
    padding: 1rem;
    letter-spacing: 6px;
  }
}
</style>
