<template>
  <el-card class="container">
    <el-form label-width="70px" inline :model="attr" :rules="rules" ref="form">
      <el-form-item label="属性名" prop="attrName">
        <el-input placeholder="请输入属性名" v-model="attr.attrName" />
      </el-form-item>
    </el-form>
    <el-button
      type="primary"
      icon="el-icon-plus"
      :disabled="!attr.attrName"
      @click="addAttrValue"
      >添加属性值</el-button
    >

    <el-table
      :data="attrValueList"
      border
      class="container-table"
      v-loading="loading"
    >
      <el-table-column label="序号" width="50" type="index" align="center">
      </el-table-column>
      <el-table-column label="属性值名称">
        <template v-slot="{ row, $index }">
          <!--
            input触发 blur keyup：让编辑模式变成显示模式
            span触发 click：让显示模式变成编辑模式

            ref="input"
              问题：因为名称一样，多行的ref会覆盖，只有最后一个生效
            :ref="$index"
              解决：每一行ref的值都不一样

            el-input 是一个elementui的组件，不一定支持所有事件
              想要绑定原生DOM事件，就用native
           -->
          <el-input
            :ref="$index"
            size="mini"
            placeholder="请输入属性值名称"
            v-model="attr.valueName"
            @blur="setAttrValue(row, $index)"
            @keyup.enter.native="$event.target.blur()"
            v-show="row.isEdit"
          ></el-input>
          <span
            class="attr-value-text"
            v-show="!row.isEdit"
            @click="showEdit(row, $index)"
            >{{ row.valueName }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ $index }">
          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            @onConfirm="delAttrValue($index)"
          >
            <el-tooltip content="删除属性值" placement="top" slot="reference">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
              ></el-button>
            </el-tooltip>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-button type="primary" @click="addAttr">确定</el-button>
    <el-button @click="cancel">取消</el-button>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import { reqSaveAttr } from '@/api/product/attr'

export default {
  name: 'AddOrUpdateAttr',
  data() {
    return {
      attrValueList: [],
      loading: false,
      attr: {
        attrName: '',
        valueName: '' // 临时属性值
      },
      rules: {
        attrName: [{ required: true, message: '请输入属性名', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapState('category', ['category3Id'])
  },
  methods: {
    // 添加属性值
    addAttrValue() {
      /*
        this.$nextTick
          简单理解：内部的回调是在更新DOM之后触发
          真正理解：将内部的回调添加回调队列中，等待执行
            1. 如果是先更新数据，在调用$nextTick
              更新数据对应更新用户界面的方法先进队列，$nextTick的回调后进队列
              才能保证：更新DOM之后触发$nextTick的回调
            2. 如果是先调用$nextTick，再更新数据
              $nextTick的回调先进队列，更新数据对应更新用户界面的方法后进队列
              问题：$nextTick的回调调用时，此时DOM还未更新，操作不了
          总结：this.$nextTick往往是在更新数据之后调用
      */

      this.attrValueList.push({
        // 属性值名称
        valueName: '',
        // 是否是编辑模式
        isEdit: true
      })
      // 更新时异步的
      this.$nextTick(() => {
        // 让input聚焦
        // 下标是this.attrValueList.length - 1，每次添加都是最后一个
        this.$refs[this.attrValueList.length - 1].focus()
      })
    },
    // 设置属性值(input触发) 编辑模式 - 显示模式
    setAttrValue(row, index) {
      // console.log(111);
      const { valueName } = this.attr
      if (!valueName) {
        this.attrValueList.splice(index, 1)
        return
      }
      // this.attrValueList[index].valueName = this.attr.valueName;
      row.valueName = valueName
      // 切换回显示模式
      row.isEdit = false
      // 将临时的valueName置为空：目的将来添加下一个属性值不要有值
      this.attr.valueName = ''
      // 设置响应式数据的方法
      // this.$set(row, "valueName", this.attr.valueName);
    },
    // 显示编辑模式（span触发） 显示模式 - 编辑模式
    showEdit(row, index) {
      // 显示编辑模式
      row.isEdit = true
      // 让编辑模式有显示值
      this.attr.valueName = row.valueName
      this.$nextTick(() => {
        // 让input聚焦
        this.$refs[index].focus()
      })
    },
    // 删除属性值
    delAttrValue(index) {
      this.attrValueList.splice(index, 1)
    },
    // 添加属性
    addAttr() {
      const {
        attrValueList,
        attr: { attrName }
      } = this
      // 判断是否有属性名
      this.$refs.form.validate(async valid => {
        if (!valid) return
        // 判断至少有一个属性值
        if (!attrValueList.length) {
          this.$message({
            type: 'error',
            message: '请添加至少一个属性值'
          })
          return
        }
        // 都有才添加
        const attr = {
          attrName: attrName,
          attrValueList: attrValueList,
          categoryId: this.category3Id,
          categoryLevel: 3
        }

        await reqSaveAttr(attr)

        this.cancel()
      })
    },
    cancel() {
      // 清空数据
      this.attrValueList = []
      this.attr = {
        attrName: '',
        valueName: ''
      }
      // 去attrList组件
      this.$emit('updateIsShowAttrList', true)
    }
  }
}
</script>

<style scoped>
/* 扩大点击区域 */
.attr-value-text {
  display: block;
}
</style>
