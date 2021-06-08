<template>
  <div class="container">
    <!-- <upload-excel ref="upload"
                  :url="url"
                  :name="tableName"
                  :tHead="tHead"
                  :propData="propData"></upload-excel> -->
    <el-button
      size="mini"
      type="primary"
      @click="showAddForm = true"
    >添加缴费项</el-button>
    <span class="fontStyle">是否必缴：</span>
    <el-select
      v-model="VcheckedMustFlag"
      placeholder="请选择"
      size="mini"
      style="width: 10%; margin-right: 10px"
      @change="changeCheckedMustFlag"
    >
      <el-option label="全部" value="99" />
      <el-option label="必缴项" value="1" />
      <el-option label="非必缴项" value="2" />
    </el-select>
    <span class="fontStyle">缴费菜单:</span>
    <el-select
      v-model="mealId"
      style="width: 20%"
      size="mini"
      placeholder="请选择缴费菜单"
      @change="changeCheckedMeal"
    >
      <el-option
        v-for="item in classMealList"
        :key="item.mealId"
        :label="item.mealName"
        :value="item.mealId"
      />
    </el-select>
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
              v-if="item.prop === 'mustFlag'"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              width="140"
            >
              <template slot-scope="scope">
                <span>非必缴</span>
                <el-switch
                  v-model="scope.row.mustFlag"
                  active-value="1"
                  inactive-value="2"
                  inactive-color="#ff4949"
                  @change="changeMustFlag(scope.row)"
                />
                <span>必缴</span>
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="item.prop === 'mealName'"
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              width="200"
              show-overflow-tooltip
            />
            <el-table-column
              v-else-if="
                item.prop !== 'majorId' &&
                  item.prop !== 'createTime' &&
                  item.prop !== 'typeId' &&
                  item.prop !== 'createName' &&
                  item.prop !== 'mustFlag' &&
                  item.prop !== 'mealId'
              "
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
                type="primary"
                @click="editPayItemInfo(scope.row)"
              >编辑</el-link>
              <el-divider direction="vertical" />
              <el-link
                type="danger"
                @click="delPayItem(scope.row.typeId, scope.row.typeName)"
              >删除</el-link>
            </template>
          </el-table-column>
        </template>
      </table-base>
    </el-card>
    <add-pay-item
      :add-show.sync="showAddForm"
      :class-meal-list="classMealList"
    />
    <edit-pay-item
      :edit-show.sync="showEditForm"
      :form="editPayItemForm"
    />
  </div>
</template>

<script>
import tableBase from '@/components/BaseTable' // 引入表格
import { getMealList, editPayType, deletePayType } from '@/api/tuition'
// import uploadExcel from "@/components/uploadExcel"; //批量导入
import addPayItem from '@/components/tuition/createPayItem/AddPayItem'
import editPayItem from '@/components/tuition/createPayItem/EditPayItem'

export default {
  name: 'CreateClassPayItem',
  components: {
    tableBase,
    addPayItem,
    editPayItem
    // uploadExcel
  },
  data() {
    return {
      // url: "/xxcyxuefei/newAdmin/AddGroupPayTypeGroup.php",
      // tableName: "导入缴费项",
      // tHead: ["套餐id", "缴费名称", "金额", "是否必缴"],
      // propData: [
      //   "mealId",
      //   "typeName",
      //   "typeMoney",
      //   "mustFlag"
      // ],
      // 新增用户dialog控制
      showAddForm: false,
      // 修改节用户dialog控制
      showEditForm: false,
      editPayItemForm: {},
      VcheckedMustFlag: '99',
      // VcheckedStatus: "1",
      // 表格prop数据
      requestConfig: {},
      columnWidth: [],
      mealId: '',
      classMealList: []
    }
  },
  watch: {},
  created() {
    this.getclassMeal()
  },
  mounted() {
    this.buildParams()
  },
  methods: {
    // 获取专业缴费套餐
    getclassMeal() {
      const getclassMealCanshu = {}
      getMealList(getclassMealCanshu).then((res) => {
        this.classMealList = res.rows
      })
    },
    changeCheckedMustFlag(value) {
      this.VcheckedMustFlag = value
      this.buildParams()
    },
    changeCheckedMeal(value) {
      this.mealId = value
      this.buildParams()
    },
    // 改变是否必缴
    changeMustFlag(data) {
      const editMustFlag = Object.assign({}, {}, data)
      delete editMustFlag.createTime
      delete editMustFlag.createName
      delete editMustFlag.mealMark
      delete editMustFlag.mealName
      delete editMustFlag.classAllName
      delete editMustFlag.className
      editPayType(editMustFlag).then((response) => {
        this.buildParams()
        this.$message({
          message: '更改是否必缴成功',
          type: 'success'
        })
      })
        .catch((res) => {
          this.buildParams()
        })
    },
    // 点击编辑按钮
    editPayItemInfo(row) {
      this.showEditForm = true
      this.editPayItemForm = Object.assign({}, {}, row)
    },
    // 删除缴费项
    delPayItem(typeId, name) {
      const delCanshu = { typeId: typeId }
      this
        .$confirm('此操作将永久删除' + name + ', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          deletePayType(delCanshu).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: 'success',
                message: '删除成功'
              })
              this.$refs.table.httpGetTable()
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 创建缴费项请求数据
    buildParams() {
      this.requestConfig = Object.assign({}, this.requestConfig, {
        url: '/xxcyxuefei/newAdmin/GetPayType.php',
        parameter: {
          page: 1,
          rows: 50,
          mustFlag: this.VcheckedMustFlag,
          mealId: this.mealId
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
