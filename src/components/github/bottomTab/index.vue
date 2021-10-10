<template>
<div class="tab-container"> 
  <div class="left-tip trans-long" :style="{ opacity: isTipsShow ? 1 : 0 }">
    <span class="iconfont icon-zuo trans-short"></span>
    <span class="separator">/</span>
    <span class="iconfont icon-A trans-short"></span>
  </div>
 
  <div class="tab-item" @mouseenter="showTip" @mouseleave="hiddenTip">
      <span v-for="(item,index) in iconList" :key="item" 
      class="iconfont icon-item cursor trans-short" 
      :class="['icon-'+item,activeIndex===index?'icon-item-active':'']" 
      @click="scrollGit(index)" />
  </div>
   <div class="right-tip trans-long" :style="{ opacity: isTipsShow ? 0.6 : 0 }">
    <span class="iconfont icon-D trans-short"></span>
    <span class="separator">/</span>
    <span class="iconfont icon-you trans-short"></span>
  </div>
</div>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  props: ['activeIndex'],
  data() {
    return {
      isTipsShow: false,
      iconList: ["liumangxin", "yuzhou", "yun", "yanhua"],
    };
  },
  methods: {
    showTip() {
      this.isTipsShow = true;
    },
    hiddenTip() {
      this.isTipsShow = false;
    },
    scrollGit(index) {
      this.$emit("update:activeIndex", index);
    },
  },
});
</script>
<style lang="less" scoped>
.cursor {
  cursor: pointer;
}
.trans-short {
  transition: all 0.3s ease;
}
.trans-long {
  transition: all 0.8s ease;
}
.tab-container{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 6rem;
    margin-right: 3rem;
    margin-top: 4rem;
    padding: 0 4rem;
}
.left-tip {
  color: #86b6e3;
  opacity: 0;
}
.right-tip {
  color: #86b6e3;
  opacity: 0;
}
.iconfont {
  font-size: 2rem;
}
.separator {
  position: relative;
  top: 0.12rem;
  font-size: 1.6rem;
  padding: 0 1rem;
  opacity: 0.4;
}
.tab-item {
  text-align: center;
  letter-spacing: 1rem;
  color: #666;
}
.icon-item{
    display: inline-block;
    width: 8rem;
    height: 6rem;
    line-height: 6rem;
    font-size: 2.5rem;
    &:hover{
        font-size: 2.9rem;
    }
}
.icon-item-active {
  font-size: 2.9rem;
  color: rgb(105, 186, 215);
  text-shadow: 4px 4px 1px rgba(135, 216, 245, 0.6);
  /* animation: twinkle 4s ease infinite; */
}

/* 
@keyframes twinkle {
	0% {
		opacity: 1;
	}
	30% {
		opacity: 1;
	}

	50% {
		opacity: 0.2;
	}
	70% {
		opacity: 1;
	}

	100% {
		opacity: 1;
	}
}
 */
</style>