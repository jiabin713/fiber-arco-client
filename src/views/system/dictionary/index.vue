<script setup lang="ts">
  import { ref } from 'vue';
  import { useRequest } from 'vue-request';
  import { Message, Modal } from '@arco-design/web-vue';
  import PageContainer from '@/components/page-container/index.vue';
  import useState from '@/hooks/useState';
  import useTimeFormat from '@/hooks/useTimeFormat';
  import SearchForm from './components/search-form.vue';
  import OperatorButton from './components/operator-button.vue';
  import MutationDrawer from './components/mutation-drawer.vue';
  import { Columns } from './columns';
  import { paginationUtil } from '@/utils/pagination';
  import * as DictionaryService from './service';
  import {
    DictionaryParams,
    DictionaryRecord,
    DictionaryRequest,
  } from './data.d';

  const { state: formParams, setState: setFormParams } = useState<
    Partial<DictionaryParams>
  >({});
  const { state: currentRecord, setState: setCurrentRecord } = useState<
    Partial<DictionaryRecord>
  >({});
  const mutationRef = ref();
  // 请求分页
  const {
    data: tableData,
    loading: tableLoading,
    reload: reloadQuery,
  } = useRequest(() => DictionaryService.query(formParams.value), {
    refreshDeps: [formParams],
  });
  // 搜索
  const onSearch = (params: Partial<DictionaryParams>) =>
    setFormParams({ ...params });
  // 新建
  const onCreate = () => {
    setCurrentRecord({ sort: 1000 });
    mutationRef.value?.openDrawer();
  };
  // 删除
  const { run: deleteMutation } = useRequest(
    (req: Partial<DictionaryRequest>) => DictionaryService.remove(req),
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
        const current = paginationUtil(
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
  const onDelete = (record: Partial<DictionaryRecord>) => {
    Modal.confirm({
      title: '确认删除当前所选字典?',
      content: `删除后，${record.name}将被清空，且无法恢复`,
      okButtonProps: { status: 'danger' },
      onOk: () => deleteMutation(record),
    });
  };
  // 修改
  const onModify = (record: Partial<DictionaryRecord>) => {
    setCurrentRecord(record);
    mutationRef.value?.openDrawer();
  };
  // 分页
  const onPageChange = (current: number) => {
    setFormParams({ ...formParams.value, current });
  };
</script>

<template>
  <PageContainer>
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
        <template #status="{ record }"></template>
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
      @onMutations="reloadQuery"
    />
  </PageContainer>
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
