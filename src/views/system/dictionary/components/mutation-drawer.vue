<script setup lang="ts">
  import { ref } from 'vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import Rules from './rules';
  import { DictionaryRecord, DictionaryRequest } from '../data.d';
  import useState from '@/hooks/useState';
  import * as DictionaryService from '../service';
  import { useRequest } from 'vue-request';
  import { Message } from '@arco-design/web-vue';

  // Props
  const props = defineProps<{
    record: Partial<DictionaryRecord>;
  }>();
  // Emit
  const emit = defineEmits<{
    (e: 'onMutations'): void;
  }>();

  const { state: formModel, setState: setFormModel } = useState<
    Partial<DictionaryRecord>
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
      setTitle(`更新 ${props.record.name}`);
    }
  };
  // 关闭后
  const afterClose = () => setFormModel({});

  const { run: mutations, loading } = useRequest(
    (req: Partial<DictionaryRequest>) => {
      const updateOrAdd = req.id
        ? DictionaryService.update
        : DictionaryService.create;
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
        <a-form-item field="id" disabled hidden />
        <a-form-item label="字典名称" field="name">
          <a-input v-model="formModel.name" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item label="字典编码" field="code">
          <a-input v-model="formModel.code" placeholder="请输入编码" />
        </a-form-item>
        <a-form-item label="状态" field="status" initialValue="active">
          <a-select v-model="formModel.status" placeholder="请选择状态">
            <a-option value="active">正常</a-option>
            <a-option value="deactive">关闭</a-option>
          </a-select>
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
