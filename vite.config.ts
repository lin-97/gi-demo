import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { svgBuilder } from './src/plugins/svgBuilder'

export default defineConfig({
  plugins: [vue(), vueJsx(), VueSetupExtend(), svgBuilder('./src/icons/')],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base: '/gi-demo/',
  // 引入sass全局样式变量
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/var.scss";`
      }
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://www.fastmock.site/mock/4a6ede552f5ceef195285323eadcfd49',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  }
  // 构建
  // build: {
  //   target: 'modules', // 浏览器兼容性  "esnext"|"modules"
  //   outDir: 'dist', // 输出路径
  //   assetsDir: 'assets', // 生成静态资源的存放路径
  //   sourcemap: false // 构建后是否生成 source map 文件
  // }
})
