/**
 * 路由变化监听 Hook
 * @description 使用发布订阅模式管理路由变化，避免重复监听导致的性能问题
 */

import { onUnmounted, ref } from 'vue'
import type { Handler } from 'mitt'
import mitt from 'mitt'
import type { RouteLocationNormalized } from 'vue-router'

// 事件类型定义
type RouteChangeEvent = {
  to: RouteLocationNormalized
  from?: RouteLocationNormalized
}

// 事件键定义
const ROUTE_CHANGE_KEY = Symbol('ROUTE_CHANGE')

// 事件发射器
const emitter = mitt<{
  [ROUTE_CHANGE_KEY]: RouteChangeEvent
}>()

// 最新路由状态
const latestRoute = ref<RouteLocationNormalized | null>(null)

/**
 * 设置路由变化事件
 * @param to 目标路由
 * @param from 来源路由
 */
export function setRouteEmitter(to: RouteLocationNormalized, from?: RouteLocationNormalized) {
  const event: RouteChangeEvent = { to, from }
  emitter.emit(ROUTE_CHANGE_KEY, event)
  latestRoute.value = to
}

/**
 * 路由监听 Hook
 * @returns 路由监听相关方法
 */
export function useRouteListener() {
  // 监听器列表
  const listeners = new Set<Handler<RouteChangeEvent>>()

  /**
   * 监听路由变化
   * @param handler 处理函数
   * @param immediate 是否立即执行
   */
  function listenerRouteChange(
    handler: (event: RouteChangeEvent) => void,
    immediate = true
  ) {
    emitter.on(ROUTE_CHANGE_KEY, handler)
    listeners.add(handler)

    if (immediate && latestRoute.value) {
      handler({ to: latestRoute.value })
    }

    return handler
  }

  /**
   * 移除路由监听器
   * @param handler 要移除的处理函数
   */
  function removeRouteListener(handler?: Handler<RouteChangeEvent>) {
    if (handler) {
      emitter.off(ROUTE_CHANGE_KEY, handler)
      listeners.delete(handler)
    } else {
      // 移除所有监听器
      listeners.forEach((listener) => {
        emitter.off(ROUTE_CHANGE_KEY, listener)
      })
      listeners.clear()
    }
  }

  // 组件卸载时清理
  onUnmounted(() => {
    removeRouteListener()
  })

  return {
    listenerRouteChange,
    removeRouteListener
  }
}
