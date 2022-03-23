import { FieldRule } from '@arco-design/web-vue/es/form/interface';

const Rules: Record<string, FieldRule | FieldRule[]> = {
  label: [
    { required: true, message: '字典名称为必填项' },
    { minLength: 2, message: '字典名称至少需要2个字符' },
    { maxLength: 32, message: '字典名称最多只能32个字符' },
  ],
  value: [
    { required: true, message: '字典编码为必填项' },
    { minLength: 2, message: '字典编码至少需要2个字符' },
    { maxLength: 32, message: '字典编码最多只能32个字符' },
  ],
  status: [{ required: true, message: '状态为必选项' }],
  sort: [
    { required: true, message: '排序为必填项' },
    { positive: true, message: '排序为正整数' },
  ],
};

export default Rules;
