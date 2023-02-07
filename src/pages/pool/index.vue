<template>
  <div id="pool"></div>
  <div class="opt">
    <select @change="onSelect">
      <option :value="name" v-for="name in filterList" :key="name">
        {{ name }}
      </option>
    </select>
  </div>
</template>

<script>
import {
  rendererDom,
  startAnimate,
  updateMouse,
  refresh,
  onMouseDown,
  updateFilter,
} from "./3d";
export default {
  data() {
    return {
      filterList: ["SILK", "SAND", "SWIMMING_POOL"],
    };
  },
  methods: {
    onSelect(e) {
      updateFilter(this.filterList[e.target.selectedIndex]);
    },
  },
  mounted() {
    if (!import.meta.env.SSR) {
      const dom = document.getElementById("pool");
      dom.appendChild(rendererDom);
      startAnimate();
      window.addEventListener("mousedown", onMouseDown);
      // window.addEventListener("mousemove", updateMouse);
      // window.addEventListener("click", refresh);
    }
  },
  unmounted() {
    window.removeEventListener("mousedown", onMouseDown);
    // window.removeEventListener("mousemove", updateMouse);
    // window.addEventListener("click", refresh);
  },
};
</script>

<style lang="less" scoped>
#pool {
  position: absolute;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.opt {
  position: absolute;
  right: 4rem;
  top: 2rem;
  width: 200px;
  z-index: 2;
}

select {
  width: 100%;
  padding: 0.8rem;
  border-radius: 0.5rem;
  border: 0;
  border-right: 14px #fff solid;
  outline: #aaa 1px solid;
  // cursor: pointer;

  &:hover {
    outline: #444 1px solid;
  }
}
</style>
