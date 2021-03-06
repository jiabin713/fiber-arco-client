export interface DictionaryRecord {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
  updated_at: number;
  updated_by: string;
}

export interface DictionaryParams {
  name: string;
  code: string;
  status: string;
  remark: string;
  current: number;
  pageSize: number;
  total: number;
}

export interface DictionaryRequest {
  id: string;
  name: string;
  code: string;
  status: string;
  sort: number;
  remark: string;
}
