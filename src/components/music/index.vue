<template>
  <div class="center">
    <div class="music-container">
      <div class="left-content">
        <div class="audio-container">
          <img :src="imgSrc" class="cover" />
          <div id="sketch" class="sketch"></div>
        </div>
        <div>
          <audio
            :src="mp3Src"
            type="audio/mpeg"
            controls
            @play="onPlay"
            @pause="onPause"
            @ended="nextAudio"
          />
        </div>
      </div>
      <div class="namelist-ctn">
        <div class="namelist">
          <div
            v-for="(item, indexInList) in nameList"
            :key="item"
            @click="checkItem(indexInList)"
            class="nameitem"
          >
            <span :class="indexInList === index ? 'sign' : ''">{{ item }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { p5music } from "./p5music";
import Cursor from "blur-cursor";
export default {
  props: {},
  data() {
    return {
      index: 0,
      nameList: [
        "ninelie",
        "night_voyager",
        "nimble_as_lightning",
        "dance_tonight",
        "inner_universe",
        "rise",
        "bad_apple",
        "little_princess",
        "inferno",
        "lost_in_paradise",
        "glassy_sky",
        "sun_also_rises",
        "una_mattina",
        "city_of_stars",
        "mystery_of_love",
      ],
      GLOBAL_P5_AUDIO: {},
      cursor: {},
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
    resumeImg() {
      this.GLOBAL_P5_AUDIO.reloadImg_();
    },
    resumeAudio() {
      this.GLOBAL_P5_AUDIO.resumeContext();
    },
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
    onPlay() {
      this.resumeAudio();
      document.getElementsByClassName("cover")[0].style.animationPlayState =
        "running";
    },
    onPause() {
      let cover = document.getElementsByClassName("cover")[0];
      cover && (cover.style.animationPlayState = "paused");
    },
  },
  mounted: function () {
    this.cursor = new Cursor({ size: 32, blurSize: 10 });
    this.$nextTick(function () {
      this.GLOBAL_P5_AUDIO = p5music();
      this.cursor.init();
    });
    document.getElementsByTagName("audio")[0].volume = 0.5;
  },
  beforeUnmount() {
    document.getElementById("sketch").innerHTML = "";
    this.cursor.destroy();
  },
};
</script>
<style lang="less" scoped>
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.music-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: center;
}
.left-content {
  margin-left: -3rem;
}
.audio-container {
  position: relative;
  width: 500px;
  height: 500px;
  margin-bottom: 2rem;
}

.cover {
  position: absolute;
  top: 170px;
  left: 170px;
  z-index: 4;
  width: 160px;
  height: 160px;
  display: block;
  border-radius: 50%;
  animation: rotate-cover 80s infinite;
  animation-play-state: paused;
}

.sketch {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 500px;
  height: 500px;
}
@keyframes rotate-cover {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.namelist-ctn {
  width: 28rem;
  overflow: hidden;
  margin-left: 8rem;
  margin-top: 2rem;
}

.sign::before {
  content: "";
  width: 0;
  height: 0;
  margin-right: 8px;
  display: inline-block;
  border-bottom: 4px solid transparent;
  border-top: 4px solid transparent;
  border-right: 6px solid transparent;
  border-left: 6px solid #bbb;
}
.namelist {
  color: #bbb;
  font-size: 12px;
  line-height: 26px;
  width: 30rem;
  height: 352px;
  overflow-y: scroll;
  text-transform: uppercase;
  .nameitem {
    cursor: pointer;
    padding: 14px;
    letter-spacing: 8px;
    font-weight: 500;
    &:hover {
      color: #666;
      .sign::before {
        border-left-color: #666;
      }
    }
  }
}
</style>
