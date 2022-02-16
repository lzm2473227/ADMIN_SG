// import role from './acl/role'
// import permission from './acl/permission'

// export {
//   role,
//   permission
// }

// import * as attr from './acl/attr'
// export attr
// 引入attr模块所有分别暴露的内容，再将其内容分别暴露出去
export * as attr from './product/attr'
// 引入role模块默认暴露的内容，再将其内容分别暴露出去
export { default as role } from './acl/role'
export { default as permission } from './acl/permission'
export * as user from './acl/user'
// import { default as role } from './acl/role'
// export role

/*
  ES6模块化语法
    分别暴露  export const xxx = xxx
    统一暴露  export { xxx: xxx }
      引入方式：
        引入部分：import { xxx } from 'xxx'
        引入全部：import * as xxx from 'xxx'
        import xxx from 'xxx' 不可以
    默认暴露
*/
