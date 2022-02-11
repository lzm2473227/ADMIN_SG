<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="getAddFile()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">暂存内容</span></div>
        <div class="print" @click="forward"><img class="icon" src="@/assets/images/agreementForm.png" alt="" /><span class="axis">转发合同</span></div>
        <div class="print" @click="getProcessed"><img class="icon" src="@/assets/images/sure.png" alt="" /><span class="axis">转已办件</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div>
        <div class="print" @click="getstate"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="forward"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台确认</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title">
          <p>合同单</p>
        </div>
        <table border="1" class="">
            <tr>
                <td class="table-left" style="padding: 0;">合同编号(拟)</td>
                <td class="table-right">
                    <input type="text" placeholder="请输入合同编号" v-model="form.fileTitle" />
                </td>
                <td class="table-left">合同说明</td>
                <td class="table-right" colspan="3">
                    <input type="text" placeholder="请输入合同说明" v-model="form.fileTitle" />
                </td>
            </tr>
            <tr>
                <td class="table-left">合同甲方</td>
                <td class="table-right">
                <input type="text" placeholder="请输入合同甲方" v-model="form.fileCode" />
                </td>
                <td class="table-left">合同乙方</td>
                <td class="table-right">
                <input type="text" placeholder="请输入合同乙方" v-model="form.fileName" />
                </td>
                <td class="table-left">合同金额</td>
                <td class="table-right" style="position: relative;">
                <input type="text" placeholder="请输入合同金额" v-model="form.name" />
                <span class="unit">元</span>
                </td>
            </tr>
            <tr>
                <td class="table-left">合同呈报人</td>
                <td class="table-right">
                <input type="text" placeholder="请输入合同呈报人" v-model="form.fileCode" />
                </td>
                <td class="table-left">所在部门</td>
                <td class="table-right">
                <input type="text" placeholder="请输入所在部门" v-model="form.fileName" />
                </td>
                <td class="table-left">所在公司</td>
                <td class="table-right">
                <input type="text" placeholder="请输入所在公司" v-model="form.name" />
                </td>
            </tr>
            <tr>
                <td class="table-left">关联订单号</td>
                <td class="table-right">
                <input type="text" placeholder="请输入关联订单号" v-model="form.reportTime" />
                </td>
                <td class="table-left">呈报时间</td>
                <td class="table-right mini" id="brithday">
                <el-date-picker
                    v-model="form.limitTime"
                    type="date"
                    placeholder="请选择呈报时间"
                >
                </el-date-picker>
                </td>
                <td class="table-left">备注事项</td>
                <td class="table-right">
                <input type="text" placeholder="请输入备注事项" v-model="form.fileRemark" />
                </td>
            </tr>
            <tr>
                <td class="table-left">合同主件</td>
                <td class="table-right" colspan="5">
                    <div class="file-button">
                        <button type='button' @click="isDialog = true"><img src="@/assets/images/file-choose.png" alt="">选择合同模板</button>
                        <button type='button'><img src="@/assets/images/file-edit.png" alt="">编辑合同</button>
                        <button type='button'><img src="@/assets/images/file-print.png" alt="">打印合同</button>
                    </div>
                    <div class="file-content"><span>点击查看内容</span></div>
                </td>
            </tr>
            <tr>
                <td class="table-left">您的意见</td>
                <td class="table-right" colspan="5">
                <textarea
                    class="table-item"
                    placeholder="请输入您的意见"
                    v-model="form.fileIdea"
                ></textarea>
                </td>
            </tr>
        </table>
      </form>
    </div>
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>公文模板</span>
          <img @click="isDialog = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
            <el-radio-group v-model="radio">
                <el-radio :label="3">模板1</el-radio>
                <el-radio :label="1">模板2</el-radio>
                <el-radio :label="2">模板3</el-radio>
                <el-radio :label="4">模板4</el-radio>
            </el-radio-group>
        </div>
        <div class="scan-code">
            <button class="sure" @click="onSure">确定</button>
            <button @click="isDialog = false">取消</button>
          </div>
      </div>
    </div>
    <div class="pay-dialog" v-show="isForward">
      <div class="dialog-content forward-con">
        <div class="dialog-top">
          <span>用户选择框</span>
          <img @click="isForward = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="menu-but">
          <button type="button" @click="getForwardMail()">确定发送</button>
        </div>
        <div class="dialog-body">
          <div class="groupTree">
            <el-tree
              :data="groupTree"
              node-key="id"
              ref="group"
              @check="changeGroupTree"
              :default-checked-keys="defaultCheckedTree"
              :props="{ value: 'id', label: 'name', children: 'subList'}">
            </el-tree>
          </div>
          <!-- 全选 -->
          <div class="acc">
            <div class="but-outer">
              <button type="button">选择全体</button>
              <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city.name" :key="city.id"></el-checkbox>
              </el-checkbox-group>
            </div>
            <div>

            </div>
          </div>
          <!-- 全删 -->
          <div class="acc">
            <div class="but-outer">
              <button type="button">删除全体</button>
            </div>
            <div>

            </div>
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
  name: "Newproduct",
  components: {
    
  },
  data() {
    return {
      birthday: '',  //办公时限
      groupTree: [],  //Tree列表
      defaultCheckedTree:[],
      optionss: [],
       defaultProps: {
        children: "subList",
        label: "name",
        value:"id"
      },
      cities:[
        {
          name:'666',
          id:"0D43E91E70164B1CA925E12D2D119A49"
        },
        {
          name:'kh',
          id:"CD80B602DB8041ED8B4086F9FFA1BB11"
        }
      ],
      checkedCities:['666','kh'],
      selectedOptions: [],
      optionsValue: [],
      optionsOrg: [],
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
        id:""
      },
      tabledata: [],
      tabledata1: [],
      dialogImageUrl: "",
      dialogVisible: false,
      imgArr: [],
      checkList: [],
      date: [],
      msg: '',
      hoursSelected1: '',
      hoursSelected2: '',
      minSelected1: '',
      minSelected2: '',
      imageUrl1: '', // 门店许可证
      imageUrl2: '', // 营业执照
      imageUrl3: '', // 门店照
      storeId: 0,
      orgId: '',
      orgName: '',
      isDialog: false,
      isForward:false,
      radio: 3
    };
  },
  mounted() {
    this.getdata()
    // console.log(this.$route.query.id);
  },
  created(){
  },
  methods: {
    //查看状态
    getstate(){
      
    },
    handleCheckedCitiesChange(){},
    // 已办件
    async getProcessed(){
      let id = this.$route.query.id;
      let data = {"object": {"documentId": id,"verdict": ""}}
      await this.$API.OA.processed(data)
      this.$router.go(-1);
      this.$message.success('转已办件成功')
    },
    // 转发公文
    async getForwardMail(){
      // if(this.$route.query.id){
        this.getAddFile()
        let id = this.$route.query.id;
        let data = {
          "object": {
            "documentId": id,
            "receiverIdList": [
              "0D43E91E70164B1CA925E12D2D119A49","CD80B602DB8041ED8B4086F9FFA1BB11"
            ]
          }
        }
        let res = await this.$API.OA.forwardMail(data)
        console.log(res);
        this.$router.push("notDone")
      // }else{
        this.$message.success("转发公文成功")
      // }
    },
    async getdata() {
      if(this.$route.query.id){
        let id = this.$route.query.id;
      let params = {
       "object": {"documentId": id,}}
      let res =await this.$API.OA.editFile(params)
      this.form.fileCode = res.data.documentNumber;
      this.form.fileTitle = res.data.title;
      this.form.limitTime = res.data.limitTime;
      this.form.reportTime = res.data.reportTime;
      this.form.fileRemark = res.data.remark;
      // console.log(res);
      }
    },
    forward(){
      this.isForward = true
      this.getGroupTree()
    },
    async getGroupTree(){
      let params = {"orgId": this.deptId}
      let res = await this.$API.orgSet.loadAllGroupTree_Group(params)
        console.log(res)
        this.groupTree = res.data
    },
    // 提交选中数据范围
    changeGroupTree(){
      this.includedGroupIdSet = []
      let data = this.$refs.group.getCheckedNodes()
      data.forEach(item => {
        this.includedGroupIdSet.push(item.id)
      })
    },
    onSure(){

    },
    // 新建编辑
    getAddFile() {
    // if(!par.title) return this.$message.error('公文标题不能为空')
    // if(!par.limitTime) return this.$message.error('办文时限不能为空')
      let params = {
        "object": {
          "title": this.form.fileTitle,
          "documentNumber": this.form.fileCode,
          "limitTime": this.form.limitTime,
          "remark": this.form.fileRemark,
          "text": this.form.fileMain,
          "reportTime": this.form.reportTime,
          "id":this.$route.query.id ? this.$route.query.id:this.form.id,
        }
      }
      params.object.limitTime = new Date(this.form.limitTime).getTime()
      params.object.reportTime = new Date(this.form.reportTime).getTime()
     if(this.$route.query.id){
       console.log(this.$route.query.id);
      this.$API.OA.addFile(params)
      console.log(params);
      this.$message.success('编辑成功')
     }else{
      this.$API.OA.addFile(params)
      this.$message.success('新增成功')
     }
      this.toBackList()
    },
    changeOrg(val){
      let len = val.length-1
      this.orgId = val[len]
      this.orgName = this.$refs["cascader"].getCheckedNodes()[0].label
    },
    //选择省市区
    handleChange(value) {
      let t = this;
      t.form.province = CodeToText[value[0]];
      t.form.city = CodeToText[value[1]];
      t.form.county = CodeToText[value[2]];
    },
    //预览图片
    handlePictureCardPreview(res, file){
      // console.log(file);
      console.log(res);
      this.dialogVisible = true;
      this.form.storeLicence = res.response.data;
    },
    handleAvatarSuccess1(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl1 = res.data; // 身份证正面
      }
    },
    handleAvatarSuccess2(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl2 = res.data; // 身份证反面
      }
    },
    handleAvatarSuccess3(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl3 = res.data; // 个人照
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (file.type != 'image/jpeg' && file.type != 'image/png') {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false
      }
    },
    //图片
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      // return
      this.dialogImageUrl = res.data;
      this.form.storeLicence = res.data;
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
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
      console.log(this.multipleSelection);
    },
    //手机号效验
    isContactNumber(number){
      var reg =  /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if(reg.test(number) === false) { 
        // this.$message.error("联系号码输入格式错误"); 
        return false; 
      } 
    },
    //身份证效验
     isCardNo(card) { 
    var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if(reg.test(card) === false) { 
        // this.$message.error("身份证输入不合法"); 
        return false; 
      } 
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/reset.scss";
// @import "@/styles/image3.scss";
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
          padding: 6px 8px;
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
    display: flex;
    justify-content: space-around;
      padding: 16px;
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
    width: 800px;
  }
  .groupTree{
    width: 220px;
    height: 466px;
    background: #F5F8FF;
    border: 1px solid #D5D8DE;
  }
  .dialog-content .dialog-body .acc{
    width: 220px;
    height: 466px;
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
  /deep/#brithday .el-date-editor.el-input{
    width: 168px;
  }
  /deep/.table-main table .table-right.mini input{
    width: 100%;
    height: 26px;
    padding-left: 25px;
  }
  /deep/.el-input__prefix{
      left: 0;
  }
  /deep/.el-checkbox-group{
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    .el-checkbox{
      padding: 5px;
    }
  }
  .menu-but{
    background-color: #fff;
    margin-bottom: -10px;
    padding-top: 10px;
    height: 44px;
    position: relative;
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
      position: absolute;
      right: 10px;
    }
  }
</style>