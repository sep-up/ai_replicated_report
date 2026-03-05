<!--
 * @Author: chenzejie
 * @Date: 2022-08-15 10:41:08
 * @LastEditors: chenzejie
 * @LastEditTime: 2025-05-20 15:36:09
 * @Description:生产工单列表
-->
<template>
  <div class="overview">
    <CommonHeader title="智能制造" :is-show-back="false" />
    <CommonMain>
      <div>
        <img src="@/assets/logo.png" class="logo" alt="yelink logo" />
        <h1>Hello World!123456</h1>
      </div>
    </CommonMain>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {}
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>
<style lang="scss" scoped>
.overview {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vanilla:hover {
    filter: drop-shadow(0 0 2em #f7df1eaa);
  }
}
</style>
