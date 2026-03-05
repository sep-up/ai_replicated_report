---
name: "vue-pad-dev"
description: "Vue2移动端/Pad端应用开发规范。用于指导在此项目框架下进行功能开发、组件创建、API调用、权限控制等。当用户需要新增页面、组件、API接口或修改现有功能时调用此skill。"
---

# Vue Pad Application Development Guide

## Project Overview

This is a Vue 2 mobile/pad application framework integrated with Flutter WebView. The project uses a specific architecture pattern that must be followed during development.

### Tech Stack
- **Framework**: Vue 2.6.10 + Vue Router 3.0.2 + Vuex 3.1.0
- **UI Libraries**: Element UI 2.15.6 + Vant 2.12.54
- **HTTP Client**: Axios 0.21.1
- **CSS Preprocessor**: SCSS (node-sass 4.14.1)
- **Debug Tool**: VConsole 3.11.0

### Environment
- **Development**: `.env.development`
- **Production**: `.env.production`
- **Proxy Path**: `VUE_APP_NGINX_PATH = /factory/v1`

---

## Architecture Patterns

### 1. Directory Structure

```
src/
├── api/                    # API接口定义
│   ├── common.js          # 公共API
│   └── user.js            # 用户相关API
├── assets/                 # 静态资源
│   ├── css/
│   │   ├── common.scss    # 公共样式
│   │   └── index.scss     # 全局样式重置
│   └── logo.png
├── components/             # 公共组件
│   ├── CommonHeader/      # 头部组件
│   ├── CommonMain/        # 主内容布局组件
│   ├── CommonNoExistDialog/
│   └── Toast/
├── directive/              # 自定义指令
│   ├── permission/        # 权限指令
│   └── sticky.js
├── router/                 # 路由配置
│   └── index.js
├── store/                  # Vuex状态管理
│   ├── modules/
│   │   ├── user.js
│   │   ├── permission.js
│   │   └── message-notification.js
│   ├── getters.js
│   └── index.js
├── utils/                  # 工具函数
│   ├── auth.js            # Token管理
│   ├── common.js          # 公共方法
│   ├── element-ui.js      # Element UI按需引入
│   ├── help.js            # 辅助函数
│   ├── request.js         # Axios封装
│   └── vant-ui.js         # Vant按需引入
├── views/                  # 页面视图
│   └── overview/
├── App.vue
└── main.js
```

### 2. Core Patterns

#### Entry Point Pattern (main.js)
```javascript
import Vue from 'vue'
import Vant from 'vant'
import App from './App'
import store from './store'
import router from './router'
import '@/assets/css/index.scss'
import '@/utils/element-ui.js'
import 'element-ui/lib/theme-chalk/index.css'
import permission from '@/directive/permission/index.js'
import Vconsole from 'vconsole'
import 'vant/lib/index.css'

Vue.use(Vant)
new Vconsole()

import help from '@/utils/help'
window.time = help.time

Vue.config.productionTip = false
Vue.use(permission)

// Production mode - wait for Flutter WebView ready
if (process.env.NODE_ENV === 'production') {
  window.addEventListener('flutterInAppWebViewPlatformReady', function(event) {
    new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  })
} else {
  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
}
```

#### Flutter WebView Integration Pattern
```javascript
// In App.vue or components
window.addEventListener('flutterInAppWebViewPlatformReady', function(event) {
  if (window.flutter_inappwebview) {
    // Call Flutter methods
    window.flutter_inappwebview.callHandler('AutoOrientation')
    window.flutter_inappwebview.callHandler('getAppId').then(function(appId) {
      // Handle appId
    })
    // Get header heights
    window.flutter_inappwebview.callHandler('appBarheight').then(res => {
      // res is status bar height
    })
    window.flutter_inappwebview.callHandler('closeBarheight').then(res => {
      // res is close button bar height
    })
  }
})
```

---

## Development Guidelines

### 1. Adding New Pages

**Step 1: Create View Component**
Location: `src/views/<page-name>/index.vue`

```vue
<template>
  <div class="page-container">
    <CommonHeader title="Page Title" :is-show-back="true" />
    <CommonMain>
      <!-- Page content here -->
    </CommonMain>
  </div>
</template>

<script>
export default {
  name: 'PageName',
  components: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.page-container {
  // styles
}
</style>
```

**Step 2: Register Route**
Location: `src/router/index.js`

```javascript
export const constantRoutes = [
  // ... existing routes
  {
    path: '/new-page',
    name: 'newPage',
    component: () => import('@/views/new-page/index.vue')
  }
]
```

### 2. Adding API Interfaces

**Step 1: Define API Function**
Location: `src/api/<module>.js`

```javascript
import request from '@/utils/request'

// GET request
export function getSomeData(params) {
  return request({
    url: '/api/some/endpoint',
    method: 'get',
    params
  })
}

// POST request
export function postSomeData(data) {
  return request({
    url: '/api/some/endpoint',
    method: 'post',
    data
  })
}
```

