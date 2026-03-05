/*
 * @Author: shunhua.liang
 * @Date: 2021-12-31 16:22:25
 * @LastEditors: shunhua.liang
 * @LastEditTime: 2022-01-05 18:10:37
 * @Description:
 */

import extend from 'extend'

export default {
  // 时间处理函数
  time: {
    /**
     * @description:处理时间为指定格式的字符串
     * @param {*} value：需要处理的时间
     * @return {*} string():'2021-08-05 09：08：20'
     */
    handleTime (value = null) {
      const that = this
      const time =
        Object.prototype.toString.call(value) === '[object Null]'
          ? new Date()
          : new Date(value)
      const Year = time.getFullYear()
      const Month = time.getMonth() + 1
      const Day = time.getDate()
      const Hour = time.getHours()
      const Minute = time.getMinutes()
      const Second = time.getSeconds()
      return (
        Year +
        '-' +
        that._handleZeroPadding(Month) +
        '-' +
        that._handleZeroPadding(Day) +
        ' ' +
        that._handleZeroPadding(Hour) +
        ':' +
        that._handleZeroPadding(Minute) +
        ':' +
        that._handleZeroPadding(Second)
      )
    },
    /**
     * @description: 数字补0处理
     * @param {*}value: 需要处理的时间
     * @return {*} '2021-08-05 09：08：20'
     */
    _handleZeroPadding (value) {
      return +value < 10 ? '0' + value : value
    }
  },
  /**
   * @description:数据脱敏操作
   * @param {string} string :传入的string
   * @param {object} opts
   * @return {string} :处理好的字符
   */
  leaveSensitive (string = '', opts = {}) {
    const options = extend(true, {
      reg: /^(.*?)(\w{2})$/, // 正则 默认隐藏最后2位
      repl: '$1**' // 替换的字符串
    }, opts)
    string = string.replace(options.reg, options.repl)
    return string
  },
  /**
   * @description:拷贝对象
   * @param {Object} object
   * @return {Object}
   */
  copy (object = {}) {
    const options = extend(true, {}, object)
    return options
  }
}
