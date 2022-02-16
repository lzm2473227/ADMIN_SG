// 分别暴露，统一暴露：暴露了对象，对象上就有模块真正暴露的内容
import { a } from './m1'
import * as m1 from './m1'
import m11 from './m1' // undefined

// 默认暴露：暴露了对象，对象上有一个default属性，defualt属性上才有模块真正暴露的内容
import m2 from './m2' // 就是 import { default as m222 } from './m2' 的简写
import { b } from './m2'
import * as m22 from './m2'
import { default as m222 } from './m2'

// console.log(a)
// console.log(m1.a, m1.b)
// console.log(m11)

console.log(m2.a, m2.b)
console.log(b)
console.log(m22.a, m22.b) // undefined
console.log(m22.default.a, m22.default.b)
console.log(m222)
