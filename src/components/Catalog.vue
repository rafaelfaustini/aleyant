<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import CategoryTree from './category-tree/CategoryTree.vue';
import Product from './Product.vue';

const catalogTree: any = ref({});

async function fetchCatalogTree() {
    const request = await fetch('/data/catalog.json');
    catalogTree.value = await request.json(); 
}

onMounted(async () => {
    await fetchCatalogTree();
});

function getCategoryProducts(category: any) {
    let products: any = [];
    let isProduct = !category.children;
    if(isProduct){
        products.push(category);
    } else {
        category.children.forEach((categoryChild : any) => {
            products = products.concat(getCategoryProducts(categoryChild));
        });
    }
    return products;
}

const products = computed(() => {
    return getCategoryProducts(catalogTree.value);    
})

</script>

<template>
    <div class="catalog-wrapper">
        <CategoryTree :tree="catalogTree"></CategoryTree>
        <div class="products-container">
            <Product v-for="product in products" :product="product"></Product>
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