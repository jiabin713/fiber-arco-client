<script setup lang="ts">
import useVisible from '@/hooks/useVisible';

const { visible } = useVisible(false);
const onOk = () => {};
const onCancel = () => {};
</script>

<template>
  <a-drawer
    :visible="visible"
    @ok="onOk"
    @cancel="onCancel"
    unmountOnClose
    width="33%"
  >
    <a-card :bordered="false">
      <a-form layout="vertical">
        <a-form-item label="字典名称" field="name">
          <a-input placeholder="请输入名称" />
        </a-form-item>
        <a-form-item label="字典编码" field="code">
          <a-input placeholder="请输入编码" />
        </a-form-item>
        <a-form-item label="状态" field="status" initialValue="{1}">
          <!-- <Select placeholder="请选择状态">
              <Select.Option value={1}>正常</Select.Option>
              <Select.Option value={2}>关闭</Select.Option>
                </Select>-->
        </a-form-item>
        <a-form-item label="排序" field="sort" initialValue="{1000}">
          <a-input-number placeholder="请输入排序数值" />
        </a-form-item>
        <a-form-item label="备注" field="remark">
          <a-textarea placeholder="请输入备注" />
        </a-form-item>
      </a-form>
    </a-card>
  </a-drawer>
</template>
