<template>
  <div class="cate-ztree">
    <!-- 搜索框 -->
    <div class="search-wrap">
      <a-input allow-clear :maxlength="20" :placeholder="placeholder" v-model="inputValue"></a-input>
    </div>
    <!-- 分类树 -->
    <ul id="treeDemo" ref="treeRef" class="ztree" @mousewheel="scrollChange"></ul>

    <!-- 点击设置图标弹窗 -->
    <!-- <GiContentMenu :axis="axis" width="90px" v-model="showContentMenu">
      <div class="option-popup">
        <div class="item" @click="onAdd"><i class="el-icon-plus"></i> 新增</div>
        <div class="item" @click="onRename" v-if="showRename"><i class="el-icon-edit"></i> 重命名</div>
        <el-popover
          placement="right"
          width="auto"
          trigger="manual"
          popper-class="move-tree-popup"
          v-model="showTreePopover"
          v-if="showMove"
        >
          <section style="width: 250px; height: 500px; overflow: scroll">
            <el-tree
              style="width: fit-content; min-width: 240px"
              node-key="id"
              default-expand-all
              :data="treeData"
              :props="{ label: 'name' }"
              @node-click="onMove"
            ></el-tree>
          </section>
          <div class="item move" slot="reference" @click="showTreePopover = !showTreePopover">
            <section><i class="el-icon-circle-plus-outline"></i> 移动</section>
            <i class="el-icon-arrow-right"></i>
          </div>
        </el-popover>
        <div class="item" @click="onDelete" v-if="showDelete"><i class="el-icon-delete"></i> 删除</div>
      </div>
    </GiContentMenu> -->
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, nextTick } from 'vue'
// import GiContentMenu from '@/components/GiContentMenu.vue'
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
let treeSetting = reactive({})
let treeObj = reactive({})
let currentNode = reactive({})
// GiContentMenu组件坐标轴
const axis = reactive({
  x: 0,
  y: 0
})

