<template>
  <a-tag :key="current?.value" :color="current?.color">
    {{ current?.label }}
  </a-tag>
</template>

<script setup lang="ts">
  import { useDictionaryStore } from '@/store';
  import { computed, toRefs } from 'vue';
  import { DictionaryItemRecord } from '@/views/system/dictionary-item/data.d';

  interface Props {
    status: String;
    options: Array<DictionaryItemRecord>;
  }

  const props = defineProps<Props>();

  const { status, options } = toRefs(props);
  // const { selectOptions } = useDictionaryStore();
  const current = computed(() => {
    return options.value.find((tag) => tag.value == status.value);
  });
</script>
