<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addstore()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
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
            <td class="table-left">机构代码</td>
            <td class="table-right">
              <input type="text" placeholder="请输入门店机构代码" v-model="form.orgCode" />
            </td>
            <td class="table-left">上级组织</td>
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
            <td class="table-left">组织名称</td>
            <td class="table-right" colspan="3">
              <input type="text" placeholder="请输入组织名称" v-model="form.name" />
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
            <td class="table-right" colspan="3">
              <div id="allmap" style="width: 100%; height: 220px;"></div> -->
              <!-- <div id="maps">
                <Map class="baidumap"> </Map>
              </div> -->
            <!-- </td>
          </tr> -->

          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">组织介绍</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="此段文字是关于组织的相关描述"
                v-model="form.remark"
              ></textarea>
            </td>
          </tr>
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
            <td class="table-right" colspan="3" style="height: 350px; padding-top: 6px;">
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
  </div>
</template>
<script>
import { findAllOrgTree_Org, findById_Org } from '@/api/orgSet'
// import Map from '@/components/Map/index.vue'
import { jsonp } from 'vue-jsonp'
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
  components: {
    Map
  },
  data() {
    return {
      options: regionData,
      optionss: [],
      selectedOptions: [],
      optionsValue: [],
      optionsOrg: [],
      form: {
        orgCode: "",
        businessLicense: "",
        address: "",
        storeType: "",
        county: "",
        city: "",
        province: "",
        name: "",
        contactNumber: "",
        remark: "",
      },
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
      orgName: ''
    };
  },
  mounted() {
    // this.map()
    this.getdata()
    this.getOrg()
  },
  methods: {
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
    getOrg(){
        let params = { }
        findAllOrgTree_Org(params).then(res => {
    //   httpreques( "post", { }, "/org-server/Org/findAllOrgTree").then((res) => {
        console.log(res)
        let data = res.data
        this.optionsOrg = data
      })
    },
    getdata() {
      let t = this;
      let id = "";
      if (t.$route.query.id) {
        id = t.$route.query.id;
        this.msg = '编辑组织'
      }else{
        this.msg = '新增组织'
      }
      if (id) {
        let params = {
          "object": {
            "id": id
          }
        };
        this.$API.orgSet.findById_Org(params).then(res => {
        // httpreques("post", params, "/org-server/Org/findById").then((res) => {
          console.log(res)
          if (res.code === "SUCCESS") {
            //对象数据处理
            let storeobj = res.data;
            console.log(storeobj);
            // storeobj.storetype = storeobj.storeType;
            // delete storeobj.storeType;
            t.selectedOptions = TextToCode[storeobj.province][storeobj.city][storeobj.district].code;
            t.form = storeobj;
            this.storeId = storeobj.storeId
            this.imageUrl1 = storeobj.idPhotos
            this.imageUrl2 = storeobj.businessLicense
            this.imageUrl3 = storeobj.profilePicture
            this.imgArr.push({url: storeobj.storeLicence})
            this.dialogImageUrl = storeobj.storeLicence;
          } else {
            //接口错误处理
            t.$message.error(res.msg);
          }
        });
      }
    },
    addstore() {
      let lat = 0
      let lng = 0
      let address = `${this.form.province}${this.form.city}${this.form.county}${this.form.address}`
      console.log(address)
      jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: address,
        output: 'json',
        ak: 'mTdnjQQTwYOAbrpdLKBDqG9mCKiGe8ZK'
      }).then(json => {
        // 得到我们想要的内容
        lat = json.result.location.lat
        lng = json.result.location.lng
        console.log(json)
      }).catch(err => {
        console.log(err)
      })

      let t = this;
      let params = t.form;
      let businessDate = this.checkList.join()
      if(!params.orgCode) return this.$message.error('机构代码不能为空')
      if(!params.name) return this.$message.error('组织名称不能为空')
      if(!params.province) return this.$message.error('组织地址不能为空')
      if(!params.remark) return this.$message.error('组织介绍不能为空')
      if(!this.imageUrl1) return this.$message.error('请上传门店许可证')
      if(!this.imageUrl2) return this.$message.error('请上传营业执照')
      if(!this.imageUrl3) return this.$message.error('请上传门店照')
      
      params.businessLicense = this.imageUrl2; // 营业执照
      params.storeLicence = this.imageUrl1; // 门店许可证
      params.profilePicture = this.imageUrl3; // 门店照
      delete params.storeaccount;
      delete params.storepsw;
      params = {
        "object": {
          "address": this.form.address,
          "city": this.form.city,
          "district": this.form.county,
          "id": "",
          "idPhotos": this.imageUrl1,
          "latitude": lat,
          "longitude": lng,
          "name": this.form.name,
          "orgCode": this.form.orgCode,
          "parentId": this.orgId,
          "profilePicture": this.imageUrl3,
          "province": this.form.province,
          "remark": this.form.remark
        }
      }

      // this.isContactNumber(this.form.contactNumber)
      // if(this.isContactNumber(this.form.contactNumber) === false) return this.$message.error("联系号码输入格式错误")
      // if (this.$route.query.name) params.storeId = this.storeId
      //判断url
      // let url = t.$route.query.name
      //   ? "/org-server/Org/update"
      //   : "/org-server/Org/create";
      if(this.$route.query.name){
        this.$API.orgSet.update_Org(params)
        this.$message.success('修改成功')
      }else{
        this.$API.orgSet.create_Org(params)
        this.$message.success('添加成功')
      }
      this.toBackList()
      
      // httpreques("post", params, url).then((res) => {
      //   if (res.data.code === "SUCCESS") {
      //     t.$message({
      //       message: t.$route.query.name ? "修改成功" : "添加成功",
      //       type: "success",
      //     });
      //     t.toBackList();
      //   } else {
      //     //接口错误处理
      //     t.$message.error(res.data.msg);
      //   }
      // });
      // });
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
// @import "@/styles/image2.scss";
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
</style>