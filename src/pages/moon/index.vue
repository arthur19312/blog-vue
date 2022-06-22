<template>
    <div class="moon" id="moon"></div>
</template>

<script>
import {defineComponent} from "vue";
import {display, renderer, animateId} from "./3d";

export default defineComponent({
    name: "moon",
    data() {
        return {};
    },
    methods: {},
    computed: {},
    mounted() {
        if (!import.meta.env.SSR) {
            const dom = document.getElementById("moon");
            dom.appendChild(renderer.domElement);
            display();
        }

    },
    unmounted() {
        if (!import.meta.env.SSR) {
            cancelAnimationFrame(animateId);
        }
    },
});
</script>

<style scoped>
.moon {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
}
</style>
