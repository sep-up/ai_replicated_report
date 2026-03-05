/*
 * @Author: shunhua.liang
 * @Date: 2021-12-30 09:38:48
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2021-12-30 10:38:53
 * @Description:
 */

const getters = {
  token: state => state.user.token,
  authList: state => state.permission.authList
}
export default getters
