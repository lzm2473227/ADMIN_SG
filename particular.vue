<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回</span></div>
        <!--<div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div>--!>
        <div class="print" @click="forward"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="">
        <div class="table-title">
          <p>公司基本信息表</p>
        </div>
        <table border="1" class="">
            <tr>
            <td class="table-left">公文标题</td>
            <td class="table-right" colspan="5">
              <input type="text" placeholder="请输入公文标题" v-model="form.fileTitle" disabled/>
            </td>
          </tr>
          <tr>
            <td class="table-left">公文编号</td>
            <td class="table-right">
              <input type="text" placeholder="请输入公文编号" v-model="form.fileCode" disabled/>
            </td>
            <td class="table-left">公文呈报人</td>
            <td class="table-right">
              <input type="text" placeholder="请输入公文呈报人" v-model="form.name" disabled/>
            </td>
            <td class="table-left">所在部门</td>
            <td class="table-right">
              <input type="text" placeholder="请输入所在部门" v-model="form.depname" disabled/>
            </td>
          </tr>
          <tr>
            <td class="table-left">办文时限</td>
            <td class="table-right">
              <input type="text" placeholder="请输入办文时限" v-model="form.limitTime" disabled/>
            </td>
            <td class="table-left">呈报时间</td>
            <td class="table-right">
              <input type="text" placeholder="请输入呈报时间" v-model="form.reportTime" disabled/>
            </td>
            <td class="table-left">备注</td>
            <td class="table-right">
              <input type="text" placeholder="请输入备注" v-model="form.fileRemark" disabled/>
            </td>
          </tr>
          <tr>
            <td class="table-left">公文主件</td>
            <td class="table-right" colspan="5">
                <div class="file-button">
                    <button type='button'><img src="@/assets/images/file-print.png" alt="">打印公文</button>
                </div>
                <div class="file-content"><span>暂无公文内容</span></div>
            </td>
          </tr>
          <tr>
            <td class="table-left">公文附件</td>
            <td class="table-right" style="padding-top: 12px;height:100px;" colspan="5">
                <div class="file-button">
                    <button type='button'><img src="@/assets/images/file-load.png" alt="">打包下载</button>
                </div>
                <div class="file-content"><span>暂无公文内容</span></div>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">办理意见</td>
            <td class="table-right" colspan="5">
              <el-table
                  id="printJS-table"
                  ref="singleTable"
                  :data="table"
                  style="width: 100%;"
                  highlight-current-row
                  @selection-change="handleSelectionChange"
              >
                  <el-table-column prop="index" label="办理顺序" align="center" sortable width="120"></el-table-column>
                  <el-table-column prop="handleTime" label="办理时间" align="center" show-overflow-tooltip sortable></el-table-column>
                  <el-table-column prop="telNum" label="办理人" align="center" sortable width="150"></el-table-column>
                  <el-table-column prop="verdict" label="办理意见" align="center" sortable width="170" show-overflow-tooltip></el-table-column>
              </el-table>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div class="pay-dialog" v-show="isForward">
      <div class="dialog-content forward-con">
        <div class="dialog-top">
          <span>公文流转情况</span>
          <img @click="isForward = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="pri"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div>
        <div class="dialog-body">
          <span id="title">公布内容</span>
          <div v-for="(item,index) in items" :key="index" class="action">
            {{item.name}}: {{water.createTime}}的时候{{item.action}}<br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { jsonp } from 'vue-jsonp'
