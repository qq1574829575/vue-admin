<template>
  <div>
    <el-card>
      <el-tabs
        v-model="tabsValue"
        tab-position="left"
        @tab-click="handleClick"
      >
        <el-tab-pane
          v-for="(item, index) in majorList"
          :key="index"
          :label="item.majorName"
          :name="item.majorId"
        >
          <el-row
            :gutter="20"
            class="fenge"
          >
            <el-col :span="24">
              <el-button
                v-if="item.majorId===tabsValue"
                style="margin-right:10px"
                type="primary"
                class="button"
                size="mini"
                icon="el-icon-download"
                @click="exportExcel"
              >导出表格
              </el-button>
              <!-- 身份证搜索 -->
              <span class="span-class">身份证查询：</span>
              <el-input
                v-if="item.majorId===tabsValue"
                v-model="cardID"
                size="mini"
                clearable
                style="width: 20%;margin-right: 8px"
                placeholder="身份证号码查询"
                @input="inputCardid"
              />
              <span class="span-class">姓名查询：</span>
              <el-input
                v-if="item.majorId===tabsValue"
                v-model="studentName"
                size="mini"
                clearable
                style="width: 10%;margin-right: 8px"
                placeholder="姓名"
                @input="inputStudentName"
              />
              <!-- 筛选学生缴费情况 -->
              <span class="span-class">筛选学生缴费情况：</span>
              <el-select
                v-if="item.majorId===tabsValue"
                v-model="paramsItem.payFlag"
                size="mini"
                style="width:15%;margin-right: 10px"
              >
                <el-option
                  v-for="item2 in payNameSelect"
                  :key="item2.value"
                  :label="item2.label"
                  :value="item2.value"
                />
              </el-select>
            </el-col>
          </el-row>
          <table-base
            v-if="item.majorId===tabsValue"
            ref="table"
            :request-config="requestConfig"
            :column-width="columnWidth"
            :table-name="tableName"
            size="medium"
          >
            <template v-slot="columnConfig">
              <template v-for="(item2, index2) in columnConfig.columnConfig">
                <el-table-column
                  v-if="index2 < 3 && item2.prop !== 'payId' && item2.prop !== 'stuId' && item2.prop !== 'examNum'"
                  :key="item2.prop"
                  :prop="item2.prop"
                  :label="item2.label"
                  :width="item2.width"
                  fixed="left"
                  show-overflow-tooltip
                />
                <el-table-column
                  v-else-if="
                    item2.prop !== 'payId' &&
                      item2.prop !== 'status' &&
                      item2.prop !== 'stuId' &&
                      item2.prop !== 'majorId' &&
                      item2.prop !== 'examNum'"
                  :key="item2.prop"
                  :prop="item2.prop"
                  :label="item2.label"
                  :width="item2.width"
                  show-overflow-tooltip
                />
              </template>
            </template>
          </table-base>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import tableBase from '@/components/BaseTable'
import { getMajorList } from '@/api/tuition'
export default {
  name: 'StudentPayStatus',
  components: {
    tableBase
  },
  data() {
    return {
      // 表格prop数据
      requestConfig: {},
      tableName: '',
      columnWidth: [50, '', 145, '', 120],
      paramsItem: {
        payYear: null,
        payName: null,
        payTime: null,
        payStartTime: '',
        payEndTime: '',
        payFlag: '99',
        mustFlag: '99'
      },
      // 选择支付方式
      payNameSelect: [
        {
          value: '99',
          label: '全部'
        },
        {
          value: '1',
          label: '未缴纳任何费用'
        },
        {
          value: '2',
          label: '已缴纳全部费用'
        },
        {
          value: '3',
          label: '已缴纳部分费用'
        }
      ],
      cardID: '',
      studentName: '',
      majorList: [],
      tabsValue: null
    }
  },
  watch: {
    paramsItem: {
      deep: true,
      handler: function() {
        this.buildParams()
      }
    }
  },
  mounted() {
    this.getMajorList_()
    this.buildParams()
  },
  methods: {
    getMajorList_() {
      getMajorList().then((res) => {
        this.majorList = res.rows
        this.tabsValue = this.majorList[0].majorId
      })
    },
    // 导出表格
    exportExcel() {
      this.$refs.table[0].exportData()
    },
    inputCardid(val) {
      this.cardID = val
      this.buildParams()
    },
    inputStudentName(val) {
      this.studentName = val
      this.buildParams()
    },
    // 切换tabs获取不同班级学生信息
    handleClick(tab) {
      this.$nextTick(() => {
        this.tabsValue = tab.name
        this.tableName = tab.label
        this.buildParams()
      })
    },
    // 创建缴费项请求数据
    buildParams() {
      this.requestConfig = Object.assign({}, this.requestConfig, {
        url: '/xxcyxuefei/newPayRecord/GetGroupPayRecordList.php',
        parameter: {
          page: 1,
          rows: 50,
          majorId: this.tabsValue,
          studentName: this.studentName,
          cardID: this.cardID,
          payStatus: this.paramsItem.payFlag
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.fenge {
  margin-bottom: 8px;
}

.span-class {
  font-size: 12px;
  color: #7e7e7e;
}
</style>
