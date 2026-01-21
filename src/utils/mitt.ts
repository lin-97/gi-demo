import mitt from 'mitt'

type Events = {
  // 自定义事件名称
  changeText: string
}

const mittBus = mitt<Events>()

export default mittBus
