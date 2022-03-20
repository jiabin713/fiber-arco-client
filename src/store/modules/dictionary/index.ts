import * as DictionaryItemService from '@/views/system/dictionary-item/service';

import { SystemStatus } from '@/global/constants';
import { defineStore } from 'pinia';
import { ref } from 'vue';

// 字典获取
// 进入 需要字典数据的时候，读取dictionaryList
// 如果为空，则带type参数请求
// 请求后拼接到dictionaryList
// todo: 考虑 存入sessionStore
// 返回的items就是选项列表

export const useDictionaryStore = defineStore('dictionary', () => {
  // 设定基础状态
  const dictionaryList = ref(SystemStatus);

  const selectOptions = (dictionary_code: string) => {
    const items = dictionaryList.value.filter(
      (item) => item.dictionary_code == dictionary_code
    );
    if (items.length == 0) {
      getDictionaryItemsByType(dictionary_code);
      return dictionaryList.value.filter(
        (item) => item.dictionary_code == dictionary_code
      );
    }

    return items;
  };

  const getDictionaryItemsByType = async (type: string) => {
    const data = await DictionaryItemService.queryItems(type);
    dictionaryList.value = dictionaryList.value.concat(data);
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
