<template>
  <a :href="href" target="_blank" class="a-link">
    <span
      class="iconfont"
      :class="iconName"
      @mouseenter="hoverIn"
      @mouseleave="hoverOut"
      :style="{
        color: hoverFlag ? color : '#aaa',
        fontSize: scale ? scale : '1.2rem',
      }"
    />
  </a>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
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
    scale: {
      type: String,
      required: false,
      default: "1.2rem",
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
  mounted() {
    console.log(this.scale + this.className);
  },
});
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
  transition: ease 0.2s color;
}
</style>
