/*
 * @Author: your name
 * @Date: 2021-09-17 15:16:55
 * @LastEditTime: 2021-09-25 10:48:01
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \master\src\directive\permission\permission.js
 */
import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding

  if (value && typeof value === 'object') {
    const action = binding.value.action
    // 按钮权限数据 authList
    const authList =
      store.getters && store.getters.authList.map((auth) => auth.path)
    if (authList) {
      if (authList.indexOf(action) === -1) {
        // 不具备权限
        const type = binding.value.effect
        if (type === 'disabled') {
          // 禁用按钮
          el.disabled = true
          el.classList.add('is-disabled')
        } else {
          // 删除按钮
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    }
  } else {
    // 指令使用方式  v-permission="{ action: 'shipment.application:detail',effect:'disabled' }"
    // 格式错误，抛出异常
    throw new Error(
      `need permission! Like v-permission="{ action: 'shipment.application:detail',effect:'disabled' }"`
    )
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
