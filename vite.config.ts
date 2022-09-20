import { fileURLToPath, URL } from 'url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      vueJsx(),
      VueSetupExtend(),
      Components({
        // 指定组件位置, 默认是src/components 自动导入自定义组件
        dirs: ['src/components'],
        extensions: ['vue'],
        // 配置文件生成位置
        dts: 'src/components.d.ts'
      }),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: command === 'serve',
        prodEnabled: command !== 'serve' && true,
        // 这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupProdMockServer } from '../mock/index';
          setupProdMockServer();
        `
      })
    ],
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
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
          target: env.VITE_APP_BASE_URL, // 后台服务器地址
          changeOrigin: true, // 是否允许不同源
          secure: false, // 支持https
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    // 构建
    build: {
      outDir: 'dist', // 指定打包路径，默认为项目根目录下的 dist 目录
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止 Infinity 被压缩成 1/0，这可能会导致 Chrome 上的性能问题
          drop_console: true, // 生产环境去除 console
          drop_debugger: true // 生产环境去除 debugger
        }
      },
      chunkSizeWarningLimit: 1500 // chunk 大小警告的限制（以 kbs 为单位）
    }
  }
})
