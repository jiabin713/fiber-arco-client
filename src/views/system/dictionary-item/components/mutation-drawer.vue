<script setup lang="ts">
  import { ref } from 'vue';
  import { useRequest } from 'vue-request';
  import { Message } from '@arco-design/web-vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import Rules from './rules';
  import { DictionaryItemRecord, DictionaryItemRequest } from '../data.d';
  import useState from '@/hooks/useState';
  import * as DictionaryItemService from '../service';
  import SystemStatusSelect from '@/components/system-status-select/index.vue';

  // Props
  const props = defineProps<{
    record: Partial<DictionaryItemRecord>;
  }>();
  // Emit
  const emit = defineEmits<{
    (e: 'onMutations'): void;
  }>();

  const { state: formModel, setState: setFormModel } = useState<
    Partial<DictionaryItemRecord>
  >({});
  const { state: title, setState: setTitle } = useState<string>('');
  const { state: visible, setState: setVisible } = useState<boolean>(false);
  const formRef = ref<FormInstance | null>(null);

  const openDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  // 开启后
  const afterOpen = () => {
    setFormModel(props.record);
    setTitle('新建');
    if (!!props.record.id) {
      setTitle(`更新 ${props.record.label} `);
    }
  };
  // 关闭后
  const afterClose = () => setFormModel({});

  const { run: mutations, loading } = useRequest(
    (req: Partial<DictionaryItemRequest>) => {
      const updateOrAdd = req.id
        ? DictionaryItemService.update
        : DictionaryItemService.create;
      return updateOrAdd(req);
    },
    {
      manual: true,
      onBefore: () => Message.loading(`正在${title.value}数据中...`),
      onSuccess: () => {
        Message.clear();
        Message.success(`${title.value}成功!`);
        closeDrawer();
        emit('onMutations');
      },
      onError: () => {
        Message.clear();
        Message.error(`${title.value}失败!`);
      },
    }
  );

  // Mutation操作
  const handleOk = async () => {
    const err = await formRef.value?.validate();
    if (!err) {
      await mutations(formModel.value);
    }
  };

  // 暴露 的属性
  defineExpose({ openDrawer });
</script>

<template>
  <a-drawer
    :visible="visible"
    @open="afterOpen"
    @close="afterClose"
    @ok="handleOk"
    @cancel="closeDrawer"
    width="33%"
    :unmountOnClose="true"
    :okLoading="loading"
    :title="title"
  >
    <a-card :bordered="false">
      <a-form ref="formRef" :model="formModel" layout="vertical" :rules="Rules">
        <a-form-item label="选项标" field="label">
          <a-input v-model="formModel.label" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item label="选项值" field="value">
          <a-input v-model="formModel.value" placeholder="请输入编码" />
        </a-form-item>
        <a-form-item label="状态" field="status" initialValue="active">
          <SystemStatusSelect v-model="formModel.status" />
        </a-form-item>
        <a-form-item label="排序" field="sort" initialValue="{1000}">
          <a-input-number
            v-model="formModel.sort"
            placeholder="请输入排序数值"
          />
        </a-form-item>
        <a-form-item label="备注" field="remark">
          <a-textarea v-model="formModel.remark" placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </a-card>
  </a-drawer>
</template>
