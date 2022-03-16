import { resolve } from 'path';
import { defineConfig } from 'vite';
import vitePluginImp from 'vite-plugin-imp';

import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8080/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        // {
        //   libName: 'lodash',
        //   libDirectory: '',
        //   camel2DashComponentName: false,
        // },
        {
          libName: "@arco-design/web-vue",
          style(name) {
            return `@arco-design/web-vue/es/${name}/style/index.js`;
          },
        },
      ],
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "./src"),
      },
      {
        find: "assets",
        replacement: resolve(__dirname, "./src/assets"),
      },
      {
        find: "vue-i18n",
        replacement: "vue-i18n/dist/vue-i18n.cjs.js", // Resolve the i18n warning issue
      },
      {
        find: "vue",
        replacement: "vue/dist/vue.esm-bundler.js", // compile template
      },
    ],
    extensions: [".ts", ".js", ".tsx", "vue"],
  },
});
