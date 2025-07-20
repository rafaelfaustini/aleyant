<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import CategoryTree from './category-tree/CategoryTree.vue';
import Product from './Product.vue';
import ProductModal from './modal/ProductModal.vue';

import type ProductInterface from '@/types/ProductInterface';
import type CategoryInterface from '@/types/CategoryInterface';

const catalogTree: any = ref({});

let isCatalogLoaded = ref<Boolean>(false);
let selectedProduct = ref<ProductInterface | null>(null);

onMounted(async () => {
    await fetchCatalogTree();
});

async function fetchCatalogTree() {
    const request = await fetch('/data/catalog.json');
    catalogTree.value = await request.json(); 
    isCatalogLoaded.value = true;
}

function getCategoryProducts(category: any) {
    let products: Array<ProductInterface> = [];
    let isProduct = !category?.children;
    if(isProduct){
        products.push(category);
    } else {
        category.children.forEach((categoryChild : any) => {
            products = products.concat(getCategoryProducts(categoryChild));
        });
    }
    return products;
}

function onCategoryTreeFilterChange(filteredTree: CategoryInterface) {
    catalogTree.value = filteredTree;
}

function onProductSelected(clickedProduct: ProductInterface) {
    selectedProduct.value = clickedProduct;
}

function onProductModalClose(result: any) {
    selectedProduct.value = null;
}

const products = computed(() => {
    return getCategoryProducts(catalogTree.value);    
})

</script>

<template>
    <div class="catalog-wrapper" v-if="isCatalogLoaded">
        <CategoryTree :tree="catalogTree" @category-tree-filter-change="onCategoryTreeFilterChange"></CategoryTree>
        <div class="products-container">
            <Product v-for="product in products" @product-select="onProductSelected($event)" :product="product"></Product>
            <ProductModal @modal-close="onProductModalClose" :is-modal-visible="!!selectedProduct" :product="selectedProduct"></ProductModal>
        </div>
    </div>

</template>

<style scoped>
    .products-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 10px;
        row-gap: 15px;
    }

    .catalog-wrapper {
        display: grid;
        grid-template-columns: 250px 3fr;
        gap: 2px;
    }
</style>