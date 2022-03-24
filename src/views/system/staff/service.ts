import { StaffParams, StaffRecord, StaffRequest } from './data.d';

import { PageResponse } from '@/global/data.d';
import qs from 'query-string';
import request from '@/utils/axios/instance';

const URL = '/system/staff';

export const query = async (
  params: Partial<StaffParams>
): Promise<PageResponse<StaffRecord>> => {
  return request.get(URL, {
    params,
    paramsSerializer: (obj: StaffParams) => {
      return qs.stringify(obj);
    },
  });
};

export const queryRole = async (id: string | undefined): Promise<string[]> => {
  return request.get(`${URL}/role/${id}`);
};

export const create = async (data: Partial<StaffRequest>) => {
  return request.post(URL, data);
};

export const assign = async (data: Partial<StaffRequest>) => {
  return request.post(`${URL}/assign`, data);
};

export const update = async (data: Partial<StaffRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<StaffRequest>) => {
  return request.delete(URL, { data });
};
