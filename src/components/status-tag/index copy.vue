<template>
  <a-tag :key="current?.value" :color="current?.color">
    {{ current?.label }}
  </a-tag>
</template>

<script setup lang="ts">
  import { useDictionaryStore } from '@/store';
  import { computed } from 'vue';
  const props = defineProps({
    status: String,
    queryCode: String,
  });

  const { selectOptions } = useDictionaryStore();
  const current = computed(() => {
    const tags = selectOptions(props.queryCode);
    return tags.find((tag) => tag.value == props.status);
  });
</script>
