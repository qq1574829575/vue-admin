<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      icon="el-icon-plus"
      @click="handleAddGraStudent"
    >新增毕业学生</el-button>
    <upload-excel
      :name="uploadExcelName"
      :t-head="uploadExcelHead"
      :prop-data="propData"
      @onImportSuccess="importSuccess"
    />
    <el-table :data="GraStudentsList" style="width: 100%;margin-top:30px;" border>
      <el-table-column
        type="index"
        label="序号"
        width="50"
        fixed="left"
        align="center"
      />
      <el-table-column align="header-center" label="姓名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="学号">
        <template slot-scope="scope">
          {{ scope.row.xh }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="身份证号">
        <template slot-scope="scope">
          {{ scope.row.IdCard }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="毕业年份">
        <template slot-scope="scope">
          {{ scope.row.GraYear }}
        </template>
      </el-table-column>
      <el-table-column align="header-center" label="毕业证编号">
        <template slot-scope="scope">
          {{ scope.row.GraCertId }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <gra-cert-dialog :gra-student-info="scope.row" />
          <el-button type="primary" size="small" @click="handleEdit(scope)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="dialogVisible" :title="dialogType==='edit'?'编辑毕业学生信息':'新增毕业学生'">
      <el-form ref="GraStudent" :model="GraStudent" :rules="rules" label-width="100px" label-position="left">
        <el-form-item label="姓名" prop="name">
          <el-input v-model="GraStudent.name" placeholder="姓名" />
        </el-form-item>
        <el-form-item label="学号" prop="xh">
          <el-input v-model="GraStudent.xh" placeholder="学号" />
        </el-form-item>
        <el-form-item label="身份证号" prop="IdCard">
          <el-input v-model="GraStudent.IdCard" placeholder="身份证号" />
        </el-form-item>
        <el-form-item label="毕业年份" prop="GraYear">
          <el-select v-model="GraStudent.GraYear" placeholder="请选择毕业年份">
            <el-option
              v-for="item in GraYears"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="毕业证编号" prop="GraCertId">
          <el-input v-model="GraStudent.GraCertId" placeholder="毕业证编号" />
        </el-form-item>
      </el-form>
      <div style="text-align:right;">
        <el-button type="danger" @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import UploadExcel from '@/components/excel/uploadExcel'
import { deepClone } from '@/utils'
import { AddGraStudents, DelGraStudent, EditGraStudent, GetGraStudents } from '@/api/cert'
import GraCertDialog from '@/views/EduAdmin/GraduationCertificate/GraStudentsInfo/GraCertDialog'

const defaultStudent = {
  name: '',
  xh: '',
  IdCard: '',
  GraYear: '',
  GraCertId: ''
}
export default {
  name: 'Index',
  components: { GraCertDialog, UploadExcel },
  data() {
    return {
      uploadExcelName: '批量导入毕业学生',
      uploadExcelHead: ['姓名', '学号', '身份证号', '毕业年份', '毕业证编号'],
      propData: ['name', 'xh', 'IdCard', 'GraYear', 'GraCertId'],
      GraStudentsList: [],
      dialogVisible: false,
      dialogType: 'new',
      GraStudent: Object.assign({}, defaultStudent),
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        xh: [
          { required: true, message: '请输入证书编号', trigger: 'blur' }
        ],
        IdCard: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        GraYear: [
          { required: true, message: '请选择毕业年份', trigger: 'blur' }
        ],
        GraCertId: [
          { required: true, message: '请输入证书编号', trigger: 'blur' }
        ]
      },
      GraYears: [{
        value: '2021',
        label: '2021届'
      }, {
        value: '2020',
        label: '2020届'
      }, {
        value: '2019',
        label: '2019届'
      }, {
        value: '2018',
        label: '2018届'
      }, {
        value: '2017',
        label: '2017届'
      }, {
        value: '2016',
        label: '2016届'
      }, {
        value: '2015',
        label: '2015届'
      }]
    }
  },
  created() {
    this.getGraStudents()
  },
  methods: {
    async getGraStudents() {
      const res = await GetGraStudents()
      this.GraStudentsList = res.data
    },
    async importSuccess(data) {
      await AddGraStudents(data)
      await this.getGraStudents()
      this.$notify({
        title: '提示',
        dangerouslyUseHTMLString: true,
        message: `导入毕业学生信息成功`,
        type: 'success'
      })
    },
    handleAddGraStudent() {
      this.GraStudent = Object.assign({}, defaultStudent)
      this.dialogType = 'new'
      this.dialogVisible = true
    },
    handleEdit(scope) {
      this.dialogType = 'edit'
      this.dialogVisible = true
      this.GraStudent = deepClone(scope.row)
    },
    handleDelete({ $index, row }) {
      this.$confirm('是否删除该毕业学生信息?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await DelGraStudent(row)
          await this.getGraStudents()
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(err => { console.error(err) })
    },
    handleConfirm() {
      this.$refs['GraStudent'].validate((valid) => {
        if (valid) {
          this.confirm()
        } else {
          return false
        }
      })
    },
    async confirm() {
      const isEdit = this.dialogType === 'edit'
      if (isEdit) {
        await EditGraStudent(this.GraStudent)
        await this.getGraStudents()
        this.dialogVisible = false
        this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: `修改成功`,
          type: 'success'
        })
      } else {
        const newGraStudents = []
        newGraStudents.push(this.GraStudent)
        await AddGraStudents(newGraStudents)
        await this.getGraStudents()
        this.dialogVisible = false
        this.$notify({
          title: '提示',
          dangerouslyUseHTMLString: true,
          message: `增加毕业学生信息成功`,
          type: 'success'
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
