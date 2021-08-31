<template>
  <div class="git-content">
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
      <a href="#">
        <img :src="imgUrlRes('kly.png')" style="width: 64rem" />
      </a>
    </div>
    <div class="git-item" style="width: 10rem">
      <div style="width: 10rem"></div>
    </div>
  </div>
</template>

<script>
import ThreejsContainer from "@/components/github/ThreejsContainer.vue";
export default {
  components: { ThreejsContainer },
  name: "github",
  data() {
    return {
      contentHeight: "600px",
      imgProjects: [
        {
          gitUrl: "BriefTranslation-EncounterWithTibe",
          imgUrl: "ewt.jpg",
          width: "48rem",
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
  overflow: hidden;
  transform: translateX(0);

  .git-item {
    margin-left: 10rem;
    font-size: 0;
    img {
      cursor: pointer;
    }
  }
}
</style>
