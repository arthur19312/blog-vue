<template>
  <div>
    <div class="kaomoji-container">
      <KaomojiItem
        v-for="item in mojiList"
        :key="item"
        :text="item"
        @popout="popOut"
        @popin="popIn"
      />
    </div>
    <!-- 弹出层 -->
    <div class="pop-item" ref="popItem" @click="popClick">
      {{ popText }}
    </div>
    <div class="tip-container" v-for="tip in tipList" :key="tip">
      <span
        class="tip"
        :style="{ marginLeft: tip.offsetX, marginTop: tip.offsetY }"
        >Copied!</span
      >
    </div>
    <!--复制功能-->
    <input id="copy_content" type="text" value="" />
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

      tipOffsetX: 0,
      tipOffsetY: 0,
      //tip:{X,Y}
      tipList: new Set(),
    };
  },
  methods: {
    popOut({ text, XCenter, YCenter, width, height }) {
      this.popText = text;
      this.tipOffsetX = XCenter + width / 2 + 8 + "px";
      this.tipOffsetY = YCenter - height / 2 - 56 + "px";

      let item = this.$refs.popItem;
      item.style.opacity = 1;
      item.style.left = XCenter - width / 2 - 14 + "px";
      item.style.top = YCenter - height / 2 - 14 + "px";
    },
    popIn() {
      //this.$refs.popItem.style.opacity = 0;
    },

    popClick() {
      this.copyContent();
      this.showToast();
    },

    copyContent() {
      //获取点击的值
      let clickContent = this.popText;
      //获取要赋值的input的元素
      let inputElement = document.getElementById("copy_content");
      //给input框赋值
      inputElement.value = clickContent;
      //选中input框的内容
      inputElement.select();
      // 执行浏览器复制命令
      document.execCommand("Copy");

      console.log("copied");
    },

    showToast() {
      let tip = { offsetX: this.tipOffsetX, offsetY: this.tipOffsetY };
      this.tipList.add(tip);
      setTimeout(() => {
        this.tipList.delete(tip);
      }, 1200);
    },
  },
};
</script>
<style lang="less" scoped>
.kaomoji-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  margin-top: 1rem;
}
.pop-item {
  background-color: #feffff;
  padding: 14px 10px;
  color: #222;
  font-size: 1.2rem;
  border: 2px lightskyblue solid;
  border-radius: 0.8rem;
  cursor: pointer;
  opacity: 0;
  position: absolute;
}

#copy_content {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -10;
}

.tip-container {
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  animation: tip-disappear 1s 0.3s;
}

@keyframes tip-disappear {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.tip {
  background-color: lightskyblue;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: bold;
  padding: 0 0.8rem;
  height: 2.2rem;
  line-height: 2.2rem;
  color: white;

  position: absolute;

  &::before {
    content: "";
    position: absolute;
    top: 100%;
    left: 4px;
    width: 14px;
    height: 14px;
    border-width: 0;
    border-style: solid;
    border-color: transparent;
    margin-top: -6px;
    border-right-width: 7px;
    border-right-color: currentColor;
    border-radius: 0 0 28px 0;
    color: lightskyblue;
  }
}
</style>