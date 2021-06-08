<template>
  <div>
    <el-dialog
      title="编辑费用"
      :visible.sync="dialogVisible"
      width="50%"
      :show="dialogVisible"
      @close="$emit('update:editShow', false)"
    >
      <div PayMoney="el-dialog-div">
        <el-scrollbar
          style="height: 100%"
          :wrap-style="[{ 'overflow-x': 'hidden' }]"
        >
          <el-form
            ref="editPayMoneyForm"
            :model="form"
            label-width="auto"
            :rules="editPayMoneyRules"
          >
            <el-form-item label="姓名" prop="studentName">
              <el-input v-model="form.studentName" disabled />
            </el-form-item>
            <el-form-item label="身份证号码" prop="cardID">
              <el-input v-model="form.cardID" disabled />
            </el-form-item>
            <el-form-item label="班级" prop="classAllName">
              <el-input v-model="form.classAllName" disabled />
            </el-form-item>
            <el-form-item label="费用类型" prop="typeName">
              <el-input v-model="form.typeName" disabled />
            </el-form-item>
            <el-form-item label="金额" prop="typeMoney">
              <el-input v-model="form.typeMoney" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">立即修改</el-button>
              <el-button @click="editShow = false">取消</el-button>
            </el-form-item>
          </el-form>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditPayMoney',
  props: {
    editShow: {
      type: Boolean,
      default: false
    },

    form: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      dialogVisible: this.editShow,
      // 校验添加框
      editPayMoneyRules: {
        typeMoney: [{ required: true, message: '请输入金额', trigger: 'blur' }]
      }
    }
  },
  watch: {
    editShow() {
      this.dialogVisible = this.editShow
    }
  },
  methods: {
    // 存在status不一样
    onSubmit() {
      const subForm = {
        payId: this.form.payId,
        typeMoney: this.form.typeMoney,
        flag: 1
      }
      this.$refs.editPayMoneyForm.validate((valid) => {
        if (valid) {
          const that = this
          that.$http
            .post('/xuefeinew/newPayRecord/EditPayListOne.php', {
              param: that.$rsaUtil.encryption(subForm)
            })
            .then(function(res) {
              if (res.data.code === 200) {
                that.dialogVisible = !that.dialogVisible
                that.$message({
                  message: res.data.message,
                  type: 'success'
                })
                that.$parent.getHttpGetTable()
              }
            })
        } else {
          this.$message({
            message: '请输入必填信息',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.el-input,
.el-select {
  width: 50%;
}
.el-dialog-div {
  padding-right: 20px;
  height: 55vh;
  overflow: auto;
}
</style>
