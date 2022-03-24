<script setup lang="ts">
  import { ref } from 'vue';
  import { useRequest } from 'vue-request';
  import { Message } from '@arco-design/web-vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import Rules from './rules';
  import { StaffRecord, StaffRequest } from '../data.d';
  import useState from '@/hooks/useState';
  import * as StaffService from '../service';
  import * as RoleService from '@/views/system/role/service';
  // Props
  const props = defineProps<{
    record: Partial<StaffRecord>;
  }>();

  const { state: formModel, setState: setFormModel } = useState<
    Partial<StaffRecord>
  >({});
  const { state: title, setState: setTitle } = useState<string>('');
  const { state: visible, setState: setVisible } = useState<boolean>(false);
  const formRef = ref<FormInstance | null>(null);

  const openDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const { data: roleData, loading: roleLoading } = useRequest(
    RoleService.queryAll,
    {
      ready: visible,
    }
  );
  // 开启后
  const afterOpen = () => {
    setTitle(`分配角色给 ${props.record.name}`);
    queryRoles();
  };
  // 关闭后
  const afterClose = () => setFormModel({});

  const { run: queryRoles } = useRequest(
    () => StaffService.queryRole(props.record.id),
    {
      manual: true,
      // ready: visible,
      onSuccess: (data) => {
        setFormModel({ role_ids: data });
      },
    }
  );

  const { run: mutations, loading } = useRequest(
    (req: Partial<StaffRequest>) => StaffService.assign(req),
    {
      manual: true,
      onBefore: () => Message.loading(`正在${title.value} 数据中...`),
      onSuccess: () => {
        Message.clear();
        Message.success(`${title.value} 成功!`);
        closeDrawer();
      },
      onError: () => {
        Message.clear();
        Message.error(`${title.value} 失败!`);
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
      <a-form
        ref="formRef"
        :model="formModel"
        layout="vertical"
        :rules="Rules"
        initValue="RoleData"
      >
        <a-form-item label="角色" field="role_ids">
          <a-select
            v-model="formModel.role_ids"
            placeholder="请选择角色"
            allow-clear
            :loading="roleLoading"
            multiple
          >
            <a-option v-for="item of roleData" :value="item.id">
              {{ item.name }}
            </a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-card>
  </a-drawer>
</template>
