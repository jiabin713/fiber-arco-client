<template>
  <div>
    <a-input-search style="margin-bottom: 1rem" v-model="searchKey" />
    <a-tree
      v-if="treeData"
      :data="treeData"
      :fieldNames="{
        key: 'id',
        title: 'name',
        children: 'children',
      }"
      default-expand-all
      @select="onSelect"
    >
    </a-tree>
  </div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-request';
  import * as OrganizationService from '@/views/system/organization/service';
  import { computed, ref } from 'vue';
  import { OrganizationRecord } from '@/views/system/organization/data';

  const emit = defineEmits<{
    (e: 'onSelect', value: string): void;
  }>();

  const onSelect = (
    selectedKeys: string[],
    event: {
      selected?: boolean;
    }
  ) => emit('onSelect', selectedKeys[0]);

  const searchKey = ref('');
  const treeData = computed(() => {
    if (!searchKey.value) return data.value;
    return searchData(searchKey.value);
  });

  function searchData(keyword: string) {
    const loop = (data: OrganizationRecord[] | undefined) => {
      const result = <OrganizationRecord[]>[];
      data?.forEach((item) => {
        if (item.name.indexOf(keyword) > -1) {
          result.push({ ...item });
        } else if (item.children) {
          const filterData = loop(item.children);
          if (filterData.length) {
            result.push({
              ...item,
              children: filterData,
            });
          }
        }
      });
      return result;
    };

    return loop(data?.value);
  }

  const { data } = useRequest(() => OrganizationService.queryTree({}));
</script>
