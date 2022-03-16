<script setup lang="ts"></script>

<template>
  <a-row style="margin-bottom: 16px">
    <a-col :span="16">
      <slot name="leftButtons" />
    </a-col>
    <a-col :span="8" style="text-align: right">
      <slot name="rightButtons" />
    </a-col>
  </a-row>
</template>
