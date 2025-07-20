<script setup lang="ts">
import type ProductInterface from '@/types/ProductInterface';
import type { PropType } from 'vue';

    const props = defineProps({
        product: {
            type: Object as PropType<ProductInterface>,
            required: true
        },
    });
    const emit = defineEmits<{
    (e: 'product-select', selectedProduct: ProductInterface): void;
    }>();

    function selectProduct() {
        emit('product-select', props.product);
    }
</script>

<template>
    <div class="product-container" @click="selectProduct">
        <img class="product-image" :src="props.product?.image" alt="">
        <span class="product-title">{{ props.product?.name }}</span>
        <span class="product-price-range">{{ props.product?.priceRange }}</span>
    </div>
</template>

<style scoped>
    .product-container {
        display: flex;
        flex-direction: column;
        background-color: #fff;
        padding: 25px 15px;
        border-radius: 5px;
        aspect-ratio: 1/1;
        box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.1);
        scale: 1;
        transition: scale 0.25s ease-out;
        cursor: pointer;  
        z-index: 1;
    }
    .product-container:hover {
        scale: 1.25;
        box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.3);
        z-index: 2;
    }
    .product-image {
        object-fit: contain;
        border-radius: 5px;
    }
    .product-title {
        font-size: 14px;
        color: var(--color-primary);
    }
    .product-price-range {
        font-weight: 500;
        font-size: 16px;
    }
</style>