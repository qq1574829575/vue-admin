<template>
  <div>
    <el-dialog
      title="编辑缴费项"
      :visible.sync="dialogVisible"
      width="50%"
      :show="dialogVisible"
      @close="$emit('update:editShow', false)"
    >
      <el-form
        ref="editPayItemForm"
        :model="form"
        label-width="auto"
        :rules="editPayItemRules"
      >
        <el-form-item label="缴费名称" prop="typeName">
          <el-input v-model="form.typeName" />
        </el-form-item>
        <el-form-item label="缴费金额" prop="typeMoney">
          <el-input v-model="form.typeMoney" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即修改</el-button>
          <el-button @click="editShow = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EditPayItem',
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
      editPayItemRules: {
        typeName: [
          { required: true, message: '请输入缴费名称', trigger: 'blur' }
        ],
        typeMoney: [
          { required: true, message: '请输入缴费金额', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    editShow() {
      this.dialogVisible = this.editShow
    }
  },
  methods: {
    onSubmit() {
      const subForm = Object.assign({}, {}, this.form)
      this.$refs.editPayItemForm.validate((valid) => {
        if (valid) {
          const that = this
          that.$http
            .post('/xuefeinew/admin/EditPayType.php', {
              param: that.$rsaUtil.encryption(subForm)
            })
            .then(function(res) {
              if (res.data.code === 200) {
                that.dialogVisible = !that.dialogVisible
                that.$message({
                  message: res.data.message,
                  type: 'success'
                })
                that.$parent.buildParams()
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
