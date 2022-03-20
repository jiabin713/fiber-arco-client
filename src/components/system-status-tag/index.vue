<template>
  <a-tag
    :key="props.code"
    :color="props.status == 'active' ? 'arcoblue' : 'red'"
  >
    {{ props.status == 'active' ? '正常' : '关闭' }}
  </a-tag>
</template>

<script setup lang="ts">
  import { useDictionaryStore } from '@/store';

  const props = defineProps({
    code: String,
    status: String,
  });

  const dictionaryStore = useDictionaryStore();
</script>
