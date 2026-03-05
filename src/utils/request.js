/*
 * @Author: piaopiao.huang
 * @Date: 2021-12-30 09:37:15
 * @LastEditors: piaopiao.huang
 * @LastEditTime: 2022-01-12 17:17:20
 * @Description: axios 封装
 */

import axios from 'axios'
import store from '@/store'
import { getToken, getTokenType } from '@/utils/auth'
import { Notify } from 'vant'

const service = axios.create({
  withCredentials: true,
  timeout: 15000
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // 设置token
    // if (store.getters.token) {
    config.headers['Authorization'] = getTokenType() + ' ' + getToken()
    // }
    // pad 端的baseUrl 可能会随时改变
    config.baseURL =
      process.env.NODE_ENV === 'development'
        ? process.env.VUE_APP_NGINX_PATH
        : localStorage.getItem('baseUrl') + '/factory/v1'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    if (response.data.code !== '200') {
      if (response.data.code === '3002') {
        // 回退到登录页
      } else if (
        response.data.code === '3005' ||
        response.data.code === '3007'
      ) {
        // 登录过期 回退到登录页
      } else {
        // 错误提示
        // Notify({ type: 'danger', message: response.data.message })
        return response
      }
      return Promise.reject(new Error(response.data.message || 'Error'))
    } else {
      return response
    }
  },
  error => {
    // 错误提示
    return Promise.reject(error)
  }
)

export default service
