<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="onAdd()"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">新增产品</span></div>
        <div class="print" @click="onAdd('1')" ><img class="icon" src="@/assets/images/edit.png" alt=""><span class="axis">编辑产品</span></div>
        <div class="print" @click="del()"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">删除产品</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
        <div class="print"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <!-- <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup"> -->
        </div>
      </div>
    </div>
    <div class="tab-body inside-table">
      <el-table
        ref="multipleTable2"
        :data="tabledata"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column label="产品条形码" align="center" sortable width="190">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd('2', scope.row.barcode)">{{scope.row.barcode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="产品名称" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="specsParameter" label="规格" sortable show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="brandName" label="品牌名称" sortable show-overflow-tooltip width="160"></el-table-column>
        <el-table-column prop="ceView" label="产品类目" sortable show-overflow-tooltip width="160"></el-table-column>
        <el-table-column label="产品图片" align="center" sortable width="160">
          <template v-slot="scope">
            <el-image class="preview-img" style="height: 20px" :src="scope.row.filePath" @click="onPre(scope.row)"></el-image>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <!-- <div class="inp-bot search-set">
      <div class="search-ipt">
        <span class="ipt-left">类别名称</span>
        <input type="text" placeholder="请输入类别名称" v-model="ruleForm.like">
      </div>
      <div class="search-btn">
        <button>查询</button>
        <button class="reset-btn">重置</button>
      </div>
    </div> -->
    <!-- 品牌弹窗 -->
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>添加品牌</span>
          <img @click="isDialog = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body table-main" style="padding: 10px;">
          <form action="">
            <table border="1" class="" style="width: 100%; font-size: 14px;">
              <tr>
                <td class="table-left">品牌编号</td>
                <td class="table-right">
                  <span v-if="ruleForm.code">{{ruleForm.code}}</span>
                  <span v-else>系统分配</span>
                </td>
                <td class="table-left">品牌名称 (中文)</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌名称 (中文)" v-model="ruleForm.brandName" />
                </td>
              </tr>
              <tr>
                <td class="table-left">品牌名称 (英文)</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌名称 (英文)" v-model="ruleForm.brandEnName" />
                </td>
                <td class="table-left">备注事项</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入备注事项" v-model="ruleForm.remark" />
                </td>
              </tr>
              <tr>
                <td class="table-left">品牌介绍</td>
                <td class="table-right" colspan="3">
                  <textarea
                    class="table-item"
                    placeholder="此段文字是关于经营范围的相关描述"
                    v-model="ruleForm.introduction"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td class="table-left">品牌Logo</td>
                <td class="table-right" colspan="3">
                  <div style="display: flex;">
                    <el-upload
                      class="avatar-uploader photos-card store-avatar"
                      action="http://14.29.162.130:6602/image/imageUpload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="logo" :src="logo" class="avatar">
                      <i v-else class="avatar-uploader-icon">
                        <img src="@/assets/images/upload.png" alt="">
                        <span>请上传品牌Logo</span>
                      </i>
                    </el-upload>
                  </div>
                  <span class="pic-tip">建议上传图片尺寸为：<span>100×100px，</span>图片格式为：<span>JPEG、PNG</span></span>
                </td>
              </tr>
            </table>
          </form>
        </div>
        <div class="scan-code">
            <button class="sure" @click="onSure">确定</button>
            <button @click="isDialog = false">取消</button>
          </div>
      </div>
    </div>
