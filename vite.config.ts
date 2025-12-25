import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { ArcoResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'
import vitePluginCompression from 'vite-plugin-compression'
import { viteMockServe } from 'vite-plugin-mock'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import VueDevTools from 'vite-plugin-vue-devtools'

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
      VueDevTools(),
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
        dts: 'src/components.d.ts',
        // Arco Design Vue 按需导入配置（使用官方推荐的 ArcoResolver）
        resolvers: [
          ArcoResolver({
            sideEffect: false
          })
        ]
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
      }),
      // Gzip 压缩配置
      vitePluginCompression({
        verbose: true, // 是否在控制台输出压缩结果
        disable: false, // 是否禁用压缩
        deleteOriginFile: false, // 压缩后是否删除原文件
        threshold: 10240, // 压缩阈值，单位：字节，超过此大小的文件才会被压缩（10KB）
        algorithm: 'gzip', // 压缩算法，可选 'gzip' | 'brotliCompress' | 'deflate' | 'deflateRaw'
        ext: '.gz', // 压缩文件扩展名
        filter: /\.(js|mjs|json|css|html|svg|ico|eot|otf|ttf|ttc|woff|woff2)$/i // 需要压缩的文件类型
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
           * @description 3. 优化代码分割，提升首次加载速度和路由切换速度
           */
          manualChunks: (id) => {
            // node_modules 中的依赖
            if (id.includes('node_modules')) {
              // Vue 核心库
              if (id.includes('vue') || id.includes('vue-router') || id.includes('pinia')) {
                return 'vue-vendor'
              }
              // Arco Design UI 库
              if (id.includes('@arco-design')) {
                return 'arco-vendor'
              }
              // 工具库
              if (id.includes('lodash-es') || id.includes('xe-utils') || id.includes('dayjs')) {
                return 'utils-vendor'
              }
              // 其他第三方库
              return 'vendor'
            }
            // views 目录下的组件按目录分割，提升路由切换速度
            if (id.includes('/src/views/')) {
              const match = id.match(/\/src\/views\/([^/]+)/)
              if (match) {
                return `views-${match[1]}`
              }
            }
          },
          // 优化 chunk 文件命名
          chunkFileNames: (chunkInfo) => {
            const facadeModuleId = chunkInfo.facadeModuleId
              ? chunkInfo.facadeModuleId.split('/').pop()?.replace('.vue', '')
              : 'chunk'
            return `js/${facadeModuleId}-[hash].js`
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
