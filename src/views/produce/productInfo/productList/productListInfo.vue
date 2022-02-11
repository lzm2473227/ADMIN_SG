<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="getAddFile()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <!-- <div class="print" @click="toPlatform('2')"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台审核</span></div> -->
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title">
          <p>产品信息表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left table-vertical"><span>基</span><span>本</span><span>信</span><span>息</span></td>
            <td colspan="3">
                <tr>
                    <td class="table-left sub-table-left">产品条形码</td>
                    <td class="table-right sub-table-right">
                        <input type="text" placeholder="请输入产品条形码" v-model="serviceParam.barcode" :disabled="isDisabled" />
                    </td>
                    <td class="table-left sub-table-left">产品名称</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                        <input type="text" placeholder="请输入产品名称" v-model="serviceParam.commodityName" :disabled="isDisabled" />
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left" style="height: 38px;">产品类目</td>
                    <td class="table-right sub-table-right" colspan="3">
                      <el-cascader
                        :props="{ value: 'categoryId', label: 'categoryName', children: 'subItemList' }"
                        :options="optionsOrg1"
                        v-model="optionsValue1"
                        @change="changeOrg2"
                        style="width: 100%"
                        placeholder="请选择商品类目"
                        ref="cascader2"
                        :disabled="isDisabled"
                      >
                      </el-cascader>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">产品品牌</td>
                    <td class="table-right sub-table-right">
                      <el-select v-model="serviceParam.brandId" placeholder="请选择产品品牌" @change="changeBrand" :disabled="isDisabled">
                        <el-option
                          v-for="item in brandList"
                          :key="item.id"
                          :label="item.brandName"
                          :value="item.id"
                        >
                        </el-option>
                      </el-select>
                    </td>
                    <td class="table-left sub-table-left">产品规格</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                        <input type="text" placeholder="请输入产品规格" v-model="serviceParam.specsParameter" :disabled="isDisabled" />
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">商品重量</td>
                    <td class="table-right sub-table-right">
                        <input type="text" placeholder="请输入商品重量" v-model="serviceParam.weight" :disabled="isDisabled" />
                        <span class="unit">千克</span>
                    </td>
                    <td class="table-left sub-table-left">保质期限</td>
                    <td class="table-right sub-table-right">
                        <input type="text" placeholder="请输入整数" v-model="serviceParam.expirationDate" :disabled="isDisabled" />
                        <span class="unit">天</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">最小包装<p>单元</p></td>
                    <td class="table-right sub-table-right">
                        <input type="text" placeholder="请输入最小包装" v-model="serviceParam.packagingUnit" :disabled="isDisabled" />
                    </td>
                    <td class="table-left sub-table-left">计量单位</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <el-select v-model="serviceParam.prickle" placeholder="请选择计量单位" :disabled="isDisabled">
                        <el-option
                          v-for="item in unit"
                          :key="item"
                          :label="item"
                          :value="item"
                        >
                        </el-option>
                      </el-select>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">储存条件</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                        <input type="text" placeholder="请输入储存条件" v-model="serviceParam.conditions" :disabled="isDisabled" />
                    </td>
                    <td class="table-left sub-table-left">最小包装<p>尺寸(cm)</p></td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <input type="text" style="width:65px;text-align: center;" placeholder="长" v-model="serviceParam.length" :disabled="isDisabled" /> ×
                      <input type="text" style="width:65px;text-align: center;" placeholder="宽" v-model="serviceParam.width" :disabled="isDisabled" /> ×
                      <input type="text" style="width:65px; text-align: center;" placeholder="高" v-model="serviceParam.height" :disabled="isDisabled" />
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left" style="border-bottom:none">商品图片</td>
                    <td class="table-right sub-table-right" colspan="3" style="border-right:none;border-bottom:none">
                        <div style="display: flex; height:124px">
                            <el-upload
                                class="avatar-uploader photos-card"
                                action="http://14.29.162.130:6602/image/imageUpload"
                                :disabled="isDisabled"
                                :show-file-list="false"
                                list-type="picture-card"
                                :on-success="handleAvatarSuccess1"
                                :before-upload="beforeAvatarUpload">
                                <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                                <i v-else class="avatar-uploader-icon">
                                    <img src="@/assets/images/upload.png" alt="">
                                    <span style="line-height: 10px">请上传商品图片</span>
                                </i>
                            </el-upload>
                        </div>
                        <span class="pic-tip">建议上传图片尺寸为：<span>620×360px，</span>图片格式为：<span>JPEG、PNG</span>，文件<span>小于2M</span></span>
                    </td>
                </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical"><span>商</span><span>品</span><span>详</span><span>情</span></td>
            <td colspan="3">
              <editor v-model="content" :isClear="isClear" style="width: 692px; padding: 4px;"></editor>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div class="pay-dialog" v-show="isState">
      <div class="dialog-content" style="width: 600px">
        <div class="dialog-top">
          <span>公文流转情况</span>
          <img @click="isState = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="pri"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div>
        <div class="dialog-body state-dialog">
          <!-- <span id="title">公文标题的内容</span> -->
          <div v-for="(item,index) in stateList" :key="index" class="action">
            {{item.name}}<span>在</span>{{item.createTime}}<span class="bold">{{item.action}}</span>
            <span v-show="item.verdict !== '2'">{{item.verdictText}}<span v-show="item.opinion !== null">: {{item.opinion}}</span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { parseTime, dateToTimestamp } from '@/utils/index'
