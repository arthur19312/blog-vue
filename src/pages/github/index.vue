<template>
  <div class="git-container">
    <div class="scroll-container">
      <div
        class="git-content"
        ref="gitContent"
        id="gitContent"
        @keydown="scrollGit"
      >
        <div class="scene-container" ref="gitItem0">
          <ThreejsContainer />
        </div>
        <div
          class="git-item"
          v-for="(item, index) in imgProjects"
          :key="item.imgUrl"
          :ref="'gitItem' + (1 + index)"
        >
          <a
            :href="'https://github.com/arthur19312/' + item.gitUrl"
            target="_blank"
            aria-label="read more about my github displays"
          >
            <img
              :src="imgUrlRes(item.imgUrl)"
              :style="{ width: item.width }"
              :alt="`https://github.com/arthur19312/${item.gitUrl}`"
            />
          </a>
        </div>
        <div class="git-item" :ref="'gitItem' + (imgProjects.length + 1)">
          <img
            :src="imgUrlRes('kly.png')"
            style="width: 48rem"
            :alt="`https://github.com/arthur19312`"
          />
        </div>
      </div>
    </div>
    <BottomTab v-model:activeIndex="activeIndex" />
  </div>
</template>

<script>
import BottomTab from "@/components/github/bottomTab/index.vue";
import ThreejsContainer from "@/components/github/threejsContainer/index.vue";
export default {
  components: { BottomTab, ThreejsContainer },
  name: "github",
  data() {
    return {
      activeIndex: 0,
      imgProjects: [
        {
          gitUrl: "BriefTranslation-EncounterWithTiber",
          imgUrl: "ewt.jpg",
          width: "42rem",
        },
        { gitUrl: "blockcloud", imgUrl: "bc.png", width: "48rem" },
      ],
      itemPos: [],
    };
  },
  watch: {
    activeIndex(index) {
      document.getElementById("gitContent").scrollTo({
        left: this.itemPos[index],
        behavior: "smooth",
      });
    },
  },
  methods: {
    imgUrlRes(url) {
      return "assets/img/github/" + url;
    },
    bindScroll() {
      document.addEventListener(
        "DOMMouseScroll",
        this.throttle(this.realFunc, 0, 200),
        false
      );
      document.addEventListener(
        "mousewheel",
        this.throttle(this.realFunc, 0, 200),
        false
      );
    },
    throttle(func, wait, mustRun) {
      //var timeout
      var startTime = new Date();
      return function () {
        var context = this,
          args = arguments,
          curTime = new Date();
        //clearTimeout(timeout);
        if (curTime - startTime >= mustRun) {
          func.apply(context, args);
          startTime = curTime;
        } else {
          //timeout = setTimeout(func, wait);
        }
      };
    },
    realFunc() {
      var detail = event.wheelDelta || event.detail;
      if (detail < 0) {
        if (this.activeIndex < 3) {
          this.activeIndex++;
        }
      } else {
        if (this.activeIndex > 0) {
          this.activeIndex--;
        }
      }
    },
    setActiveIndex(index) {
      this.activeIndex = index;
    },
  },
  computed: {},
  mounted() {
    for (let i = 0; i < 4; i++) {
      const item = this.$refs["gitItem" + i];
      this.itemPos[i] =
        item.offsetLeft > item.offsetWidth / 2
          ? item.offsetLeft - item.offsetWidth / 2
          : 0;
    }
    document.onkeydown = (event) => {
      event.preventDefault();
      const code = event.code;
      if (code === "KeyA" || code === "ArrowLeft") {
        if (this.activeIndex > 0) {
          this.activeIndex--;
        }
      } else if (code === "KeyD" || code === "ArrowRight") {
        if (this.activeIndex < 3) {
          this.activeIndex++;
        }
      }
    };
    this.bindScroll();
  },
  unmounted() {
    document.onkeydown = null;
  },
};
</script>

<style lang="less" scoped>
.git-container {
  padding: 3rem 2rem 1rem 2rem;
  overflow-x: hidden;
}
.scroll-container {
  height: 35rem;
  overflow: hidden;
}
.git-content {
  display: flex;
  flex-direction: row;
  overflow-x: scroll;
  height: 37rem;
  transform: translateX(0);
  margin-right: 3rem;

  .git-item {
    margin-left: 4rem;
    font-size: 0;

    img {
      cursor: pointer;
    }
  }
}
.scene-container {
  display: flex;
  flex-direction: row;
}
</style>
