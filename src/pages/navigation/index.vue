<template>
  <div class="nav-container">
    <Bachar @openMenu="openMenu" @closeMenu="closeMenu" ref="bachar" />
  </div>
  <div class="menu" :class="{ open: openFlag }">
    <div class="menu-container">
      <div class="link-list">
        <router-link
          :to="'/' + item.name"
          class="link"
          v-for="item in links"
          :key="item.name"
          @click="closeBachar"
        >
          <div class="list-item">{{ item.name }}</div>
        </router-link>
      </div>
      <Intro class="intro" />
    </div>
  </div>
</template>

<script>
import Bachar from "@/components/navigation/bachar.vue";
import Intro from "@/components/navigation/intro/index.vue";
export default {
  components: { Bachar, Intro },
  data() {
    return {
      openFlag: false,
      links: [
        { name: "potfolio" },
        { name: "github" },
        { name: "travels" },
        { name: "kaomoji" },
      ],
    };
  },
  methods: {
    openMenu() {
      this.openFlag = true;
      this.$emit("displayContent", false);
    },
    closeMenu() {
      this.openFlag = false;
      this.$emit("displayContent", true);
    },
    closeBachar() {
      this.closeMenu();
      this.$refs.bachar.closeBachar();
    },
  },
};
</script>

<style lang="less" scoped>
.nav-container {
  position: absolute;
  z-index: 4;
  right: 14rem;
  top: 3rem;
}

.menu {
  position: absolute;
  z-index: 3;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  opacity: 0;
  pointer-events: none;
  transition: 0.3s all ease;

  .menu-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 10% 0 0 10%;
  }

  .intro {
    flex: 0 1 30%;
    padding: 1rem;
  }
}

.open {
  opacity: 1;
  pointer-events: auto;
}

.link {
  outline: 0;
  text-decoration: none;
  color: #999;
  text-align: left;

  .list-item {
    padding: 2rem;
    font-size: 1.2rem;
    font-weight: 100;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: #aaa;
    text-transform: capitalize;
  }
}
</style>