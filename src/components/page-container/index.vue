<template>
  <div class="page-container">
    <PageBreadcrumb :items="breadcrumbs" />
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import PageBreadcrumb from '@/components/page-breadcrumb/index.vue';
const route = useRoute();

const breadcrumbs = computed(() =>
  route.matched
    .filter((item) => item.name !== 'root')
    .map((item) => item.meta.locale as string)
);
</script>

<style scoped lang="less">
.page-container {
  padding: 0 20px 20px 20px;
}
</style>
