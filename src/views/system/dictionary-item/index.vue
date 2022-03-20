<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useRequest } from 'vue-request';
  import { Message, Modal } from '@arco-design/web-vue';
  import useState from '@/hooks/useState';
  import useTimeFormat from '@/hooks/useTimeFormat';
  import SearchForm from './components/search-form.vue';
  import OperatorButton from './components/operator-button.vue';
  import MutationDrawer from './components/mutation-drawer.vue';
  import { Columns } from './columns';
  import { calCurrent } from '@/utils/pagination';
  import * as DictionaryItemService from './service';
  import {
    DictionaryItemParams,
    DictionaryItemRecord,
    DictionaryItemRequest,
  } from './data.d';
  import { DictionaryRecord } from '../dictionary/data.d';
  import SystemStatusTag from '@/components/system-status-tag/index.vue';
  // Props
  const props = defineProps<{
    record: Partial<DictionaryRecord>;
  }>();
  const { state: visible, setState: setVisible } = useState(false);
  const { state: formParams, setState: setFormParams } = useState<
    Partial<DictionaryItemParams>
  >({});
  const { state: currentRecord, setState: setCurrentRecord } = useState<
    Partial<DictionaryItemRecord>
  >({});
  const mutationRef = ref();
  // 请求分页
  const {
    data: tableData,
    loading: tableLoading,
    refresh: refreshQuery,
  } = useRequest(() => DictionaryItemService.query(formParams.value), {
    manual: true,
  });
  watch(formParams, refreshQuery);
  // 搜索
  const onSearch = (params: Partial<DictionaryItemParams>) =>
    setFormParams({
      ...params,
      dictionary_code: formParams.value.dictionary_code,
    });
  // 新建
  const onCreate = () => {
    setCurrentRecord({
      sort: 1000,
      dictionary_code: props.record.code,
    });
    mutationRef.value?.openDrawer();
  };
  // 删除
  const { run: deleteMutation } = useRequest(
    (req: Partial<DictionaryItemRequest>) => DictionaryItemService.remove(req),
    {
      manual: true,
      onBefore: () => Message.loading(`正在删除数据中...`),
      onSuccess: () => {
        Message.clear();
        Message.success(`删除成功!`);
      },
      onError: () => {
        Message.clear();
        Message.error(`删除失败!`);
      },
      onAfter: () => {
        // 解决分页最后一行删除返回上一页
        const current = calCurrent(
          tableData.value?.current,
          tableData.value?.pageSize,
          tableData.value?.total
        );
        // 保留原有请求参数，覆盖current
        // 触发formParams更新，重新请求
        setFormParams({ ...formParams.value, current });
      },
    }
  );
  const onDelete = (record: Partial<DictionaryItemRecord>) => {
    Modal.confirm({
      title: '确认删除当前所选字典?',
      content: `删除后，${record.label}将被清空，且无法恢复`,
      okButtonProps: { status: 'danger' },
      onOk: () => deleteMutation(record),
    });
  };
  // 修改
  const onModify = (record: Partial<DictionaryItemRecord>) => {
    setCurrentRecord(record);
    mutationRef.value?.openDrawer();
  };
  // 分页
  const onPageChange = (current: number) => {
    setFormParams({ ...formParams.value, current });
  };

  // drawer 操作
  const openDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);
  // 开启后
  const afterOpen = () => setFormParams({ dictionary_code: props.record.code });

  defineExpose({ openDrawer });
</script>

<template>
  <a-drawer
    :visible="visible"
    @open="afterOpen"
    @cancel="closeDrawer"
    width="45%"
    :unmountOnClose="true"
    :title="props.record.name"
    :footer="false"
  >
    <a-card :bordered="false">
      <SearchForm @onSearch="onSearch" />
      <OperatorButton @onCreate="onCreate" />
      <a-table
        row-key="id"
        :columns="Columns"
        :data="tableData?.list"
        :loading="tableLoading"
        @pageChange="onPageChange"
        :pagination="{
          showTotal: true,
          pageSize: tableData?.pageSize,
          current: tableData?.current,
          total: tableData?.total,
        }"
      >
        <template #status="{ record }">
          <SystemStatusTag :code="record.code" :status="record.status" />
        </template>
        <template #updated_at="{ record }">
          {{ useTimeFormat(record.updated_at) }}
        </template>
        <template #operations="{ record }">
          <a-space :size="0">
            <a-button type="text" size="small" @click="onModify(record)">
              <template #default>修改</template>
            </a-button>
            <a-button
              type="text"
              size="small"
              status="danger"
              @click="onDelete(record)"
            >
              <template #default>删除</template>
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <MutationDrawer
      ref="mutationRef"
      :record="currentRecord"
      @onMutations="refreshQuery"
    />
  </a-drawer>
</template>

<style scoped lang="less">
  :deep(.arco-table-th) {
    &:last-child {
      .arco-table-th-item-title {
        margin-left: 16px;
      }
    }
  }
</style>
