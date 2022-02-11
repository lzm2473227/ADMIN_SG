<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <!-- <div class="print" @click="getAddFile()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">暂存内容</span></div> -->
        <!-- <div class="print" @click="forward"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转内部审核</span></div> -->
        <!-- <div class="print" @click="toPlatform('1')"><img class="icon" src="@/assets/images/sure.png" alt="" /><span class="axis">转已办件</span></div> -->
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="onEdit"><img class="icon" src="@/assets/images/edit.png" alt="" /><span class="axis">修改商品信息</span></div>
        <!-- <div class="print" @click="toPlatform('2')"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台审核</span></div> -->
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title">
          <p>商品信息表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left table-vertical"><span>基</span><span>本</span><span>信</span><span>息</span></td>
            <td colspan="3">
                <tr>
                    <td class="table-left sub-table-left">商品条形码</td>
                    <td class="table-right sub-table-right">
                        <span>{{serviceParam.barcode}}</span>
                    </td>
                    <td class="table-left sub-table-left">商品名称</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.commodityName}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left" style="height: 38px;">商品类目<p>(交易中心)</p></td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.ceView}}</span>
                    </td>
                    <td class="table-left sub-table-left" style="height: 38px;">商品类目<p>(卖方公司)</p></td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.enView}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">生产商名称</td>
                    <td class="table-right" colspan="3">
                      <span>{{serviceParam.manufacturer}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">产商所在地</td>
                    <td class="table-right select-colspan3" colspan="3">
                      <span>{{selectedOptions}}</span>
                      <!-- <el-cascader
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange"
                        style="width: 100%"
                        placeholder="请选择产商所在地"
                      >
                      </el-cascader> -->
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">详细地址</td>
                    <td class="table-right" colspan="3">
                        <span>{{serviceParam.address}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">归属品牌</td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.brandName}}</span>
                    </td>
                    <td class="table-left sub-table-left">商品规格</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.specsParameter}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">保质期限</td>
                    <td class="table-right sub-table-right">
                        <span>{{serviceParam.expirationDate}} 天</span>
                    </td>
                    <td class="table-left sub-table-left">储存条件</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.conditions}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">商品重量</td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.weight}} 千克</span>
                    </td>
                    <td class="table-left sub-table-left">计量单位</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.prickle}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">最小包装<p>单元</p></td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.packagingUnit}}</span>
                    </td>
                    <td class="table-left sub-table-left">最小包装<p>尺寸</p></td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.packagingSize}} 厘米</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">商品特征1</td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.name}}</span>
                    </td>
                    <td class="table-left sub-table-left">商品特征2</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.name}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left" style="border-bottom:none">商品图片</td>
                    <td class="table-right sub-table-right" colspan="3" style="border-right:none;border-bottom:none">
                        <div>
                          <span v-for="(item, index) in serviceParam.filePath" :key="index"><img :src="item" alt="" style="width: 124px; margin-right: 8px"></span>
                        </div>
                    </td>
                </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical"><span>商</span><span>品</span><span>详</span><span>情</span></td>
            <td colspan="3" style="width: 692px; font-size: 0">
              <span v-html="content"></span>
              <!-- <editor v-model="content" :isClear="isClear" style="width: 692px; padding: 4px;"></editor> -->
                <!-- 工具栏容器 -->
                <!-- <div id="toolbar-container" style="width: 690px;"></div> -->
                <!-- 编辑器容器 -->
                <!-- <div id="editor"></div> -->

                <!-- <ckeditor
                  :editor="editor"
                  @ready="onReady"
                  v-model="content"
                  :config="editorConfig"
                /> -->
            </td>
          </tr>
          <!-- <tr>
            <td class="table-left table-vertical"><span>物</span><span>流</span><span>信</span><span>息</span></td>
            <td class="table-right" colspan="3">
              <div class="file-button">
                    <button type='button' @click="addDrand"><img src="@/assets/images/file-add.png" alt="">添加</button>
                    <button type='button'><img src="@/assets/images/file-edit.png" alt="">修改</button>
                    <button type='button'><img src="@/assets/images/file-del.png" alt="">删除</button>
                </div>
                <el-table
                    id="printJS-table"
                    ref="singleTable"
                    :data="tabledata"
                    style="width: 100%; margin-top: 8px;"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                >
                    <el-table-column type="selection" align="center" width="40"></el-table-column>
                    <el-table-column prop="index" label="序号" align="center" width="60"></el-table-column>
                    <el-table-column prop="name" label="发货单位" width="80" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="telNum" label="发货地址" width="90" align="center"></el-table-column>
                    <el-table-column prop="address" label="库存" width="100"></el-table-column>
                </el-table>
            </td>
          </tr> -->
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
  name: "PublishedDetailInfo",
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
      optionsOrg: [],
      tabledata: [],
      orgTreeOption:[],
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
        ceView: "",
        enView: "",
        barcode: "",
        manufacturer: "",
        brand: "",
        specsParameter: "",
        expirationDate: "",
        conditions: "",
        weight: "",
        prickle: "",
        packagingUnit: "",
        packagingSize: "",
        address: "",
        storeType: "",
        county: "",
        city: "",
        province: "",
        commodityContent: '',
        filePath: []
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
      categoryId: '',
      categoryName: '',
      date: '',
      isDialog: false,
      deptList: [],
      brandList: [],
      deptName: '',
      name: '',
      reportTime: '',
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
      content: ''
    };
  },
  watch: {
    content(val){
      // console.log(val)
    },
    stationName(newV, oldV){
      this.userArr = newV
      /* 
       * 获取选中用户的完整用户信息，传给后台用，前端页面不显示
       * 例：
       * [{identityEntity:{},
       *   roleDtoList: [],
       *   userInfo: {}
       * }]
      */
      let arr = []
      newV.forEach(item => {
        this.userEntityArray.find(function(list){
          if(list.identityEntity.name === item){
            arr.push({
              receiverDept: list.identityEntity.deptName,
              receiverId: list.identityEntity.userId,
              receiverIdentityId: list.identityEntity.id,
              receiverName: list.identityEntity.name
            })
          }
        })
      })
      this.checkedUserArr = arr
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
      let id = this.$store.state.user.enterpriseId
      // 公文详情
      if(this.documentId){
        let params = {
          "object": {
            "barcode": this.documentId,
            "enterpriseId": id
          }
        } 
        let res = await this.$API.commodityInfo.CommodityDetails(params)
        this.isDisabled = this.$store.state.user.id === res.data.reportIdentityId ? false : true // 当前用户是否与呈报人一致，否-禁用输入框
        let serviceParam = res.data
        this.serviceParam = serviceParam
        // this.selectedOptions = TextToCode[serviceParam.province][serviceParam.city][serviceParam.county].code
        this.selectedOptions = `${serviceParam.province}${serviceParam.city}${serviceParam.county}`
        this.form = res.data
        this.date = res.data.limitTime
        // this.imageUrl1 = this.serviceParam.filePath
        this.serviceParam.filePath = this.serviceParam.filePath.split(',')
        this.content = this.serviceParam.commodityContent
        this.form.reportTime = moment(res.data.reportTime).format("YYYY-MM-DD")
      }
    },
    onEdit(){
      this.$router.push({
        path: '/internalManage/commodityInfo/commodityDetailInfo',
        query: {
          barcode: this.$route.query.documentId
        }
      })
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
    // 交易中心分类
    changeOrg(val){
      let len = val.length-1
      this.categoryId = val[len] // 交易中心分类id
      this.categoryName = this.$refs["cascader1"].getCheckedNodes()[0].label
      this.ceView = (this.$refs["cascader1"].getCheckedNodes()[0].pathLabels).join('>') // 交易中心分类视图 例子：饮品>酒>啤酒
      console.log(this.$refs["cascader1"])
    },
    //选择省市区
    handleChange(value) {
      let t = this;
      t.serviceParam.province = CodeToText[value[0]];
      t.serviceParam.city = CodeToText[value[1]];
      t.serviceParam.county = CodeToText[value[2]];
    },
    handleSelectionChange(){},
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