**Step 2: Use in Component**
```javascript
import { getSomeData, postSomeData } from '@/api/module'

// In methods
async fetchData() {
  try {
    const res = await getSomeData({ param1: 'value' })
    const { code, data, message } = res.data
    if (code === '200') {
      // Handle success
    } else {
      this.$notify({
        title: 'Error',
        message: message || 'Request failed',
        type: 'error'
      })
    }
  } catch (error) {
    console.error(error)
  }
}
```

### 3. Permission Control

**Using Permission Directive**
```vue
<template>
  <!-- Button will be removed if no permission -->
  <el-button 
    v-permission="{ action: 'module:action', effect: 'remove' }"
  >
    Action Button
  </el-button>
  
  <!-- Button will be disabled if no permission -->
  <el-button 
    v-permission="{ action: 'module:action', effect: 'disabled' }"
  >
    Action Button
  </el-button>
</template>
```

**Permission Format**: `'<appId>.<module>.<action>'`
Example: `'yelink.workorder.report'`

### 4. Vuex Store Module Pattern

**Creating New Store Module**
Location: `src/store/modules/<module>.js`

```javascript
const state = {
  // state properties
  dataList: []
}

const mutations = {
  SET_DATA_LIST: (state, list) => {
    state.dataList = list
  }
}

const actions = {
  fetchDataList({ commit }, params) {
    return new Promise((resolve, reject) => {
      getApiData(params)
        .then(res => {
          const { code, data, message } = res.data
          if (code === '200') {
            commit('SET_DATA_LIST', data)
            resolve(data)
          } else {
            reject(new Error(message))
          }
        })
        .catch(err => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

**Register Getter**
Location: `src/store/getters.js`

```javascript
const getters = {
  token: state => state.user.token,
  authList: state => state.permission.authList,
  // Add new getter
  dataList: state => state.moduleName.dataList
}
```

### 5. Common Components Usage

**CommonHeader**
```vue
<CommonHeader 
  title="Page Title" 
  :is-show-back="true" 
/>
```
Props:
- `title`: String - Page title
- `isShowBack`: Boolean - Show back button (default: true)

**CommonMain**
```vue
<CommonMain>
  <div>Your content here</div>
</CommonMain>
```
- Automatically handles Flutter WebView header heights

### 6. Utility Functions

**Time Handling** (`src/utils/help.js`)
```javascript
import help from '@/utils/help'

// Format time
const formattedTime = help.time.handleTime(new Date())
// Output: '2024-01-15 10:30:00'

// Data masking
const masked = help.leaveSensitive('13812345678', {
  reg: /^(.*?)(\w{2})$/,
  repl: '$1**'
})
// Output: '138123456**'
```

**Token Management** (`src/utils/auth.js`)
```javascript
import { getToken, setToken, removeToken, getTokenType } from '@/utils/auth'

// Get token
const token = getToken()

// Set token
setToken('your-token')

// Remove token
removeToken()

// Get token type (default: 'Bearer')
const tokenType = getTokenType()
```

---

## Code Style Guidelines

### 1. Vue Component Structure
```vue
<template>
  <!-- Template first -->
</template>

<script>
// Script second
export default {
  name: 'ComponentName',
  components: {},
  props: {},
  data() { return {} },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
/* Style last */
</style>
```

### 2. Naming Conventions
- **Components**: PascalCase (`CommonHeader`, `UserProfile`)
- **Views**: kebab-case directories (`user-profile/index.vue`)
- **Routes**: kebab-case (`/user-profile`)
- **Store modules**: camelCase (`userProfile`)
- **API functions**: camelCase (`getUserInfo`, `fetchDataList`)

### 3. SCSS Guidelines
```scss
// Use scoped styles
<style lang="scss" scoped>
.container {
  // Use BEM-like naming
  &__header {
    // nested styles
  }
  
  &--modifier {
    // modifier styles
  }
}
</style>
```

---

## Important Rules

### DO NOT Modify
1. **Core entry files**: `main.js`, `App.vue` (unless absolutely necessary)
2. **Request interceptor**: `src/utils/request.js` (add new interceptors if needed)
3. **Auth utilities**: `src/utils/auth.js` (token management pattern)
4. **Permission directive**: `src/directive/permission/` (core permission logic)
5. **Build configuration**: `vue.config.js` (unless adding new webpack plugins)

### MUST Follow
1. **Always use CommonHeader and CommonMain** for page layout
2. **Always handle API errors** with try-catch and user notifications
3. **Always use Vuex for shared state** (not component-level state for shared data)
4. **Always use permission directive** for button-level access control
5. **Always check Flutter WebView ready** before calling Flutter methods in production

### Development Workflow
1. Create feature branch from main
2. Develop following patterns above
3. Test in development mode (`npm run dev`)
4. Build for production (`npm run build:prod`)
5. Version code auto-increments via `AppManifest.json`

---

## Flutter WebView Bridge Methods

Available Flutter methods to call:
- `AutoOrientation` - Auto rotate screen
- `getAppId` - Get current app ID
- `appBarheight` - Get status bar height
- `closeBarheight` - Get close button bar height

---

## Debug Tips

1. **VConsole**: Click page title 3 times to show/hide debug console
2. **Token**: Check localStorage for valid token
3. **Permissions**: Check Vuex `authList` getter for button permissions
4. **API Errors**: Check Network tab and console for error details
