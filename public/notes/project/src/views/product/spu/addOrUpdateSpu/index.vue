<template>
  <el-card class="container">
    <el-form label-width="80px" :model="spu" :rules="rules" ref="form">
      <el-form-item label="SPU名称" prop="spuName">
        <el-input placeholder="请输入SPU名称" v-model="spu.spuName"></el-input>
      </el-form-item>
      <el-form-item label="SPU品牌" prop="tmId">
        <el-select placeholder="请选择SPU品牌" v-model="spu.tmId">
          <el-option
            v-for="tm in trademarkList"
            :key="tm.id"
            :label="tm.tmName"
            :value="tm.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="SPU描述" prop="description">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入SPU描述"
          v-model="spu.description"
        ></el-input>
      </el-form-item>
      <el-form-item label="SPU图片" prop="spuImageList">
        <el-upload
          :action="`${baseAPI}/admin/product/fileUpload`"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          accept="image/jpeg,image/png"
          :class="{
            'spu-img-upload': spu.spuImageList.length >= 10
          }"
        >
          <i class="el-icon-plus"></i>
          <div class="el-upload__tip" slot="tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible" width="30%">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性" prop="spuSaleAttrList">
        <el-select
          :placeholder="`还剩${baseSaleAttrList.length}个销售属性`"
          v-model="baseSaleAttr"
        >
          <el-option
            v-for="saleAttr in baseSaleAttrList"
            :key="saleAttr.id"
            :label="saleAttr.name"
            :value="`${saleAttr.id}:${saleAttr.name}`"
          ></el-option>
        </el-select>
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!baseSaleAttr"
          @click="addSaleAttr"
        >
          添加销售属性值
        </el-button>
        <el-table :data="spu.spuSaleAttrList" border class="container-table">
          <el-table-column label="序号" width="50" type="index" align="center">
          </el-table-column>
          <el-table-column prop="saleAttrName" label="属性名" width="100">
          </el-table-column>
          <el-table-column label="属性值列表">
            <template v-slot="{ row, $index }">
              <el-tag
                class="spu-tag"
                v-for="(saleValue, index) in row.spuSaleAttrValueList"
                :key="saleValue.saleAttrValueName"
                closable
                @close="delSaleValue(row.spuSaleAttrValueList, index)"
              >
                {{ saleValue.saleAttrValueName }}
              </el-tag>
              <el-button
                v-show="!row.isEdit"
                size="mini"
                icon="el-icon-plus"
                @click="showEdit(row, $index)"
                >添加属性值</el-button
              >
              <el-input
                class="spu-edit"
                :ref="$index"
                v-show="row.isEdit"
                size="mini"
                placeholder="请输入属性值"
                v-model="attrValue"
                @blur="setAttrValue(row)"
                @keyup.enter.native="$event.target.blur"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template v-slot="{ row, $index }">
              <el-tooltip
                content="删除销售属性"
                placement="top"
                slot="reference"
              >
                <el-button
                  @click="delSaleAttr(row, $index)"
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import { reqGetAllTrademarkList } from '@/api/product/trademark'
import { reqGetBaseSaleAttrList, reqSaveSpu } from '@/api/product/spu'

