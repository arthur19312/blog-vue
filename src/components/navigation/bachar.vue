<template>
    <div
        class="bachar-container"
        @click="openMenu"
        @mouseenter="handleMouseIn"
        @mouseleave="handleMouseOut"
        :class="{ active: openFlag, hover: hoverFlag }"
    >
        <div class="cross cross-1"></div>
        <div class="cross cross-2"></div>
        <div class="cross cross-3"></div>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'

export default defineComponent({
    data() {
        return {
            openFlag: false,
            hoverFlag: false,
        };
    },
    methods: {
        openMenu() {
            this.hoverFlag = false;
            if (this.openFlag) {
                this.openFlag = false;
                this.$emit("closeMenu");
            } else {
                this.openFlag = true;
                this.$emit("openMenu");
            }
        },
        closeBachar() {
            this.hoverFlag = false;
            this.openFlag = false;
        },
        handleMouseIn() {
            if (!this.openFlag) {
                this.hoverFlag = true;
            }
        },
        handleMouseOut() {
            this.hoverFlag = false;
        },
    },
});
</script>

<style lang="less" scoped>
.cross {
    height: 1px;
    width: 3rem;
    background-color: #aaa;
    margin: 6px 0;
    opacity: 1;
    transition: 0.2s all ease;
}

.bachar-container {
    padding: 2rem;
    cursor: pointer;
    transition: 0.2s all ease;

    &:hover {
        .cross {
            background-color: #444;
        }
    }
}

.hover {
    transform: scaleX(1.6);
}

.active {
    .cross-1 {
        transform: rotate(45deg);
    }

    .cross-2 {
        opacity: 0;
    }

    .cross-3 {
        transform: rotate(-45deg);
    }
}
</style>
