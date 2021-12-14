import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  // base: './',
  resolve: {
    alias: [
      // '@': path.resolve(__dirname, 'src')
      { find: /^@/, replacement: '/src' }
    ]
  },
  // 引入SASS全局变量/样式
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "@/styles/var.scss";`
      }
    }
  }
  // 构建
  // build: {
  //   // target: 'modules', // 浏览器兼容性  "esnext"|"modules"
  //   // outDir: 'dist' // 输出路径
  //   // assetsDir: 'assets', // 生成静态资源的存放路径
  //   // sourcemap: false // 构建后是否生成 source map 文件
  // }
})
