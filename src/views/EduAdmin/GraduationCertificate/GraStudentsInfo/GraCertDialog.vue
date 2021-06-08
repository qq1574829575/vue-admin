<template>
  <div style="margin-bottom: 5px;">
    <el-button
      type="primary"
      size="small"
      @click="handleClick"
    >查看毕业证书
    </el-button>
    <el-dialog
      title="预览毕业证书"
      width="40%"
      :visible.sync="visible"
    >
      <div v-loading="loading" element-loading-text="正在加载，请稍候..." style="width: 100%;height: 60vh">
        <iframe v-if="graCertUrl" width="100%" height="100%" :src="graCertUrl" />
      </div>
    </el-dialog>
  </div>
</template>

<script>
import lz from '@/utils/lz-string'
import { GetGraCertUrl } from '@/api/cert'

export default {
  name: 'GraCertDialog',
  props: {
    graStudentInfo: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      graCertUrl: '',
      visible: false,
      loading: false
    }
  },
  methods: {
    async handleClick() {
      if (this.graStudentInfo) {
        this.visible = true
        this.loading = true
        const year = lz.compressToBase64(this.graStudentInfo.GraYear)
        const name = lz.compressToBase64(this.graStudentInfo.name)
        const CertId = lz.compressToBase64(this.graStudentInfo.GraCertId)
        const res = await GetGraCertUrl({ year, name, CertId })
        this.graCertUrl = res.url
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>

</style>
