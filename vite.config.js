import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  // 项目根目录
  // root: process.cwd(),
  // 在生产中服务时的基本公共路径
  base: '/gi-demo/',
  plugins: [vue()],
  resolve: {
    // 设置别名
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  // 引入SASS全局变量/样式
  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
        additionalData: `@import "@/styles/var.scss";`
      }
    }
  },
  // 静态资源服务的文件夹
  // publicDir: 'public',
  // 构建
  build: {
    // target: 'modules', // 浏览器兼容性  "esnext"|"modules"
    // outDir: 'dist' // 输出路径
    // assetsDir: 'assets', // 生成静态资源的存放路径
    // sourcemap: false // 构建后是否生成 source map 文件
  }
})
