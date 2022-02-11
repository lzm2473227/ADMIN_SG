<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="getCreateTemplate()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印列表</span></div> -->
        <!-- <div class="print"><img class="icon" src="@/assets/images/derive.png" alt="" /><span class="axis">导出表格</span></div> -->
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="">
        <div class="table-title">
          <p>公文模板</p>
        </div>
        <table border="1" class="">

          <tr>
            <td class="table-left">模板编号</td>
            <td class="table-right">
              <input type="text" placeholder="" v-model="form.id" />
            </td>
            <td class="table-left">创建人</td>
            <td class="table-right">
              <input type="text" placeholder="" v-model="form.reportName" />
            </td>
          </tr>

          <tr>
            <td class="table-left">模板名称</td>
            <td class="table-right">
              <input type="text" placeholder="请输入模板名称" v-model="form.templateName" />
            </td>
            <td class="table-left">所在部门</td>
            <td class="table-right">
              <input type="text" placeholder="" v-model="form.reporterDept" />
            </td>
          </tr>

          <tr style="vertical-align: top;">
            <td class="table-left" style="height:692px;vertical-align: top;padding:14px">模板内容</td>
            <td class="table-right" colspan="3" style="vertical-align: top;padding:10px">
             <div class="file-button">
               <!-- <div class="outerBut"> -->
                 <!-- <img src="@/assets/images/file-add.png" alt=""> -->
                 <el-upload
                  class="upload-demo"
                  action="http://14.29.162.130:6604/file/fileUpload"
                  :on-success="handleAvatarSuccess1"
                  :file-list="fileList">
                  <el-button size="small" type="primary">上传附件</el-button>
                </el-upload>
               <!-- </div> -->
              </div>
            </td>
            <!-- <el-cascader
                ref="cascader"
                v-model="orgTreeValue"
                :options="orgTreeOption"
                :props="{ value: 'id', label: 'name', children: 'subList', checkStrictly: true }"
                @change="changeOrg()"
                placeholder="请选择组织"
            ></el-cascader> -->
          </tr>

        </table>
      </form>
    </div>
    
  </div>
</template>
<script>
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  name: "AddFileModule",
  data() {
    return {
      centerDialogVisible:false,
      optionsValue: [],
      optionsOrg: [],
      roleTreeData: [],
      defaultChecked: [],
      defaultCheckedTree: [],
      groupTree: [],
      defaultProps: {
        children: "subList",
        label: "name",
        value:"id"
      },
      options: regionData,
      optionss: [],
      selectedOptions: [],
      form: {
        url:"",
        templateName:"",
        id:"",
        reportName:"",   //创建模板人姓名
        reporterDept:"",  //模板创建人所在部门
      },
      file:"",
      fileList:[],
      // setKesLabel:{
      //   value:'id',
      //   label:'name',
      //   children:'subList',
      //   checkStrictly: true
      // },
      // orgTreeOption:[],
      // orgTreeValue:"",
    };
  },
  mounted() {
    this.getdata()
    // this.getOrg()
  },
  methods: {
    // 组织
    // async getOrg(){
    //   let params = {}
    //   let res = await this.$API.orgSet.findAllOrgTree_Org(params)
    //   console.log(res);
    //   this.orgTreeOption = res.data
    //   // console.log(this.orgTreeOption);
    // },
    async getCreateTemplate(){
      let data = {
         "object": {
          "templateName": this.form.templateName,
          "url": this.form.url
        }
      }
      let res = await this.$API.OA.createTemplate(data)
      console.log(res);
      this.$router.push("fileModuleList")
    },
    //详情
    async getdata(){
      if(this.$route.query.id){
        let id = this.$route.query.id
      let data = {
         "object": {
          "id": id
        },
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.OA.templateList(data)
      this.form.reportName = res.data[0].reportName
      this.form.id = res.data[0].id
      this.form.templateName = res.data[0].templateName
      this.form.reporterDept = this.$store.state.user.deptName
      console.log(res);
      }
    },
    //附件文件
    handleAvatarSuccess1(res, file) {
      this.file = res.data;
      this.form.url = res.data; 
      this.form.templateName = file.name; 
      // console.log(res);
      // console.log(file);
    },
    onSure(){},
    toBackList() {
      this.$router.go(-1);
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
    onScope(){
      this.centerDialogVisible= true
      this.getGroupTree() // 获取指定范围数据
    },
    onCancel(){
      this.centerDialogVisible = false
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-cascader .el-input .el-input__inner {
  width: 100%;
  height: 20px;
  line-height: 28px;
  font-size: 12px;
  padding: 4px;
  color: #333;
  outline: none;
}
/deep/.el-input--small{
  line-height: 28px;
}
/deep/.el-cascader--small{
  line-height: 28px;
}
/deep/.el-cascader .el-input .el-input__inner:focus {
  border: 1px solid #ddd;
}
/deep/.el-cascader .el-input__inner::-webkit-input-placeholder {
  color: #ddd;
}
/deep/.el-cascader .el-input__inner::-moz-input-placeholder {
  color: #ddd;
}
/deep/.el-cascader .el-input__inner::-ms-input-placeholder {
  color: #ddd;
}
.time{
  display: flex;
  align-items: center;
  margin: 8px 0 10px 0;
  span{
    color: #384F71;
  }
  /deep/.el-checkbox{
    margin-right: 12px;
    .el-checkbox__input{
      margin-right: 4px;
    }
  }
  /deep/input{
    border: none
  }
}
.table-main table .table-right .business-time select{
  width: 70px;
  margin-right: 10px;
}
.business-time{
  display: flex;
}
@import "@/styles/reset.scss";
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
    width: 120px;
    height: 120px;
    .avatar-uploader-icon{
      width: 120px;
      height: 120px;
    }
    .avatar {
      width: 118px;
      height: 118px;
      display: block;
    }
  }
  .radios{
    display: flex;
    margin-top: 5px;
  }
  /deep/.el-radio__label{
    color: #384F71;
    font-size: 12px;
  }
  .el-tree{
    background: #FFFFFF;
    height: 635px;
    // overflow-y: scroll;
    padding: 10px;
    // box-sizing: border-box;
    border: 1px solid #DEDEDE;
  }
  .groupTree .el-tree{
    height: 470px;
    margin: 16px;
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
  display: block;
  padding: 0;
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
.check1{
  border-bottom: 1px solid #DEDEDE;
  .el-checkbox{
    width: 10%;
    padding: 14px 0;
    text-align: center;
    border-right: 1px solid #DEDEDE;
    border-left: 1px solid #DEDEDE;
  }
  .el-checkbox:first-child{
    border-left: none;
  }
  .check1-text{
    display: inline-block;
    width: 40%;
    padding-left: 20px;
    color: #444;
  }
}
.file-button{
    display: flex;
    button{
        margin-right: 8px;
        padding: 6px;
        border: none;
        border-radius: 2px;
        background: #438AFE;
        color: #fff;
        outline: none;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: bold;
        font-size: 14px;
    }
    img{
        margin-right: 5px;
    }
}
.table-main{
  margin-left: 10px;
  .table-title{
    width: 590px;  
  }
}
.outerBut{
  display: flex;
  background: #438AFE;
  align-items: center;
  img{
    width: 12px;
    height: 12px;
    margin-right: 0px;
    margin-left: 6px;
  }
}
</style>