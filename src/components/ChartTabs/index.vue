<!--
 * @Author: chenzejie
 * @Date: 2026-03-05
 * @LastEditors: chenzejie
 * @LastEditTime: 2026-03-05
 * @Description: 中间标签页图表组件
-->
<template>
  <div class="chart-tabs">
    <div class="tabs-container" role="tablist" aria-orientation="horizontal">
      <button 
        role="tab" 
        type="button" 
        :aria-selected="activeTab === 'workOrder'" 
        :data-state="activeTab === 'workOrder' ? 'active' : 'inactive'" 
        :data-active="activeTab === 'workOrder'" 
        class="tab-button" 
        @click="activeTab = 'workOrder'; handleTabClick({ name: 'workOrder' })"
      >
        <i class="el-icon-s-data"></i>
        <span>本月工单产出趋势</span>
      </button>
      <button 
        role="tab" 
        type="button" 
        :aria-selected="activeTab === 'taskProgress'" 
        :data-state="activeTab === 'taskProgress' ? 'active' : 'inactive'" 
        :data-active="activeTab === 'taskProgress'" 
        class="tab-button" 
        @click="activeTab = 'taskProgress'; handleTabClick({ name: 'taskProgress' })"
      >
        <i class="el-icon-s-order"></i>
        <span>本月报工进度趋势</span>
      </button>
    </div>
    <div v-loading="loading.workOrder" v-if="activeTab === 'workOrder'" class="chart-container">
      <div ref="workOrderChart" class="chart"></div>
    </div>
    <div v-loading="loading.taskProgress" v-else class="chart-container">
      <div ref="taskProgressChart" class="chart"></div>
    </div>
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
      if (this.$refs.workOrderChart) {
        if (this.workOrderChart) {
          this.workOrderChart.dispose()
        }
        this.workOrderChart = echarts.init(this.$refs.workOrderChart)
      }
    },
    initTaskProgressChart() {
      if (this.$refs.taskProgressChart) {
        if (this.taskProgressChart) {
          this.taskProgressChart.dispose()
        }
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
        this.$nextTick(() => {
          this.initWorkOrderChart()
          this.loadWorkOrderData()
        })
      } else if (tab.name === 'taskProgress') {
        this.$nextTick(() => {
          this.initTaskProgressChart()
          this.loadTaskProgressData()
        })
      }
    },
    async loadWorkOrderData() {
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
                formatter: '{b}: {c} '
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '10%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: dates.length > 0 ? dates : ['暂无数据'],
                axisLabel: {
                  rotate: 0,
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
                data: dates.length > 0 ? counts : [0],
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
                formatter: '{b}: {c} '
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '10%',
                containLabel: true
              },
              xAxis: {
                type: 'category',
                data: dates.length > 0 ? dates : ['暂无数据'],
                axisLabel: {
                  rotate: 0,
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
                data: dates.length > 0 ? counts : [0],
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

  .tabs-container {
    role: tablist;
    aria-orientation: horizontal;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 4px;
    margin-bottom: 12px;
  }

  .tab-button {
    role: tab;
    type: button;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    border-radius: 6px;
    padding: 4px 12px;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.3s ease;
    border: none;
    background: transparent;
    color: #666666;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.8);
    }

    &[data-active="true"] {
      background: #ffffff;
      color: #333333;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    i {
      margin-right: 6px;
    }
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
