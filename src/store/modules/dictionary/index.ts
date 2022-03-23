import * as DictionaryItemService from '@/views/system/dictionary-item/service';

import { computed, ref } from 'vue';
import { set, useAsyncState } from '@vueuse/core';

import { DictionaryItemRecord } from '@/views/system/dictionary-item/data.d';
import { SystemStatus } from '@/global/constants';
import { defineStore } from 'pinia';

// 字典获取
// 进入 需要字典数据的时候，读取dictionaryList
// 如果为空，则带type参数请求
// 请求后拼接到dictionaryList
// todo: 考虑 存入sessionStore
// 返回的items就是选项列表

export const useDictionaryStore = defineStore('dictionary', () => {
  // 设定基础状态
  const dictionaryList = ref<DictionaryItemRecord[]>(
    []
    // SystemStatus as DictionaryItemRecord[]
  );

  const selectOptions = (dictionary_code: string = 'system_status') => {
    const items = dictionaryList.value.filter(
      (item) => item.dictionary_code == dictionary_code
    );
    if (items.length == 0) {
      getDictionaryItemsByType(dictionary_code);

      const res = dictionaryList.value.filter(
        (item) => item.dictionary_code == dictionary_code
      );
      console.log(res);

      return res;
    }
    console.log(dictionaryList.value);
    return items;
  };

  const getDictionaryItemsByType = async (type: string) => {
    console.log('我去后台了', type);
    const data = await DictionaryItemService.queryItems(type);

    set(dictionaryList, [...dictionaryList.value, ...data]);
  };

  return { selectOptions };
});

// 转换成selection options 的格式
// const transToSelectOptions = (item: DictionaryItemRecord) => {
//   return {
//     label: item.label,
//     value: item.value,
//     dictionary_code: item.dictionary_code,
//   };
// };
