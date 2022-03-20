import {
  DictionaryParams,
  DictionaryRecord,
  DictionaryRequest,
} from './data.d';

import { PageResponse } from '@/global/data.d';
import qs from 'query-string';
import request from '@/utils/axios/instance';

const URL = '/system/dictionary';

export const query = async (
  params: Partial<DictionaryParams>
): Promise<PageResponse<DictionaryRecord>> => {
  return request.get(URL, {
    params,
    paramsSerializer: (obj: DictionaryParams) => {
      return qs.stringify(obj);
    },
  });
};

export const create = async (data: Partial<DictionaryRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<DictionaryRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<DictionaryRequest>) => {
  return request.delete(URL, { data });
};
