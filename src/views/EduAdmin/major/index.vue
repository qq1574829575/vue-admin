<template>
  <div class="tuition-container">
    <el-card>
      <!-- 新增用户 -->
      <table-base
        id="table"
        ref="table"
        size="medium"
        :request-config="requestConfig"
        :column-width="columnWidth"
      >
        <template v-slot="columnConfig">
          <template v-for="item in columnConfig.columnConfig">
            <el-table-column
              :key="item.prop"
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              show-overflow-tooltip
            />
          </template>
        </template>
      </table-base>
    </el-card>
  </div>

</template>

<script>
import tableBase from '@/components/BaseTable'
export default {
  components: {
    tableBase
  },
  data() {
    return {
      requestConfig: {},
      columnWidth: []
    }
  },
  mounted() {
    this.buildParams()
  },
  methods: {
    // 创建用户请求数据
    buildParams() {
      // console.log('获取专业列表')
      this.requestConfig = Object.assign({}, this.requestConfig, {
        url: '/xxcyxuefei/newAdmin/GetMajorList.php',
        parameter: {}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.tuition-container {
  margin: 10px 20px 0;
  overflow: hidden;
}
</style>
