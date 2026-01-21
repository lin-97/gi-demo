import path from 'node:path'
import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
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
      },
      // 确保正确解析模块
      dedupe: ['vue', '@arco-design/web-vue']
    },
    // 依赖优化配置
    optimizeDeps: {
      include: ['@arco-design/color']
    },
    // 引入scss全局样式变量
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
          }),
          // Iconify 图标按需导入
          IconsResolver({
            prefix: 'icon',
            enabledCollections: ['icon-park-outline']
          })
        ]
      }),
      // Iconify 图标插件配置
      Icons({
        compiler: 'vue3',
        autoInstall: true,
        defaultClass: 'iconify-icon',
        defaultStyle: 'vertical-align: middle;'
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
      chunkSizeWarningLimit: 2000
    },
    // 生产环境优化
    esbuild:
      mode === 'development'
        ? undefined
        : {
            pure: ['console.log'],
            drop: ['debugger'],
            legalComments: 'none'
          }
  }
})
