import { PositionParams, PositionRecord, PositionRequest } from './data.d';

import { PageResponse } from '@/global/data.d';
import qs from 'query-string';
import request from '@/utils/axios/instance';

const URL = '/system/position';

export const query = async (
  params: Partial<PositionParams>
): Promise<PageResponse<PositionRecord>> => {
  return request.get(URL, {
    params,
    paramsSerializer: (obj: PositionParams) => {
      return qs.stringify(obj);
    },
  });
};

export const queryAll = async (): Promise<PositionRecord[]> => {
  return request.get(`${URL}/all`);
};

export const create = async (data: Partial<PositionRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<PositionRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<PositionRequest>) => {
  return request.delete(URL, { data });
};