// 递归树
const formatTree = (arr: any[]) => {
  if (!arr.length) return
  function forTree(arr) {
    arr.forEach((item) => {
      if (item.children && item.children.length) {
        item.iconOpen = './static/svgs/file-open.svg'
        item.iconClose = './static/svgs/file-close.svg'
        forTree(item.children)
      } else {
        item.children = null
        item.iconOpen = './static/svgs/file-open.svg'
        item.iconClose = './static/svgs/file-close.svg'
        item.icon = './static/svgs/file-close.svg'
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

const scrollChange = () => {}

// export default {
//   data() {
//     return {
//       showLoading: false,
//       showContentMenu: false,
//       showTreePopover: false, // 移动树弹窗
//       inputValue: '', // 搜索框
//       // GiContentMenu组件坐标轴
//       axis: {
//         x: 0,
//         y: 0
//       },
//       currentNode: {}, // 当前节点
//       treeObj: null,
//       treeData: [],
//       treeSetting: {
//         view: {
//           dblClickExpand: (treeId, treeNode) => treeNode.level > 0 // 取消默认双击展开父节点的功能
//         },
//         callback: {
//           // 鼠标右键事件
//           onRightClick: (event, treeId, treeNode) => {
//             // console.log('event', event)
//             // console.log('treeId', treeId)
//             // console.log('treeNode', treeNode)
//             if (!treeNode) return
//             if (!this.showSetting || !this.allowEdit) return
//             if (this.type == 101) return
//             // if (type == 2 && data.id == 'root') return false
//             // if (type == 3 && data.id == 'root') return false
//             // return type != 101 && !(type == 2 && data.id == 'root') && !(type == 3 && data.id == 'root')
//             this.axis.x = event.clientX
//             this.axis.y = event.clientY
//             this.currentNode = treeNode
//             this.showContentMenu = true
//           },
//           // 重命名之前
//           beforeRename: async (treeId, treeNode, newName, isCancel) => {
//             // console.log('treeNode1', treeNode.name)
//             // console.log('newName', newName)
//             // console.log('isCancel', isCancel)
//             let oldName = treeNode.name
//             if (treeNode.name === newName) {
//               return false
//             }
//             if (!newName) {
//               this.$message.error('重命名不能为空')
//               return false
//             }
//             let flag = await this.handleRename(treeNode, newName)
//             if (!flag) {
//               treeNode.name = oldName
//               this.treeObj.updateNode(treeNode)
//               return false
//             }
//           },
//           // 点击节点
//           onClick: (event, treeId, treeNode) => {
//             this.handleNodeClick(event, treeId, treeNode)
//           }
//         }
//       }
//     }
//   },
//   computed: {
//     showRename() {
//       return this.currentNode.type && this.currentNode.type != 1
//     },
//     showMove() {
//       return this.currentNode.type && this.currentNode.type != 1
//     },
//     showDelete() {
//       return this.currentNode.type && this.currentNode.type != 1
//     }
//   },
//   watch: {
//     // 如果监听到菜单弹窗ContentMenu关闭, 那么也关闭移动树弹窗Popover
//     showContentMenu(val) {
//       if (!val) {
//         this.showTreePopover = val
//       }
//     }
//   },
//   created() {
//     this.getCateTree()
//   },
//   mounted() {
//     // 获取指定元素
//     // 添加滚动监听, 该滚动监听了拖拽滚动条
//     // 尾部的 true 最好加上, 我这边测试没加 true, 拖拽滚动条无法监听到滚动, 加上则可以监听到拖拽滚动条滚动回调
//     const scrollview = this.$refs['treeRef']
//     scrollview.addEventListener('scroll', this.scrollChange, true)
//   },
//   beforeDestroy() {
//     // 获取指定元素, 并移除监听
//     const scrollview = this.$refs['treeRef']
//     scrollview.removeEventListener('scroll', this.scrollChange, true)
//   },
//   methods: {
//     // 滚动居中
//     onScrollToCenter(elementId) {
//       this.$nextTick(() => {
//         const parent = this.$refs['treeRef']
//         const { clientHeight, scrollTop } = parent
//         let top1 = parent.getBoundingClientRect().top
//         let el = document.getElementById(elementId)
//         let top2 = el.getBoundingClientRect().top
//         let y = top2 - (top1 + clientHeight / 2) + 10
//         parent.scrollTo({ top: scrollTop + y, behavior: 'smooth' })
//       })
//     },
//     // 如果监听到鼠标滚动事件，关闭菜单弹窗
//     scrollChange() {
//       this.showContentMenu = false
//     },
//     // 节点点击事件
//     async handleNodeClick(event, treeId, treeNode) {
//       console.log('点击节点', treeNode)
//       this.currentNode = treeNode
//       this.$emit('click', treeNode)
//       this.$emit('node-click', treeNode)
//       this.onScrollToCenter(treeNode.tId)
//       // if (this.type == 5 || this.type == 101) {
//       //   // 这个判断能不能新增
//       //   try {
//       //     const res = await this.$http.haveCataLogPermission({ id: treeNode.id, type: this.type })
//       //     if (res.success) {
//       //       this.$emit('permission', res.data)
//       //     } else {
//       //       this.$emit('permission', false)
//       //     }
//       //   } catch (error) {
//       //     return error
//       //   }
//       // }
//     },
//     // 设置选中/高亮
//     setCurrentKey(id) {
//       let nodes = this.treeObj.getNodesByParam('id', id, null)
//       this.onScrollToCenter(nodes[0].tId)
//       this.currentNode = nodes[0]
//       setTimeout(() => {
//         this.treeObj.selectNode(nodes[0])
//       }, 300)
//     },
//     // 递归树
//     formatTree(arr) {
//       if (!arr.length) return
//       function forTree(arr) {
//         arr.forEach((item) => {
//           if (item.children && item.children.length) {
//             item.iconOpen = './static/svgs/file-open.svg'
//             item.iconClose = './static/svgs/file-close.svg'
//             forTree(item.children)
//           } else {
//             item.children = null
//             item.iconOpen = './static/svgs/file-open.svg'
//             item.iconClose = './static/svgs/file-close.svg'
//             item.icon = './static/svgs/file-close.svg'
//           }
//         })
//       }
//       forTree(arr)
//     },
//     // 获取分类树
//     async getCateTree() {
//       try {
//         this.showLoading = true
//         const res = await this.$http.getCataLogTree({ type: this.type, name: '工业' })
//         this.treeData = res.data
//         this.formatTree(this.treeData)
//         this.showLoading = false
//         this.$nextTick(() => {
//           this.treeObj = $.fn.zTree.init($('#treeDemo'), this.treeSetting, this.treeData)
//           this.treeObj.expandAll(true)
//           this.showLoading = false
//         })
//       } catch (error) {
//         this.showLoading = false
//       }
//     },
//     // 节点默认命名, 包含新建分类
//     // 如果同一个父节点，子节点存在['新建分类1', '新建分类4'], 那么在当前父节点新增一个子节点, 那么新增节点应为 '新建分类2'
//     // 如果同一个父节点，子节点存在['新建分类2', '新建分类3'], 那么在当前父节点新增一个子节点, 那么新增节点应为 '新建分类1'
//     // 该方法就是获取新建分类后面的数字
//     getNewNodeName(arr, name = '新建分类') {
//       let num = 0
//       for (let i = 0; i < arr.length + 1; i++) {
//         if (arr.includes(`${name}${i + 1}`)) {
//           continue
//         } else {
//           num = i + 1
//           break
//         }
//       }
//       return `${name}${num}`
//     },
//     // 新增
//     async onAdd() {
//       try {
//         this.showContentMenu = false
//         let childrens = this.currentNode.children
//         let name = '新建分类1'
//         if (childrens && childrens.length) {
//           let arr = childrens.map((i) => i.name)
//           name = this.getNewNodeName(arr, '新建分类')
//         }
//         const res = await this.$http.saveCataLog({
//           id: '',
//           name: name,
//           pid: this.currentNode.id,
//           type: this.currentNode.type
//         })
//         if (res.success) {
//           let newChildrenNode = {
//             ...res.data,
//             children: null,
//             iconOpen: './static/svgs/file-open.svg',
//             iconClose: './static/svgs/file-close.svg',
//             icon: './static/svgs/file-close.svg',
//             isParent: false
//           }
//           this.treeObj.addNodes(this.currentNode, newChildrenNode, true)
//           let nodes = this.treeObj.getNodesByParam('id', res.data.id, null)
//           setTimeout(() => {
//             this.treeObj.editName(nodes[0])
//           }, 100)
//         }
//       } catch (error) {
//         return error
//       }
//     },
//     // 重命名
//     onRename() {
//       this.treeObj.editName(this.currentNode)
//       this.showContentMenu = false
//     },
//     // 重命名接口调用
//     async handleRename(treeNode, newName) {
//       try {
//         const res = await this.$http.saveCataLog({
//           id: treeNode.id,
//           name: newName,
//           pid: treeNode.pid,
//           type: treeNode.type
//         })
//         return res.success
//       } catch (error) {
//         return error
//       }
//     },
//     // 移动
//     async onMove(data) {
//       try {
//         if (this.currentNode.id === data.id) return this.$message.warning('不能移动到该目录下')
//         const res = await this.$http.saveCataLog({
//           id: this.currentNode.id,
//           pid: data.id,
//           name: this.currentNode.name,
//           type: this.currentNode.type
//         })
//         if (res.success) {
//           this.showContentMenu = false
//           this.showTreePopover = false
//           this.$message.success('移动成功！')
//           this.getCateTree()
//         }
//       } catch (error) {
//         return error
//       }
//     },
//     // 删除
//     async onDelete() {
//       try {
//         this.showContentMenu = false
//         let str = ''
//         if (this.currentNode.children && this.currentNode.children.length) {
//           str = `${this.currentNode.name}-分类下的子类和数据也将被删除，请确认?`
//         } else {
//           str = `${this.currentNode.name}分类-将被删除，请确认?`
//         }
//         const result = await this.$confirm(str, '温馨提示', {
//           confirmButtonText: '确定',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).catch((err) => err)
//         if (result !== 'confirm') return
//         const res = await this.$http.deleteCataLog({ id: this.currentNode.id })
//         if (res.success) {
//           this.treeObj.removeNode(this.currentNode)
//           this.$message.success('删除成功！')
//         }
//       } catch (error) {
//         return error
//       }
//     }
//   }
// }
//
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
.option-popup {
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  height: 100%;
  background: #fff;
  .item {
    padding: 0 5px 0 8px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    user-select: none;
    &:hover {
      color: #409eff;
      background: #ebf3fe;
    }
    &.move {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}

.move-tree-popup {
  padding: 0;
  border-radius: 4px;
  .el-tree-node__label {
    font-size: 12px;
  }
}
</style>

<style lang="scss" scoped>
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
    i {
      color: #409eff;
      font-size: 18px;
      cursor: pointer;
      margin-left: 5px;
    }
  }
  .ztree {
    flex: 1;
    overflow: scroll;
    li {
      a {
        &:hover {
          background: #f6f6f6 !important;
        }
      }
    }
  }
}
</style>
