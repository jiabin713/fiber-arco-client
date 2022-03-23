import {
  OrganizationParams,
  OrganizationRecord,
  OrganizationRequest,
} from './data.d';

import { PageResponse } from '@/global/data.d';
import qs from 'query-string';
import request from '@/utils/axios/instance';

const URL = '/system/organization';

export const queryTree = async (
  params: Partial<OrganizationParams>
): Promise<OrganizationRecord[]> => {
  return request.get(`${URL}/tree`, {
    params,
    paramsSerializer: (obj: Partial<OrganizationParams>) => {
      return qs.stringify(obj);
    },
  });
};

export const create = async (data: Partial<OrganizationRequest>) => {
  return request.post(URL, data);
};

export const update = async (data: Partial<OrganizationRequest>) => {
  return request.put(URL, data);
};

export const remove = async (data: Partial<OrganizationRequest>) => {
  return request.delete(URL, { data });
};
