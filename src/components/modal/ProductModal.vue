<script setup lang="ts">
import { ref, type PropType } from 'vue';
import Modal from './Modal.vue';
import type ProductInterface from '@/types/ProductInterface';

    const props = defineProps({
        product: {
            type: Object as PropType<ProductInterface | null>,
            required: false
        },
        isModalVisible: {
            type: Boolean,
        }
    })
    function onModalClose(result: any) {
        emit("modal-close", result);
    }
    const emit = defineEmits<{
    (e: 'modal-close', result: any): void;
    }>();
</script>

<template>
    <Teleport to="body">
        <Modal :is-visible="isModalVisible" @modal-close="onModalClose">
            <div class="product-details-wrapper">
                <div class="product-details-container">
                    <div class="product-image">
                        <img :src="product?.image">
                    </div>
                    <div class="product-details">
                        <h2 class="product-name">{{ product?.name }}</h2>
                        <h3 class="product-description">{{ product?.description }}</h3>
                        <p class="product-price-range">{{ product?.priceRange }}</p>
                    </div>
                </div>
            </div>
        </Modal>
    </Teleport>
</template>

<style scoped>
    .product-details-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }
    .product-details-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }

    .product-image img{
        object-fit: cover;
        width: 100%;
    }

    .product-name {
        font-size: 24px;
    }

    .product-description {
        font-size: 14px;
    }

    .product-price-range {
        font-size: 28px;
    }

    .product-details {
        display: flex;
        flex-direction: column;
        flex-direction: center;
    }
</style>