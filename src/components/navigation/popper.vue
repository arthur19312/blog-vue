<template>
  <router-link :to="'/' + title" class="link">
    <div
      class="popper-item"
      @mouseenter="handlePopOut"
      @mouseleave="handlePopIn"
    >
      <span class="iconfont popper-iconfont" :class="'icon-' + title"></span>
      <span class="popper-content" :style="{ opacity }">{{ title }}</span>
    </div>
  </router-link>
</template>

<script lang="ts">
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: "lead",
    },
  },
  data() {
    return {
      opacity: 0,
    };
  },
  methods: {
    handlePopOut() {
      this.opacity = 1;
    },
    handlePopIn() {
      this.opacity = 0;
    },
  },

  setup(props) {},
};
</script>

<style scoped>
.link {
  outline: 0;
  text-decoration: none;
}

.popper-iconfont {
  font-size: 1.6rem;
  margin-right: 0.8rem;
  position: relative;
  top: 0.35rem;
}

.popper-item {
  color: #aaa;
  padding: 2rem 0;
}

.popper-item a:hover {
  color: #000000;
}

.popper-content {
  font-size: 0.9rem;
  letter-spacing: 0.1rem;
}
</style>