import moment from "moment";
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
// import CKEditor from "@ckeditor/ckeditor5-vue";
import editor from "@/components/Editor";
import CKEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn' // 中文包
export default {
  name: "Newproduct",
  components: {
    editor
    // ckeditor: CKEditor.component
  },
  data() {
    return {
      options: regionData,
      optionss: [],
      selectedOptions: [],
      optionsValue: [],
      optionsValue1: [],
      optionsOrg: [],
      optionsOrg1: [],
      tabledata: [],
      orgTreeOption:[],
      deptData:[],   //选中的部门数据
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
        documentType: '',
        text: '',
        title: '',
        documentNumber: '',
        remark: "",
        remark1: "",
        opinion: '',
        verdict: '',
        reporter: '',
        deptName: '',
        reportTime: '',
      },
      serviceParam: {
          commodityName: '',
        barcode: "",
        manufacturer: "",
        brandId: null,
        brandName: "",
        specsParameter: "",
        expirationDate: "",
        conditions: "",
        weight: "",
        prickle: "",
        packagingUnit: "",
        length: "",
        width: "",
        height: "",
        address: "",
        storeType: "",
        county: "",
        city: "",
        province: "",
        commodityContent: ''
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
      categoryId: '',
      ceCategoryId: '',
      categoryName: '',
      date: '',
      isDialog: false,
      deptList: [],
      brandList: [],
      deptName: '',
      name: '',
      reportTime: '',
      unit: ["份","包","听","卷","双","台","个","块","套","把","支","条","板","桶","片","版","瓶","盒","盘","筒","箱","组","罐","袋","辆"],
      category1: '',
      category2: '',
      value: '',
      isForward: false,
      documentId: '',
      radio1: '0',
      isDisabled: false,
      documentId: '',
      isState: false, // 状态弹窗
      stateList: [], // 公文流转流水
      listLen: 0,
      orgId: '',
      categoryIdArr: [],

      editor: null,
      enView: '', // 企业内部分类
      ceView: '', // 交易中心分类
      // content: "sssss",
      editorConfig: {
        // language: "zh-cn", // 中文
        placeholder: this.placeholder,
        toolbar: ["bold", "fontColor", "numberedList"],  //l留下加粗，字体颜色，排序
      },
      content:"",
      isClear: false, //清除富文本编辑器内容
    };
  },
  watch: {
    content(val){
      // console.log(val)
    },
  },
  mounted() {
    this.init()
    this.getOrg()
  },
  created(){
    this.documentId = this.$route.query.documentId
    // this.initCKEditor()
  },
  methods: {
    changeBrand(val){
      this.brandList.find(item => {
        if(item.id === val) this.serviceParam.brandName = item.brandName
      })
    },
    async init(){
      this.getBrandInfo()
      // 修改商品信息
      if(this.$route.query.barcode){
        let params = {
          "object": {
            "barcode": this.$route.query.barcode,
            "enterpriseId": this.$store.state.user.enterpriseId
          }
        } 
        let res = await this.$API.code.productionCommodityDetails(params)
        this.serviceParam = res.data
        this.imageUrl1 = res.data.filePath
        this.optionsValue1 = res.data.ceCategoryId
        // this.selectedOptions = TextToCode[res.data.province][res.data.city][res.data.county].code
        this.content = res.data.commodityContent
      }
    },
    async getBrandInfo(){
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await this.$API.code.findCurrEnterpriseBrandInfoList(params)
      this.brandList = res.data
      this.optionsValue1 = res.data.ceCategoryId
    },
    onReady(editor) {
      editor.ui
        .getEditableElement()
        .parentElement.insertBefore(
          editor.ui.view.toolbar.element,
          editor.ui.getEditableElement()
        );
    },
      initCKEditor() {
        class UploadAdapter {
          constructor(loader) {
            self.loader = loader;
            self.oldValue = self.editor.getData();//保存原来的内容
          }

          upload() {
            return new Promise((resolve, reject) => {
              let size = self.loader.file.size;
              if (size / 1024 > 2048) {
                self.$message({
                  message: '图片不能大于2M'
                });
                self.editor.setData(self.oldValue);
                return false;
              }
              const data = new FormData();
              data.append('imageFile', self.loader.file);
              self.fullscreenLoading = true;
              self.$http.post('http://14.29.162.130:6602/image/imageUpload', data).then(res => {
                self.fullscreenLoading = false;
                if (res) {
                  if (res.data.code == 200) {
                    resolve({
                      default: res.data.data
                    });
                  } else {
                    self.$message({
                      message: res.data.msg
                    });
                    self.editor.setData(self.oldValue);
                  }
                } else {
                  self.$message({
                    message: 'can not upload file: ' + self.loader.file.name
                  });
                  self.editor.setData(self.oldValue);
                }
              })
            }).catch(error => {
              console.log(error);
            });
          }

          abort() {
          }
        }
        //初始化编辑器
        CKEditor.create(document.querySelector('#editor'), {
          language: 'zh-cn', // 中文
          ckfinder: {
            'uploaded': 1, 'url': '/'
            // uploadUrl: '/admin/Upload/uploadUrl'
            //后端处理上传逻辑返回json数据,包括uploaded(选项true/false)和url两个字段
          }
        }).then(editor => {
          const toolbarContainer = document.querySelector('#toolbar-container');
          toolbarContainer.appendChild(editor.ui.view.toolbar.element);
          // 加载了适配器
          editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader)
          }
          this.editor = editor //将编辑器保存起来，用来随时获取编辑器中的内容等，执行一些操作
        }).catch(error => {
          console.error(error);
        });
     },
     // 新建编辑公文
    // 处理意见
    async getAddFile(val) {
      let id = this.$store.state.user.enterpriseId
      let res = {}
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
        let params = {
            "creatorIdentityId": "",
            "creatorUserId": this.$store.state.user.registerUserId,
            "object": {
                "address": this.serviceParam.address,
                "barcode": this.serviceParam.barcode,
                "brandId": this.serviceParam.brandId,
                "brandName": this.serviceParam.brandName,
                "ceCategoryId": this.ceCategoryId, // 平台
                // "ceCategoryId1": this.optionsValue1.join(),
                "ceView": this.ceView,
                "city": this.serviceParam.city,
                "commodityContent": this.content,
                "commodityName": this.serviceParam.commodityName,
                "conditions": this.serviceParam.conditions,
                "country": this.serviceParam.city,
                "county": this.serviceParam.county,
                "createTime": "",
                "enCategoryId": '', // 卖方
                "enView": '',
                "enterpriseId": id,
                "expirationDate": this.serviceParam.expirationDate,
                "filePath": this.imageUrl1,
                "manufacturer": this.serviceParam.manufacturer,
                "length": this.serviceParam.length,
                "width": this.serviceParam.width,
                "height": this.serviceParam.height,
                "packagingUnit": this.serviceParam.packagingUnit,
                "prickle": this.serviceParam.prickle,
                "province": this.serviceParam.province,
                "specsParameter": this.serviceParam.specsParameter,
                "updateTime": '',
                "weight": this.serviceParam.weight
            }
        }
        if(this.$route.query.barcode){
          res = await this.$API.code.updateProductionCommodity(params)
        }else{
          res = await this.$API.code.insertProductionCommodity(params)
        }
        if(res.code !== "SUCCESS") return false
        this.$message.success('新增产品成功')
        this.toBackList()
    },
    async getOrg(){
      let params = {}
      let res = await this.$API.code.queryCategoriesCatalog(params)
      if(res.code === 'SUCCESS'){
        let data = res.data
        this.optionsOrg1 = data.categoriesCatalog
      }
    },
    forward(){
      this.isForward = true
      this.getOrg1()
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
    addDrand(){
      this.isDialog = true
    },
    // 交易中心分类
    changeOrg2(val){
      let len = val.length-1
      this.ceCategoryId = val[len] // 交易中心分类id
      this.categoryName = this.$refs["cascader2"].getCheckedNodes()[0].label
      this.ceView = (this.$refs["cascader2"].getCheckedNodes()[0].pathLabels).join('>') // 交易中心分类视图 例子：饮品>酒>啤酒
    },
    changeOrg1(){
      this.orgId = this.$refs["cascader"].getCheckedNodes()[0].value
      this.getDept()
    },
    //选择省市区
    handleChange(value) {
      let t = this;
      t.serviceParam.province = CodeToText[value[0]];
      t.serviceParam.city = CodeToText[value[1]];
      t.serviceParam.county = CodeToText[value[2]];
    },
    handleSelectionChange(){},
    //预览图片
    handlePictureCardPreview(res, file){
      // console.log(file);
      console.log(res);
      this.dialogVisible = true;
      this.serviceParam.storeLicence = res.response.data;
    },
    handleAvatarSuccess1(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl1 = res.data;
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
      this.serviceParam.storeLicence = res.data;
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
@import "@/styles/dialog.scss";
/deep/.el-table .sort-caret{
  border: none;
}
.table-main .table-title{
  width: 780px;
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
    width: 124px;
    height: 124px;
    background: #F8F8F8;
    border: 1px dashed #ddd;
    border-radius: 4px;
    .avatar-uploader-icon{
      width: 124px;
      height: 124px;
    }
    .avatar {
      width: 122px;
      height: 122px;
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
  /deep/.table-right .el-input__inner{
    height: 26px;
  }
  /deep/.submit-time .el-input__inner{
    width: 170px;
    height: 26px;
  }
  /deep/.submit-time .el-date-editor.el-input{
    width: 170px;
  } 
  /deep/.submit-time .el-date-editor.el-input__inner{
    width: 170px;
  }
  /deep/.el-upload--picture-card{
    width: 124px;
    height: 124px;
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
  // display: block;
  // padding: 0;
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
</style>