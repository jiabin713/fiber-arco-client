export interface StaffRecord {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  gender: string;
  role_ids: string[];
  organization_id: string;
  position_id: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface StaffParams {
  username: string;
  name: string;
  email: string;
  mobile: string;
  gender: string;
  organization_id: string;
  position_id: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
  total: number;
}

export interface StaffRequest {
  id: string;
  username: string;
  name: string;
  email: string;
  mobile: string;
  avatar: string;
  gender: string;
  role_ids: string[];
  organization_id: string;
  position_id: string;
  status: string;
  sort: number;
  remark: string;
}
