import { RoleParams, RoleRecord, RoleRequest } from './data.d';

import { PageResponse } from '@/global/data.d';
import qs from 'query-string';
import request from '@/utils/axios/instance';

const URL = '/system/role';

export const query = async (
  params: Partial<RoleParams>
): Promise<PageResponse<RoleRecord>> => {
  return request.get(URL, {
    params,
    paramsSerializer: (obj: RoleParams) => {
      return qs.stringify(obj);
    },
  });
};

export const create = async (data: Partial<RoleRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<RoleRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<RoleRequest>) => {
  return request.delete(URL, { data });
};
