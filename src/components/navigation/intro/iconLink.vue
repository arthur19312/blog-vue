<template>
  <a :href="href" class="a-link">
    <span
      class="iconfont"
      :class="iconName"
      @mouseenter="hoverIn"
      @mouseleave="hoverOut"
      :style="{ color: hoverFlag ? color : '#aaa' }"
    />
  </a>
</template>

<script lang="ts">
export default {
  props: {
    className: {
      type: String,
      required: true,
      default: "",
    },
    color: {
      type: String,
      required: true,
      default: "#666",
    },
    href: {
      type: String,
      required: true,
      default: "",
    },
  },
  data() {
    return {
      hoverFlag: false,
    };
  },
  methods: {
    hoverIn() {
      this.hoverFlag = true;
    },
    hoverOut() {
      this.hoverFlag = false;
    },
  },
  computed: {
    iconName() {
      return "icon-" + this.className;
    },
  },
};
</script>

<style scoped>
.a-link {
  outline: none;
  text-decoration: none;
}
.iconfont {
  margin-right: 1rem;
  font-size: 1.2rem;
  color: #aaa;
  transition: all 0.2s ease;
}
</style>