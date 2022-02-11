<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="onEdit"><img class="icon" src="@/assets/images/edit.png" alt=""/><span class="axis">修改检测信息</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title examine">
          <p>检测信息审批表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">审批主题</td>
            <td class="table-right" colspan="3">
              <span>{{form.title}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">审批编号</td>
            <td colspan="3">
              <tr>
                <td class="table-right" style="width: 174px;border: none;">
                  <span v-if="form.documentNumber">{{form.documentNumber}}</span>
                  <span v-else>系统分配</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">审批呈报人</td>
                <td class="table-right" style="width: 173px;border: none;">
                  <span>{{form.reportName}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">所在部门</td>
                <td class="table-right submit-time" style="width: 173px;border: none;">
                  <span>{{form.reporterDept}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left">办文时限</td>
            <td colspan="3">
              <tr>
                <td class="table-right submit-time" style="width: 174px;border: none;">
                  <span>{{date}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">呈报时间</td>
                <td class="table-right" style="width: 173px;border: none;">
                  <span>{{form.reportTime}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">备注事项</td>
                <td class="table-right submit-time" style="width: 173px;border: none;">
                  <span>{{form.remark}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <tr style="vertical-align: top" v-show="documentId && listLen != 0">
            <td class="table-left" style="padding-top: 12px">办理意见</td>
            <td class="table-right" colspan="3">
              <el-table
                  id="printJS-table"
                  ref="singleTable"
                  :data="tabledata"
                  style="width: 710px;"
                  highlight-current-row
                  :default-sort="{ prop: 'date', order: 'descending' }"
              >
                  <el-table-column prop="index" label="序号" align="center" sortable width="100"></el-table-column>
                  <el-table-column prop="handleTime" label="办理时间" width="170" align="center" show-overflow-tooltip sortable></el-table-column>
                  <el-table-column prop="receiverName" label="办理人" align="center" sortable width="120"></el-table-column>
                  <el-table-column prop="opinion" label="办理意见" sortable show-overflow-tooltip></el-table-column>
              </el-table>
            </td>
          </tr>
        </table>
        <div class="table-title">
          <p>检测信息表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">检测编码</td>
            <td class="table-right" style="width: 300px;">
              <span v-if="serviceParam.detectNumber">{{serviceParam.detectNumber}}</span>
              <span v-else>系统分配</span>
            </td>
            <td class="table-left">检测说明</td>
            <td class="table-right" style="width: 300px;">
              <span>{{serviceParam.explain}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">检测机构</td>
            <td class="table-right">
              <span>{{serviceParam.testOrg}}</span>
            </td>
            <td class="table-left">备注事项</td>
            <td class="table-right">
              <span>{{serviceParam.remark}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">样品信息</td>
            <td colspan="3">
                <tr>
                <td class="table-left sub-table-left">送检样品</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right: none;position: relative;">
                    <span>{{commodityObj.commodityName}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">条形码</td>
                <td class="table-right sub-table-right">
                    <span>{{commodityObj.barcode}}</span>
                </td>
                <td class="table-left sub-table-left">品牌</td>
                <td class="table-right sub-table-right">
                    <span>{{commodityObj.brandName}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom: none">规格</td>
                <td class="table-right sub-table-right" style="border-bottom: none">
                  <span>{{commodityObj.specsParameter}}</span>
                </td>
                <td class="table-left sub-table-left" style="border-bottom: none">生产日期/批次</td>
                <td class="table-right sub-table-right" style="border-bottom: none">
                  <span>{{commodityObj.manufactureDate}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">委托单位信息</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">委托单位</td>
                <td class="table-right sub-table-right" colspan="3" style="width: 620px; border-right: none;">
                  <span>{{serviceParam.client}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom: none">委托单位地址</td>
                <td class="table-right sub-table-right" colspan="3" style="border-bottom: none">
                  <span>{{serviceParam.clientAddress}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">检测信息</td>
            <td colspan="3">
                <tr>
                    <td class="table-left sub-table-left" style="border-top: none">检测报告编号</td>
                    <td class="table-right sub-table-right" style="border-top: none">
                      <span>{{serviceParam.number}}</span>
                    </td>
                    <td class="table-left sub-table-left" style="border-top: none">报告查询验证码</td>
                    <td class="table-right sub-table-right" style="border-top: none; border-right: none">
                      <span>{{serviceParam.authCode}}</span>
                    </td>
                </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none">检测报告</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right:none;border-bottom:none">
                  <span @click="onPdf" class="choose-sample">查看报告</span>
                </td>
              </tr>
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
    <div class="pdf" v-show="isShowPdf">
      <div class="pdf-main">
        <el-button-group>
          <el-button type="primary" icon="el-icon-arrow-left" size="mini" @click="prePage">上一页</el-button>
          <el-button type="primary" size="mini" @click="nextPage">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
        <div style="marginTop: 10px;marginBottom: 10px; color: #fff">{{ currentPage }} / {{ pageCount }}</div>
        <pdf :src="pdfSrc" :page="currentPage" @progress="loadedRatio = $event" @num-pages="pageCount=$event"></pdf>
        <img @click="onClose" src="@/assets/images/close3.png" alt="" class="closepdf">
      </div>
    </div>
  </div>
</template>
<script>
import { parseTime, dateToTimestamp } from '@/utils/index'
import moment from "moment";
import Page from '@/components/pages/index.vue'
import pdf from 'vue-pdf'
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
    Page, pdf 
  },
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      tabledata: [],
      options: regionData,
      optionss: [],
      orgTreeOption:[],
      deptData:[],   //选中的部门数据
      selectedOptions: [],
      optionsValue: [],
      optionsOrg: [],
      multipleSelection4: [],
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
        reporterDept: '',
        reportName: '',
        documentType: '',
        text: '',
        title: '',
        documentNumber: '',
        code: "",
        remark: "",
        remark1: "",
        opinion: '',
        verdict: '',
        reporter: '',
        deptName: '',
        reportTime: ''
      },
      commodityObj: {
        barcode: '',
        commodityName: '',
        brandName: '',
        specsParameter: '',
        manufactureDate: '',
        date: '',
        id: ''
      },
      serviceParam: {
        "authCode": "",
        "barcode": "",
        "brand": "",
        "client": "",
        "clientAddress": "",
        "commName": "",
        "detectNumber": "",
        "enterpriseId": "",
        "enterprisePdfUrl": "",
        "explain": "",
        "id": "",
        "identityId": "",
        "manufactureDate": '',
        "number": "",
        "officialWebsite": "",
        "productionCommId": "",
        "remark": "",
        "specsParameter": "",
        "state": 0,
        "testOrg": "",
        "url": "",
        "urlList": [] // 供公文详情的报告地址使用
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
      isShowComm: false,
      commodityData: [],
      fileList: [],
      currentPage: 1, // pdf文件页码
      pageCount: 15, // pdf文件总页数
      pdfSrc: "", // pdf文件地址
      loadedRatio: 0, // 当前页面的加载进度，范围是0-1 ，等于1的时候代表当前页已经完全加载完成了
      isShowPdf: false
    };
  },
  mounted() {
    this.init()
  },
  created(){
    this.documentId = this.$route.query.documentId
  },
  methods: {
    async init(){
      // 公文详情
      if(this.documentId){
        let params = {
          "object": {
            "documentId": this.documentId,
            "documentNumber": ''
          }
        } 
        let res = await this.$API.OA.editFile(params)
        this.isDisabled = this.$store.state.user.id === res.data.reportIdentityId ? false : true // 当前用户是否与呈报人一致，否-禁用输入框
        let serviceParam = JSON.parse(res.data.serviceParam).object
        this.form = res.data
        this.listLen = res.data.list.length
        this.date = res.data.limitTime
        this.form.reportTime = moment(res.data.reportTime).format("YYYY-MM-DD")
        this.serviceParam = serviceParam
        this.commodityObj.commodityName = serviceParam.commName
        this.commodityObj.barcode = serviceParam.barcode
        this.commodityObj.brandName = serviceParam.brand
        this.commodityObj.specsParameter = serviceParam.specsParameter
        this.commodityObj.manufactureDate = serviceParam.manufactureDate
        this.fileList = serviceParam.urlList
        // 办理意见
        res.data.list.forEach((item, index) => {
          item.index = index+1
          item.handleTime = moment(item.handleTime).format("YYYY-MM-DD HH:mm:ss")
          if(item.verdict === '0') item.verdict = '同意'
          if(item.verdict === '1') item.verdict = '不同意'
          if(item.opinion == null) item.opinion = ''
          item.opinion = `${item.opinion}${' '}${item.verdict}`
        })
        this.tabledata = res.data.list
      }else{
        this.form.reporterDept = this.$store.state.user.deptName
        this.form.reportName = this.$store.state.user.name
        this.form.reportTime = parseTime(new Date())
      }
    },
    onEdit(){
      this.$router.push({
        path: '/check/quality/unreleaseQualityInfo',
        query: {
          id: this.$route.query.id
        }
      })
    },
    onPdf(){
      this.isShowPdf = true
      let path = this.serviceParam.enterprisePdfUrl.split("//")[1]
      this.pdfSrc = `http://14.29.162.130:6603/file/fileDownload/${path}`
    },
    // 上一页
    prePage() {
      let page = this.currentPage
      page = page > 1 ? page - 1 : this.pageCount
      this.currentPage = page
    },
    // 下一页
    nextPage() {
      let page = this.currentPage
      page = page < this.pageCount ? page + 1 : 1
      this.currentPage = page
    },
    onClose(){
      this.isShowPdf = false
      this.pdfSrc = ''
      this.currentPage = 1
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
    changeCurrentPage(val) {
      this.pageNum = val;
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
  width: 822px;
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
    width: 652px;
    height: 52px;
    background: #F8F8F8;
    border: 1px dashed #ddd;
    border-radius: 4px;
    .avatar-uploader-icon{
      width: 652px;
      height: 52px;
    }
    .avatar {
      width: 650px;
      height: 50px;
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
  /deep/.upload-demo .el-button{
    line-height: 30px;
  }
  /deep/.upload-demo .el-upload-list__item{
    background: #eee;
  }
  .choose-sample{
    padding: 4px 10px;
    background: #ECF2FF;
    border: 1px solid #6593FF;
    border-radius: 2px;
    color: #6593FF;
    cursor: pointer;
  }
.pdf{
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  display: flex;
  justify-content: center;
  // align-items: center;
  .pdf-main{
    width: 600px;
    // height: 100%;
    text-align: center;
    margin-top: 10px;
  }
}
/deep/.pdf .el-button-group .el-button--primary{
  border-color: #409EFF;
  background-color: #409EFF;
  line-height: 30px;
}
.closepdf{
  position: absolute;
  top: 20px;
  right: 30px;
  cursor: pointer;
}
</style>