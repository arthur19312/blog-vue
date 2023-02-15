<template>
  <!-- <div class="nav-container">
    <Bachar @openMenu="openMenu" @closeMenu="closeMenu" ref="bachar" />
  </div> -->

  <!-- <div class="menu" :class="{ open: openFlag }"> -->
  <div class="menu">
    <Intro class="intro" />
    <div class="menu-container">
      <div class="link-list">
        <!-- <router-link
          :to="'/' + item.route || item.name"
          class="link"
          v-for="(item, index) in links"
          :key="item.name"
          @click="closeBachar"
        > -->
        <a
          v-for="(item, index) in links"
          class="link"
          :class="{ disabled: item.disabled }"
          :key="item.name"
          :href="preUrl(item.route || item.name)"
          target="_blank"
          :aria-label="`read more about ${item.name} - ${item.desc}`"
          :aria-disabled="item.disabled"
        >
          <span class="num">{{ `${addPreZero(index + 1)} / ` }}</span>
          <div class="title">{{ item.name }}</div>
          <div class="desc">{{ item.desc }}</div>
          <img class="desc-img" :src="getImgName(item.route || item.name)" />
        </a>
        <!-- </router-link> -->
      </div>
    </div>
    <div class="bottom">
      <a href="https://beian.miit.gov.cn" target="_blank" aria-label="网站备案"
        >—————————— 皖ICP备2022008333号-1 ——————————</a
      >
    </div>
  </div>
</template>

<script>
import Bachar from "@/components/navigation/bachar.vue";
import Intro from "@/components/navigation/intro/index.vue";
export default {
  components: { Bachar, Intro },
  data() {
    return {
      // openFlag: false,
      links: [
        // {
        //   route: "decker",
        //   name: "Wake Up Decker!",
        //   desc: "Ultraman Decker OP",
        //   img: "",
        // },
        {
          route: "#",
          name: "To Be Continued...",
          // desc: "For 2023",
          img: "",
          disabled: true,
        },
        {
          name: "pool",
          desc: "",
          img: "",
        },
        {
          route: "brick",
          name: "Sugar Bricks",
          desc: "可爱捏",
          img: "",
        },

        {
          route: "lathe",
          name: "park",
          desc: "made after playing HatsuneMiku:ColorfulStage!",
          img: "",
        },

        {
          route: "star",
          name: "屏幕指纹检测器",
          desc: "Star practice",
          img: "",
        },

        {
          name: "noise",
          desc: "Domain warping FBM noise",
          img: "",
        },
        // {
        //   name: "kaikaikitan",
        //   desc: "-",
        //   img: "",
        // },

        {
          name: "music",
          desc: "P5 player for favorite music playlist",
          img: "",
        },

        {
          route: "imgFilter",
          name: "image Filter",
          desc: "Image filters & Play with your own kernel",
          img: "",
        },
        {
          name: "metaball",
          desc: "Memory of IntelliJ's homepage ",
          img: "",
        },
        {
          route: "logicfunc",
          name: "logic Func",
          desc: "A fractal function by webgl view & svg axis",
          img: "",
        },
        { name: "moon", desc: "A practice for Anthony Howe", img: "" },
        {
          route: "svgDataReducer",
          name: "毛毛球解开器",
          desc: "Node reducer for automatically exported svg path data",
          img: "",
        },

        {
          route: "svgPlayground",
          name: "svg display",
          desc: "I make some svg drawings using pencil in figma",
          img: "",
        },
        {
          name: "cube",
          desc: "I finally finished the war of MVP matrix and get my first cube in 3d. 摄像机的矩阵推导和实现从22年末一直困扰我，我终于在23年开年得到了正确的结果。",
          img: "",
        },

        {
          name: "github",
          desc: "A display of some of my Github project",
          img: "",
        },
        {
          name: "record",
          desc: "A quiet P5 audio recorder for meditation",
          img: "",
        },

        { name: "kaomoji", desc: "诶嘿(>ω･* )ﾉ", img: "" },
        { name: "travels", desc: "Waterfall flow for my footprints", img: "" },
        // { name: "potfolio", desc: "Overview of photos", img: "" },
        {
          name: "logger",
          desc: "Float logger & texture test program in webgl",
          img: "",
        },
        // {
        //   name: "points",
        //   desc: "First practice in webgl",
        //   img: "",
        // },
      ],
    };
  },
  computed: {},
  methods: {
    openMenu() {
      this.openFlag = true;
      this.$emit("displayContent", false);
    },
    closeMenu() {
      this.openFlag = false;
      this.$emit("displayContent", true);
    },
    closeBachar() {
      this.closeMenu();
      this.$refs.bachar.closeBachar();
    },
    addPreZero(num) {
      const length = 3;
      return (Array(length + 1).join("0") + num)
        .split("")
        .slice(-length)
        .join("");
    },
    preUrl(str) {
      return str;
    },
    getImgName(name) {
      return `/assets/img/navi/${name}.png`;
    },
  },
  mounted() {},
  unmounted() {},
};
</script>

<style lang="less" scoped>
.nav-container {
  position: absolute;
  z-index: 4;
  right: 14rem;
  top: 3rem;
}

.menu {
  padding: 5% 13%;
  // padding: 8% 0 0 8%;
  // position: absolute;
  // z-index: 3;
  // left: 0;
  // top: 0;
  // width: 100%;
  // height: 100%;
  // background-color: white;
  // opacity: 0;
  // pointer-events: none;
  // transition: 0.3s all ease;

  .menu-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

  .intro {
    flex: 0 1 36%;
    padding: 1rem;
  }
}

.open {
  opacity: 1;
  pointer-events: auto;
}

.link-list {
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
}

.link {
  outline: 0;
  text-decoration: none;
  text-align: left;
  width: 14rem;
  height: 12rem;
  padding: 2rem;
  position: relative;
  text-shadow: -1px 1px #fff;

  &:hover {
    .num {
      // letter-spacing: 1.2rem;
    }

    .title {
      color: #333;
      // letter-spacing: 0.5rem;
      // &::after {
      //   transform: scaleX(1);
      // }
    }

    .desc {
      // color: #888;
      color: #555;
    }
  }
}

.num {
  font-size: 1.4rem;
  color: #ccc;
  font-style: oblique;
  font-weight: 100;
  transition: 0.3s;
}

.title {
  font-size: 1.2rem;
  color: #888;
  font-weight: 400;
  // text-decoration: underline;
  // text-decoration-thickness: 1px;
  // text-decoration-color: #aaa;
  text-transform: capitalize;
  letter-spacing: 1px;
  transition: 0.3s;
  position: relative;

  &::after {
    content: " ";
    position: absolute;
    top: 60%;
    left: 10%;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: skyblue;
    opacity: 0.3;
    transform: scaleX(0);
    transform-origin: left;
    transition: 0.3s;
  }
}
.desc {
  color: #aaa;
  font-size: 1rem;
  font-weight: 100;
}

a {
  padding-top: 4rem;
  text-decoration: none;
  color: #aaa;
}

.ctn {
  display: flex;
  justify-content: space-between;
}

.desc-img {
  width: 100%;
  height: auto;
  position: absolute;
  bottom: 0;
  z-index: -1;
}
.bottom {
  margin-top: 4rem;
}

.disabled {
  pointer-events: none;
}
</style>
