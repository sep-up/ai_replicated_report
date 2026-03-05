/*
 * @Author: your name
 * @Date: 2021-07-12 18:41:15
 * @LastEditTime: 2025-05-20 15:37:58
 * @LastEditors: chenzejie
 * @Description: In User Settings Edit
 * @FilePath: \dfs\src\api\user.js
 */

import request from '@/utils/request'

export function login (data) {
  var newData = ''
  function paramUrl (data) {
    for (const k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k) === true) {
        newData +=
          encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
      }
    }
    return newData
  }
  
  paramUrl(data)
  return request({
    url: '/api/oauth/token?' + newData,
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data
  })
}

export function logout () {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
export function getUserInfo () {
  return request({
    url: `/api/users/info`,
    method: 'get'
  })
}

// 获取小程序按钮权限列表接口
export function getAllPadsUserButtonPermissions () {
  return request({
    url: `/api/pads/user/button/permissions`,
    method: 'get'
  })
}
