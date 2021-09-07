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
    <div class="pop-container" ref="popCtn">
      <div class="pop-item" ref="popItem" @click="copyContent">
        {{ popText }}
      </div>
      <span class="global-msg-tip" ref="popCopy">Copied!</span>
    </div>
  </div>
  <!--复制功能-->
  <input id="copy_content" type="text" value="" />
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
      let item = this.$refs.popCtn;
      item.style.opacity = 1;
      item.style.marginLeft = XCenter - width / 2 - 14 + "px";
      item.style.marginTop = YCenter - height / 2 - 14 + "px";

      this.$refs.popItem.style.pointerEvents = "all";
    },
    popIn() {
      //this.$refs.popItem.style.opacity = 0;
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
      //提示已复制
      this.showToast();
    },

    showToast() {
      console.log("shoe");
      //消息弹出框
      var tip = this.$refs.popCopy;
      setTimeout(function () {
        tip.style.opacity = 1;
      }, 10);

      setTimeout(function () {
        tip.style.opacity = 0;
      }, 500);
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
.pop-container {
  position: absolute;
  z-index: 2;
  left: 0;
  top: 0;
  pointer-events: none;

  display: flex;
  flex-direction: row;
  width: fit-content;
  height: fit-content;
}
.pop-item {
  background-color: #feffff;
  padding: 14px 10px;
  color: #222;
  font-size: 1.2rem;
  border: 2px lightskyblue solid;
  border-radius: 0.8rem;
  cursor: pointer;
}

#copy_content {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: -10;
}

.global-msg-tip {
  background-color: lightskyblue;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0 1rem;
  height: 2rem;
  line-height: 2rem;
  color: white;
  opacity: 0;
  transition: all 0.3s ease;

  position: relative;
  top: -2rem;
  left: 0.5rem;

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