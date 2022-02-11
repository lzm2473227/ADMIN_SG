<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addstore()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <div class="print" @click="isDialog = true"><img class="icon" src="@/assets/images/moban.png" alt=""/><span class="axis">部门模板</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印列表</span></div> -->
        <!-- <div class="print"><img class="icon" src="@/assets/images/derive.png" alt="" /><span class="axis">导出表格</span></div> -->
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title">
          <p>{{msg}}</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">部门内部编码</td>
            <td class="table-right">
              <input type="text" placeholder="请输入部门内部编码" v-model="form.privateCode" />
            </td>
            <td class="table-left">选择组织</td>
            <td class="table-right">
              <el-cascader
                :props="{ value: 'id', label: 'name', children: 'subList', checkStrictly: true }"
                :options="optionsOrg"
                v-model="optionsValue"
                @change="changeOrg"
                style="width: 100%"
                placeholder="请选择组织"
                ref="cascader"
              >
              </el-cascader>
            </td>
          </tr>
          <tr>
            <td class="table-left">部门名称</td>
            <td class="table-right">
              <input type="text" placeholder="请输入部门名称" v-model="form.name" />
            </td>
            <td class="table-left">部门属性</td>
            <td class="table-right">
              <el-checkbox v-model="checked">可线上销售</el-checkbox>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">联系地址</td>
            <td class="table-right" colspan="3">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                style="width: 100%"
                placeholder="请选择门店地址"
              >
              </el-cascader>
              <br />
              <input
                type="text"
                placeholder="请输入门店详细地址"
                style="margin-top: 6px; width: 100%"
                v-model="form.address"
              />
            </td>
          </tr>
          <!-- <tr>
            <td class="table-left">地图定位</td>
            <td class="table-right" colspan="3"></td>
          </tr> -->
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">部门介绍</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="此段文字是关于部门的相关描述"
                v-model="form.remark"
              ></textarea>
            </td>
          </tr>
          <!-- <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">营业时间</td>
            <td class="table-right" colspan="3">
              <div class="time">
                <span>营业日期：</span>
                <el-checkbox-group v-model="checkList">
                  <el-checkbox label="周一"></el-checkbox>
                  <el-checkbox label="周二"></el-checkbox>
                  <el-checkbox label="周三"></el-checkbox>
                  <el-checkbox label="周四"></el-checkbox>
                  <el-checkbox label="周五"></el-checkbox>
                  <el-checkbox label="周六"></el-checkbox>
                  <el-checkbox label="周日"></el-checkbox>
                </el-checkbox-group>
              </div>
              <div class="time">
                <span>营业时段：</span>
                <div class="business-time">
                <select placeholder="" v-model="hoursSelected1">
                  <option v-for="(item, index) in HOURS" :key="index" :value="item">{{item}}</option>
                </select>
                <select placeholder="" v-model="minSelected1">
                  <option v-for="(item, index) in MIN" :key="index" :value="item">{{item}}</option>
                </select>
                </div>
                <span>至</span>
                <div class="business-time" style="margin-left: 10px;">
                <select placeholder="" v-model="hoursSelected2">
                  <option v-for="(item, index) in HOURS" :key="index" :value="item">{{item}}</option>
                </select>
                <select placeholder="" v-model="minSelected2">
                  <option v-for="(item, index) in MIN" :key="index" :value="item">{{item}}</option>
                </select>
                </div>
              </div>
            </td>
          </tr> -->
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">证件照</td>
            <td class="table-right" colspan="3" style="padding-top: 6px;">
              <div style="display: flex; height:100px">
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传营业执照</span>
                  </i>
                </el-upload>
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                  style="margin-left: 10px;">
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传其他证件照</span>
                  </i>
                </el-upload>
              </div>
              <span class="pic-tip">建议营业执照上传尺寸为：<span>144×204px或200×140px，</span>图片格式为：<span>JPEG、PNG</span></span>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">组织头像</td>
            <td class="table-right" colspan="3" style="height: 312px; padding-top: 6px;">
              <div style="display: flex;">
                <el-upload
                  class="avatar-uploader photos-card store-avatar"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传组织头像</span>
                  </i>
                </el-upload>
              </div>
              <span class="pic-tip">建议上传图片尺寸为：<span>200×200px，</span>图片格式为：<span>JPEG、PNG</span></span>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>部门模板</span>
          <img @click="isDialog = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <!-- <el-radio v-model="radio" label=""></el-radio>
          <el-radio v-model="radio" label=""></el-radio> -->
          <div class="check1">
            <el-checkbox v-model="checked" @change="changeCheck(index = '1')"></el-checkbox>
            <span class="check1-text">门店部</span>
            <el-checkbox v-model="checked" @change="changeCheck(index = '2')"></el-checkbox>
            <span class="check1-text">信息部</span>
          </div>
          <div class="check1">
            <el-checkbox v-model="checked" @change="changeCheck(index = '3')"></el-checkbox>
            <span class="check1-text">行政部</span>
            <el-checkbox v-model="checked" @change="changeCheck(index = '4')"></el-checkbox>
            <span class="check1-text">财务部</span>
          </div>
          <div class="check1">
            <el-checkbox v-model="checked" @change="changeCheck(index = '5')"></el-checkbox>
            <span class="check1-text">运营部</span>
            <el-checkbox v-model="checked" @change="changeCheck(index = '6')"></el-checkbox>
            <span class="check1-text">人事部</span>
          </div>
          <div class="check1">
            <el-checkbox v-model="checked" @change="changeCheck(index = '7')"></el-checkbox>
            <span class="check1-text">采购部</span>
            <el-checkbox v-model="checked" @change="changeCheck(index = '8')"></el-checkbox>
            <span class="check1-text">法务部</span>
          </div>
          <div class="check1">
            <el-checkbox v-model="checked" @change="changeCheck(index = '9')"></el-checkbox>
            <span class="check1-text">销售部</span>
            <el-checkbox v-model="checked" @change="changeCheck(index = '10')"></el-checkbox>
            <span class="check1-text">总经办</span>
          </div>
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
// import httpreques from "../../utils/httpreques";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
// import store from '@/config/store';
export default {
  name: "Newproduct",
  data() {
    const HOURS = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23']
    const MIN = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59']
    return {
      options: regionData,
      optionss: [],
      selectedOptions: [],
      optionsValue: [],
      optionsOrg: [],
      defaultProps: {
        children: "subList",
        label: "name",
        value:"id"
      },
      form: {
        privateCode: "",
        businessLicense: "",
        storeName: "",
        address: "",
        county: "",
        city: "",
        province: "",
        name: "",
        contactNumber: "",
        legalPersonIdNumber: "",
        remark: "",
        storeLicence: "", //默认选中显示
      },
      HOURS,
      MIN,
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
      isDialog: false,
      radio: '1',
      checked: false,
      orgId: '',
      orgName: ''
    };
  },
  mounted() {
    this.getdata();
    this.getOrg()
  },
  methods: {
      onSure(){},
    changeCheck(val){
      switch(val){
        case '1':
          this.checked = !this.checked
          break;
      }
      console.log(this.checked)
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
    async getOrg(){
        let params = {}
        let res = await this.$API.orgSet.findAllOrgTree_Org(params)
    //   httpreques( "post", { }, "/org-server/Org/findAllOrgTree").then((res) => {
        console.log(res)
        let data = res.data
        this.optionsOrg = data
    //   })
    },
    async getdata() {
      let t = this;
      let id = "";
      if (t.$route.query.id) {
        id = t.$route.query.id;
        this.msg = '编辑部门'
      }else{
        this.msg = '新增部门'
      }
      if (id) {
        let params = {
          "object": {
            "id": id
          }
        };
        let res = await this.$API.orgSet.findById_Dept(params)
        // httpreques( "post", params, "/org-server/Dept/findById").then((res) => {
          console.log(res)
          if (res.data.code === "SUCCESS") {
            //对象数据处理
            let storeobj = res.data.data;
            // storeobj.storetype = storeobj.storeType;
            // delete storeobj.storeType;
            t.selectedOptions = TextToCode[storeobj.province][storeobj.city][storeobj.district].code;
            t.form = storeobj;
            this.optionsValue.push(storeobj.orgId)
            this.orgId = storeobj.orgId
            this.orgName = storeobj.orgName
            // this.checkList = storeobj.businessDate.split(',')
            // this.hoursSelected1 = storeobj.openingTime.split(":")[0]
            // this.minSelected1 = storeobj.openingTime.split(":")[1]
            // this.hoursSelected2 = storeobj.closingTime.split(":")[0]
            // this.minSelected2 = storeobj.closingTime.split(":")[1]
            this.imageUrl1 = storeobj.idPhotos
            this.imageUrl2 = storeobj.idPhotos
            this.imageUrl3 = storeobj.profilePicture
            this.imgArr.push({url: storeobj.storeLicence})
            this.dialogImageUrl = storeobj.storeLicence;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
      }
    },
    addstore() {
      let t = this;
      let params = t.form;
      let businessDate = this.checkList.join()
      let openingTime = `${this.hoursSelected1}:${this.minSelected1}:00`
      let closingTime = `${this.hoursSelected2}:${this.minSelected2}:00`
      if(!params.privateCode) return this.$message.error('部门内部编码不能为空') 
      if(!this.orgId) return this.$message.error('请选择组织')
      if(!params.name) return this.$message.error('部门名称不能为空')
      if(!params.province) return this.$message.error('门店地址不能为空')
      // if(!businessDate && !openingTime && !closingTime) return this.$message.error('营业时间不能为空')
      if(!params.remark) return this.$message.error('门店简介不能为空')
      if(!this.imageUrl1) return this.$message.error('请上传营业执照')
      if(!this.imageUrl2) return this.$message.error('请上传其他证件照')
      if(!this.imageUrl3) return this.$message.error('请上传组织头像')
      
      // params.id = this.form.id;
      // params.orgCode = this.form.orgCode;
      // params.businessDate = businessDate;
      // params.openingTime = openingTime;
      // params.closingTime = closingTime;
      // params.businessLicense = this.imageUrl2; // 营业执照
      // params.storeLicence = this.imageUrl1; // 门店许可证
      // params.profilePicture = this.imageUrl3; // 门店照
      let id = this.$route.query.id ? this.$route.query.id : ''
      params = {
        "object": {
          "address": this.form.address,
          "city": this.form.city,
          "privateCode": this.form.privateCode,
          "district": this.form.county,
          "id": id,
          "idPhotos": this.imageUrl1,
          "latitude": 0,
          "longitude": 0,
          "name": this.form.name,
          "orgId": this.orgId,
          "orgName": this.orgName,
          "profilePicture": this.imageUrl3,
          "province": this.form.province,
          "remark": this.form.remark,
          "tags": ""
        }
      }
      if(this.$route.query.id){
        this.$API.orgSet.update_Dept(params)
        this.$message.success('修改成功')
      }else{
        this.$API.orgSet.create_Dept(params)
        this.$message.success('添加成功')
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
.table-main .table-title{
  width: 589px;
  background: none;
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
  .dialog-content{
    width: 450px;
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
</style>