export default {
  name: 'AddOrUpdateSpu',
  async mounted() {
    // this.trademarkList = await reqGetAllTrademarkList();
    // this.baseSaleAttrList = await reqGetBaseSaleAttrList();
    /*
      new Promise() 返回一个promise实例对象
      Promise.resolve() 返回一个promise对象
        状态默认是成功的，
        如果接受一个失败状态promise对象，状态就是失败的
      Promise.reject()  返回一个失败的状态promise对象

      Promise.all([promise1, promise2, ...]) 返回值是一个promise对象
        当数组的promise对象全部成功，才会是成功状态，结果值是一个数组，数组里面是各个promise的返回值
        当数组的promise对象有一个失败，就会是失败状态，结果值就是失败原因

      Promise.allSettled([promise1, promise2, ...]) 返回值是一个promise对象
        状态一定是成功状态，结果值是一个数组，数组里面是各个promise的返回值（可以是成功，也可以是失败）
    */
    const [trademarkListRes, baseSaleAttrListRes] = await Promise.allSettled([
      reqGetAllTrademarkList(),
      reqGetBaseSaleAttrList()
    ])

    if (trademarkListRes.status === 'fulfilled') {
      this.trademarkList = trademarkListRes.value
    } else {
      this.$message({
        type: 'error',
        message: '获取品牌数据失败'
      })
    }

    if (baseSaleAttrListRes.status === 'fulfilled') {
      this.baseSaleAttrList = baseSaleAttrListRes.value
    } else {
      this.$message({
        type: 'error',
        message: '获取销售属性数据失败'
      })
    }
  },
  data() {
    const validator = (rule, value, callback) => {
      /*
        rule 规则名称 包含字段
        value 校验值的情况
        callback 必须要调用
          callback() 通过
          callback(xxx) 失败
      */
      if (!this.spu.spuSaleAttrList.length) {
        callback('请添加至少一个销售属性')
        return
      }

      // 每个销售属性都要添加至少一个属性值
      const hasSpuSaleAttrValueList = this.spu.spuSaleAttrList.every(
        saleAttr => !!saleAttr.spuSaleAttrValueList.length
      )

      if (!hasSpuSaleAttrValueList) {
        callback('每个销售属性都要添加至少一个属性值')
        return
      }

      // 校验通过
      callback()
    }

    return {
      // 预览图片地址
      dialogImageUrl: '',
      dialogVisible: false,
      // 上传图片接口前缀
      baseAPI: process.env.VUE_APP_BASE_API,
      spu: {
        spuName: '', // 名称
        tmId: '', // 品牌
        description: '', // 描述
        spuImageList: [], // 图片
        spuSaleAttrList: [] // 销售属性
      },
      // 选中的销售属性
      baseSaleAttr: '',
      // 临时的属性值
      attrValue: '',
      rules: {
        spuName: [
          { required: true, message: '请输入SPU名称', trigger: 'blur' }
        ],
        tmId: [{ required: true, message: '请选择SPU品牌', trigger: 'change' }],
        description: [
          { required: true, message: '请输入SPU描述', trigger: 'blur' }
        ],
        spuImageList: [{ required: true, message: '请上传SPU图片' }],
        spuSaleAttrList: [
          {
            required: true,
            validator: validator,
            trigger: 'blur'
          }
        ]
      },
      trademarkList: [],
      baseSaleAttrList: []
    }
  },
  computed: {
    ...mapState('category', ['category3Id'])
  },
  methods: {
    // 上传图片成功触发的回调
    handleAvatarSuccess(res, file) {
      // 保存数据
      this.spu.spuImageList.push({
        imgName: file.name,
        imgUrl: res.data
      })
      // this.trademark.logoUrl = res.data;
      // 清空图片表单校验结果
      this.$refs.form.clearValidate(['spuImageList'])
    },
    // 上传图片之前触发的回调
    beforeAvatarUpload(file) {
      // file 上传的图片文件信息
      // file.type 文件类型
      const validFileType = ['image/jpeg', 'image/jpg', 'image/png']
      const isValidFileType = validFileType.indexOf(file.type) > -1
      // file.size 文件大小
      const isLt = file.size / 1024 < 500

      if (!isValidFileType) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt) {
        this.$message.error('上传头像图片大小不能超过 500KB!')
      }
      // 返回值 true 可以上传
      // 返回值 false 不会上传
      return isValidFileType && isLt
    },
    // 删除图片
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      // 将数据删除
      this.spu.spuImageList = this.spu.spuImageList.filter(
        img => img.imgUrl !== file.response.data
      )
    },
    // 预览图片
    handlePictureCardPreview(file) {
      // file：当前点击的这个图片文件
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 添加销售属性
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.baseSaleAttr.split(':')
      // 1. 给table添加一行数据
      this.spu.spuSaleAttrList.push({
        baseSaleAttrId,
        saleAttrName,
        // 为了后面能添加属性值
        spuSaleAttrValueList: []
      })
      // 2. 销售属性列表要删除一个
      this.baseSaleAttrList = this.baseSaleAttrList.filter(
        saleAttr => saleAttr.id !== +baseSaleAttrId
      )

      // 清空，让select不要选中值了
      this.baseSaleAttr = ''
    },
    // 删除销售属性
    delSaleAttr(row, index) {
      // 删除销售属性
      this.spu.spuSaleAttrList.splice(index, 1)
      // 将删除的销售属性添加回之前的销售属性列表
      this.baseSaleAttrList.push({
        id: +row.baseSaleAttrId,
        name: row.saleAttrName
      })

      this.baseSaleAttrList.sort((a, b) => a.id - b.id)
    },
    // 显示编辑模式
    showEdit(row, index) {
      // 不是响应式
      // row.isEdit = true;
      // 设置响应式数据
      this.$set(row, 'isEdit', true)
      this.$nextTick(() => {
        this.$refs[index].focus()
      })
    },
    // 设置属性值
    setAttrValue(row) {
      const { attrValue } = this
      if (attrValue) {
        // 给当前行属性值列表添加属性值
        row.spuSaleAttrValueList.push({
          saleAttrValueName: attrValue,
          baseSaleAttrId: +row.baseSaleAttrId,
          saleAttrName: row.saleAttrName
        })
        // 有值才清空
        this.attrValue = ''
      }
      // 编辑模式 - 显示模式
      row.isEdit = false
    },
    // 删除属性值
    delSaleValue(saleAttrValueList, index) {
      saleAttrValueList.splice(index, 1)
    },
    async submit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          const { category3Id } = this
          const {
            spuName,
            tmId,
            description,
            spuImageList,
            spuSaleAttrList
          } = this.spu

          const data = {
            category3Id,
            description,
            spuImageList,
            spuName,
            spuSaleAttrList,
            tmId
          }

          await reqSaveSpu(data)

          this.$message({
            type: 'success',
            message: '添加SPU成功~'
          })

          this.cancel()
        }
      })
    },
    cancel() {
      // 因为v-if，卸载组件
      // 清空数据
      // 清空表单项
      // this.$refs.form.resetFields();
      // 返回到上一个组件
      this.$emit('updateIsShow', 1)
    }
  }
}
</script>

<style scoped>
.spu-edit {
  width: 150px;
}
.spu-tag {
  margin-right: 10px;
}
</style>
