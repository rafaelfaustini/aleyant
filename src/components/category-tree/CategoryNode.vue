<script setup lang="ts">
import { ref, watch, type PropType } from 'vue';

const props = defineProps({
  category: {
    type: Object,
    required: true
  },
  isSelected: Boolean
})

const emit = defineEmits<{
  (e: 'category-selected', category: any): void;
}>();

const isCategorySelected = ref(props.isSelected);

watch(() => props.isSelected, (newVal) => {
  isCategorySelected.value = newVal;
});

watch(isCategorySelected, (newVal) => {
    if(props) {
        props.category.isSelected = true;
    }
  if (newVal) {
    emit('category-selected', props.category);
  }
});

function filterNonCategoryChildren() {
    return props.category?.children.filter((category: any) => {
        let isCategory = !!category.children;
        return isCategory;
    })
}

</script>

<template>
    <div class="category-container">
        <div class="category">
            <input type="checkbox" v-model="isCategorySelected">
            {{ category?.name }}
        </div>
        <div class="category-children" v-if="category?.children">
            <CategoryNode v-for="childCategory in filterNonCategoryChildren()" :category="childCategory" 
            v-model:isSelected="isCategorySelected" @category-selected="emit('category-selected', $event)"
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
    }
    .category-children {
        display: flex;
        flex-direction: column;
        gap: 5px;
        padding: 0 10px;
    }
</style>