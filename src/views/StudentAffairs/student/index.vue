<template>
  <div class="tuition-container">
    <el-card>
      <!-- 新增用户 -->
      <!--<table-base
        :request-config="requestConfig"
        :columnWidth="columnWidth"
        ref="table"
        id="table"
        size="medium"
      >
        <template v-slot="columnConfig">
          <template v-for="item in columnConfig.columnConfig">
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              :width="item.width"
              :key="item.prop"
              show-overflow-tooltip
            ></el-table-column>
          </template>
        </template>
      </table-base>-->
    </el-card>
  </div>

</template>

<script>
// import tableBase from '@/components/BaseTable/index'
// import { GetMajorList } from "@/api/user"
export default {
  components: {
    // tableBase
  },
  data() {
    return {
      requestConfig: {},
      columnWidth: []
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.tuition-container {
  margin: 10px 20px 0;
  overflow: hidden;
}
</style>
