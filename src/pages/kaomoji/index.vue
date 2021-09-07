<template>
  <div class="kaomoji-container">
    <KaomojiItem
      v-for="item in mojiList"
      :key="item"
      :text="item"
      @popout="popOut"
      @popin="popIn"
    />
    <!-- 弹出层 -->
    <div class="pop-container">
      <div class="pop-item" ref="popItem">
        {{ popText }}
      </div>
    </div>
  </div>
</template>

<script>
import KaomojiItem from "@/components/kaomoji/index.vue";
import mojiList from "./mojiList";
export default {
  name: "kaomoji",
  components: { KaomojiItem },
  data() {
    return {
      mojiList,
      popText: "",
    };
  },
  methods: {
    popOut({ text, XCenter, YCenter, width, height }) {
      this.popText = text;
      let item = this.$refs.popItem;
      item.style.opacity = 1;
      item.style.marginLeft = XCenter - width / 2 - 14 + "px";
      item.style.marginTop = YCenter - height / 2 - 14 + "px";
    },
    popIn() {
      this.$refs.popItem.style.opacity = 0;
    },
  },
};
</script>
<style scoped>
.kaomoji-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  position: relative;

  margin-top: 2rem;
}
.pop-container {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  pointer-events: none;
}
.pop-item {
  background-color: #feffff;
  padding: 20px 14px;
  color: #333;
  font-size: 1.2rem;
  transition: all 0.05s;
  border: 2px lightskyblue solid;
  border-radius: 0.8rem;
  opacity: 0;
}
</style>