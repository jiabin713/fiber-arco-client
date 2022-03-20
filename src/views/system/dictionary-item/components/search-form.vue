<script setup lang="ts">
  import useCollapsed from '@/hooks/useCollapsed';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import { reactive, ref } from 'vue';
  import { DictionaryItemParams } from '../data.d';
  import SystemStatusSelect from '@/components/system-status-select/index.vue';

  const emit = defineEmits<{
    (e: 'onSearch', value: Partial<DictionaryItemParams>): void;
  }>();

  const { collapsed, toggle } = useCollapsed(true);
  const formModel = reactive<Partial<DictionaryItemParams>>({});
  const form = ref<FormInstance>();

  const handleSubmit = () => emit('onSearch', formModel);
  const handleReset = () => {
    form.value?.resetFields();
    emit('onSearch', {});
  };
</script>

<template>
  <a-row>
    <a-form
      ref="form"
      :model="formModel"
      :label-col-props="{ span: 6 }"
      :wrapper-col-props="{ span: 18 }"
      label-align="left"
    >
      <a-grid :cols="2" :colGap="12" :rowGap="16" :collapsed="collapsed">
        <a-grid-item>
          <a-form-item field="name" label="名称">
            <a-input
              v-model="formModel.name"
              allowclear
              placeholder="请输入名称"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="code" label="编码">
            <a-input
              v-model="formModel.code"
              allowclear
              placeholder="请输入编码"
            />
          </a-form-item>
        </a-grid-item>
        <a-grid-item>
          <a-form-item field="status" label="状态">
            <SystemStatusSelect v-model="formModel.status" />
          </a-form-item>
        </a-grid-item>
        <a-grid-item :span="1" suffix style="text-align: right">
          <a-button-group>
            <a-button type="secondary" @click="handleReset">
              <template #icon><icon-refresh /></template>
              <template #default>重置</template>
            </a-button>
            <a-button type="primary" @click="handleSubmit">
              <template #icon><icon-search /></template>
              <template #default>搜索</template>
            </a-button>
            <a-button type="text" @click="toggle">
              {{ collapsed ? '展开' : '收起' }}
              <icon-down v-if="collapsed === true" />
              <icon-up v-else="collapsed === false" />
            </a-button>
          </a-button-group>
        </a-grid-item>
      </a-grid>
    </a-form>
    <a-divider />
  </a-row>
</template>
