<template>
  <div class="diary-container">
    <WaterfallFlow />
  </div>
</template>

<script lang="ts">
import WaterfallFlow from "@/components/waterfallFlow/index.vue";
export default {
  name: "diary",
  components: { WaterfallFlow },
};
</script>
<style scoped>
.diary-container {
  margin: 1rem 7rem 1rem 4rem;
}
</style>
