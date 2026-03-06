/*
 * @Author: chenzejie
 * @Date: 2026-03-05
 * @LastEditors: chenzejie
 * @LastEditTime: 2026-03-05
 * @Description: 智能制造报表看板API接口
 */
import request from '@/utils/request'

// ==================== 顶部数据统计卡片接口 ====================

// 获取生产订单统计
export function getProductOrderCountByStatus(params) {
  return request({
    url: '/jy-app/api/product/reports/findProductOrderCountByStatus',
    method: 'get',
    params
  })
}

// 获取销售订单统计
export function getSaleOrderCountByStatus(params) {
  return request({
    url: '/jy-app/api/sale/reports/findSaleOrderCountByStatus',
    method: 'get',
    params
  })
}

// 获取采购订单统计
export function getPurchaseOrderCountByStatus(params) {
  return request({
    url: '/jy-app/api/purchase/reports/findPurchaseOrderCountByStatus',
    method: 'get',
    params
  })
}

// 获取生产工单统计
export function getWorkOrderCountByStatus(params) {
  return request({
    url: '/jy-app/api/product/work/reports/findWorkOrderCountByStatus',
    method: 'get',
    params
  })
}

// ==================== 中间标签页图表接口 ====================

// 获取本月工单产出趋势
export function getWorkOrderCountByMonth(params) {
  return request({
    url: '/jy-app/api/product/work/reports/findWorkOrderCountByMonth',
    method: 'get',
    params
  })
}

// 获取本月报工进度趋势
export function getTaskProgressByMonth(params) {
  return request({
    url: '/jy-app/api/product/work/reports/findTaskProgressByMonth',
    method: 'get',
    params
  })
}

// ==================== 下方趋势分析卡片接口 ====================

// 获取近7天生产订单数量
export function getWorkOrderBySevenDays(params) {
  return request({
    url: '/jy-app/api/product/work/reports/findWorkOrderBySevenDays',
    method: 'get',
    params
  })
}

// 获取近7日生产工序数量
export function getProductProducesBySevenDays(params) {
  return request({
    url: '/jy-app/api/product/reports/findProductProducesBySevenDays',
    method: 'get',
    params
  })
}

// 获取近7天质检不良数量
export function getDefectStaticBySevenDaysInStatus(params) {
  return request({
    url: '/jy-app/api/product/work/reports/inspection/defectStaticBySevenDaysInStatus',
    method: 'get',
    params
  })
}
