<!--
 * @Author: chenzejie
 * @Date:2021-12-30 09:29:03
 * @LastEditTime: 2023-08-15 10:33:06
 * @LastEditors: chenzejie
 * @Description: In User Settings Edit
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  },

  mounted() {
    const that = this
    // 在此页面需要调用框架的方法，需要等待此方法执行
    window.addEventListener('flutterInAppWebViewPlatformReady', function(
      event
    ) {
      if (window.flutter_inappwebview) {
        window.flutter_inappwebview.callHandler('AutoOrientation')
        // 获取小程序id
        // window.flutter_inappwebview
        //   .callHandler('getAppId')
        //   .then(function (appId) {
        //     that.getPermission('yelink.workorder.report')
        //   })
       // that.getPermission('yelink.workorder.report')
      }
    })
    // this.getPermission('yelink.workorder.report') // 开发测试
    setTimeout(() => {
      document.getElementById('__vconsole').style.display = 'none'
    }, 500)
  },
  methods: {
    getPermission(appId) {
      this.$store
        .dispatch('permission/getAllPadsUserButtonPermissions', appId)
        .then(() => {
          console.log('权限获取成功')
        })
        .catch(err => {
          this.$notify({
            title: '失败',
            message: err || '权限获取失败',
            type: 'error',
            duration: 2000
          })
        })
    }
  }
}
</script>
