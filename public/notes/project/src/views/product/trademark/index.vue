<template>
  <el-card class="container">
    <el-button type="primary" @click="showSaveTrademark">添加品牌</el-button>

    <el-table
      v-loading="loading"
      :data="trademarkList"
      border
      class="container-table"
    >
      <el-table-column label="序号" width="50" type="index" align="center" />
      <el-table-column prop="tmName" label="品牌名称" />
      <el-table-column label="品牌LOGO">
        <!--
          可以通过作用域插槽，给当前列传递数据
            slotScoped.$index 下标
            slotScoped.row 当前行数据
         -->
        <template v-slot="{ row }">
          <img class="trademark-img" :src="row.logoUrl" :alt="row.tmName" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-button
            type="warning"
            icon="el-icon-edit"
            @click="showUpdateTrademark(row)"
          >
            修改
          </el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="delTrademark(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

    <el-dialog
      :title="`${isUpdateTrademark ? '修改' : '添加'}品牌`"
      :visible.sync="visible"
    >
      <!-- body -->
      <el-form ref="form" :model="trademark" label-width="100px" :rules="rules">
        <el-form-item label="品牌名称" prop="tmName">
          <el-input v-model="trademark.tmName" />
        </el-form-item>
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <!--
            图片上传组件
              action 上传的服务器地址
                action="http://39.98.123.211/admin/product/fileUpload"
                action="/dev-api/admin/product/fileUpload" 走代理服务器，转发目标服务器
                :action="`${process.env.VUE_APP_BASE_API}/admin/product/fileUpload`"
              show-file-list 是否可以上传多张图片
              on-success 上传图片成功触发回调
                最终得到图片在线地址，想办法显示
              before-upload 上传之前触发的回调
                限制图片大小和格式
              accept 可以接受上传文件的格式
          -->
          <el-upload
            class="avatar-uploader"
            :action="`${baseAPI}/admin/product/fileUpload`"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            accept="image/jpeg,image/png"
          >
            <img
              v-if="trademark.logoUrl"
              :src="trademark.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- footer -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdateTrademark">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import {
  reqGetTrademarkList,
  reqSaveTrademark,
  reqRemoveTrademark,
  reqUpdateTrademark
} from '@/api/product/trademark'

export default {
  name: 'Trademark',
  data() {
    return {
      currentPage: 1,
      pageSize: 3,
      total: 100,
      trademarkList: [],
      loading: false,
      visible: false,
      trademark: {
        tmName: '',
        logoUrl: ''
      },
      baseAPI: process.env.VUE_APP_BASE_API,
      // 表单校验规则
      rules: {
        tmName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' }
        ],
        logoUrl: [
          { required: true, message: '请上传品牌LOGO', trigger: 'change' }
        ]
      },
      isUpdateTrademark: false
    }
  },
  mounted() {
    this.getTrademarkList(this.currentPage, this.pageSize)
  },
  methods: {
    async getTrademarkList(currentPage, pageSize) {
      this.loading = true
      const res = await reqGetTrademarkList(currentPage, pageSize)
      // console.log(res);
      this.trademarkList = res.records
      this.total = res.total
      this.loading = false
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getTrademarkList(this.currentPage, pageSize)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getTrademarkList(currentPage, this.pageSize)
    },
    // 上传成功触发的回调
    handleAvatarSuccess(res) {
      // console.log(res, file);
      this.trademark.logoUrl = res.data
      // this.imageUrl = URL.createObjectURL(file.raw);
      // 清空图片表单校验结果
      this.$refs.form.clearValidate(['logoUrl'])
    },
    // 上传之前触发的回调
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
    // 添加或修改品牌
    addOrUpdateTrademark() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          // console.log("表单校验成功~");
          const { tmName, logoUrl } = this.trademark

          const { isUpdateTrademark } = this

          if (isUpdateTrademark) {
            // this.trademark 新值
            // this.trademarkList.find(tm => tm.id === this.trademark.id) 旧值
            await reqUpdateTrademark(this.trademark)
          } else {
            await reqSaveTrademark(tmName, logoUrl)
          }

          this.$message({
            type: 'success',
            message: `${isUpdateTrademark ? '修改' : '添加'}品牌成功~`
          })
          // 更新页面数据
          this.getTrademarkList(this.currentPage, this.pageSize)
          this.visible = false
        }
      })
    },
    // 显示添加品牌对话框
    showSaveTrademark() {
      this.isUpdateTrademark = false
      this.visible = true
      // 清空表单
      // ES11 可选链
      // 清空表单校验结果
      this.$refs.form?.clearValidate()
      // 清空数据
      this.trademark = {
        tmName: '',
        logoUrl: ''
      }
    },
    // 显示修改品牌对话框
    showUpdateTrademark(row) {
      this.isUpdateTrademark = true
      this.visible = true
      // 赋值，因为双向数据绑定，页面出现数据
      // 如果直接赋值，是同一个对象，当修改数据时，trademarkList数据也变化了
      this.trademark = { ...row }

      this.$refs.form?.clearValidate()
    },
    // 删除品牌
    delTrademark(tm) {
      const that = this
      // 解决eslint报错
      async function fn() {
        // 发送请求删除tm
        await reqRemoveTrademark(tm.id)

        that.$message({
          type: 'success',
          message: '删除成功!'
        })
        // 如果是最后一页删除最后一条，去上一页
        if (that.trademarkList.length === 1 && that.currentPage > 1) {
          that.currentPage--
        }
        // 更新页面数据
        that.getTrademarkList(that.currentPage, that.pageSize)
      }

      this.$confirm(
        `您确认要删除 <span style="color: red;">${tm.tmName}</span> 品牌数据吗?`,
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          dangerouslyUseHTMLString: true // 使用html
        }
      ).then(fn)
    }
  }
}
</script>

<style lang="sass">
.trademark-img
  width: 150px
  height: 100px

.avatar-uploader .el-upload
  border: 1px dashed #d9d9d9
  border-radius: 6px
  cursor: pointer
  position: relative
  overflow: hidden
  &:hover
    border-color: #409EFF

  .avatar-uploader-icon
    font-size: 28px
    color: #8c939d
    width: 178px
    height: 178px
    line-height: 178px
    text-align: center

  .avatar
    width: 178px
    height: 178px
    display: block
</style>
