<!--
 * @Author: chenzejie
 * @Date: 2022-08-15 10:41:08
 * @LastEditors: chenzejie
 * @LastEditTime: 2026-03-05
 * @Description: 智能制造报表看板
-->
<template>
  <div class="overview">
      <div class="dashboard-container">
        <!-- 顶部数据统计卡片 -->
        <StatisticsCards />
        <!-- 中间标签页图表 -->
        <ChartTabs />
        <!-- 下方趋势分析卡片 -->
        <TrendAnalysisCards />
      </div>
  </div>
</template>

<script>
import StatisticsCards from '@/components/StatisticsCards'
import ChartTabs from '@/components/ChartTabs'
import TrendAnalysisCards from '@/components/TrendAnalysisCards'

export default {
  name: 'Overview',
  components: {
    StatisticsCards,
    ChartTabs,
    TrendAnalysisCards
  },
  data() {
    return {}
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.overview {
  width: 100%;
  height: 100%;

  .dashboard-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 12px;
    box-sizing: border-box;
  }
}
</style>
