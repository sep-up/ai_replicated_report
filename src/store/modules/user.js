/*
 * @Author: piaopiao.huang
 * @Date: 2021-07-12 18:41:16
 * @LastEditTime: 2021-12-31 14:07:44
 * @LastEditors: piaopiao.huang
 * @Description: In User Settings Edit
 * @FilePath: \dfs\src\store\modules\user.js
 */

import { getToken, setToken, removeToken } from '@/utils/auth'

const state = {
  token: getToken()
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // 登录
  login ({ commit }, userInfo) {
    setToken('token')
  },
  // 登出,清空token 等消息
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      }, 500)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
