<!--
 * @Author: your name
 * @Date: 2021-08-06 17:56:24
 * @LastEditTime: 2021-08-06 18:03:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \storage\src\components\Toast\index.vue
-->

<template>
  <div class="toast">
    <p>
      <img src="@/assets/images/success_icon.png" alt="">
      上架成功
    </p>
  </div>
</template>

<style lang="scss" scoped>
.toast {
  position: absolute;
  top: 20%;
  left: 10%;
  right: 10%;
  height: 4.125rem;
  background: #ffffff;
  border: 1px solid #01ce7f;
  box-shadow: 0px 3px 10px 0px rgba(0, 50, 6, 0.2);
  border-radius: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(10px);
  p {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #01ce7f;
    img {
      width: 34px;
      height: 34px;
      margin-right: 1rem;
    }
  }
}
</style>