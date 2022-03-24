<script setup lang="ts">
  import { ref } from 'vue';
  import { useRequest } from 'vue-request';
  import { Message } from '@arco-design/web-vue';
  import { FormInstance } from '@arco-design/web-vue/es/form';
  import StatusSelect from '@/components/status-select/index.vue';
  import { QueryStatusCode } from '@/global/constants';
  import Rules from './rules';
  import { StaffRecord, StaffRequest } from '../data.d';
  import useState from '@/hooks/useState';
  import * as StaffService from '../service';
  import * as OrganizationService from '@/views/system/organization/service';
  import * as PositionService from '@/views/system/position/service';
  // Props
  const props = defineProps<{
    record: Partial<StaffRecord>;
  }>();

  // Emit
  const emit = defineEmits<{
    (e: 'onMutations'): void;
  }>();

  const { state: formModel, setState: setFormModel } = useState<
    Partial<StaffRecord>
  >({});
  const { state: title, setState: setTitle } = useState<string>('');
  const { state: visible, setState: setVisible } = useState<boolean>(false);
  const formRef = ref<FormInstance | null>(null);

  const openDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const { data: organizationData, loading: organizationLoading } = useRequest(
    () => OrganizationService.queryTree({}),
    {
      ready: visible,
    }
  );
  const { data: positionData, loading: positionLoading } = useRequest(
    () => PositionService.queryAll(),
    {
      ready: visible,
    }
  );
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
    (req: Partial<StaffRequest>) => {
      const updateOrAdd = req.id ? StaffService.update : StaffService.create;
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
        <a-divider orientation="left">基础信息</a-divider>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="用户名称" field="username">
              <a-input v-model="formModel.username" placeholder="请输入名称" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="用户姓名" field="name">
              <a-input v-model="formModel.name" placeholder="请输入编码" />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-form-item label="电子邮件" field="email">
            <a-input v-model="formModel.email" placeholder="请输入电子邮件" />
          </a-form-item>
          <a-form-item label="移动电话" field="mobile">
            <a-input v-model="formModel.mobile" placeholder="请输入电话号码" />
          </a-form-item>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="性别" field="gender">
              <StatusSelect
                v-model="formModel.gender"
                :queryCode="QueryStatusCode.staff_gender"
                placeholder="请选择性别"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="状态" field="status">
              <StatusSelect
                v-model="formModel.status"
                :queryCode="QueryStatusCode.system_status"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-divider orientation="left">员工信息</a-divider>
        <a-row>
          <a-form-item label="归属部门" field="organization_id">
            <a-tree-select
              v-model="formModel.organization_id"
              placeholder="请选择归属部门"
              :data="organizationData"
              :loading="organizationLoading"
              :fieldNames="{
                key: 'id',
                value: 'id',
                title: 'name',
              }"
            />
          </a-form-item>
          <a-form-item label="岗位" field="position_id">
            <a-select
              v-model="formModel.position_id"
              placeholder="请选择岗位"
              allow-clear
              allow-search
              :loading="positionLoading"
            >
              <a-option v-for="item of positionData" :value="item.id">
                {{ item.name }}
              </a-option>
            </a-select>
          </a-form-item>
        </a-row>
        <a-row>
          <a-form-item label="排序" field="sort" initialValue="{1000}">
            <a-input-number
              v-model="formModel.sort"
              placeholder="请输入排序数值"
            />
          </a-form-item>
          <a-form-item label="备注" field="remark">
            <a-textarea v-model="formModel.remark" placeholder="请输入备注" />
          </a-form-item>
        </a-row>
      </a-form>
    </a-card>
  </a-drawer>
</template>
