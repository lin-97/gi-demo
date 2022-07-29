<template>
  <div class="cate-tree">
    <!-- 搜索框 -->
    <div class="search-wrap">
      <a-input
        allow-clear
        :maxlength="20"
        :placeholder="placeholder"
        v-model="inputValue"
        @input="handleInput"
        @clear="handleInput"
      >
        <template #prefix>
          <icon-search />
        </template>
      </a-input>
    </div>
    <!-- 分类树 -->
    <div class="wrap">
      <ul id="treeDemo" ref="treeRef" class="ztree cate-ztree"></ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick, onMounted } from 'vue'
import { Modal } from '@arco-design/web-vue'
import { getNewNodeName } from './fn'
import RightMenu from './RightMenu/index'
import FileOpenIcon from '@/icons/com-file-open.svg'
import FileCloseIcon from '@/icons/com-file-close.svg'
import FileIcon from '@/icons/com-file.svg'

import { getCateTreeData } from '@/apis'
import type { ApiCateTreeNode } from '@/apis'

const props = defineProps({
  // 分类
  type: {
    type: Number,
    default: 1
  },
  // 占位符
  placeholder: {
    type: String,
    default: '请输入关键词'
  }
})

type TreeNode = ZTree.ITreeNode & ApiCateTreeNode

const loading = ref(false)
const inputValue = ref('')
const treeRef = ref<HTMLElement | null>(null)
const treeData = ref<ApiCateTreeNode[]>([])
const treeObj = ref<ZTree.IzTreeObj | null>(null)
const currentNode = ref<TreeNode | null>(null)

const emit = defineEmits(['node-click'])

const handleNodeClick = (event: PointerEvent, treeId: string, treeNode: TreeNode) => {
  console.log('点击节点', treeNode)
  currentNode.value = treeNode
  emit('node-click')
  // onScrollToCenter(treeNode.tId)
}

// 滚动居中
// const onScrollToCenter = (elementId: string) => {
//   nextTick(() => {
//     const parent = treeRef.value
//     console.log('treeRef.value', treeRef.value)
//     const { clientHeight, scrollTop } = parent
//     let top1 = parent.getBoundingClientRect().top
//     let el = document.getElementById(elementId)
//     let top2 = el.getBoundingClientRect().top
//     let y = top2 - (top1 + clientHeight / 2) + 10
//     parent.scrollTo({ top: scrollTop + y, behavior: 'smooth' })
//   })
// }

const treeSetting = reactive({
  callback: {
    // 鼠标右键事件
    onRightClick: (event: PointerEvent, treeId: string, treeNode: TreeNode) => {
      console.log('鼠标右键', treeNode)
      if (!treeNode) return
      currentNode.value = treeNode
      RightMenu(event, treeNode, treeData.value).then((res: any) => {
        console.log('res', res)
        if (res.mode === 'add') {
          onAdd()
        }
        if (res.mode === 'rename') {
          onRename()
        }
        if (res.mode === 'delete') {
          onDelete()
        }
      })
    },
    // 点击节点
    onClick: (event: PointerEvent, treeId: string, treeNode: TreeNode) => {
      handleNodeClick(event, treeId, treeNode)
    }
  }
})

// 递归树
const formatTree = (treeData: TreeNode[]): void => {
  if (!treeData.length) return
  function forTree(arr: TreeNode[]) {
    arr.forEach((item) => {
      if (item.children && item.children.length) {
        item.iconOpen = FileOpenIcon
        item.iconClose = FileCloseIcon
        forTree(item.children)
      } else {
        item.children = null
        item.iconOpen = FileOpenIcon
        item.iconClose = FileCloseIcon
        item.icon = FileCloseIcon
        if (item.type == null) {
          item.icon = FileIcon
        }
      }
    })
  }
  forTree(treeData)
}

// 获取分类树
const getCateTree = async () => {
  try {
    loading.value = true
    const res = await getCateTreeData()
    if (res.success) {
      const data = res.data
      formatTree(data)
      treeData.value = data
      nextTick(() => {
        treeObj.value = $.fn.zTree.init($('#treeDemo'), treeSetting, treeData.value)
        treeObj.value?.expandAll(true)
      })
    }
  } catch (error) {
    return error
  } finally {
    loading.value = false
  }
}

getCateTree()

// 新增
const onAdd = () => {
  const childrens: any[] = currentNode.value?.children || []
  let name = '新建分类1'
  if (childrens && childrens.length) {
    const arr: string[] = childrens.map((i) => i.name)
    name = getNewNodeName(arr, '新建分类')
  }
  const id: string = new Date().getTime().toString()
  const newChildrenNode: TreeNode = {
    id: id,
    name: name,
    children: null,
    iconOpen: FileOpenIcon,
    iconClose: FileCloseIcon,
    icon: FileCloseIcon,
    isParent: false
  }
  treeObj.value?.addNodes(currentNode.value || {}, newChildrenNode, true)
  const nodes: any = treeObj.value?.getNodesByParam('id', id)
  setTimeout(() => {
    treeObj.value?.editName(nodes[0])
  }, 100)
}

// 重命名
const onRename = () => {
  nextTick(() => {
    const nodes: any = treeObj.value?.getNodesByParam('id', currentNode.value?.id)
    treeObj.value?.editName(nodes[0])
  })
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
const nodeFilter = (node: any, nameSearch: string) => {
  let flag = false
  if (node.name.indexOf(nameSearch) > -1) {
    flag = true
  }
  if (node.children) {
    const cNodes = node.children
    for (let i = 0; i < cNodes.length; i++) {
      const cNode = cNodes[i]
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
  if (!value) {
    treeObj.value = $.fn.zTree.init($('#treeDemo'), treeSetting, treeData.value)
    treeObj.value?.expandAll(true)
  } else {
    const arr = JSON.parse(JSON.stringify(treeData.value))
    for (let i = 0; i < arr.length; i++) {
      if (!nodeFilter(arr[i], value)) {
        arr.splice(i--, 1)
      }
    }
    treeObj.value = $.fn.zTree.init($('#treeDemo'), treeSetting, arr)
    treeObj.value?.expandAll(true)
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
  color: rgb(var(--primary-6));
  background-color: var(--color-primary-light-1);
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
.cate-tree {
  flex: 1;
  padding: $padding;
  padding-top: 12px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .search-wrap {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  > .wrap {
    flex: 1;
    overflow: scroll;
    background-color: var(--color-bg-2);
  }
}
</style>
