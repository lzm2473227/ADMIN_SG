<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="onEdit"><img class="icon" src="@/assets/images/edit.png" alt=""/><span class="axis">修改广告信息</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title">
          <p>广告信息表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">广告编号</td>
            <td class="table-right" style="width: 305px;">
                <span>{{serviceParam.advertisementNumber}}</span>
            </td>
            <td class="table-left">广告名称</td>
            <td class="table-right" style="width: 305px;">
                <span>{{serviceParam.advertisementName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">广告位置</td>
            <td class="table-right select-colspan3" :colspan="colspanNum">
                <span>{{serviceParam.location}}</span>
            </td>
            <td class="table-left" v-show="serviceParam.locationId !== '1' && serviceParam.locationId !== ''">展示{{showMsg}}</td>
            <td class="table-right sub-table-right" v-show="serviceParam.locationId !== '1' && serviceParam.locationId !== ''">
                <span>{{serviceParam.objectName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left sub-table-left">有效时间</td>
                <td class="table-right sub-table-right" colspan="3">
                    <span>{{serviceParam.startTime}} 至 {{serviceParam.endTime}}</span>
                </td>
          </tr>
          <!-- 位置排序 -->
          <tr v-show="isShowSort && serviceParam.locationId !== ''">
            <td class="table-left">位置排序</td>
            <td class="table-right" style="width: 305px;" :colspan="serviceParam.locationId === '5'?1:3">
                <span>{{serviceParam.sort}}</span>
            </td>
            <td class="table-left" v-show="serviceParam.locationId === '5'">一句话宣传语</td>
            <td class="table-right" style="width: 305px;" v-show="serviceParam.locationId === '5'">
                <span>{{serviceParam.introduction}}</span>
            </td>
          </tr>
          <!-- 位置排序 -->
          <!-- 品牌专栏banner -->
          <tr v-show="serviceParam.locationId === '2'">
            <td class="table-left" style="padding-top: 12px;vertical-align: top">品牌介绍</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">品牌中文名</td>
                <td class="table-right sub-table-right">
                  <span>{{serviceParam.brandName}}</span>
                </td>
                <td class="table-left sub-table-left">品牌原产地</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{serviceParam.sourceArea}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">品牌外文名</td>
                <td class="table-right sub-table-right">
                  <span>{{serviceParam.brandEnName}}</span>
                </td>
                <td class="table-left sub-table-left">产品特点</td>
                <td class="table-right sub-table-right" style="border-right: none">
                    <span>{{serviceParam.brandTrait}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">创始时间</td>
                <td class="table-right sub-table-right">
                  <span>{{serviceParam.initialTime}}</span>
                </td>
                <td class="table-left sub-table-left">主要产业</td>
                <td class="table-right sub-table-right" style="border-right: none">
                    <span>{{serviceParam.majorIndustry}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">品牌LOGO</td>
                <td class="table-right sub-table-right">
                  <img :src="serviceParam.logo" alt="" style="width: 22px; height: 22px;">
                </td>
                <td class="table-left sub-table-left">品牌官网</td>
                <td class="table-right sub-table-right" style="border-right: none">
                    <span>{{serviceParam.officialUrl}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom: none">品牌简介</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right: none; border-bottom: none">
                    <span>{{serviceParam.advertisementDescribe}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <!-- 品牌专栏banner -->
          <tr style="vertical-align: top" v-show="!isShowStoreName && serviceParam.locationId !== '2'">
            <td class="table-left" style="padding-top: 12px">广告介绍</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="此段文字是关于广告的相关描述"
                v-model="serviceParam.advertisementDescribe"
                disabled
              ></textarea>
            </td>
          </tr>
          <tr style="vertical-align: top" v-show="!isShowStoreName">
            <td class="table-left" style="padding-top: 12px">图片广告</td>
            <td class="table-right" colspan="3" style="padding-top: 6px;">
              <div style="display: flex;">
                <el-upload
                  class="avatar-uploader photos-card store-avatar"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload"
                  disabled>
                  <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传图片广告</span>
                  </i>
                </el-upload>
              </div>
              <span class="pic-tip">建议上传图片尺寸为：<span>200×200px，</span>图片格式为：<span>JPEG、PNG</span></span>
            </td>
          </tr>
          <tr style="vertical-align: top" v-show="!isShowStoreName">
            <td class="table-left" style="padding-top: 12px">店铺视频</td>
            <td class="table-right" colspan="3" style="padding-top: 6px;">
              <div style="display: flex; height:100px">
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload"
                  disabled>
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传店铺视频</span>
                  </i>
                </el-upload>
              </div>
              <span class="pic-tip">建议上传视频大小为：<span>50Mb</span></span>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">备注事项</td>
            <td class="table-right" colspan="3">
                <span>{{serviceParam.remarks}}</span>
            </td>
          </tr>
        </table>
      </form>
    </div>
  </div>
</template>
<script>
import { parseTime, dateToTimestamp } from '@/utils/index'
import moment from "moment";
import Page from '@/components/pages/index.vue'
import { jsonp } from 'vue-jsonp'
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  name: "Newproduct",
  components: {
    Map, Page
  },
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      tabledata: [],
      multipleSelection2: [],
      multipleSelection3: [],
      multipleSelection4: [],
      options: regionData,
      optionss: [],
      orgTreeOption:[],
      deptData:[],   //选中的部门数据
      selectedOptions: [],
      optionsValue: [],
      optionsOrg: [],
      userEntityArray:[],   //根据部门id获取的人员数组
      stationName:[],//选中的岗位人员姓名
      checkedItem: [],
      userArr: [],
      checkedUserArr: [], // 选中用户的完整用户信息，传给后台用，前端页面不显示
      deptId:"", //部门id
      setKesLabel:{   //联动组件数据配置
        value:'id',
        label:'name',
        children:'subList',
        checkStrictly: true
      },
      form: {
        title: '',
        documentNumber: '',
        reportName: '',
        reporterDept: '',
        reportTime: '',
        remark: '',
        opinion: ''
      },
      serviceParam: {
        "advertisementDescribe": "",
        "advertisementName": "",
        "advertisementNumber": "",
        "brandEnName": "",
        "brandName": "",
        "brandTrait": "",
        "enableState": false,
        "endTime": '',
        "enterpriseId": "",
        "foreignKey": "",
        "id": "",
        "identityId": "",
        "initialTime": '',
        "introduction": '',
        "locationId": "",
        "location": "",
        "logo": "",
        "majorIndustry": "",
        "objectName": '',
        "officialUrl": "",
        "picPosition": "",
        "remarks": "",
        "sort": null,
        "sourceArea": "",
        "startTime": '',
        "videoPosition": "",
        "time": "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgArr: [],
      msg: '',
      value: '',
      imageUrl1: '', // 门店许可证
      imageUrl2: '', // 营业执照
      imageUrl3: '', // 门店照
      date: '',
      deptList: [], // 部门列表
      dept: '',
      beforeUrl: '',
      isForward: false,
      deptName: '',
      name: '',
      reportTime: '',
      items: [],
      deptId: '',
      orgId: '',
      radio1: '0',
      isDisabled: false,
      documentId: '',
      isState: false, // 状态弹窗
      stateList: [], // 公文流转流水
      listLen: 0,
      isDialog: true,
      storeData: [],
      brandData: [],
      commodityData: [],
      colspanNum: '3',
      isShowStoreName: false,
      isShowSort: false,
      showMsg: '',
    };
  },
  watch: {
    'serviceParam.locationId': {
      handler(newV, oldV){
        this.isShowSort = newV === '1' || newV === '6' || newV === '9'? false:true // 是否显示位置排序按钮
        if(newV === '1' || newV === '9'){
          this.colspanNum = '3'
          this.isShowStoreName = false
        }else{
          this.colspanNum = '1'
          this.isShowStoreName = true
        }
        if(newV === '5') this.showMsg = '店铺'
        if(newV === '2' || newV === '6') this.showMsg = '品牌'
        if(newV === '3' || newV === '4' || newV === '7' || newV === '8' || newV === '10' || newV === '11') this.showMsg = '商品'
      }
    }
  },
  mounted() {
    this.init()
  },
  created(){
    this.documentId = this.$route.query.documentId
  },
  methods: {
    async init(){
        let params = {
          "object": {
            "id": this.$route.query.id
          }
        } 
        let res = await this.$API.advertisement.advertisementList(params)
        // this.isDisabled = this.$store.state.user.id === res.data.reportIdentityId ? false : true // 当前用户是否与呈报人一致，否-禁用输入框
        this.serviceParam = res.data[0]
        this.imageUrl3 = this.serviceParam.picPosition
        this.serviceParam.startTime = moment(res.data.startTime).format("YYYY-MM-DD")
        this.serviceParam.endTime = moment(res.data.endTime).format("YYYY-MM-DD")
        this.imageUrl1 = this.serviceParam.videoPosition
        if(this.serviceParam.locationId === '1'){
          this.isShowSort = false // 是否显示位置排序按钮
          this.colspanNum = '3'
        }else{
          this.colspanNum = '1'
          this.isShowSort = true
        }
        this.isShowStoreName = this.serviceParam.locationId === '1' || this.serviceParam.locationId === '2' || this.serviceParam.locationId === '5'?false:true
        switch (this.serviceParam.locationId){
            case '1':
                this.serviceParam.location = '交易中心首页banner'
                break
            case '2':
                this.serviceParam.location = '首页推荐品牌'
                this.serviceParam.objectName = this.serviceParam.brandName
                this.showMsg = '品牌'
                break
            case '3':
                this.serviceParam.location = '首页推荐单品'
                this.showMsg = '商品'
                break
            case '4':
                this.serviceParam.location = '首页推荐单品'
                this.showMsg = '商品'
                break
            case '5':
                this.serviceParam.location = '首页精选店铺'
                this.showMsg = '店铺'
                break
            case '6':
                this.serviceParam.location = '品牌专栏banner'
                this.showMsg = '品牌'
                break
            case '7':
                this.serviceParam.location = '品牌专栏推单品'
                this.showMsg = '商品'
                break
            case '8':
                this.serviceParam.location = '品牌专栏推荐商品'
                this.showMsg = '商品'
                break
            case '9':
                this.serviceParam.location = '店铺首页banner'
                break
            case '10':
                this.serviceParam.location = '店铺首页推荐单品'
                this.showMsg = '商品'
                break
            case '11':
                this.serviceParam.location = '店铺首页推荐商品'
                this.showMsg = '商品'
                break
        }
    },
    onEdit(){
      this.$router.push({
        path: '/promotion/advertising/unreleasedAdvertisingInfo',
        query: {
          id: this.$route.query.id
        }
      })
    },
    // 新建编辑公文
    // 处理意见
    async getAddFile(val) {
      let receiverIdentityList = []
      let id = this.$store.state.user.enterpriseId
      let documentId = ''
      let state = 0
      let isSubmit = false
      if(this.$route.query.documentId){
        documentId = this.$route.query.documentId
        state = 1
      }else{
        receiverIdentityList = this.checkedUserArr
      }
      // 新增公文时转已办件
      if(val === '1'){
        state = 1
      }
      // 转平台审核
      if(val === '3'){
        state = 1
        isSubmit = true
      }
      // if(!this.form.title) return this.$message.error('公文标题不能为空')
      // if(!this.date) return this.$message.error('办文时限不能为空')
      // if(!this.form.storeName) return this.$message.error('店铺名称不能为空')
      // if(!this.form.storeType) return this.$message.error('店铺类型不能为空')
      // if(!this.dept) return this.$message.error('归属部门不能为空')
      // if(!this.form.storeServicePhone) return this.$message.error('店铺客服电话不能为空')
      // if(!this.form.onlineCustomerService) return this.$message.error('在线客服账号不能为空')
      // if(!this.form.remark) return this.$message.error('备注事项不能为空')
      // if(!this.form.storeIntroduce) return this.$message.error('店铺介绍不能为空')
      // if(!this.imageUrl1) return this.$message.error('请上传店铺店招')
      // if(!this.imageUrl3) return this.$message.error('请上传店铺LOGO')
      this.serviceParam.startTime = this.serviceParam.time[0]
      this.serviceParam.endTime = this.serviceParam.time[1]
      this.serviceParam.picPosition = this.imageUrl3
      this.serviceParam.enterpriseId = this.$store.state.user.enterpriseId
      delete this.serviceParam.time
      let serviceParam = this.serviceParam
      let params = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentNumber": this.form.documentNumber,
          "documentType": "GGSP",
          "id": documentId,
          "limitTime": moment(this.date).valueOf(),
          "remark": this.form.remark,
          // "reportIdentityId": "string",
          "reportTime": moment(this.reportTime).valueOf(),
          "text": "",
          "title": this.form.title,
          "state": state, // 0-未办件(新增公文),1-转已办件
          "submit": isSubmit,
          "opinion": this.form.opinion,
          "verdict": this.radio1,
          "receiverIdentityList": receiverIdentityList,
          "attachmentList": [],
          // 公文内容
          "serviceParam": serviceParam
        }
      }
      let res = await this.$API.OA.addFile(params)
      if(res.code !== "SUCCESS") return false
      // let par = {
      //   "object": {
      //     "attachments": '',
      //     "documentId": documentId,
      //     "opinion": this.form.opinion,
      //     "verdict": ''
      //   }
      // }
      // let result = await this.$API.OA.dispose(par)
      // if(result.code !== "SUCCESS") return false
      if(val === '1'){
        this.$message.success('转已办件成功')
      }else if(val === '2'){
        this.$message.success('转发成功')
      }else if(val === '3'){
        this.$message.success('转平台成功')
      }else{
        this.$message.success('保存成功')
      }
      this.toBackList()
    },
    // 查看流水
    async onState(){
      this.isState = true
      let data = {
          "object":{
            "documentId": this.documentId,
            } 
          }
      let res = await this.$API.OA.getState(data)
      // this.water.action = res.data.action
      // this.water.name = res.data.name
      res.data.forEach((item,key)=>{
        if(item.verdict === '0') item.verdictText = '同意'
        if(item.verdict === '1') item.verdictText = '不同意'
        item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")
      })
      this.stateList = res.data
    },
    addDrand(val){
      let locationId = this.serviceParam.locationId
      this.isDialog = true
      if(locationId === '5') this.getStoreList() // 获取店铺列表
      if(locationId === '2' || locationId === '6') this.getBrandList() // 获取品牌列表
      if(locationId === '3' || locationId === '4' || locationId === '7' || locationId === '8' || locationId === '10' || locationId === '11') this.getCommodityList() // 获取商品列表
    },
    getStoreList(){
        let len = []
        let params = {
            "object": {
                "enterpriseId": this.$store.state.user.enterpriseId,
            },
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }
        this.$API.storeInfo.publishedStoreList(params).then(res => {
            this.total = res.total;
            this.pages = res.pages;
            // 序号倒序排列
            let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
                return index+1;
            })
            arr = arr.reverse()
            len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
            _.forEach(res.data, function (item, key) {
                item.index = len[key]
                // item.price = item.price.toFixed(2)
                // item.b = item.classifyRsp.b
                // item.m = item.classifyRsp.m
                // item.p = item.classifyRsp.p
            });
            this.storeData = res.data
        })
    },
    // 获取品牌列表
    getBrandList(){
      let len = []
      let params = {
        "object": {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }
      this.$API.commodityInfo.findCurrEnterpriseSellBrandInfoList(params).then(res => {
        this.total = res.total;
        this.pages = res.pages;
        // 序号倒序排列
        let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
          return index+1;
        })
        arr = arr.reverse()
        len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
        _.forEach(res.data, function (item, key) {
          item.index = len[key]
                // item.price = item.price.toFixed(2)
                // item.b = item.classifyRsp.b
                // item.m = item.classifyRsp.m
                // item.p = item.classifyRsp.p
        });
        this.brandData = res.data
      })
    },
    // 获取商品列表
    getCommodityList() {
      let len = []
      let params = {
        "object": {
          "enterpriseId": this.$store.state.user.enterpriseId,
          "needPrice": 0 // 是否需要价格，0-不需要、1-需要
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$API.commodityInfo.publishedCommodityList(params).then(res => {
          this.total = res.total;
          this.pages = res.pages;
          // 序号倒序排列
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          _.forEach(res.data, function (item, key) {
            item.index = len[key]
            // item.price = item.price.toFixed(2)
            // item.b = item.classifyRsp.b
            // item.m = item.classifyRsp.m
            // item.p = item.classifyRsp.p
          });
          this.commodityData = res.data
        })
    },
    onClose(){
      this.isDialog = false
      this.storeData = []
    },
    handleSelectionChange2(val){
      this.multipleSelection2 = val
    },
    handleSelectionChange3(val){
      this.multipleSelection3 = val
    },
    handleSelectionChange4(val){
      this.multipleSelection4 = val
    },
    onSure(){
      let locationId = this.serviceParam.locationId
      if(locationId === '5'){
        this.serviceParam.objectName = this.multipleSelection2[0].storeName
        this.serviceParam.foreignKey = this.multipleSelection2[0].storeId
      }
      if(locationId === '2' || locationId === '6'){
        this.serviceParam.objectName = this.multipleSelection3[0].brandName
        this.serviceParam.foreignKey = this.multipleSelection3[0].id
      }
      if(locationId === '3' || locationId === '4' || locationId === '7' || locationId === '8' || locationId === '10' || locationId === '11'){
        this.serviceParam.objectName = this.multipleSelection4[0].commodityName
        this.serviceParam.foreignKey = this.multipleSelection4[0].storeId
      }
      this.isDialog = false
      // if(this.characteristic  === '1'){

      // }
    },
    changeCurrentPage(val) {
      this.pageNum = val;
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
      this.$router.go(-1)
    }
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/reset.scss";
@import "@/styles/dialog.scss";
/deep/.el-table .caret-wrapper {
    background: url('../../../../assets/images/sort.png') center no-repeat;
    width: 12px;
    height: 12px;
    margin-left: 4px;
}
/deep/.el-table .sort-caret{
  border: none;
}
.table-main .table-title{
  width: 812px;
}
.table-main table .table-left{
  width: 100px;
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
  /deep/.table-right .el-input__inner{
    height: 26px;
  }
  /deep/.submit-time .el-input__inner{
    width: 160px;
  }
  /deep/.submit-time .el-date-editor.el-input{
    width: 160px;
  } 
  /deep/.submit-time .el-date-editor.el-input__inner{
    width: 170px;
  }
  /deep/.submit-time .el-input__icon{
    line-height: 26px;
  }
  /deep/.table-right .el-date-editor .el-range__icon{
    line-height: 18px;
  }
  /deep/.table-right .el-date-editor .el-range-separator{
    line-height: 18px;
  }
  /deep/.table-right .el-date-editor .el-range__close-icon{
    line-height: 18px;
  }
  /deep/.table-right .el-input-number{
    // width: 296px;
    line-height: 26px;
  }
  /deep/.table-right .el-input-number .el-input__inner{
      width: 100%;
  }
  /deep/.el-input-number__decrease, /deep/.el-input-number__increase{
      height: 24px;
      line-height: 26px;
  }
  /deep/.el-input-number .el-input__inner{
      padding-right: 0;
  }
  /deep/.table-right .el-date-editor--daterange, /deep/tr>.select-colspan3>.el-select, /deep/tr>.select-colspan3>.el-select input.el-input__inner{
    width: 296px;
  }
  .choose-commodity{
  position: absolute;
  right: 4px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  background: #eee;
  border: 1px solid #ddd;
  border-radius: 2px;
  cursor: pointer;
}
.table-main table td.sub-table-right{
  width: 254px;
}
</style>