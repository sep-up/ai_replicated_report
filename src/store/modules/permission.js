/*
 * @Author: shunhua.liang
 * @Date: 2022-04-11 16:39:31
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-04-13 12:15:03
 * @Description:
 */
// import {  constantRoutes } from '@/router'
import { getAllPadsUserButtonPermissions } from '@/api/user'
const state = {
  // 按钮信息
  authList: []
}

const mutations = {
  SET_AUTHLIST: (state, authList) => {
    state.authList = authList
  }
}

const actions = {
  getAllPadsUserButtonPermissions ({ commit }, id) {
    return new Promise((resolve, reject) => {
      getAllPadsUserButtonPermissions()
        .then(res => {
          const { code, data, message } = res.data
          if (+code === 200) {
            const authList = data.filter(item => item.parentId === id)
            console.log(authList, 'authList')
            console.log(id, 'id')
            commit('SET_AUTHLIST', authList || [])
            resolve()
          } else {
            this.$notify({
              title: '提示',
              message
            })
          }
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
