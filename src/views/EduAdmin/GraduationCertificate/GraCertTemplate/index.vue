<template>
  <div>
    <el-button type="primary" @click="handleAddGraCertTemplate">创建毕业证书模板</el-button>
    <el-table :data="GraCertTemplateList" style="width: 100%;margin-top:30px;" border>
      <el-table-column align="center" label="模板id" width="220">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="模板备注/说明">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑毕业证模板':'创建毕业证模板'">
      <el-form :model="GraCertTemplate" label-width="80px" label-position="left">
        <el-form-item label="模板备注/说明" label-width="100px">
          <el-input v-model="GraCertTemplate.title" placeholder="模板备注/说明" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmAdmin">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

import { deepClone } from '@/utils'

const defaultGraCertTemplate = {
  id: '',
  title: ''
}
export default {
  name: 'Index',
  data() {
    return {
      GraCertTemplateList: [],
      dialogVisible: false,
      dialogType: 'new',
      GraCertTemplate: Object.assign({}, defaultGraCertTemplate)
    }
  },
  methods: {
    handleAddGraCertTemplate() {
      this.GraCertTemplate = Object.assign({}, defaultGraCertTemplate)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.GraCertTemplate = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('确认要删除该毕业证模板吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          // await DelAdminUser(row)
          this.GraCertTemplateList.splice($index, 1)
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(err => { console.error(err) })
    },
    async confirmAdmin() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        // await EditAdminUser(this.adminUser)
        for (let index = 0; index < this.GraCertTemplateList.length; index++) {
          if (this.GraCertTemplateList[index].id === this.GraCertTemplate.id) {
            this.GraCertTemplateList.splice(index, 1, Object.assign({}, this.GraCertTemplate))
            break
          }
        }
        this.dialogVisible = false
        this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: `保存成功`,
          type: 'success'
        })
      } else {
        // await AddAdminUser(this.adminUser)
        this.GraCertTemplateList.push(this.GraCertTemplate)
        this.dialogVisible = false
        this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: `创建毕业证模板成功`,
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
