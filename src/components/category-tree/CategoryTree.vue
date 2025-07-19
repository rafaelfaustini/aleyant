<script setup lang="ts">
import { onMounted } from 'vue';
import CategoryNode from './CategoryNode.vue';

const props = defineProps({
  tree: Object,
})

onMounted(() => {
    
})

function categorySelected(selection: any) {
    console.log(selection)
}
</script>

<template>
    <CategoryNode :category="tree" @category-selected="categorySelected"></CategoryNode>
</template>

<style scoped>

</style>