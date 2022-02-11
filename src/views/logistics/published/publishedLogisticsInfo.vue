<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <!-- <div class="print" @click="toPlatform('2')"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">提交平台物流申请</span></div> -->
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title">
          <p>运单详情</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">物流编号</td>
            <td class="table-right" style="width: 305px;">
              <span>{{serviceParam.waybillCode}}</span>
            </td>
            <td class="table-left">物流说明</td>
            <td class="table-right" style="width: 305px;">
              <span>{{shuoming}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">物流承运方</td>
            <td class="table-right" style="width: 305px;">
              <span>跨越速运</span>
            </td>
            <td class="table-left">物流运单号</td>
            <td class="table-right" style="width: 305px;">
              <span>{{serviceParam.waybillNumber}}</span>
            </td>
          </tr>
          <!-- 发货信息 -->
          <tr>
            <td class="table-left table-vertical">发货信息</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">发货单位</td>
                <td class="table-right sub-table-right found-time" colspan="3" style="border-right: none">
                  <span>{{serviceParam.denterpriseName}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">发货仓库</td>
                <td class="table-right sub-table-right found-time">
                  <span></span>
                </td>
                <td class="table-left sub-table-left">仓库编号</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span></span>
                </td>
              </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">发货地址</td>
                    <td class="table-right select-colspan3" colspan="3" style="border-right: none">
                      <span>{{serviceParam.dprovince}}{{serviceParam.dcity}}{{serviceParam.dcounty}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">详细地址</td>
                    <td class="table-right" colspan="3" style="border-right: none">
                      <span>{{serviceParam.daddress}}</span>
                    </td>
                </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">发货联系人</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                  <span>{{serviceParam.dperson}}</span>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">联系人手机<br>号码</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <span>{{serviceParam.dphone}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <!-- 收货信息 -->
          <tr>
            <td class="table-left table-vertical">收货信息</td>
            <td colspan="3">
              <tr>
                <td class="table-left" style="border-left: none; border-top: none">收货单位</td>
                <td class="table-right" colspan="3" style="border-right: none; border-top: none">
                  <span>{{serviceParam.penterpriseName}}</span>
                </td>
              </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">收货地址</td>
                    <td class="table-right select-colspan3" colspan="3" style="border-right: none">
                      <span>{{serviceParam.pprovince}}{{serviceParam.pcity}}{{serviceParam.pcounty}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">详细地址</td>
                    <td class="table-right" colspan="3" style="border-right: none">
                      <span>{{serviceParam.paddress}}</span>
                    </td>
                </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">收货联系人</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                  <span>{{serviceParam.pperson}}</span>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">收货人手机<br>号码</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <span>{{serviceParam.pphone}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <!-- 货物信息 -->
          <tr>
            <td class="table-left table-vertical">货物信息</td>
                <td colspan="3">
                  <tr>
                    <td class="table-left" style="border-left: none; border-top: none">托寄物</td>
                    <td class="table-right" colspan="3" style="border-right: none; border-top: none">
                      <span>{{serviceParam.goodsType}}</span>
                    </td>
                  </tr>
                <tr>
                    <td class="table-left sub-table-left" style="border-bottom:none;">打包总件数（件）</td>
                    <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                      <span>{{serviceParam.count}}</span>
                    </td>
                    <td class="table-left sub-table-left" style="border-bottom:none;">总重量(千克)</td>
                    <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                      <span>{{serviceParam.actualWeight}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none; border-bottom:none;">货物总体积</td>
                    <td class="table-right" colspan="3" style="border-right: none; border-bottom:none;">
                      <span>{{serviceParam.length}} × {{serviceParam.width}} × {{serviceParam.height}} 厘米</span>
                    </td>
                </tr>
            </td>
          </tr>
          <tr class="table-left table-vertical">
            <td class="table-left">货物明细</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">关联出库单号</td>
                <td class="table-right sub-table-right found-time" style="background: #fff;">
                  <span></span>
                </td>
                <td class="table-left sub-table-left">关联订单号</td>
                <td class="table-right sub-table-right" style="background: #fff;border-right: none">
                  <span class="detail-info">{{serviceParam.dealNumber}}</span>
                </td>
              </tr>
              <!-- <div class="addComm">
                <span @click="onAddComm">添加商品</span>
                <span>删除商品</span>
              </div> -->
              <el-table
                  id="printJS-table"
                  ref="orderTable"
                  :data="orderList"
                  style="width: 700px;"
                  highlight-current-row
                  :default-sort="{ prop: 'date', order: 'descending' }"
              >
                  <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
                  <el-table-column prop="index" label="序号" align="center" sortable width="70"></el-table-column>
                  <el-table-column prop="barcode" label="商品条形码" align="center" sortable show-overflow-tooltip width="140"></el-table-column>
                  <el-table-column prop="commodityName" label="商品名称" width="150" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="specsParameter" label="规格" width="120" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="brandName" label="品牌" width="120" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="tradePrice" label="数量" width="120" align="center" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column label="货物编码" width="120" align="center" sortable show-overflow-tooltip>
                    <template v-slot="scope">
                        <span class="detail-info" @click="onDetail(scope.row)">查看明细</span>
                    </template>
                  </el-table-column>
                  <!-- <el-table-column label="特惠时间段" width="170" align="center" show-overflow-tooltip sortable>
                    <template v-slot="scope">
                      <span id="preferential">起 {{scope.row.preferentialStartTime}}</span><br>
                      <span>至 {{scope.row.preferentialEndTime}}</span>
                    </template>
                  </el-table-column> -->
              </el-table>
            </td>
          </tr>
            <!-- 其他信息 -->
            <tr>
                <td class="table-left table-vertical">其他信息</td>
                    <td colspan="3">
                    <tr>
                        <td class="table-left" style="border-left: none; border-top: none;">付款方式</td>
                        <td class="table-right" colspan="3" style="border-right: none; border-top: none;">
                          <span v-show="serviceParam.payMode === 10">寄方付</span>
                          <span v-show="serviceParam.payMode === 20">收方付</span>
                          <span v-show="serviceParam.payMode === 30">第三方付，付款账号</span>
                        </td>
                    </tr>
                    <tr>
                      <td class="table-left" style="border-left: none;">服务方式</td>
                      <td class="table-right" colspan="3" style="border-right: none; border-top: none;">
                        <el-select v-model="serviceParam.serviceMode" placeholder="请选择服务方式" :disabled="isDisabled">
                          <el-option
                            v-for="item in serviceMode"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          >
                          </el-option>
                        </el-select>
                      </td>
                    </tr>
                    <tr>
                        <td class="table-left sub-table-left">签回单</td>
                        <td class="table-right sub-table-right found-time">
                          <span v-show="serviceParam.receiptFlag === 30">回单图片</span>
                          <span v-show="serviceParam.receiptFlag === 10">回单原件</span>
                        </td>
                        <td class="table-left sub-table-left" >回单数量</td>
                        <td class="table-right sub-table-right" style="border-right: none;">
                          <span>{{serviceParam.receiptCount}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-left sub-table-left" style="border-bottom:none;">保价声明（元）</td>
                        <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                          <span>{{serviceParam.insuranceValue}}</span>
                        </td>
                        <td class="table-left sub-table-left" style="border-bottom:none;">包装服务</td>
                        <td class="table-right sub-table-right woodenFrame" style="border-right: none; border-bottom:none;">
                          <span v-show="serviceParam.woodenFrame === '10'">打卡板</span>
                          <span v-show="serviceParam.woodenFrame === '20'">打木架</span>
                          <span v-show="serviceParam.woodenFrame === '30'">打木箱</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-left" style="border-left: none; border-bottom:none;">备注事项</td>
                        <td class="table-right" colspan="3" style="border-right: none; border-bottom:none;">
                          <span>{{serviceParam.waybillRemark}}</span>
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
import { constant } from 'lodash';
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
      orderList: [],
      tabledata: [],
      tabledata1: [],
      multipleSelection: [],
      orderSelection: [],
      multipleSelection4: [],
      options: regionData,
      options1: regionData,
      optionss: [],
      orgTreeOption:[],
      deptData:[],   //选中的部门数据
      selectedOptions: [],
      selectedOptions1: [],
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
        "actualWeight": 0,
        "count": 0,
        "daddress": "",
        "dcityName": "",
        "dcompanyName": "",
        "dcountry": "中国",
        "dcountyName": "",
        "denterpriseId": "",
        "dperson": "",
        "dphone": "",
        "dprovinceName": "",
        "goodsType": "",
        "height": "",
        "insuranceValue": 0,
        "length": "",
        "orderId": "",
        "pAddress": "",
        "payMode": 20,
        "paymentCustomer": "",
        "pcityName": "",
        "pcompanyName": "",
        "pcountry": "中国",
        "pcountyName": "",
        "penterpriseId": "",
        "pperson": "",
        "pphone": "",
        "pprovinceName": "",
        "receiptCount": 0,
        "receiptFlag": 30,
        "serviceMode": 0,
        "waybillRemark": "",
        "width": "",
        "tiji": '',
        "woodenFrame": null
      },
      "woodenFrame": [{
        value: 10,
        label: '打卡板'
      },{
        value: 20,
        label: '打木架'
      },{
        value: 30,
        label: '打木箱'
      }],
      "serviceMode": [{
        value: 10,
        label: '当天达'
      },{
        value: 20,
        label: '次日达'
      },{
        value: 30,
        label: '隔日达'
      },{
        value: 40,
        label: '陆运件'
      },{
        value: 50,
        label: '同城次日'
      },{
        value: 60,
        label: '次晨达'
      },{
        value: 70,
        label: '同城即日'
      },{
        value: 80,
        label: '航空件'
      },{
        value: 160,
        label: '省内次日'
      },{
        value: 170,
        label: '省内即日'
      },{
        value: 210,
        label: '空运'
      },{
        value: 220,
        label: '专运'
      }],
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
      radio2: 0,
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
      isShowStoreName: false,
      isShowSort: true,
      isShowComm: false,
      showMsg: '',
      enterpriseName: '',
      shuoming: '',
      bianhao: ''
    };
  },
  watch: {
  },
  mounted() {
    this.init()
    // this.getData()
    // this.getDept1()
  },
  created(){
    this.waybillNumber = this.$route.query.waybillNumber
  },
  methods: {
    getData(){
      this.serviceParam.storeName = this.$route.query.storeName
      this.serviceParam.pEnterpriseName = this.$store.state.user.identityDtoList[0].identityEntity.orgName
      this.serviceParam.eEnterpriseName = this.$route.query.enterpriseName
      this.orderList = JSON.parse(sessionStorage.getItem('commList'))
      this.$nextTick(() => {
        this.orderList.forEach(row => {
          this.$refs.orderTable.toggleRowSelection(row, true)
        })
      })
    },
    async init(){
      let orderId = ''
      // 公文详情
      if(this.waybillNumber){
        let params = {
          "object": {
            "waybillNumber": this.waybillNumber
          }
        } 
        let res = await this.$API.logistics.waybillDetails(params)
        this.isDisabled = this.$store.state.user.id === res.data.reportIdentityId ? false : true // 当前用户是否与呈报人一致，否-禁用输入框
        this.serviceParam = res.data
        console.log(this.serviceParam)
        this.selectedOptions = TextToCode[this.serviceParam.dprovince][this.serviceParam.dcity][this.serviceParam.dcounty].code
        this.selectedOptions1 = TextToCode[this.serviceParam.pprovince][this.serviceParam.pcity][this.serviceParam.pcounty].code
        // this.serviceParam.tiji = `${this.serviceParam.length} * ${this.serviceParam.width} * ${this.serviceParam.height} 厘米`
        orderId = this.serviceParam.orderId
      }
      // 获取订单详情
      // this.getOrderDetail(orderId)
    },
    async getOrderDetail(val){
      let orderId = ''
      if(val) orderId = val
      if(this.$route.query.dealNumber) orderId = this.$route.query.dealNumber
      let params = {
        "object": {
          "dealNumber": orderId,
          "enterpriseId": this.$store.state.user.enterpriseId
        }
      } 
      let res = await this.$API.order.dealDetails(params)
      if(res.code != 'SUCCESS') return
      if(this.$route.query.dealNumber){
        this.serviceParam = res.data
        // 收货信息
        this.serviceParam.pCompanyName = res.data.receivingUnit
        this.serviceParam.pAddress = res.data.address
        this.serviceParam.pPerson = res.data.consignee
        this.serviceParam.pPhone = res.data.telephone
        this.serviceParam.pProvinceName = res.data.province
        this.serviceParam.pCityName = res.data.city
        this.serviceParam.pCountyName = res.data.county
        this.selectedOptions1 = TextToCode[res.data.province][res.data.city][res.data.county].code
      }
      this.orderList = res.data.orderCommodityListItems
    },
    // 转已办件、转平台审核
    toPlatform(val){
      this.$confirm("是否确定转平台审核？", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitForAudit() // 新建完成后转平台审核
      }).catch(() => {})
    },
    // 转平台审核
    async submitForAudit(){
      let par = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentId": this.documentId,
          "documentType": "WLSP"
        }
      }
      let res = await this.$API.OA.submitForAudit(par)
      if(res.code === 'SUCCESS'){
        this.$message.success('转平台审核成功')
        this.$router.go(-1)
      }else{
        return false
      }
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
          "enterpriseId": this.$store.state.user.enterpriseId
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$API.order.orderCartList(params).then(res => {
          let data = res.data.orderCardListItems
          this.total = res.total;
          this.pages = res.pages;
          // 序号倒序排列
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          _.forEach(data, function (item, key) {
            item.index = len[key]
            item.preferentialStartTime = moment(item.preferentialStartTime).format("YYYY-MM-DD h:mm:ss")
            item.preferentialEndTime = moment(item.preferentialEndTime).format("YYYY-MM-DD h:mm:ss")
            // item.price = item.price.toFixed(2)
          });
          this.commodityData = data
        })
    },
    onClose(){
      this.isShowComm = false
      this.multipleSelection4 = []
    },
    orderSelectionChange(val){
      this.orderSelection = val
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleSelectionChange4(val){
      this.multipleSelection4 = val
    },
    changeCurrentPage(val) {
      this.pageNum = val;
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
    },
    leavePage(){
      sessionStorage.removeItem('commList')
    }
  },
  destroyed(){
    this.leavePage()
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/reset.scss";
@import "@/styles/dialog.scss";
/deep/.el-table .caret-wrapper {
    background: url('../../../assets/images/sort.png') center no-repeat;
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
/deep/ .woodenFrame .el-select .el-input__inner{
  width: 246px;
}
</style>