<template>
  <div class="ctn">
    <img
      :src="getSrc(index)"
      :style="renderStyle(index)"
      v-for="(item, index) in list"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          position: { x: 400, y: 100, z: 0, r: 30 },
        },
      ],
    };
  },
  methods: {
    getSrc(index) {
      return `/assets/img/svg/${index}.svg`;
    },
    renderStyle(index) {
      const { x, y, z, r } = this.list[index].position;
      const transform = `translate(${x}px,${y}px) rotate(${r}deg)`;
      return { transform, zIndex: z };
    },
  },
};
</script>

<style lang="less" scoped>
.ctn {
  width: 100%;
  height: 100%;
  position: relative;

  img {
    position: absolute;
  }
}
</style>
