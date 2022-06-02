<template>
  <div class="intro-container">
    <avatar :imgSrc="avatarUrl" name="ARTHUR19312" />
    <div class="link">
      <IconLink
        v-for="item in iconLinks"
        :key="item.className"
        :className="item.className"
        :color="item.color"
        :href="item.href"
        :scale="item.scale"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Avatar from "@/components/navigation/intro/avatar.vue";
import IconLink from "@/components/navigation/intro/iconLink.vue";
import avatarUrl from "/assets/img/avatar/kk.jpg";

export default {
  components: { Avatar, IconLink },
  data() {
    return {
      avatarUrl,
      iconLinks: [
        {
          className: "csdn",
          color: "#be2720",
          href: "https://blog.csdn.net/fruiva",
        },
        {
          className: "github-fill",
          color: "#6c3597",
          href: "https://github.com/arthur19312",
          scale: "1.25rem",
        },
        {
          className: "steam",
          color: "#224a79",
          href: "https://steamcommunity.com/profiles/76561198454211888",
          scale: "1.25rem",
        },
        { className: "weibo", color: "#e05730", href: "https://weibo.com/u/6861834736" },
        // { className: "qq", color: "#61c5ef", href: "?qq=413389361" },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.intro-container {
  text-align: left;
  display: flex;
  gap: 2rem;

  .link {
    margin-top: 0.75rem;
    display: flex;
    justify-content: start;
    line-height: 1.5rem;

    .iconfont {
      margin-right: 1rem;
      font-size: 1.2rem;
      color: #aaa;
    }
  }
}
</style>
