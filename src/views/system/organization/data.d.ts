import { TreeNode } from '@/utils/buildTree';

export interface OrganizationRecord extends TreeNode {
  id: string;
  name: string;
  code: string;
  parent_id: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
  children: OrganizationRecord[];
}

export interface OrganizationParams {
  id: string;
  name: string;
  code: string;
  parent_id: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
  total: number;
}

export interface OrganizationRequest {
  id: string;
  name: string;
  code: string;
  parent_id: string;
  status: string;
  sort: number;
  remark: string;
}
