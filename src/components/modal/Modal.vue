<script setup lang="ts">
    const props = defineProps({
        isVisible: {
            type: Boolean,
        },
    });
    const emit = defineEmits<{
    (e: 'modal-close', result: any): void;
    }>();
</script>

<template>
    <div class="modal-wrapper" v-if="props.isVisible">
        <div class="modal-inner-wrapper">
            <div class="modal">
                <div class="modal-close">
                    <img
                        src="@/assets/images/close-icon-311612.svg"
                        alt="Close modal icon"
                        height="20"
                        width="20"
                        @click="emit('modal-close', true)"
                    />
                </div>
                <div class="modal-title">

                </div>
                <div class="modal-body">
                    <slot></slot>
                </div>
            </div>
            <div class="modal-overlay" @click="emit('modal-close', true)"></div>
        </div>

    </div>
</template>

<style scoped>
    .modal-wrapper {
        position: fixed;
        top: 0;
        left: 0;
        width: 100dvw;
        height: 100dvh;
        content: "";
        z-index: 9999;
    }
    .modal-inner-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(1px);
        background-color: #0066cc2f;
        content: "";
        z-index: 1;
    }
    .modal {
        background-color: white;
        width: 50rem;
        position: relative;
        aspect-ratio: 16 / 9;
        border-radius: 20px;
        box-shadow: 2px 0px 16px 6px rgba(0,0,0,0.1);
        z-index: 2;
    }
    .modal-body {
        padding: 50px 35px;
        height: 100%;
        width: 100%;
    }
    .modal-close {
        position: absolute;
        top: 0.5rem;
        right: 1.5rem;
        font-size: 1.5rem;
        cursor: pointer;
    }
</style>