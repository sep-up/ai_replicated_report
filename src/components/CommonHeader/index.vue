<!--
 * @Author: piaopiao.huang
 * @Date: 2021-12-30 11:34:34
 * @LastEditors: youjuan.hu
 * @LastEditTime: 2022-03-30 11:30:40
 * @Description: 公共头部
-->
<template>
  <div class="header-top">
    <span>
      <img
        v-show="isShowBack"
        src="@/assets/images/common/back.png"
        class="back-img"
        @click="goBack"
      >
    </span>
    <p @click="handleHideConsole">{{ title }}</p>
    <span />
  </div>
</template>
<script>
export default {
  props: {
    isShowBack: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  created() {
    this.$nextTick(() => {
      try {
        const header = document.querySelector('.header-top')

        // 获取顶部通知栏高度
        window.flutter_inappwebview.callHandler('appBarheight').then(res1 => {
          header.style.paddingTop = res1 + 'px'
          // 获取头部高度(右上角关闭按钮高度)
          window.flutter_inappwebview
            .callHandler('closeBarheight')
            .then(res2 => {
              header.style.height = res1 + res2 + 'px'
              console.log(res1 + res2, res1, res2, 'res1 + res21')
            })
        })
      } catch (err) {
        console.log(err)
      }
    })
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
    handleHideConsole() {
      const vconsoleBox = document.querySelector('#__vconsole')
      if (vconsoleBox.style.display == 'none') {
        vconsoleBox.style.display = 'block'
      } else {
        vconsoleBox.style.display = 'none'
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.header-top {
  width: 100%;
  height: 44px; // 默认高度
  // background: linear-gradient(270deg, #2A72FF 0%, #73A0F6 100%);
  background: #007cff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 0px;
  color: #ffffff;
  img {
    width: 10px;
    height: 18px;
  }
}
</style>
