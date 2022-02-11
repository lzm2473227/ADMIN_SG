<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="toPlatform()"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">生成编码计划</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title examine">
          <p>产品编码计划审批表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">审批件标题</td>
            <td class="table-right" colspan="3">
              <span>{{form.title}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">审批编号</td>
            <td colspan="3">
              <tr>
                <td class="table-right" style="width: 170px;border: none;">
                  <span>{{form.documentNumber}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">审批呈报人</td>
                <td class="table-right" style="width: 170px;border: none;">
                  <span>{{form.reportName}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">所在部门</td>
                <td class="table-right submit-time" style="width: 170px;border: none;">
                  <span>{{form.reporterDept}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left">办文时限</td>
            <td colspan="3">
              <tr>
                <td class="table-right submit-time" style="width: 170px;border: none;">
                  <span>{{date}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">呈报时间</td>
                <td class="table-right" style="width: 170px;border: none;">
                  <span>{{form.reportTime}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">备注事项</td>
                <td class="table-right submit-time" style="width: 170px;border: none;">
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
                  style="width: 700px;"
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
          <p>产品编码计划表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">编码计划编号</td>
            <td class="table-right" style="width: 305px;">
              <input type="text" placeholder="系统分配" v-model="serviceParam.codeInfoEntity.codeNumber" disabled/>
            </td>
            <td class="table-left">计划说明</td>
            <td class="table-right" style="width: 305px;">
              <span>{{serviceParam.codeInfoEntity.codeExplain}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">产品条形码</td>
            <td class="table-right sub-table-right">
                <span>{{commodityObj.barcode}}</span>
            </td>
            <td class="table-left">产品名称</td>
            <td class="table-right" style="width: 305px;">
              <span>{{commodityObj.commodityName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">产品品牌</td>
            <td class="table-right" style="width: 305px;">
              <span>{{commodityObj.brandName}}</span>
            </td>
            <td class="table-left">产品规格</td>
            <td class="table-right" style="width: 305px;">
              <span>{{commodityObj.specsParameter}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">单品/箱/垛设置</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">生码数量</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right: none">
                  <span>{{serviceParam.codeInfoEntity.item}} : {{serviceParam.codeInfoEntity.box}} : {{serviceParam.codeInfoEntity.stack}}</span>
                </td>
                <td class="table-left sub-table-left" style="border-right: none; background: none"></td>
                <td class="table-right sub-table-right" style="border-right: none"></td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">数量比例</td>
                <td class="table-right sub-table-right" colspan="3" style="border-bottom:none;border-right: none">
                  <span>单品：箱 = {{serviceParam.codeInfoEntity.commBoxRatio}}; 箱：垛 ={{serviceParam.codeInfoEntity.boxStackRatio}}</span>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;border-right: none; background: none"></td>
                <td class="table-right sub-table-right" style="border-bottom:none;border-right: none"></td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">单品编码设置</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">单品数量</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{serviceParam.codeInfoEntity.item}}</span>
                </td>
                <td class="table-left sub-table-left">打码位置</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{serviceParam.codeCommEntity.printerPosition}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">二维码形状</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{serviceParam.codeCommEntity.qrCodeForm}}</span>
                </td>
                <td class="table-left sub-table-left">二维码长 * 宽</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{serviceParam.codeCommEntity.chang}} * {{serviceParam.codeCommEntity.kuan}} 毫米</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码内容</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                  <span v-show="serviceParam.codeCommEntity.qrCodeContent === 1">编码</span>
                  <span v-show="serviceParam.codeCommEntity.qrCodeContent === 2">编码</span>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码网址</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <span>{{serviceParam.codeCommEntity.qrCodeUrl}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">箱码设置</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">箱数量</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{serviceParam.codeInfoEntity.box}}</span>
                </td>
                <td class="table-left sub-table-left">打码位置</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{serviceParam.codeBoxEntity.printerPosition}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">二维码形状</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{serviceParam.codeBoxEntity.qrCodeForm}}</span>
                </td>
                <td class="table-left sub-table-left">二维码长 * 宽</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{serviceParam.codeBoxEntity.chang}} * {{serviceParam.codeBoxEntity.kuan}} 毫米</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码内容</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                  <span v-show="serviceParam.codeBoxEntity.qrCodeContent === 1">编码</span>
                  <span v-show="serviceParam.codeBoxEntity.qrCodeContent === 2">编码</span>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码网址</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <span>{{serviceParam.codeBoxEntity.qrCodeUrl}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">垛码设置</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">垛数量</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{serviceParam.codeInfoEntity.stack}}</span>
                </td>
                <td class="table-left sub-table-left">打码位置</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{serviceParam.codeStackEntity.printerPosition}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">二维码形状</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{serviceParam.codeStackEntity.qrCodeForm}}</span>
                </td>
                <td class="table-left sub-table-left">二维码长 * 宽</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{serviceParam.codeStackEntity.chang}} * {{serviceParam.codeStackEntity.kuan}} 毫米</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码内容</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                  <span v-show="serviceParam.codeStackEntity.qrCodeContent === 1">编码</span>
                  <span v-show="serviceParam.codeStackEntity.qrCodeContent === 2">编码</span>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码网址</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <span>{{serviceParam.codeStackEntity.qrCodeUrl}}</span>
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
    <div class="pay-dialog" v-show="isShowComm">
      <div class="dialog-content" style="width: 620px">
        <div class="dialog-top">
          <span>选择产品</span>
          <img @click="onClose" src="@/assets/images/close.png" alt="">
        </div>
        <div class="table-main">
          <el-table
            id="printJS-table"
            ref="singleTable"
            :data="commodityData"
            style="width: 100%; padding: 8px;"
            highlight-current-row
            @selection-change="handleSelectionChange4"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="barcode" label="商品条形码" show-overflow-tooltip align="center" width="160"></el-table-column>
            <el-table-column prop="commodityName" label="商品名称" show-overflow-tooltip min-width="160"></el-table-column>
            <el-table-column prop="brandName" label="品牌" show-overflow-tooltip width="120"></el-table-column>
          </el-table>
          <div class="bot" style="margin-left: 0; width: 100%; margin-top: 0; border: none">
            <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
          </div>
          <div class="scan-code">
            <button class="sure" @click="onSure">确定</button>
            <button @click="onClose">取消</button>
          </div>
        </div>
      </div>
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
      tabledata1: [],
      multipleSelection: [],
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
      commodityObj: {
        barcode: '',
        commodityName: '',
        brandName: '',
        specsParameter: '',
        commId: null
      },
      serviceParam: {
        "codeBoxEntity": { // 箱码设置
          "printerPosition": "",
          "qrCodeContent": 1,
          "qrCodeForm": "",
          "qrCodeSize": "",
          "qrCodeUrl": "",
          "chang": '',
          "kuan": ''
        },
        "codeCommEntity": { // 单品编码设置
          "commId": "",
          "printerPosition": "",
          "qrCodeContent": 1,
          "qrCodeForm": "",
          "qrCodeSize": "",
          "qrCodeUrl": "",
          "chang": '',
          "kuan": ''
        },
        "codeInfoEntity": { // 生码
          "barcode": "",
          "box": null,
          "codeExplain": "",
          "codeNumber": "",
          "commId": "",
          "commName": "",
          "enterpriseId": "",
          "identityId": "",
          "item": null,
          "ratio": "",
          "receive": 0,
          "stack": null,
          "commBoxRatio": '',
          "boxStackRatio": ''
        },
        "codeStackEntity": { // 垛码设置
          "printerPosition": "",
          "qrCodeContent": 1,
          "qrCodeForm": "",
          "qrCodeSize": "",
          "qrCodeUrl": "",
          "chang": '',
          "kuan": ''
        }
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgArr: [],
      msg: '',
      value: '',
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
      isDialog: false,
      storeData: [],
      brandData: [],
      commodityData: [],
      colspanNum: '3',
      isShowSort: true,
      isShowComm: false,
      showMsg: '',
      radioDan: 0,
      radioXiang: 0,
      radioDuo: 0,
    };
  },
  mounted() {
    this.init()
    this.getDept1()
  },
  created(){
    this.documentId = this.$route.query.documentId
  },
  methods: {
    async init(){
      this.form.reporterDept = this.$store.state.user.deptName
      this.form.reportName = this.$store.state.user.name
      this.form.reportTime = parseTime(new Date())
      if(this.$route.query.storeId){
        let params = {
          "object": {
            "storeId": this.$route.query.storeId
          }
        }
        let res = await this.$API.storeInfo.storeDetails(params)
        this.form.code = res.data.storeCode
        this.form.storeName = res.data.storeName
        this.form.storeType = res.data.storeType
        this.dept = res.data.attributionDepartment
        this.form.storeServicePhone = res.data.storeServicePhone
        this.form.onlineCustomerService = res.data.onlineCustomerService
        this.form.remark1 = res.data.remark
        this.form.storeIntroduce = res.data.storeIntroduce
        this.imageUrl3 = res.data.storeLogo
        this.imageUrl1 = res.data.storePhoto
      }
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
        this.serviceParam = JSON.parse(res.data.serviceParam).object
        console.log(this.serviceParam)
        this.form = res.data
        this.listLen = res.data.list.length
        this.date = res.data.limitTime
        this.form.reportTime = moment(res.data.reportTime).format("YYYY-MM-DD")
        this.getCommodityInfo(this.serviceParam.codeInfoEntity)
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
      }
    },
    // 获取商品信息
    async getCommodityInfo(data){
      let params = {
        "object": {
          "barcode": data.barcode,
          "enterpriseId": this.$store.state.user.enterpriseId
        }
      } 
      let res = await this.$API.code.productionCommodityDetails(params)
      if(res.code === 'SUCCESS'){
        this.commodityObj = res.data
        this.commodityObj.commId = parseInt(res.data.id)
      }
    },
    async getDept1(){
        let params = {
          "object": {
            // "address": "",
            // "city": "",
            // "dept_code": "",
            // "district": "",
            // "id": "",
            // "idPhotos": "",
            // "latitude": 0,
            // "longitude": 0,
            // "name": "",
            // "orgId": "",
            // "orgName": "",
            // "profilePicture": "",
            // "province": "",
            // "remark": "",
            // "tags": ""
          },
          "pageNum": this.pageNum,
          "pageSize": this.pageSize,
        }
        let res = await this.$API.orgSet.queryList_Dept(params)
        let data = res.data
        data.forEach(item => {
          this.deptList.push({
            value: item.name,
            label: item.name
          })
        })
    },
    // 生成编码计划
    toPlatform(){
      this.$confirm('是否确定生成编码计划？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.getAddFile() // 生成编码计划
      }).catch(() => {})
    },
    // 生成编码计划
    async getAddFile() {
      this.serviceParam.codeInfoEntity.enterpriseId = this.$store.state.user.enterpriseId
      this.serviceParam.codeInfoEntity.barcode = this.commodityObj.barcode
      this.serviceParam.codeInfoEntity.commId = this.commodityObj.commId
      this.serviceParam.codeCommEntity.commId = this.commodityObj.commId
      this.serviceParam.codeInfoEntity.identityId = this.$store.state.user.id
      // this.serviceParam.codeCommEntity.qrCodeSize = `${this.serviceParam.codeCommEntity.chang}, ${this.serviceParam.codeCommEntity.kuan}`
      // this.serviceParam.codeBoxEntity.qrCodeSize = `${this.serviceParam.codeBoxEntity.chang}, ${this.serviceParam.codeBoxEntity.kuan}`
      // this.serviceParam.codeStackEntity.qrCodeSize = `${this.serviceParam.codeStackEntity.chang}, ${this.serviceParam.codeStackEntity.kuan}`
      // this.serviceParam.codeInfoEntity.commBoxRatio = `${this.serviceParam.codeInfoEntity.item/this.serviceParam.codeInfoEntity.box}:${this.serviceParam.codeInfoEntity.box/this.serviceParam.codeInfoEntity.box}`
      // this.serviceParam.codeInfoEntity.boxStackRatio = `${this.serviceParam.codeInfoEntity.box/this.serviceParam.codeInfoEntity.stack}:${this.serviceParam.codeInfoEntity.stack/this.serviceParam.codeInfoEntity.stack}`
      this.serviceParam.codeInfoEntity.ratio = `${this.serviceParam.codeInfoEntity.item}:${this.serviceParam.codeInfoEntity.box}:${this.serviceParam.codeInfoEntity.stack}`
      this.serviceParam.codeInfoEntity.documentId = this.documentId
      let serviceParam = this.serviceParam
      delete serviceParam.codeBoxEntity.chang
      delete serviceParam.codeBoxEntity.kuan
      delete serviceParam.codeCommEntity.chang
      delete serviceParam.codeCommEntity.kuan
      delete serviceParam.codeStackEntity.chang
      delete serviceParam.codeStackEntity.kuan
      let params = {
        "creatorIdentityId": this.$store.state.user.id,
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": serviceParam
      }
      let res = await this.$API.code.insertCode(params)
      if(res.code !== "SUCCESS") return false
      this.$message.success('生成编码计划成功')
      this.toBackList()
    },
    forward(){
      this.isForward = true
      this.getOrg()
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
    onAddComm(){
      this.isShowComm = true
      this.getCommodityList()
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
      // this.$API.commodityInfo.publishedCommodityList(params).then(res => {
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
      this.isShowComm = false
      this.multipleSelection4 = []
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleSelectionChange4(val){
      this.multipleSelection4 = val
    },
    onSure(){
      this.commodityObj.barcode = this.multipleSelection4[0].barcode
      this.commodityObj.commodityName = this.multipleSelection4[0].commodityName
      this.commodityObj.brandName = this.multipleSelection4[0].brandName
      this.commodityObj.specsParameter = this.multipleSelection4[0].specsParameter
      this.commodityObj.commId = this.multipleSelection4[0].id
      this.isShowComm = false
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
.addComm{
  span{
    display: inline-block;
    padding: 10px 15px;
    background: #ddd;
    margin-bottom: 4px;
    margin-right: 10px;
    border-radius: 2px;
    color: #333;
    cursor: pointer;
  }
}
/deep/.el-table .cell{
  line-height: 13px;
}
/deep/.el-table td, .el-table th{
  padding: 5px 0;
}
</style>