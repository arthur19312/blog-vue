<template>
  <div class="container" :style="{ height }">
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

<style scoped>
.container {
  display: flex;
  flex-direction: row;
  height: 80%;
  letter-spacing: 4px;
  margin-top: 3%;
}
.rotate-reverse {
  writing-mode: vertical-lr;
  writing-mode: tb-lr;
  padding: 0 1rem;
  color: gray;
  text-align: end;
  font-style: italic;
  font-size: 0.9rem;
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
/*
.home-img {
  opacity: 0;
  visibility: hidden;
  z-index: 0;
}*/
</style>
