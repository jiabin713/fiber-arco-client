import {
  DictionaryItemParams,
  DictionaryItemRecord,
  DictionaryItemRequest,
} from './data.d';

import { PageResponse } from '@/global/data.d';
import qs from 'query-string';
import request from '@/utils/axios/instance';

const URL = '/system/dictionary/item';

export const query = async (
  params: Partial<DictionaryItemParams>
): Promise<PageResponse<DictionaryItemRecord>> => {
  return request.get(URL, {
    params,
    paramsSerializer: (obj: Partial<DictionaryItemParams>) => {
      return qs.stringify(obj);
    },
  });
};

export const create = async (data: Partial<DictionaryItemRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<DictionaryItemRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<DictionaryItemRequest>) => {
  return request.delete(URL, { data });
};

export const queryItems = async (
  dictionary_code: string
): Promise<DictionaryItemRecord[]> => {
  return request.get(`${URL}/code/${dictionary_code}`);
};
