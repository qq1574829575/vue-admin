<template>
  <div class="container">
    <el-card>
      <el-tabs v-model="tabsValue" tab-position="left" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, index) in majorList"
          :key="index"
          :label="item.majorName"
          :name="item.majorId"
        >
          <el-row :gutter="20" class="fenge">
            <el-col :span="24">
              <el-button
                v-if="item.majorId === tabsValue"
                style="margin-right: 10px"
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
                v-if="item.majorId === tabsValue"
                v-model="notRsaData.cardID"
                size="mini"
                clearable
                style="width: 20%; margin-right: 8px"
                placeholder="身份证号码查询"
                @input="inputCardid"
              />
              <!-- 选择年份搜索 -->
              <span class="span-class">年份: </span>
              <el-date-picker
                v-if="item.majorId === tabsValue"
                v-model="paramsItem.payYear"
                size="mini"
                style="width: 12%; margin-right: 10px"
                type="year"
                value-format="yyyy"
                placeholder="选择年份"
              />
            </el-col>
          </el-row>
          <el-row :gutter="20" class="fenge">
            <el-col :span="24">
              <!-- 下拉选择是否必缴中 -->
              <span class="span-class">是否缴纳：</span>
              <el-select
                v-if="item.majorId === tabsValue"
                v-model="paramsItem.payFlag"
                placeholder="请选择"
                size="mini"
                style="width: 10%; margin-right: 10px"
              >
                <el-option label="全部" value="99" />
                <el-option label="已缴纳" value="1" />
                <el-option label="未缴纳" value="2" />
              </el-select>
              <!-- 选择支付方式 -->
              <span class="span-class">支付方式：</span>
              <el-select
                v-if="item.majorId === tabsValue"
                v-model="paramsItem.payName"
                placeholder="请选择"
                size="mini"
                style="width: 10%; margin-right: 10px"
              >
                <el-option
                  v-for="item2 in payNameSelect"
                  :key="item2.value"
                  :label="item2.label"
                  :value="item2.value"
                />
              </el-select>
              <!-- 支付时间 -->
              <span class="span-class">支付时间：</span>
              <el-date-picker
                v-if="item.majorId === tabsValue"
                v-model="zuijinTime"
                size="mini"
                type="daterange"
                style="width: 22%; margin-right: 10px"
                align="right"
                unlink-panels
                value-format="yyyy-MM-dd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
              />
            </el-col>
          </el-row>
          <table-base
            v-if="item.majorId === tabsValue"
            ref="table"
            :request-config="requestConfig"
            :column-width="columnWidth"
            :not-rsa-data="notRsaData"
            :table-name="tableName"
            size="medium"
          >
            <template v-slot="columnConfig">
              <template v-for="(item2, index2) in columnConfig.columnConfig">
                <el-table-column
                  v-if="index2 < 3 && item2.prop !== 'payId'"
                  :key="item2.prop"
                  :prop="item2.prop"
                  :label="item2.label"
                  :width="item2.width"
                  fixed="left"
                  show-overflow-tooltip
                />
                <el-table-column
                  v-else-if="item2.prop === 'mustFlag'"
                  :key="item2.prop"
                  :prop="item2.prop"
                  :label="item2.label"
                  :width="item2.width"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.mustFlag === '1'">必缴</span>
                    <span v-else>非必缴</span>
                  </template>
                </el-table-column>
                <el-table-column
                  v-else-if="item2.prop === 'payFlag'"
                  :key="item2.prop"
                  :prop="item2.prop"
                  :label="item2.label"
                  :width="item2.width"
                  show-overflow-tooltip
                >
                  <template slot-scope="scope">
                    <span v-if="scope.row.payFlag === '1'">已缴纳</span>
                    <span v-else>未缴纳</span>
                  </template>
                </el-table-column>
                <el-table-column
                  v-else-if="
                    item.prop !== 'payId' &&
                      item.prop !== 'status' &&
                      item.prop !== 'mustFlag'
                  "
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
import tableBase from '@/components/BaseTable' // 引入表格
import { getMajorList } from '@/api/tuition'
export default {
  name: 'StudentPayInfo',
  components: {
    tableBase
  },
  data() {
    return {
      // 表格prop数据
      requestConfig: {},
      tableName: '',
      columnWidth: [50, 145],
      // editPayMoneyForm: {},
      paramsItem: {
        payYear: null,
        payName: null,
        payTime: null,
        payStartTime: '',
        payEndTime: '',
        payFlag: '99',
        mustFlag: '99'
      },
      // 不加密参数
      notRsaData: {
        majorId: null,
        cardID: null,
        payStartTime: null,
        payEndTime: null
      },
      // 选择支付方式
      payNameSelect: [
        {
          value: null,
          label: '全部'
        },
        {
          value: '微信',
          label: '微信'
        },
        {
          value: '线下',
          label: '线下'
        },
        {
          value: '未支付',
          label: '未支付'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近十五天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 15)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      zuijinTime: '',
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
    },
    zuijinTime(val) {
      if (val) {
        this.paramsItem.payTime = 5
        this.notRsaData.payStartTime = val[0]
        this.notRsaData.payEndTime = val[1]
      } else {
        this.notRsaData.payStartTime = ''
        this.notRsaData.payEndTime = ''
        this.paramsItem.payTime = null
      }
    }
  },
  mounted() {
    this.getMajorList_()
    this.buildParams()
  },
  methods: {
    // 导出表格
    exportExcel() {
      this.$refs.table[0].exportData()
    },
    inputCardid(val) {
      this.notRsaData.cardID = val
      this.buildParams()
    },
    // 切换tabs获取不同班级学生信息
    handleClick(tab) {
      this.$nextTick(() => {
        this.tabsValue = tab.name
        this.tableName = tab.label
        this.notRsaData.majorId = tab.name
        this.buildParams()
      })
    },
    getMajorList_() {
      getMajorList().then((res) => {
        this.majorList = res.rows
        this.tabsValue = this.majorList[0].majorId
        this.notRsaData.majorId = this.majorList[0].majorId
      })
    },
    // 创建缴费项请求数据
    buildParams() {
      this.requestConfig = Object.assign({}, this.requestConfig, {
        url: '/xxcyxuefei/newPayRecord/GetClassPayRecordList.php',
        parameter: {
          page: 1,
          rows: 50,
          payTime: this.paramsItem.payTime,
          payName: this.paramsItem.payName,
          payFlag: this.paramsItem.payFlag,
          mustFlag: this.paramsItem.mustFlag,
          payYear: this.paramsItem.payYear,
          status: '2'
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  margin: 10px 20px 0;
  overflow: hidden;
}
.fenge {
  margin-bottom: 8px;
}

.span-class {
  font-size: 12px;
  color: #7e7e7e;
}
</style>
