<template>
  <a-select
    v-model="data"
    allowClear
    :placeholder="props.placeholder ? props.placeholder : '请选择状态'"
    :options="selectOptions(props.queryCode)"
  >
  </a-select>
</template>

<script setup lang="ts">
  import { useVModel } from '@vueuse/core';
  import { useDictionaryStore } from '@/store';

  const props = defineProps({
    placeholder: String,
    modelValue: String,
    queryCode: String,
  });

  const emit = defineEmits(['update:modelValue']);

  const data = useVModel(props, 'modelValue', emit);

  const { selectOptions } = useDictionaryStore();
</script>
