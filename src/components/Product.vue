<script setup lang="ts">
    const props = defineProps({
        product: {
            type: Object,
            require: true
        },
    })
</script>

<template>
    <div class="product-container">
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
        color: #0066cc;
    }
    .product-price-range {
        font-weight: 500;
        font-size: 16px;
    }
</style>