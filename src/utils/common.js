import { judgeOrdersByScan } from '@/api/common.js'
import { Toast } from 'vant'

const workOrderStateColorList = [
  { state: 2, stateName: '生效', color: '#20E0FF' },
  { state: 3, stateName: '投产', color: '#21E762' },
  { state: 4, stateName: '挂起', color: '#E79821' },
  { state: 5, stateName: '完成', color: '#1890FF' }
]

export async function handleScanData(res, self) {
  const param = { orderNumber: res }
  const result = await judgeOrdersByScan(param)
  const { code, data = {}, message } = result.data || {}

  if (code === '200') {
    const { orderType, orderId, orderNumber } = data
    if (orderType === 'productOrder') {
      // 生产订单
      self.$router.push({
        name: 'workOrderDetail',
        query: { orderId, orderNumber }
      })
    } else if (orderType === 'workOrder') {
      // 生产工单
      self.$router.push({
        name: 'productionReport',
        query: { workOrderId: orderId, workOrderNumber: orderNumber }
      })
    }
  } else {
    Toast.fail(message || '系统繁忙')
  }
}

export function getWorkOrderColorByState(state) {
  const temp = workOrderStateColorList.find(item => item.state === state)
  return temp ? temp.color : ''
}
