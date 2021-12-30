<template>
  <div class="cate-ztree">
    <!-- 搜索框 -->
    <div class="search-wrap">
      <a-input
        allow-clear
        :maxlength="20"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="handleInput"
      ></a-input>
    </div>
    <!-- 分类树 -->
    <ul id="treeDemo" ref="treeRef" class="ztree" @mousewheel="scrollChange"></ul>

    <!-- 点击设置图标弹窗 -->
    <GiContentMenu :axis="axis" width="90px" v-model="showContentMenu">
      <Option>
        <OptionItem icon="IconPlusCircle" @click="onAdd">新增</OptionItem>
        <OptionItem icon="IconEdit" @click="onRename" v-if="showRename">重命名</OptionItem>
        <a-popover
          position="right"
          trigger="click"
          :content-style="{ padding: 0, overflow: 'hidden' }"
          :popup-visible="showTreePopover"
          v-if="showMove"
        >
          <OptionItem mode="more" icon="IconExport" @click="onMove"> 移动 </OptionItem>
          <template #content>
            <section style="width: 250px; min-height: 200px; max-height: 500px; overflow: scroll">
              <MoveTree :tree-data="treeData" @node-click="moveTreeNodeClick"></MoveTree>
            </section>
          </template>
        </a-popover>
        <OptionItem icon="IconDelete" @click="onDelete" v-if="showDelete">删除</OptionItem>
      </Option>
    </GiContentMenu>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import { Modal } from '@arco-design/web-vue'
import GiContentMenu from '@/components/GiContentMenu.vue'
import MoveTree from './MoveTree.vue'
import Option from './Option.vue'
import OptionItem from './OptionItem.vue'
import { getNewNodeName } from './function'
import { Axis } from './type'
import { data } from './tree'
const props = defineProps({
  // 分类树: 2表单、3任务、4计量单位、5原子指标、6时间周期、7维度、8查询模板设计、101任务实例、 103指标数据查看
  type: {
    type: Number,
    default: 1
  },
  // 占位符
  placeholder: {
    type: String,
    default: '请输入关键词'
  },
  // 是否允许编辑-增删改移
  allowEdit: {
    type: Boolean,
    default: true
  }
})

let showLoading = ref(false)
let showContentMenu = ref(false)
let showTreePopover = ref(false)
let inputValue = ref('')
let treeData = ref([])
let treeSetting = reactive({
  callback: {
    // 鼠标右键事件
    onRightClick: (event, treeId, treeNode) => {
      console.log('鼠标右键', treeNode)
      if (!treeNode || !props.allowEdit) return
      axis.x = event.clientX
      axis.y = event.clientY
      currentNode = treeNode
      showContentMenu.value = true
    },
    // 点击节点
    onClick: (event, treeId, treeNode) => {
      handleNodeClick(event, treeId, treeNode)
    }
  }
})
let treeObj = reactive({})
let currentNode = reactive({})
// GiContentMenu组件坐标轴
const axis = reactive<Axis>({
  x: 0,
  y: 0
})

const emit = defineEmits(['node-click'])
const handleNodeClick = (event, treeId, treeNode) => {
  currentNode = treeNode
  emit('node-click')
  console.log('点击节点', treeNode)
}

// onMounted(() => {
//   // 获取指定元素
//   // 添加滚动监听, 该滚动监听了拖拽滚动条
//   // 尾部的 true 最好加上, 我这边测试没加 true, 拖拽滚动条无法监听到滚动, 加上则可以监听到拖拽滚动条滚动回调
//   const treeRef = ref(null)
//   treeRef.addEventListener('scroll', scrollChange, true)
// })

// onBeforeUnmount(() => {
//   // 获取指定元素, 并移除监听
//   const treeRef = ref(null)
//   treeRef.removeEventListener('scroll', scrollChange, true)
// })

// 递归树
const formatTree = (arr: any[]): void => {
  if (!arr.length) return
  function forTree(arr) {
    arr.forEach((item) => {
      if (item.children && item.children.length) {
        item.iconOpen = './static/svgs/files-open.svg'
        item.iconClose = './static/svgs/files-close.svg'
        forTree(item.children)
      } else {
        item.children = null
        item.iconOpen = './static/svgs/files-open.svg'
        item.iconClose = './static/svgs/files-close.svg'
        item.icon = './static/svgs/files-close.svg'
        if (item.type == null) {
          item.icon = './static/svgs/file.svg'
        }
      }
    })
  }
  forTree(arr)
}

