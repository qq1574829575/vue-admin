<template>
  <div v-loading="loading" element-loading-text="正在查询，请稍候..." class="container">
    <el-form ref="ruleForm" :inline="true" :model="formInline" :rules="rules" class="demo-form-inline">
      <el-form-item label="毕业年份" prop="year">
        <el-select v-model="formInline.year" placeholder="请选择毕业年份">
          <el-option label="2021届" value="2021" />
          <el-option label="2020届" value="2020" />
          <el-option label="2019届" value="2019" />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="formInline.name" placeholder="姓名" />
      </el-form-item>
      <el-form-item label="证书编号" prop="CertId">
        <el-input v-model="formInline.CertId" placeholder="证书编号" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">查询</el-button>
      </el-form-item>
    </el-form>
    <div style="width: 100%;height: 600px">
      <iframe v-if="GraCertUrl" width="100%" height="100%" :src="GraCertUrl" />
    </div>
  </div>
</template>

<script>
import lz from '@/utils/lz-string'
import { GetGraCertUrl } from '@/api/cert'

export default {
  name: 'Index',
  data() {
    return {
      GraCertUrl: '',
      loading: false,
      formInline: {
        year: '',
        name: '',
        CertId: ''
      },
      rules: {
        year: [
          { required: true, message: '请选择毕业年份', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        CertId: [
          { required: true, message: '请输入证书编号', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm() {
      this.$refs['ruleForm'].validate((valid) => {
        if (valid) {
          this.loading = true
          this.getGraCertUrl()
        } else {
          return false
        }
      })
    },
    async getGraCertUrl() {
      const year = lz.compressToBase64(this.formInline.year)
      const name = lz.compressToBase64(this.formInline.name)
      const CertId = lz.compressToBase64(this.formInline.CertId)
      const res = await GetGraCertUrl({ year, name, CertId })
      this.GraCertUrl = res.url
      this.loading = false
    }
  }
}
</script>

<style scoped>
.container {
  margin: 10px 20px 0;
  overflow: hidden;
}
</style>
