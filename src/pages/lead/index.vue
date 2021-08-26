<template>
  <div class="container">
    <div class="left-slider slider" @click="slide(-1)"></div>
    <div class="right-slider slider" @click="slide(1)"></div>

    <div>
      <img src="imgSrc" class="lead-img" />
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from "vue";
export default defineComponent({
  name: "lead",
  data() {
    return {
      index: 1,
    };
  },
  methods: {
    slide(step: number): void {
      this.index += step;
    },
  },
  setup: () => {},
  computed: {
    imgSrc: function (): string {
      return "@assets/img/home/" + this.index + ".jpg";
    },
  },
});
</script>

<style scoped>
.container {
  position: relative;
}
.slider {
  position: absolute;
  z-index: 3;
  opacity: 0;
  height: 100%;
  display: block;
  transition: all 0.2s ease;
}

.slider:hover {
  opacity: 1;
}

.left-slider {
  left: 0%;
  width: 30%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.4) 0%,
    transparent 80%
  );
}

.right-slider {
  right: 40%;
  width: 30%;
  background: linear-gradient(
    90deg,
    transparent 20%,
    rgba(255, 255, 255, 0.4) 100%
  );
}

.lead-img {
  width: 60%;
  position: absolute;
  top: 0;
  left: 0%;
  transition: 0.8s;
}

.home-img {
  opacity: 0;
  visibility: hidden;
  z-index: 0;
}
</style>
