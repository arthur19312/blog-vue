<template>
  <div class="center">
    <div class="music-container">
      <div class="left-content">
        <div class="audio-container">
          <img :src="imgSrc" class="cover" alt="p5 cd cover" />
          <div id="sketch" class="sketch"></div>
        </div>
        <div>
          <audio
            id="musicAudio"
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
            :key="item.value"
            @click="checkItem(indexInList)"
            class="nameitem"
          >
            <span :class="indexInList === index ? 'sign' : 'name'">{{
              item.name
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { p5music } from "./p5music";
//import Cursor from "blur-cursor";
export default {
  props: {},
  data() {
    return {
      index: 0,
      nameList: [
        {
          value: "ninelie",
          name: "ninelie",
        },
        {
          value: "night_voyager",
          name: "夜航星",
        },
        {
          value: "nimble_as_lightning",
          name: "Nimble as Lightning 霆霓快雨",
        },
        {
          value: "dance_tonight",
          name: "Dance Tonight",
        },
        {
          value: "inner_universe",
          name: "inner universe",
        },
        {
          value: "rise",
          name: "rise",
        },
        {
          value: "bad_apple",
          name: "Bad Apple!!",
        },
        {
          value: "little_princess",
          name: "輝く針の小人族 ～ Little Princess",
        },
        {
          value: "inferno",
          name: "Inferno",
        },
        {
          value: "lost_in_paradise",
          name: "LOST IN PARADISE",
        },
        {
          value: "glassy_sky",
          name: "glassy sky",
        },
        {
          value: "sun_also_rises",
          name: "太阳照常升起",
        },
        {
          value: "una_mattina",
          name: "Una Mattina",
        },
        {
          value: "city_of_stars",
          name: "City of Stars",
        },
        {
          value: "mystery_of_love",
          name: "Mystery of Love",
        },
        {
          value: "yuri_on_ice",
          name: "Yuri on Ice",
        },
        {
          value: "fly_me_to_the_moon",
          name: "Fly me to the moon",
        },
        {
          value: "moon",
          name: "月の繭",
        },
        {
          value: "summer_cozy_rock",
          name: "夏日漱石",
        },
        {
          value: "zelda_main_title",
          name: "Zelda：Main Title",
        },
        {
          value: "great_fairy's_fountain",
          name: "大精灵の泉",
        },
        {
          value: "the_sixth_station",
          name: "6番目の駅",
        },
        {
          value: "sand",
          name: "沙滩 Somewhere Over the Rainbow",
        },

        {
          value: "spring_coming",
          name: "春よ、来い",
        },
        {
          value: "museum_warship",
          name: "アンブレーカブル 〜博物戦艦 フラクタル・コンティニアム〜",
        },
        {
          value: "season_song",
          name: "四季ノ呗",
        },
        {
          value: "sweet_dream",
          name: "Sweet Dreams (Are made of This)",
        },
        {
          value: "bethena",
          name: "bethena",
        },
        {
          value: "wander_earth",
          name: "开启新征程",
        },
        {
          value: "lovely",
          name: "lovely",
        },
      ],
      GLOBAL_P5_AUDIO: {},
      //cursor: {},
    };
  },
  computed: {
    imgSrc() {
      return "/assets/music/" + this.nameList[this.index].value + "/index.jpg";
    },
    mp3Src() {
      return "/assets/music/" + this.nameList[this.index].value + "/index.mp3";
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
      let audioDom = document.getElementById("musicAudio");
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
    //this.cursor = new Cursor({ size: 32, blurSize: 10 });
    this.$nextTick(async function () {
      this.GLOBAL_P5_AUDIO = await p5music();
      //this.cursor.init();
    });
    document.getElementById("musicAudio").volume = 0.5;
  },
  beforeUnmount() {
    document.getElementById("sketch").innerHTML = "";
    //this.cursor.destroy();
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

.nameitem span::before {
  content: "";
  width: 0;
  height: 0;
  margin-right: 8px;
  display: inline-block;
  border-bottom: 4px solid transparent;
  border-top: 4px solid transparent;
  border-right: 6px solid transparent;
  border-left: 6px solid transparent;
}
.namelist {
  color: #bbb;
  font-size: 14px;
  line-height: 26px;
  width: 30rem;
  height: 40rem;
  overflow-y: scroll;
  text-transform: capitalize;
}

.nameitem {
  cursor: pointer;
  padding: 14px;
  letter-spacing: 4px;
  font-weight: 400;
  &:hover {
    color: #666;
    & span::before {
      border-left-color: #888;
    }
  }
}

.namelist .nameitem .sign {
  color: #7794df;
  font-weight: 500;
  &::before {
    border-left-color: #7794df;
  }
}
</style>
