<template>
    <a target="_blank" :href="gitUrl(url)">
        <div id="canvasContainer" ref="threeContainer"></div
        >
    </a>
    <div class="git-item" style="margin-left: 1rem">
        <div class="button-container">
            <img
                :src="require('@/assets/img/github/1.png')"
                class="switch-button"
                @click="switchIndex(1)"
            />
        </div>
        <div class="button-container">
            <img
                :src="require('@/assets/img/github/2.png')"
                class="switch-button"
                @click="switchIndex(2)"
            />
        </div>
    </div>
</template>

<script>
import {display1, display2, renderer} from "./3d";

export default {
    name: "ThreejsContainer",
    data() {
        return {
            url: "interact",
            index: 1,
        };
    },
    methods: {
        switchIndex(num) {
            if (!import.meta.env.SSR) {
            if (num === 1) {
                this.index = num;
                this.url = "interact";
                display1();
            } else if (num === 2) {
                this.index = num;
                this.url = "Crystal";
                display2();
            }}
        },
        gitUrl(url) {
            return "https://github.com/arthur19312/" + url;
        },
    },
    mounted() {
        if (!import.meta.env.SSR) {
            let container = document.getElementById("canvasContainer");
            container.appendChild(renderer.domElement);
            display1();
        }
    },
};
</script>

<style lang="less" scoped>
#canvasContainer {
    margin-left: 8rem;
}

.switch-button {
    width: 9rem;
    height: 5rem;
    cursor: pointer;
    transition: all 0.2s ease;
    opacity: 1;

    &:hover {
        opacity: 0.8;
    }
}

.button-container {
    width: fit-content;
    height: fit-content;
    position: relative;
    margin: 0 1rem 1.6rem 1rem;
    transform: skewX(-9deg);
    opacity: 0.9;
}
</style>
