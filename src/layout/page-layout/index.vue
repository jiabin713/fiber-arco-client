<script setup lang="ts">
import { computed } from 'vue';
import LayoutNavbar from './components/layout-navbar/index.vue';
import LayoutMenu from './components/layout-menu/index.vue';
import LayoutFooter from './components/layout-footer/index.vue';
import useCollapsed from '@/hooks/useCollapsed';

const { collapsed, toggle } = useCollapsed(false);
const menuWidth = computed(() => {
  return collapsed.value ? 48 : 220;
});
const paddingStyle = computed(() => {
  const paddingLeft = { paddingLeft: `${menuWidth.value}px` };
  const paddingTop = { paddingTop: '60px' };
  return { ...paddingLeft, ...paddingTop };
});
</script>
<template>
  <a-layout class="layout">
    <a-layout-header class="layout-navbar">
      <LayoutNavbar />
    </a-layout-header>
    <a-layout>
      <a-layout-sider
        class="layout-sider"
        :breakpoint="'xl'"
        :collapsible="true"
        :width="menuWidth"
        :style="{ paddingTop: '60px' }"
        :hide-trigger="false"
        @collapse="toggle"
      >
        <div class="menu-wrapper">
          <LayoutMenu />
        </div>
      </a-layout-sider>
      <a-layout class="layout-content" :style="paddingStyle">
        <a-layout-content>
          <router-view />
        </a-layout-content>
        <LayoutFooter />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped lang="less">
@nav-size-height: 60px;
@layout-max-width: 1100px;
.layout {
  width: 100%;
  height: 100%;
}
.layout-navbar {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  min-width: @layout-max-width;
  height: @nav-size-height;
}
.layout-sider {
  position: fixed;
  z-index: 99;
  height: 100%;
  &::after {
    position: absolute;
    top: 0;
    right: -1px;
    display: block;
    width: 1px;
    height: 100%;
    background-color: var(--color-border);
    content: '';
  }
  > :deep(.arco-layout-sider-children) {
    overflow-y: hidden;
  }
}
.menu-wrapper {
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  :deep(.arco-menu) {
    ::-webkit-scrollbar {
      width: 12px;
      height: 4px;
    }
    ::-webkit-scrollbar-thumb {
      border: 4px solid transparent;
      background-clip: padding-box;
      border-radius: 7px;
      background-color: var(--color-text-4);
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-text-3);
    }
  }
}
.layout-content {
  min-width: @layout-max-width;
  min-height: 100vh;
  overflow-y: hidden;
  background-color: var(--color-fill-2);
  transition: padding-left 0.2s;
}
</style>
