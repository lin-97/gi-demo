import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd()) as ImportMetaEnv

  return {
    // 开发或生产环境服务的公共基础路径
    base: env.VITE_BASE,
    // 路径别名
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // 引入sass全局样式变量
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/var.scss" as *;`
        }
      }
    },
    server: {
      // 服务启动时是否自动打开浏览器
      open: false,
      // 本地跨域代理 -> 代理到服务器的接口地址
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL, // 后台服务器地址
          changeOrigin: true, // 是否允许不同源
          secure: false, // 支持https
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        // 自动导入vue相关函数，如: ref、reactive、toRef等
        imports: ['vue', 'vue-router', {
          // vue 3.5.x
          vue: ['useTemplateRef', 'onWatcherCleanup', 'useId']
        }],
        dts: 'src/auto-import.d.ts'
      }),
      Components({
        // 指定组件位置，默认是 src/components 自动导入自定义组件
        dirs: ['src/components/Gi*'],
        extensions: ['vue', 'tsx'],
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
        mockPath: 'mock', // 目录位置
        logger: true, //  是否在控制台显示请求日志
        supportTs: true, // 是否读取ts文件模块
        localEnabled: true, // 设置是否启用本地mock文件
        prodEnabled: true, // 设置打包是否启用mock功能
        // 这样可以控制关闭mock的时候不让mock打包到最终代码内
        injectCode: `
          import { setupProdMockServer } from '../mock/index';
          setupProdMockServer();
        `
      })
    ],
    // 构建
    build: {
      chunkSizeWarningLimit: 2000, // 消除打包大小超过500kb警告
      rollupOptions: {
        output: {
          /**
           * @name 分块策略
           * @description 1. 注意这些包名必须存在，否则打包会报错
           * @description 2. 如果你不想自定义 chunk 分割策略，可以直接移除这段配置
           */
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia'],
            arco: ['@arco-design/web-vue']
          }
        }
      }
    },
    // 混淆器
    esbuild:
      mode === 'development'
        ? undefined
        : {
          // 打包构建时移除 console.log
          pure: ['console.log'],
          // 打包构建时移除 debugger
          drop: ['debugger'],
          // 打包构建时移除所有注释
          legalComments: 'none'
        }
  }
})
