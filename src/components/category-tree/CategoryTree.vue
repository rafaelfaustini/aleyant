<script setup lang="ts">
import { onBeforeMount, ref, type PropType, type Ref } from 'vue';
import CategoryNode from './CategoryNode.vue';
import type CategoryInterface from '@/types/CategoryInterface';

const props = defineProps({
  tree: {
    type: Object as PropType<CategoryInterface>,
    required: true
  },
})

let changedTree: Ref<CategoryInterface | null> = ref(null);
let selectedTree: Ref<CategoryInterface | null> = ref(null);

onBeforeMount(() => {
  changedTree.value = props.tree;
})

function categorySelected(selection: CategoryInterface) {
    selectedTree.value = selection;
}

function getSelectedCategoriesTree(category: any) {
  const hasChildren = Array.isArray(category.children);
  const selectedChildren = hasChildren
    ? category.children
        .map(getSelectedCategoriesTree)
        .filter(Boolean)
    : [];

  const shouldIncludeCategory = category.isSelected || selectedChildren.length > 0;

  if (!shouldIncludeCategory) {
    return null;
  }

  const result: any = { ...category };

  if (hasChildren) {
    result.children = selectedChildren;
  } else {
    delete result.children;
  }

  return result;
}

function filterCategoryTree() {
  let selectedCategories = getSelectedCategoriesTree(selectedTree.value);
  if(!selectedCategories) {
    selectedCategories = changedTree.value;
  }
  emit("category-tree-filter-change", selectedCategories)
}

const emit = defineEmits<{
  (e: 'category-tree-filter-change', treeFilter: CategoryInterface): void;
}>();
</script>

<template>
  <div class="category-tree-wrapper category-tree-outer">
    <h3 class="category-tree-title">Filter by category</h3>
    <div class="category-tree-container">
        <div class="category-tree wrapper">
          <CategoryNode v-if="changedTree" :category="changedTree" :isTopNode="true" @category-selected="categorySelected"></CategoryNode>
        </div>
        <div class="category-tree-actions">
          <button class="button button-primary" @click="filterCategoryTree()">Filter</button>
        </div>
    </div>
  </div>

</template>

<style scoped>
  .category-tree-title {
    font-weight: 500;
  }
  .category-tree-wrapper {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  .category-tree-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 5px;
  }
  .category-tree-outer {
    background-color: white;
    padding: 10px 15px;
    box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.1);
  }
  .category-tree-actions {
    display: flex;
    gap: 5px;
    flex-direction: row-reverse;
  }
</style>