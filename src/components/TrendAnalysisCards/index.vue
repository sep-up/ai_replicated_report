<!--
 * @Author: chenzejie
 * @Date: 2026-03-05
 * @LastEditors: chenzejie
 * @LastEditTime: 2026-03-05
 * @Description: 下方趋势分析卡片组件
-->
<template>
  <div class="trend-analysis-cards">
    <!-- 近7天生产订单数量 -->
    <div class="card-item">
      <div class="card-header">
        <span class="card-title">近7天生产订单数量</span>
      </div>
      <div v-loading="loading.order" class="chart-container">
        <div ref="orderChart" class="chart"></div>
      </div>
    </div>

    <!-- 近7日生产工序数量 -->
    <div class="card-item">
      <div class="card-header">
        <span class="card-title">近7日生产工序数量</span>
      </div>
      <div v-loading="loading.process" class="chart-container">
        <div ref="processChart" class="chart"></div>
      </div>
    </div>

    <!-- 近7天质检不良数量 -->
    <div class="card-item">
      <div class="card-header">
        <span class="card-title">近7天质检不良数量</span>
      </div>
      <div v-loading="loading.defect" class="chart-container">
        <div ref="defectChart" class="chart"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import {
  getWorkOrderBySevenDays,
  getProductProducesBySevenDays,
  getDefectStaticBySevenDaysInStatus
} from '@/api/report'

export default {
  name: 'TrendAnalysisCards',
  data() {
    return {
      loading: {
        order: false,
        process: false,
        defect: false
      },
      orderChart: null,
      processChart: null,
      defectChart: null,
      orderData: {
        categories: [],
        counts: []
      },
      processData: [],
      defectData: []
    }
  },
  mounted() {
    this.initCharts()
    this.loadData()
    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    if (this.orderChart) {
      this.orderChart.dispose()
    }
    if (this.processChart) {
      this.processChart.dispose()
    }
    if (this.defectChart) {
      this.defectChart.dispose()
    }
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    initCharts() {
      this.orderChart = echarts.init(this.$refs.orderChart)
      this.processChart = echarts.init(this.$refs.processChart)
      this.defectChart = echarts.init(this.$refs.defectChart)
    },
    handleResize() {
      if (this.orderChart) {
        this.orderChart.resize()
      }
      if (this.processChart) {
        this.processChart.resize()
      }
      if (this.defectChart) {
        this.defectChart.resize()
      }
    },
    async loadData() {
      try {
        await Promise.all([
          this.loadOrderData(),
          this.loadProcessData(),
          this.loadDefectData()
        ])
      } catch (error) {
        console.error('加载数据失败:', error)
      }
    },
    async loadOrderData() {
      this.loading.order = true
      try {
        const res = await getWorkOrderBySevenDays()
        if (res.data.code === 200) {
          const data = res.data.data || []
          this.orderData = {
            categories: data.map(item => item.name),
            counts: data.map(item => item.ext1 || item.quantity || 0)
          }
          this.updateOrderChart()
        }
      } catch (error) {
        console.error('获取生产订单数据失败:', error)
        this.$notify({
          title: '错误',
          message: '获取生产订单数据失败',
          type: 'error',
          duration: 2000
        })
      } finally {
        this.loading.order = false
      }
    },
    async loadProcessData() {
      this.loading.process = true
      try {
        const res = await getProductProducesBySevenDays()
        if (res.data.code === 200) {
          this.processData = (res.data.data || []).map(item => ({
            name: item.name,
            value: item.quantity || 0
          }))
          this.updateProcessChart()
        }
      } catch (error) {
        console.error('获取生产工序数据失败:', error)
        this.$notify({
          title: '错误',
          message: '获取生产工序数据失败',
          type: 'error',
          duration: 2000
        })
      } finally {
        this.loading.process = false
      }
    },
    async loadDefectData() {
      this.loading.defect = true
      try {
        const res = await getDefectStaticBySevenDaysInStatus()
        if (res.data.code === 200) {
          this.defectData = (res.data.data || []).map(item => ({
            name: item.name,
            value: item.ext1 || item.quantity || 0
          }))
          this.updateDefectChart()
        }
      } catch (error) {
        console.error('获取质检不良数据失败:', error)
        this.$notify({
          title: '错误',
          message: '获取质检不良数据失败',
          type: 'error',
          duration: 2000
        })
      } finally {
        this.loading.defect = false
      }
    },
    updateOrderChart() {
      const option = {
        tooltip: {
          trigger: 'axis'
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
          data: this.orderData.categories,
          axisLabel: {
            rotate: 0,
            interval: 0,
            fontSize: 11
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            fontSize: 11
          }
        },
        series: [{
          data: this.orderData.counts,
          type: 'line',
          smooth: true,
          itemStyle: {
            color: '#409EFF'
          },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(64, 158, 255, 0.3)' },
              { offset: 1, color: 'rgba(64, 158, 255, 0.1)' }
            ])
          }
        }]
      }
      this.orderChart.setOption(option)
    },
    updateProcessChart() {
      const total = this.processData.reduce((sum, item) => sum + item.value, 0)
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:{color};"></span>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: '0%',
          left: 'center',
          formatter: (name) => {
            const item = this.processData.find(item => item.name === name)
            return item ? `${name}: ${item.value}` : name
          },
          textStyle: {
            fontSize: 11
          }
        },
        series: [{
          name: '工序数量',
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outer',
            formatter: '{b}: {d}%',
            fontSize: 12
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '14',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: true,
            length: 20,
            length2: 30
          },
          data: this.processData.map(item => ({
            name: item.name,
            value: item.value
          })),
          itemStyle: {
            borderRadius: 4
          }
        }]
      }
      this.processChart.setOption(option)
    },
    updateDefectChart() {
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/><span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:{color};"></span>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'horizontal',
          bottom: '0%',
          left: 'center',
          formatter: (name) => {
            const item = this.defectData.find(item => item.name === name)
            return item ? `${name}: ${item.value}` : name
          },
          textStyle: {
            fontSize: 11
          }
        },
        series: [{
          name: '不良类型',
          type: 'pie',
          radius: '60%',
          center: ['50%', '45%'],
          data: this.defectData.map(item => ({
            name: item.name,
            value: item.value
          })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true,
            position: 'outer',
            formatter: '{b}: {d}%',
            fontSize: 12
          },
          labelLine: {
            show: true,
            length: 20,
            length2: 30
          }
        }]
      }
      this.defectChart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
.trend-analysis-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .card-item {
    background: #ffffff;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    padding: 12px;

    .card-header {
      margin-bottom: 8px;

      .card-title {
        font-size: 14px;
        font-weight: 500;
        color: #333333;
      }
    }

    .chart-container {
    height: 280px;
    width: 100%;
    position: relative;

    .chart {
      width: 100%;
      height: 100%;
    }
  }
  }
}
</style>
