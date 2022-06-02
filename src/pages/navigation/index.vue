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
          class="link"
          v-for="(item, index) in links"
          :key="item.name"
          :href="preUrl(item.route || item.name)"
          target="_blank"
        >
          <span class="num">{{ `${addPreZero(index + 1)} / ` }}</span>
          <div class="title">{{ item.name }}</div>
          <div class="desc">{{ item.desc }}</div>
        </a>
        <!-- </router-link> -->
      </div>
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
        { name: "music", desc: "P5 player for favorite music", img: "" },

        { name: "moon", desc: "A practice for Anthony Howe", img: "" },
        {
          route: "webgl",
          name: "logic Func",
          desc: "A fractal function by webgl view & svg axis",
          img: "",
        },

        { name: "travels", desc: "Waterfall flow for my footprints", img: "" },
        {
          name: "github",
          desc: "A display of some of my Github project",
          img: "",
        },

        { name: "kaomoji", desc: "诶嘿(>ω･* )ﾉ", img: "" },
        {
          name: "record",
          desc: "A quiet P5 audio recorder for meditation",
          img: "",
        },
        { name: "potfolio", desc: "An overview of photos", img: "" },
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
      return window.location.origin + "/#/" + str;
    },
  },
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
  padding: 6% 15%;
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
  gap: 2rem;
}

.link {
  outline: 0;
  text-decoration: none;
  text-align: left;
  width: 12rem;
  height: 12rem;
  padding: 2rem;

  &:hover {
    .num {
      letter-spacing: 0.2rem;
    }

    .title {
      color: #555;
      letter-spacing: 0.5rem;
      &::after {
        transform: scaleX(1);
      }
    }

    .desc {
      color: #888;
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
  font-weight: 100;
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
}
</style>