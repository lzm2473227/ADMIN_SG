# day01

## 将 Login 改造成真实接口

- api/user.js

  - 将请求地址改成真实接口地址

- utils/request.js

  - 将请求拦截器 x-token 改为 token
  - 将响应拦截器成功回调返回的 res，改成 res.data

- store/modules/user.js

  - 将请求参数和响应结果改为正确的值

- vue.config.js

  - 添加代理服务器配置
  - 注释：mock 服务

- 最终重启服务器生效~

## 搭建路由

- 定义路由组件

  - views/product/trademark/index.vue
  - views/product/attr/index.vue
  - views/product/spu/index.vue
  - views/product/sku/index.vue

- 路由配置
