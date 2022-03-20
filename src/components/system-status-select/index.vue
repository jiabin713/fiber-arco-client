<template>
  <a-select
    v-model="props.model"
    placeholder="请选择状态"
    allow-clear
    :options="selectOptions('system_status')"
  >
  </a-select>
</template>

<script setup lang="ts">
  import { useDictionaryStore } from '@/store';

  const props = defineProps({
    model: String,
  });

  const { selectOptions } = useDictionaryStore();
</script>
