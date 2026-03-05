/*
 * @Author: your name
 * @Date: 2021-12-30 09:39:56
 * @LastEditTime: 2023-08-15 09:48:14
 * @LastEditors: chenzejie
 * @Description: In User Settings Edit
 */

import Vue from 'vue'
import Router from 'vue-router'
// import { getToken } from '@/utils/auth'

Vue.use(Router)
// 路由配置
export const constantRoutes = [
  {
    path: '/',
    redirect: '/overview'
  },
  // 首页
  {
    path: '/overview',
    name: 'overview',
    component: () => import('@/views/overview/index.vue')
  }
]

const createRouter = () =>
  new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

router.beforeEach((to, from, next) => {
  next()
})

export default router
