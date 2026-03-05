<!--
 * @Author: piaopiao.huang
 * @Date: 2021-12-30 11:34:56
 * @LastEditors: piaopiao.huang
 * @LastEditTime: 2022-01-20 10:27:28
 * @Description: 公共布局
-->

<template>
  <div class="main-content">
    <div class="slot">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created() {
    this.$nextTick(() => {
      try {
        const main = document.querySelector('.main-content')
        window.flutter_inappwebview.callHandler('closeBarheight').then(res => {
          window.flutter_inappwebview.callHandler('appBarheight').then(res2 => {
            main.style.top = res + res2 + 'px'
          })
        })
      } catch (err) {
        console.log(err)
      }
    })
  },
  methods: {
    changeMenu(val) {
      this.flag = val
    }
  }
}
</script>

<style lang="scss" scoped>
.main-content {
  width: 100%;
  height: 0;
  flex: 1 0 auto;
  padding: 12px 12px 0 12px;
  box-sizing: border-box;
  background: #F5F8F9;
  .slot {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>
