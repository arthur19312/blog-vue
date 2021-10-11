<template>
  <div class="main">
    <div class="masonary">
      <div class="clumn">
        <div class="item-1">
          <ImgItem
            v-for="item in list[0]"
            :key="item.imgName"
            :imgName="item.imgName"
            :date="item.date"
            :location="item.location"
          />
        </div>
      </div>
      <div class="clumn">
        <div class="item-2">
          <ImgItem
            v-for="item in list[1]"
            :key="item.imgName"
            :imgName="item.imgName"
            :date="item.date"
            :location="item.location"
          />
        </div>
      </div>
    </div>
    <div class="masonary">
      <div class="clumn">
        <div class="item-3">
          <ImgItem
            v-for="item in list[2]"
            :key="item.imgName"
            :imgName="item.imgName"
            :date="item.date"
            :location="item.location"
          />
        </div>
      </div>
      <div class="clumn">
        <div class="item-4">
          <ImgItem
            v-for="item in list[3]"
            :key="item.imgName"
            :imgName="item.imgName"
            :date="item.date"
            :location="item.location"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
interface ListModel {
  length: 1 | 2 | 3 | 4;
  columns: Array<ColumnModel>;
}
interface ColumnModel {
  height: number;
  items: Array<ItemModel>;
}
interface ItemModel {
  height: number;
  imgSrc: string;
  date: string;
  location: string;
}
import ImgItem from "./imgItem.vue";
export default {
  props: {
    initArray: {
      required: false,
      default: [],
    },
  },
  components: { ImgItem },
  data() {
    return {
      list: [
        [
          { imgName: "richang.jpg", date: "2020/05/07", location: "植物园" },
          { imgName: "shenzhen.jpg", date: "2019/08/11", location: "深圳" },
          { imgName: "lvshun.jpg", date: "2019/10/15", location: "旅顺" },
        ],
        [
          { imgName: "dalian.jpg", date: "2019/09/28", location: "大连" },
          { imgName: "weihai.jpg", date: "2019/10/03", location: "威海" },
          { imgName: "xian.jpg", date: "2020/09/09", location: "西安" },
          { imgName: "hashen.jpg", date: "2020/08/11", location: "哈深" },
        ],
        [
          { imgName: "xinjiang.jpg", date: "2020/01/15", location: "新疆" },
          { imgName: "qinghua.jpg", date: "2019/08/11", location: "清华" },
          { imgName: "haxi.jpg", date: "2017/11/03", location: "哈西" },
        ],
        [
          { imgName: "harbin.jpg", date: "2017/10/03", location: "索菲亚" },
          { imgName: "xiamen.jpg", date: "2017/08/11", location: "厦门" },
          { imgName: "pingshan.jpg", date: "2020/10/01", location: "平山" },
        ],
      ],
    };
  },
  setup() {},
};
</script>
<style lang="less" scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: row;
  height: auto;
  margin-right: 2rem;
}
.masonary {
  width: 50%;
  display: flex;
  flex-direction: row;
  height: auto;
}
.clumn {
  margin-left: 1.5rem;
  display: flex;
  flex-flow: column wrap;
  width: 100%;
}
.item-1,
.item-4 {
  padding-top: 2.5rem;
}
.item-2,
.item-3 {
  padding-top: 1rem;
}

@media only screen and (max-width: 1350px) {
  .masonary {
    width: 80%;
    flex-direction: column;
  }
  .clumn {
    width: 90%;
    margin-left: 1rem;
  }
  .item-1,
  .item-2,
  .item-3,
  .item-4 {
    padding-top: 0;
  }
}

@media only screen and (max-width: 600px) {
  .main {
    flex-direction: column;
    .masonary {
      width: 100%;
      flex-direction: column;
      .clumn {
        width: 90%;
        max-width: 95%;
        margin-left: 0;
      }
    }
  }
}
</style>
