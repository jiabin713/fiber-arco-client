<script setup lang="ts">
  import { ref } from 'vue';
  import { useRequest } from 'vue-request';
  import { Message } from '@arco-design/web-vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import StatusSelect from '@/components/status-select/index.vue';
  import { QueryStatusCode } from '@/global/constants';
  import Rules from './rules';
  import { PositionRecord, PositionRequest } from '../data.d';
  import useState from '@/hooks/useState';
  import * as PositionService from '../service';

  // Props
  const props = defineProps<{
    record: Partial<PositionRecord>;
  }>();
  // Emit
  const emit = defineEmits<{
    (e: 'onMutations'): void;
  }>();

  const { state: formModel, setState: setFormModel } = useState<
    Partial<PositionRecord>
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
    (req: Partial<PositionRequest>) => {
      const updateOrAdd = req.id
        ? PositionService.update
        : PositionService.create;
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
        <a-form-item label="职位名称" field="name">
          <a-input v-model="formModel.name" placeholder="请输入名称" />
        </a-form-item>
        <a-form-item label="职位编码" field="code">
          <a-input v-model="formModel.code" placeholder="请输入编码" />
        </a-form-item>
        <a-form-item label="状态" field="status">
          <StatusSelect
            v-model="formModel.status"
            :queryCode="QueryStatusCode.system_status"
          />
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