// 获取分类树
const getCateTree = async () => {
  try {
    showLoading.value = true
    treeData.value = data
    formatTree(treeData.value)
    showLoading.value = false
    nextTick(() => {
      treeObj = $.fn.zTree.init($('#treeDemo'), treeSetting, treeData.value)
      treeObj.expandAll(true)
      showLoading.value = false
    })
  } catch (error) {
    showLoading.value = false
  }
}

getCateTree()

const scrollChange = () => {
  showContentMenu.value = false
}

watch(showContentMenu, (newVal) => {
  if (!newVal) {
    showTreePopover.value = false
  }
})

let showRename = computed(() => {
  return true
})
let showMove = computed(() => {
  return true
})
let showDelete = computed(() => {
  return true
})

// 新增
const onAdd = () => {
  showContentMenu.value = false
  let childrens: any[] = currentNode.children
  let name = '新建分类1'
  if (childrens && childrens.length) {
    let arr: string[] = childrens.map((i) => i.name)
    name = getNewNodeName(arr, '新建分类')
  }
  let id: string = new Date().getTime().toString()
  let newChildrenNode = {
    id: id,
    name: name,
    children: null,
    iconOpen: './static/svgs/files-open.svg',
    iconClose: './static/svgs/files-close.svg',
    icon: './static/svgs/files-close.svg',
    isParent: false
  }
  treeObj.addNodes(currentNode, newChildrenNode, true)
  let nodes = treeObj.getNodesByParam('id', id, null)
  setTimeout(() => {
    treeObj.editName(nodes[0])
  }, 100)
}

// 重命名
const onRename = () => {
  showContentMenu.value = false
  treeObj.editName(currentNode)
}

// 移动
const onMove = () => {
  showTreePopover.value = !showTreePopover.value
}

// 点击移动树节点
const moveTreeNodeClick = () => {
  console.log('点击了移动树节点')
}

// 删除
const onDelete = () => {
  Modal.warning({
    title: '提示',
    content: '是否确认删除？',
    hideCancel: false
  })
}

// 搜索-节点过滤
const nodeFilter = (node, nameSearch) => {
  let flag = false
  if (node.name.indexOf(nameSearch) > -1) {
    flag = true
  }
  if (node.children) {
    let cNodes = node.children
    for (let i = 0; i < cNodes.length; i++) {
      let cNode = cNodes[i]
      if (nodeFilter(cNode, nameSearch)) {
        flag = true
      } else {
        cNodes.splice(i--, 1)
      }
    }
  }
  return flag
}

// 搜索-搜索框值改变触发
const handleInput = () => {
  let value = inputValue.value
  console.log('value', value)
  if (!value) {
    treeObj = $.fn.zTree.init($('#treeDemo'), treeSetting, treeData.value)
    treeObj.expandAll(true)
  } else {
    let arr = JSON.parse(JSON.stringify(treeData.value))
    for (let i = 0; i < arr.length; i++) {
      if (!nodeFilter(arr[i], value)) {
        arr.splice(i--, 1)
      }
    }
    console.log('arr', arr)
    treeObj = $.fn.zTree.init($('#treeDemo'), treeSetting, arr)
    treeObj.expandAll(true)
  }
}
</script>

<style lang="scss">
.ztree li span.button.switch.level0 {
  visibility: hidden;
  width: 1px;
}
.ztree li ul.level0 {
  padding: 0;
  background: none;
}
.ztree li span.button.ico_close {
  background-size: cover !important;
}
.ztree li span.button.ico_open {
  background-size: cover !important;
}
.ztree li span.button.ico_docu {
  background-size: cover !important;
}
.ztree li a {
  text-decoration: none !important;
  border-radius: 2px;
  height: 20px;
  line-height: 20px;
  color: var(--color-text-1);
  padding-left: 2px;
  display: inline-flex;
  align-items: center;
}
.ztree li a:hover {
  background: var(--color-secondary-hover);
}
.ztree li a.curSelectedNode {
  height: 20px;
  border: none;
  color: #fff;
  background: rgb(var(--primary-6));
}
.ztree li a.curSelectedNode_Edit {
  background: none !important;
}
.ztree li a input.rename {
  outline: none;
  height: 18px;
  border-radius: 2px;
  border-color: rgb(var(--primary-6));
  padding-left: 4px;
}
.ztree li span.button.switch {
  height: 22px;
}
.ztree li span.button.center_open {
  background-position: -92px -16px;
}
.ztree li span.button.center_close {
  background-position: -74px -16px;
}
.ztree li span.button.bottom_open {
  background-position: -92px -34px;
}
.ztree li span.button.bottom_close {
  background-position: -74px -34px;
}
</style>

<style lang="scss" scoped>
.ztree {
  flex: 1;
  overflow: scroll;
}
.cate-ztree {
  flex: 1;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  .search-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
}
</style>
