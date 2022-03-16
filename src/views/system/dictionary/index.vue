<script setup lang="ts">
import { reactive, watch } from 'vue';
import dayjs from 'dayjs';
import { useRequest } from 'vue-request';
import PageContainer from '@/components/page-container/index.vue';
import SearchForm from './components/search-form.vue';
import OperatorButton from './components/operator-button.vue';
import MutationDrawer from './components/mutation-drawer.vue';
import { getColumns } from './constants';
import * as DictionaryService from './service';
import { DictionaryParams } from './data.d';

const formParams = reactive<Partial<DictionaryParams>>({});
const {
  data: tableData,
  loading: tableLoading,
  refresh,
} = useRequest(() => DictionaryService.query(formParams));
const onSearch = (params: Partial<DictionaryParams>) => {
  formParams.name = params.name;
  formParams.code = params.code;
  formParams.remark = params.remark;
  formParams.status = params.status;
};
const columns = getColumns();
const onCreate = () => {};
const onDelete = () => {};
const onModify = () => {};
const onPageChange = (current: number) => (formParams.current = current);
watch(formParams, refresh);
</script>

<template>
  <PageContainer>
    <a-card :bordered="false">
      <SearchForm @onSearch="(params) => onSearch(params)" />
      <OperatorButton>
        <template #leftButtons>
          <a-space>
            <a-button type="primary" @click="onCreate">
              <template #icon>
                <icon-plus />
              </template>
              <template #default>新建</template>
            </a-button>
            <a-button status="danger" @click="onDelete">
              <template #icon>
                <icon-minus />
              </template>
              <template #default>删除</template>
            </a-button>
          </a-space>
        </template>
        <template #rightButtons>
          <a-button>
            <template #icon>
              <icon-download />
            </template>
            <template #default>下载</template>
          </a-button>
        </template>
      </OperatorButton>
      <a-table
        row-key="id"
        :columns="columns"
        :data="tableData?.list"
        :loading="tableLoading"
        @page-change="onPageChange"
        :pagination="{
          sizeCanChange: true,
          showTotal: true,
          pageSizeChangeResetCurrent: true,
          pageSize: tableData?.pageSize,
          current: tableData?.current,
          total: tableData?.total,
        }"
      >
        <template #status="{ record }"></template>
        <template #updated_at="{ record }">
          {{ dayjs.unix(record.updated_at).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template #operations="{ record }">
          <a-space :size="0">
            <a-button type="text" size="small" @click="onModify">
              <template #default>修改</template>
            </a-button>
            <a-button
              type="text"
              size="small"
              status="danger"
              @click="onDelete"
            >
              <template #default>删除</template>
            </a-button>
          </a-space>
        </template>
      </a-table>
    </a-card>
    <MutationDrawer />
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
