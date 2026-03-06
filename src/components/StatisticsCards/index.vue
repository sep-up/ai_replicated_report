<!--
 * @Author: chenzejie
 * @Date: 2026-03-05
 * @LastEditors: chenzejie
 * @LastEditTime: 2026-03-05
 * @Description: 顶部数据统计卡片组件
-->
<template>
  <div class="statistics-cards">
    <div v-for="(item, index) in cardData" :key="index" class="stat-card" :style="{ background: item.gradient }">
      <div class="card-header">
        <div class="card-title">{{ item.title }}</div>
      </div>
      <div class="card-content">
        <div class="total-section">
          <div class="total-value">{{ item.total }}</div>
        </div>
        <div class="stats-section">
          <div v-for="(stat, sIndex) in item.stats" :key="sIndex" class="stat-item">
            <span class="stat-label">{{ stat.label }}:</span>
            <span class="stat-value">{{ stat.value }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getProductOrderCountByStatus,
  getSaleOrderCountByStatus,
  getPurchaseOrderCountByStatus,
  getWorkOrderCountByStatus
} from '@/api/report'

export default {
  name: 'StatisticsCards',
  data() {
    return {
      cardData: [
        {
          title: '生产订单数',
          color: '#1890FF',
          gradient: 'linear-gradient(135deg, #409EFF 0%, #91CBFF 100%)',
          total: 0,
          stats: [
            { label: '创建', value: 0 },
            { label: '生效', value: 0 },
            { label: '完成', value: 0 }
          ]
        },
        {
          title: '销售订单数',
          color: '#FAAD14',
          gradient: 'linear-gradient(135deg, #E6A23C 0%, #F9D59B 100%)',
          total: 0,
          stats: [
            { label: '创建', value: 0 },
            { label: '生效', value: 0 },
            { label: '完成', value: 0 }
          ]
        },
        {
          title: '采购订单数',
          color: '#722ED1',
          gradient: 'linear-gradient(135deg, #9254DE 0%, #C7A7F0 100%)',
          total: 0,
          stats: [
            { label: '创建', value: 0 },
            { label: '生效', value: 0 },
            { label: '完成', value: 0 }
          ]
        },
        {
          title: '生产工单数',
          color: '#F5222D',
          gradient: 'linear-gradient(135deg, #F75959 0%, #FFB3B3 100%)',
          total: 0,
          stats: [
            { label: '创建', value: 0 },
            { label: '发放', value: 0 },
            { label: '投入', value: 0 },
            { label: '挂起', value: 0 },
            { label: '完成', value: 0 }
          ]
        }
      ],
      loading: false
    }
  },
  created() {
    this.fetchStatistics()
  },
  methods: {
    async fetchStatistics() {
      this.loading = true
      try {
        const [
          productRes,
          saleRes,
          purchaseRes,
          workOrderRes
        ] = await Promise.all([
          getProductOrderCountByStatus(),
          getSaleOrderCountByStatus(),
          getPurchaseOrderCountByStatus(),
          getWorkOrderCountByStatus()
        ])

        if (productRes.data.code === 200) {
          this.updateCardData(0, productRes.data.data)
        }

        if (saleRes.data.code === 200) {
          this.updateCardData(1, saleRes.data.data)
        }

        if (purchaseRes.data.code === 200) {
          this.updateCardData(2, purchaseRes.data.data)
        }

        if (workOrderRes.data.code === 200) {
          this.updateCardData(3, workOrderRes.data.data)
        }
      } catch (error) {
        console.error('获取统计数据失败:', error)
        this.$notify({
          title: '错误',
          message: '获取统计数据失败',
          type: 'error',
          duration: 2000
        })
      } finally {
        this.loading = false
      }
    },
    updateCardData(cardIndex, data) {
      if (!data || !Array.isArray(data)) return

      let total = 0
      data.forEach(item => {
        const statIndex = this.cardData[cardIndex].stats.findIndex(
          stat => stat.label === item.name
        )
        if (statIndex !== -1) {
          const value = item.quantity || 0
          this.cardData[cardIndex].stats[statIndex].value = value
          total += value
        }
      })
      this.cardData[cardIndex].total = total
    }
  }
}
</script>

<style lang="scss" scoped>
.statistics-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  .stat-card {
    border-radius: 6px;
    padding: 12px;
    color: #ffffff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    }

    .card-header {
      margin-bottom: 8px;

      .card-title {
        font-size: 14px;
        font-weight: 600;
        opacity: 0.9;
      }
    }

    .card-content {
      display: flex;
      align-items: center;
      gap: 16px;

      .total-section {
        flex: 1;
        text-align: center;

        .total-value {
          font-size: 28px;
          font-weight: 600;
          color: #ffffff;
        }
      }

      .stats-section {
        flex: 1;

        .stat-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 2px 0;
          gap: 6px;

          .stat-label {
            font-size: 12px;
            opacity: 0.85;
          }

          .stat-value {
            font-size: 14px;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