import moment from 'moment'
export default {
  name: "Particular",
  components: {
    
  },
  data() {
    return {
      form: {
        fileTitle:"",
        fileCode:"", //编号
        fileName:"", //呈报人
        reportTime:"", //呈报时间
        limitTime:"",//办文时限时间
        fileRemark:"",//备注
        fileMain:"",//公文主件
        fileSubjoin:"",//公文附件
        fileIdea:"",//您的意见
        id:"",
        name:"",//为了不报错
      },
      table:[],
      isDialog: false,
      isForward:false,
      radio: 3,
      water :{
        action:"",  //流水动作
        name:"" ,    //姓名
        createTime:"" ,  //流水时间
      },
      items:[]
    };
  },
  mounted() {
    this.getdata()
  },
  methods: {
    //查看流水
    async forward(){
      this.isForward = true
      let id = this.$route.query.id
      let data = {
          "object":{
            "documentId":id,
            } 
          }
      let res = await this.$API.OA.getState(data)
      this.items = res.data
      // this.water.action = res.data.action
      // this.water.name = res.data.name
      _.forEach(res.data,(item,key)=>{
        // console.log(item);
        this.water.action = item.action
        this.water.name = item.name
        this.water.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")
      })
      console.log(res);
    },
    onSure(){},
    async getdata() {
      let data = {
        "object":{"documentId":this.$route.query.id} 
      }
      let res = await this.$API.OA.editFile(data)
      console.log(res);
      this.form.fileCode = res.data.documentNumber;
      this.form.fileTitle = res.data.title;
      this.form.limitTime = res.data.limitTime;
      this.form.reportTime = res.data.reportTime;
      this.form.fileRemark = res.data.remark;
      this.table = res.data.list
      _.forEach(res.data.list, function(item, key){
        item.index = key+1
        item.handleTime = moment(item.handleTime).format("YYYY-MM-DD HH:mm:ss");
        if(item.verdict == 0) return item.verdict = "同意"
        if(item.verdict != 0) return item.verdict = "不同意"
      })
      this.form.name = this.$store.state.user.name
      this.form.depname = this.$store.state.user.depname
      res.data.reporter = this.$store.state.user.name
      res.data.deptName = this.$store.state.user.depname
    },
    changeOrg(val){
      let len = val.length-1
      this.orgId = val[len]
      this.orgName = this.$refs["cascader"].getCheckedNodes()[0].label
    },
    toBackList() {
      this.$router.go(-1);
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
@import "@/styles/image3.scss";
.table-main .table-title{
    width: 775px;
}
.table-main table .table-right{
    width: 168px;
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
    .file-button{
        display: flex;
        button{
            margin-right: 8px;
            padding: 4px 8px;
            border: none;
            border-radius: 2px;
            background: #438AFE;
            color: #fff;
            outline: none;
            cursor: pointer;
            display: flex;
        }
        img{
            margin-right: 5px;
        }
    }
    .file-content{
        padding: 8px 6px;
        margin-top: 8px;
        margin-bottom: 4px;
        background: #F5F5F5;
        color: #438AFE;
        font-size: 14px;
        span{
            cursor: pointer;
        }
    }
    // 弹窗样式
    .dialog-content{
        width: 480px;
    }
    /deep/.dialog-content .dialog-body{
      position: relative;
        padding: 16px;
        height: 600px;
        display: flex;
        overflow: auto;
        padding: 16px;
        height: 600px;
        flex-direction: column;
        .el-radio-group{
            display: block;
            label{
                display: block;
                margin-bottom: 10px;
            }
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
    .forward-con{
      width: 700px;
    }
    .groupTree{
      width: 220px;
      height: 406px;
      background: #F5F8FF;
      border: 1px solid #D5D8DE;
    }
    .dialog-content .dialog-body .acc{
      width: 220px;
      height: 406px;
      background: #FFF;
      border: 1px solid #D5D8DE;
      button{
        width: 64px;
        height: 28px;
        background: #438AFE;
        border-radius: 2px;
        padding: 0;
        border: 0;
        font-size: 12px;
        color: white;
        font-weight: bold;
      }
    }
    /deep/.el-tree{
      background: #F5F8FF;
    }
    .but-outer{
      height: 45px;
      padding: 8px 10px;
      border-bottom: 1px solid #D5D8DE;
    }
    .pri{
      display: flex;
      background-color: #F6F6F6;
      height: 38px;
      align-items: center;
      padding-left: 15px;
      font-size: 14px;
    }
    .dialog-body #title{
      width: 80px;
      height: 21px;
      font-size: 18px;
      font-family: Microsoft YaHei;
      font-weight: bold;
      line-height: 21px;
      color: #333333;
      margin: 0 auto;
    }
    .table-right /deep/.el-table{
      width: 671px !important;
    }
    /deep/.el-table th{
      padding: 1px 0 !important;
    }
    /deep/.el-table td{
      padding: 2px 0;
    }
    .action{
      width: 100%;
      height: 30px;
      display: block;
      padding: 8px;
    }
</style>