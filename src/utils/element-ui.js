/*
 * @Author: piaopiao.huang
 * @Date: 2021-12-31 12:00:03
 * @LastEditors: chenzejie
 * @LastEditTime: 2023-08-15 10:18:51
 * @Description:按需引入组件
 */
import Vue from 'vue'

import {
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Button,
  DatePicker,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Table,
  TableColumn,
  Tag,
  Message,
  Loading,
  Divider,
  Progress,
  Notification
} from 'element-ui'

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Button)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tag)
Vue.use(Divider)
Vue.use(Loading.directive)
Vue.use(Progress)

Vue.prototype.$notify = Notification
Vue.prototype.$message = Message
Vue.prototype.$loading = Loading.service
