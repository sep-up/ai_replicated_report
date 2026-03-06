<!--
 * @Author: chenzejie
 * @Date: 2026-03-05
 * @LastEditors: chenzejie
 * @LastEditTime: 2026-03-05
 * @Description: 中间标签页图表组件
-->
<template>
  <div class="chart-tabs">
    <el-tabs v-model="activeTab" @tab-click="handleTabClick">
      <el-tab-pane name="workOrder">
        <span slot="label">
          <i class="el-icon-s-data"></i>
          <span>本月工单产出趋势</span>
        </span>
        <div v-loading="loading.workOrder" class="chart-container">
          <div ref="workOrderChart" class="chart"></div>
        </div>
      </el-tab-pane>
      <el-tab-pane name="taskProgress">
        <span slot="label">
          <i class="el-icon-s-order"></i>
          <span>本月报工进度趋势</span>
        </span>
        <div v-loading="loading.taskProgress" class="chart-container">
          <div v-if="activeTab === 'taskProgress'" ref="taskProgressChart" class="chart"></div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import { getWorkOrderCountByMonth, getTaskProgressByMonth } from '@/api/report'

export default {
  name: 'ChartTabs',
  data() {
    return {
      activeTab: 'workOrder',
      loading: {
        workOrder: false,
        taskProgress: false
      },
      workOrderChart: null,
      taskProgressChart: null,
      workOrderDataLoaded: false,
      taskProgressDataLoaded: false
    }
  },
  mounted() {
    this.initWorkOrderChart()
    this.loadWorkOrderData()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    if (this.workOrderChart) {
      this.workOrderChart.dispose()
    }
    if (this.taskProgressChart) {
      this.taskProgressChart.dispose()
    }
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    initWorkOrderChart() {
      this.workOrderChart = echarts.init(this.$refs.workOrderChart)
    },
    initTaskProgressChart() {
      if (this.$refs.taskProgressChart && !this.taskProgressChart) {
        this.taskProgressChart = echarts.init(this.$refs.taskProgressChart)
      }
    },
    handleResize() {
      if (this.workOrderChart) {
        this.workOrderChart.resize()
      }
      if (this.taskProgressChart) {
        this.taskProgressChart.resize()
      }
    },
    handleTabClick(tab) {
      if (tab.name === 'workOrder') {
        this.loadWorkOrderData()
      } else if (tab.name === 'taskProgress') {
        this.$nextTick(() => {
          this.loadTaskProgressData()
        })
      }
    },
    async loadWorkOrderData() {
      if (this.workOrderDataLoaded && this.workOrderChart) {
        return
      }
      this.loading.workOrder = true
      try {
        const res = await getWorkOrderCountByMonth()
        if (res.data.code === 200) {
          const data = res.data.data || []
          const dates = data.map(item => item.name)
          const counts = data.map(item => item.ext1 || item.quantity || 0)

          if (this.workOrderChart) {
            this.workOrderChart.setOption({
              tooltip: {
                trigger: 'axis',
                formatter: '{b}: {c} 单'
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                top: '10%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: dates,
                axisLabel: {
                  rotate: 45,
                  interval: 0,
                  fontSize: 11
                }
              },
              yAxis: {
                type: 'value',
                name: '工单数量',
                axisLabel: {
                  fontSize: 11
                }
              },
              series: [{
                name: '工单数量',
                data: counts,
                type: 'bar',
                barWidth: '60%',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#1890FF' },
                    { offset: 1, color: '#69C0FF' }
                  ])
                }
              }]
            })
          }
          this.workOrderDataLoaded = true
        }
      } catch (error) {
        console.error('获取工单产出数据失败:', error)
        this.$notify({
          title: '错误',
          message: '获取工单产出数据失败',
          type: 'error',
          duration: 2000
        })
      } finally {
        this.loading.workOrder = false
      }
    },
    async loadTaskProgressData() {
      if (this.taskProgressDataLoaded && this.taskProgressChart) {
        return
      }

      this.initTaskProgressChart()
      this.loading.taskProgress = true
      try {
        const res = await getTaskProgressByMonth()
        if (res.data.code === 200) {
          const data = res.data.data || []
          const dates = data.map(item => item.name)
          const counts = data.map(item => item.ext1 || item.quantity || 0)

          if (this.taskProgressChart) {
            this.taskProgressChart.setOption({
              tooltip: {
                trigger: 'axis',
                formatter: '{b}: {c} 单'
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '15%',
                top: '10%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: dates,
                axisLabel: {
                  rotate: 45,
                  interval: 0,
                  fontSize: 11
                }
              },
              yAxis: {
                type: 'value',
                name: '报工数量',
                axisLabel: {
                  fontSize: 11
                }
              },
              series: [{
                name: '报工数量',
                data: counts,
                type: 'bar',
                barWidth: '60%',
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#52C41A' },
                    { offset: 1, color: '#95DE64' }
                  ])
                }
              }]
            })
          }
          this.taskProgressDataLoaded = true
        }
      } catch (error) {
        console.error('获取报工进度数据失败:', error)
        this.$notify({
          title: '错误',
          message: '获取报工进度数据失败',
          type: 'error',
          duration: 2000
        })
      } finally {
        this.loading.taskProgress = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-tabs {
  background: #ffffff;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  padding: 12px;
  margin-bottom: 16px;

  ::v-deep .el-tabs__header {
    margin-bottom: 12px;
  }

  ::v-deep .el-tabs__item {
    font-size: 14px;
    font-weight: 500;
  }

  ::v-deep .el-tabs__item.is-active {
    color: #1890FF;
    font-weight: 600;
  }

  .chart-container {
    width: 100%;
    height: 350px;
    position: relative;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
