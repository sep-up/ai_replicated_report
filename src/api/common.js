/*
 * @Author: chenzejie
 * @Date: 2024-10-11 15:11:53
 * @LastEditors: chenzejie
 * @LastEditTime: 2025-05-20 15:37:31
 * @Description: 
 */
import request from '@/utils/request'

// 扫码判断是工单还是订单
export function judgeOrdersByScan(params) {
  return request({
    url: '/api/orders/scan/judge',
    method: 'get',
    params
  })
}

// 查询工单附件
export function getWorkordersSelectAppendixWorkorder(params) {
  return request({
    url: '/api/workorders/select/appendix/workorder',
    method: 'get',
    params
  })
}
// 附件类型
export function getAppendixEnums() {
  return request({
    url: '/api/appendix/enums',
    method: 'get'
  })
}


