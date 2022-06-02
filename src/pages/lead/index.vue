<template>
  <div class="container" :style="{ height }">
    <div class="svg-ctn">
      <div
        class="rotate"
        v-for="(item, index) in '2022/02/02'.split('')"
        :key="index"
      >
        <img :src="svgSrc(item)" style="width:20%"/>
      </div>
    </div>
    <div class="img-container">
      <div
        class="left-slider slider"
        @click="slide(-1)"
        :style="{ height }"
      ></div>
      <div
        class="right-slider slider"
        @click="slide(1)"
        :style="{ height }"
      ></div>
      <img :src="imgSrc" class="lead-img" ref="leadImg" @load="updateHeight" />
    </div>

    <div class="rotate-reverse">2022/02/02 深圳</div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "lead",
  data() {
    return {
      index: 0,
      height: "600px",
    };
  },
  methods: {
    slide(step) {
      this.index = (this.index + step + 8) % 8;
    },
    updateHeight() {
      this.$nextTick(() => {
        this.height = this.$refs.leadImg.offsetHeight + "px";
        this.provideHeight();
      });
    },
    provideHeight() {
      this.$emit("mainContentHeight", this.height);
    },svgSrc: function (num) {
      return `/assets/lead/${num === "/" ? "separate" : num}.svg`;
    },
  },
  computed: {
    imgSrc: function () {
      return "/assets/img/home/" + (this.index + 1) + ".jpg";
    },
    
  },
  mounted() {
    this.updateHeight();
  },
});
</script>

<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 80%;
  letter-spacing: 4px;
  margin-top: 6rem;
}
.svg-ctn{
  position: relative;
  left:180px;
}
.rotate {
  padding: 0 1rem;
  color: gray;
  text-align: start;
  font-size: 1.1rem;
  letter-spacing: 0.8rem;
  font-style: oblique;


  &:not(:first-child) {
    margin-top: -2rem;
  }
  &:nth-child(even){
    margin-left: 1rem;
  }
}
.rotate-reverse {
  writing-mode: vertical-lr;
  padding: 0 1rem;
  color: #bbb;
  text-align: end;
  font-size: 0.9rem;
  font-style: oblique;
}
.slider {
  position: absolute;
  z-index: 3;
  opacity: 0;
  height: 80%;
  display: block;
  transition: all 0.2s ease;
}

.slider:hover {
  opacity: 1;
}

.left-slider {
  left: 0%;
  width: 50%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.4) 0%,
    transparent 80%
  );
}

.right-slider {
  left: 50%;
  width: 50%;
  background: linear-gradient(
    90deg,
    transparent 20%,
    rgba(255, 255, 255, 0.4) 100%
  );
}

.img-container {
  width: 50rem;
  position: relative;
}

.lead-img {
  position: absolute;
  width: 100%;
  z-index: 2;
  top: 0;
  left: 0%;
  transition: 0.8s;
  display: block;
}
</style>
