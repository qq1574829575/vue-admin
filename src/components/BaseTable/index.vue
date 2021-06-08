<template>
  <div>
    <!--  表格Start  -->
    <el-table
      ref="table"
      size="small"
      :data="tableData"
      :height="tableHeight"
      :lazy="true"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        v-if="showIndex"
        type="index"
        label="序号"
        width="50"
        fixed="left"
        align="center"
      />
      <el-table-column
        v-if="hasSelection"
        type="selection"
        width="55"
        fixed="left"
      />
      <slot :columnConfig="columnConfig" />
    </el-table>
    <!--  表格End  -->
    <!--  分页Start  -->
    <el-pagination
      v-if="paging"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="page"
      :page-size="rows"
      :page-sizes="[rows, 100, 200, 500, 1000]"
      :total="parseInt(tableTotal)"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
    <!--  分页End  -->
  </div>
</template>

<script>
import ExportExcel from '@/excel/ExportExcel'
import request from '@/utils/request'
// 引入RSA加密
import rsaUtil from '@/utils/rsaUtil'
import qs from 'qs'

export default {
  props: {
    hasSelection: {
      type: Boolean,
      default: function() {
        return false
      }
    }, // 是否可以选择
    showIndex: {
      type: Boolean,
      default: function() {
        return false
      }
    }, // 是否显示序号
    paging: {
      type: Boolean,
      default: function() {
        return true
      }
    }, // 是否显示分页
    requestConfig: {
      type: Object,
      default: function() {
        return undefined
      }
    }, // 网络请求的配置
    notRsaData: {
      type: Object,
      default() {
        return {}
      }
    }, // 请求参数太长时 不加密的参数
    tableName: {
      type: String,
      default: function() {
        return ''
      }
    }, // 表格名字,导出时需要
    columnWidth: {
      type: Array,
      default: function() {
        return undefined
      }
    }// 列的宽度
  },
  data() {
    return {
      page: 1,
      rows: 50,
      tableHeader: [], // 表头
      columnKey: [], // 列的key(列的字段名)
      columnConfig: [], // 列的配置
      tableData: [],
      tableTotal: undefined,
      localParameter: {}, // 本地网络请求参数
      // 表格高度
      tableHeight: null,
      screenHeight: window.innerHeight,
      timer: false
    }
  },
  watch: {
    requestConfig: function() {
      this.localParameter = Object.assign(
        {},
        this.localParameter,
        this.requestConfig
      )
      if (this.requestConfig.parameter.rows) {
        this.page = this.requestConfig.parameter.page
        this.rows = this.requestConfig.parameter.rows
      }
      this.httpGetTable()
    },
    // 监听高度变化 400ms更新一次
    screenHeight(val) {
      if (!this.timer) {
        this.screenHeight = val
        this.tableHeight = this.screenHeight - 250
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 200)
      }
    }
  },
  mounted() {
    this.getHeight()
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenHeight = window.innerHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  methods: {
    exportData() {
      ExportExcel(
        this.tableHeader,
        this.columnKey,
        this.tableData,
        this.tableName
      )
    }, // 导出
    updateAppoint(data, prop, index) {
      this.tableData[parseInt(index) - 1][prop] = data
    }, // 父级改变table指定Prop的值例如在使用拉合闸是修改值
    handleSizeChange(val) {
      // 每页显示的条数
      this.localParameter.parameter.rows = val
      this.httpGetTable()
    }, // 分页的每页条数发生变化
    handleCurrentChange(val) {
      // 当前页
      this.localParameter.parameter.page = val
      this.httpGetTable()
    }, // 分页的当前页发生变化
    getData(data) {
      return request({
        url: this.requestConfig.url,
        method: 'post',
        data,
        baseURL: 'https://www.xyxxcygcxx.guolianrobot.com'
      })
    },
    httpGetTable() {
      const param = { param: rsaUtil.encryption(this.localParameter.parameter), ...this.notRsaData }
      this.getData(qs.stringify(param)).then((response) => {
        console.log(response)
        this.tableData = [].concat(response.rows)
        this.tableTotal = response.total
        if (this.tableHeader.length === 0 || this.columnKey.length === 0) {
          // 获取返回的列的key值
          for (const key in this.tableData[0]) {
            this.columnKey.push(key)
          }
          // 获取返回的表头
          this.tableHeader = [].concat(response.title)
          // 将数组组合成[{label:"",prop:"",width:""}]这种数据格式
          const output = this.tableHeader.map((label, i) => ({
            label,
            prop: this.columnKey[i],
            width: this.columnWidth[i]
          }))
          this.columnConfig = [].concat(output)
        }
        // 重新计算表格高度 解决fixed布局问题
        this.$nextTick(() => {
          this.$refs.table.doLayout()
        })
      })
        .catch(() => {
          this.tableData = []
          this.tableTotal = 0
        })
    }, // 请求表格数据
    getHeight() {
      window.screenHeight = window.innerHeight
      this.screenHeight = window.screenHeight
      this.tableHeight = this.screenHeight - 250
    }, // 获取高度
    handleSelectionChange(val) {
      let selectionArr = []
      selectionArr = val
      this.$emit('send-selection', selectionArr)
    } // 子组件传值(选中的数据)到父组件
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 15px;
}
</style>
