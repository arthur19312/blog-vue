<template>
  <div
    class="kaomoji-item"
    @mouseenter="itemOut"
    @mouseleave="itemBack"
    :ref="'kaomoji-' + text"
  >
    {{ text }}
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      params: {
        text: this.text,
        XCenter: 0,
        YCenter: 0,
        width: 0,
        height: 0,
      },
    };
  },
  methods: {
    itemOut() {
      if (this.params.XCenter) this.$emit("popout", this.params);
    },
    itemBack() {
      this.$emit("popin");
    },
  },
  mounted() {
    let ele = this.$refs["kaomoji-" + this.text];
    this.$nextTick(() => {
      this.params.XCenter = ele.offsetLeft + ele.offsetWidth / 2;
      this.params.YCenter = ele.offsetTop + ele.offsetHeight / 2;
      this.params.width = ele.clientWidth;
      this.params.height = ele.clientHeight;
    });
  },
};
</script>
<style scoped>
.kaomoji-item {
  line-height: 2rem;
  font-size: 1rem;
  text-align: center;
  padding: 0.6rem;
  cursor: pointer;
  color: #888;
  background-color: rgba(255, 255, 255, 1);
}
</style>
