<script setup lang="ts">
import type CategoryInterface from '@/types/CategoryInterface';
import type ProductInterface from '@/types/ProductInterface';
import type { PropType } from 'vue';


const props = defineProps({
  category: {
    type: Object as PropType<CategoryInterface>,
    required: true
  },
  isTopNode: {
    type: Boolean,
    required: false
  }
})

const emit = defineEmits<{
  (e: 'category-selected', category: any): void;
}>();



function filterNonCategoryChildren(): CategoryInterface[] {
    return props.category?.children.filter(isCategory)
}

function changeChildrenSelection(category: any, isSelection: boolean | undefined) {
  category.isSelected = !!isSelection;
  if(Array.isArray(category.children)) {
    category.children.forEach((childCategory: any) => changeChildrenSelection(childCategory, isSelection));
  }
}

function onCheckboxChange() {
  changeChildrenSelection(props.category, props.category.isSelected);
  emit('category-selected', props.category);
}

function onCategorySelectionChangeEvent(event: any) {
  if(props.isTopNode) {
    emit('category-selected', props.category);
    return;
  }
  emit('category-selected', event)
}

function isCategory(child: CategoryInterface | ProductInterface): child is CategoryInterface {
  return 'children' in child;
}

function toggleCategory(category: CategoryInterface) {
  category.isSelected = !category.isSelected;
  onCheckboxChange();
}

</script>

<template>
    <div class="category-container">
        <div class="category" @click="toggleCategory(category)">
            <input class="category-checkbox" type="checkbox" v-model="category.isSelected" @change="onCheckboxChange" @click.stop>
            {{ category?.name }}
        </div>
        <div class="category-children" v-if="category?.children">
            <CategoryNode v-for="childCategory in filterNonCategoryChildren()" :category="childCategory" 
              @category-selected="onCategorySelectionChangeEvent($event);"
            ></CategoryNode>
        </div>
    </div>


</template>

<style scoped>
    .category-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    .category {
        display: block;
        padding: 5px 2px;
        border-radius: 4px;
        cursor: pointer;
        user-select: none;
    }
    .category:hover {
      background-color: #4f9ae6;
      color: white;

    }
    .category-children {
        display: flex;
        flex-direction: column;
        gap: 2px;
        padding: 0 10px;
    }
</style>