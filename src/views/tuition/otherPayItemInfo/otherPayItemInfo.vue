<template>
  <div class="container">
    <el-button
      size="mini"
      type="primary"
      style="margin-right: 10px; margin-bottom: 10px"
      @click="showAddForm = true"
    >添加年级缴费套餐
    </el-button>
    <el-card>
      <table-base
        ref="table"
        :request-config="requestConfig"
        :column-width="columnWidth"
        size="medium"
      >
        <template v-slot="columnConfig">
          <template v-for="item in columnConfig.columnConfig">
            <el-table-column
              v-if="item.prop !== 'mealId' && item.prop !== 'majorId'"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              show-overflow-tooltip
            />
          </template>
          <el-table-column label="操作" width="100px">
            <template slot-scope="scope">
              <el-link
                type="danger"
                @click="delPayItem(scope.row.mealId, scope.row.mealName)"
              >删除
              </el-link>
            </template>
          </el-table-column>
        </template>
      </table-base>
    </el-card>
    <add-pay-item :add-show.sync="showAddForm" />
    <edit-pay-item
      :edit-show.sync="showEditForm"
      :form="editPayItemForm"
    />
  </div>
</template>

<script>
import tableBase from '@/components/BaseTable' // 引入表格
import addPayItem from '@/components/tuition/payItemInfo/AddPayItem'
import editPayItem from '@/components/tuition/payItemInfo/EditPayItem'
import { deleteMealList } from '@/api/tuition'
export default {
  name: 'OtherPayItemInfo',
  components: {
    tableBase,
    addPayItem,
    editPayItem
  },
  data() {
    return {
      // 新增用户dialog控制
      showAddForm: false,
      // 修改节用户dialog控制
      showEditForm: false,
      editPayItemForm: {},
      // 表格prop数据
      requestConfig: {},
      columnWidth: []
    }
  },
  watch: {},
  created() {
  },
  mounted() {
    this.buildParams()
  },
  methods: {
    // 删除缴费项
    delPayItem(mealId, name) {
      const delCanshu = { mealId: mealId }
      this
        .$confirm('此操作将永久删除' + name + '套餐, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          deleteMealList(delCanshu).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.$refs.table.httpGetTable()
            }
          })
            .catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              })
            })
        })
    },

    // 创建缴费项请求数据
    buildParams() {
      this.requestConfig = Object.assign({}, this.requestConfig, {
        url: '/xxcyxuefei/newAdmin/GetMealList.php',
        parameter: {
          page: 1,
          rows: 50,
          majorId: ''
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 10px 20px 0;
  overflow: hidden;
}

.el-button {
  margin-right: 10px;
}

.el-select {
  margin-bottom: 15px;
}

.span-class {
  font-size: 12px;
  color: #7e7e7e;
}

.fontStyle {
  font-size: 14px;
  color: #7e7e7e;
  margin-right: 5px;
}
</style>
