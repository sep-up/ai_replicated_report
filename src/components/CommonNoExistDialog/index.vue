<!--
 * @Author: youjuan.hu
 * @Date: 2022-04-02 11:21:15
 * @LastEditors: youjuan.hu
 * @LastEditTime: 2022-04-02 11:27:19
 * @Description:
-->
<template>
  <van-dialog
    v-model="show"
    class="confirm-dialog"
    width="275px"
    confirm-button-color="#4887FF"
    confirm-button-text="确定"
    @confirm="handleConfirm"
  >
    <section class="content-box">
      <p>该单号不存在，请重新扫码</p>
    </section>
  </van-dialog>
</template>

<script>
export default {
  name: 'AppSelecttypedialog',
  props: {
    isShowNoExistDialog: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      show: false
    }
  },
  watch: {
    isShowNoExistDialog: {
      handler(newVal) {
        this.show = newVal
      },
      immediate: true,
      deep: true
    }
  },

  mounted() {},

  methods: {
    handleConfirm() {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
.confirm-dialog {
  div,
  section,
  header {
    box-sizing: border-box;
  }
  .content-box {
    height: 70px;
    width: 100%;
    padding: 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
}
</style>
