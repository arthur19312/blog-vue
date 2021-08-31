<template>
  <div class="git-content" id="gitContent">
    <ThreejsContainer />
    <div class="git-item" v-for="item in imgProjects" :key="item.imgUrl">
      <a
        :href="'https://github.com/arthur19312/' + item.gitUrl"
        target="_blank"
      >
        <img :src="imgUrlRes(item.imgUrl)" :style="{ width: item.width }" />
      </a>
    </div>

    <div class="git-item">
      <img :src="imgUrlRes('kly.png')" style="width: 48rem" />
    </div>
  </div>
</template>

<script>
import ThreejsContainer from "@/components/github/ThreejsContainer/index.vue";
export default {
  components: { ThreejsContainer },
  name: "github",
  data() {
    return {
      contentHeight: "600px",
      imgProjects: [
        {
          gitUrl: "BriefTranslation-EncounterWithTiber",
          imgUrl: "ewt.jpg",
          width: "42rem",
        },
        { gitUrl: "blockcloud", imgUrl: "bc.png", width: "48rem" },
      ],
    };
  },
  methods: {
    imgUrlRes(url) {
      return "/src/assets/img/github/" + url;
    },
    updateHeight(height) {
      this.contentHeight = height.split("px")[0];
      console.log(this.contentHeight);
    },
  },
  computed: {},
  mounted() {
    /*this.$on("mainContentHeight", (height) => {
      this.updateHeight(height);
    });*/
  },
};
</script>

<style lang="less" scoped>
.git-content {
  display: flex;
  flex-direction: row;
  overflow: scroll;
  transform: translateX(0);
  padding: 2rem 0;
  margin-right: 4rem;

  .git-item {
    margin-left: 6rem;
    font-size: 0;
    img {
      cursor: pointer;
    }
  }
}
</style>