</div>
</template>
<script>
import Page from '@/components/pages/index.vue'
export default {
  name: "commodity1",
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      centerDialogVisible: false,  //弹出框开关
      centerDialogVisible2: true,  //弹出框开关
      textarea: "",
      tabledata: [],   //列表数据
      value: [],    /* 选中的标签 */
      // total: "",
      fileList:[],
      ruleForm: {
        "brandEnName": "",
        "brandName": "",
        "code": "",
        "enterpriseId": "",
        "id": "",
        "introduction": "",
        "logo": "",
        "remark": ""
      },
      multipleSelection:[],
      imgArr:[],
      isDialog: false,
      logo: ''
    };
  },
  components: {
    Page
  },
  mounted(){
    this.getdata()
  },
  methods:{
    onAdd(val, data) {
      if(val){
        let barcode = ''
        if(val === '1'){
          if(this.multipleSelection.length != 1) return this.$message('请选择编辑的产品')
          barcode = this.multipleSelection[0].barcode
        }
        if(val === '2'){
          barcode = data
        }
        this.$router.push({
          path: "/produce/productInfo/productListInfo",
          query: {
            barcode: barcode,
          },
        });
      } else{
        this.$router.push({path: "/produce/productInfo/productListInfo"});
      }
    },
     del(){
       let barcode = []
      if(this.multipleSelection.length < 1) return this.$message('请选择一个需要删除的产品')
      this.multipleSelection.forEach(item => {
        barcode.push(item.barcode)
      })
      var data = {
        "object": {
          "barcode": barcode,
          "enterpriseId": this.$store.state.user.enterpriseId
        },
      };
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async ()=>{
      let res = await this.$API.code.deleteProductionCommodity(data)
      if(res.code !== 'SUCCESS') return false
      this.$message.success("删除产品成功");
      this.getdata()
      }) 
    },
    async getdata() {
      let data = {
        "object": {
          "enterpriseId": this.$store.state.user.enterpriseId
        },
        "pageNum": this.pageNum,
        "pageSize": this.pageSize
      }
      let res = await this.$API.code.productionCommodityList(data)
      if(res.code !== 'SUCCESS') return false
      let len = []
      this.total = res.total;
      // 序号倒序排列
      let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
        return index+1;
      })
      arr = arr.reverse()
      len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
      _.forEach(res.data, function (item, key) {
        item.index = len[key]
      });
      this.tabledata = res.data;
    },
    async onSure(){
      this.ruleForm.logo = this.logo
      this.ruleForm.enterpriseId = this.$store.state.user.enterpriseId
      let data = {
        "object": this.ruleForm
      }
      let res = await this.$API.code.addBrandInfo(data)
      if(res.code !== 'SUCCESS') return false
      this.$message.success('新增品牌成功')
      this.ruleForm = {}
      this.isDialog = false
      this.getdata()
    },
    edit(val, id){
      if(val === '1'){
        if(this.multipleSelection.length != 1) return this.$message('请选择一个需要编辑的品牌')
      }
      this.isDialog = true
      if(val === '2'){
        if(id){
          let data = {
            "object": {
              "id": id
            }
          }
          this.$API.code.findBrandInfoById(data).then(res => {
            if(res.code !== 'SUCCESS') return false
            this.ruleForm = res.data
            this.logo = res.data.logo
          })
        }
      }
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (file.type != 'image/jpeg' && file.type != 'image/png') {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false
      }
    },
    handleAvatarSuccess(res, file) {
        this.logo = res.data
    },
    //分页
    changeCurrentPage(val) {
      this.pageNum = val
      this.getdata()
    },
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/reset.scss';
@import "@/styles/image1.scss";
/deep/.el-form-item--small .el-form-item__content{
 margin-left: 0;
}
/deep/.inside-table .el-table .el-table__header th{
  padding: 5px 0;
}
/deep/.inside-table .el-table .el-table__body td{
  padding: 2px 0;
}
/deep/.dialog-footer button{
  width: 100px;
  height: 40px;
  background: #438AFE;
  opacity: 1;
  border-radius: 2px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #FFFFFF;
}
/deep/.dialog-footer button:last-of-type{
  width: 100px;
  height: 40px;
  background: #FAFCFE;
  border: 1px solid #BBCBDF;
  opacity: 1;
  border-radius: 2px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #333333;
}
/deep/.el-form-item__label{
  height: 21px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #666666;
  opacity: 1;
}
/deep/.el-input__inner{
  width: 420px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
  opacity: 1;
  border-radius: 2px;
}
/deep/.el-form-item{
  margin-top: 16px;
}
/deep/.el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 25px 10px;
}
.imgs-title{
  width: 150px;
  height: 150px;
}
.dialog-content{
    width: 680px;
    background: #fff;
  }
.dialog-top{
  span{
    font-size: 16px;
    letter-spacing: 1px;
  }
  img{
    cursor: pointer;
  }
}
.dialog-content .dialog-body{
  input{
    width: 380px;
    height: 44px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 2px;
    outline: none;
  }
  
}
.scan-code{
  text-align: center;
  background: #F8F8F8;
  padding: 18px 0;
  button{
    height: 36px;
    padding: 0 20px;
    background: #FAFCFE;
    border: 1px solid #BBCBDF;
    border-radius: 2px;
    color: #333;
    outline: none;
    cursor: pointer;
  }
  .sure{
    margin-right: 20px;
    background: #438AFE;
    border: 1px solid #438AFE;
    color: #fff;
  }
}
.table-main table .table-right{
  width: 248px;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    color: #8c939d;
    width: 120px;
    height: 125px;
    // line-height: 120px;
    span{
      padding-top: 10px;
      font-style:normal;
      font-size: 12px;
      color: #999;
    }
  }
  .photos-card{
    width: 140px;
    height: 96px;
    background: #F8F8F8;
    border: 1px dashed #ddd;
    border-radius: 4px;
    .avatar-uploader-icon{
      width: 140px;
      height: 96px;
    }
    .avatar {
      width: 138px;
      height: 94px;
      display: block;
  }
  }
  .pic-tip{
    display: inline-block;
    padding: 8px 0;
    color: #999;
    span{
      color: #384F71;
    }
  }
  .store-avatar{
    width: 100px;
    height: 100px;
    .avatar-uploader-icon{
      width: 100px;
      height: 100px;
    }
    .avatar {
      width: 98px;
      height: 98px;
      display: block;
    }
  }
</style>
