<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <!-- <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div> -->
        <!-- <div class="print" @click="toPlatform('2')"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转为交易订单</span></div> -->
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title">
          <p>商品订单详情</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">订单编号</td>
            <td class="table-right" style="width: 305px;">
              <span>{{$route.query.dealNumber}}</span>
            </td>
            <td class="table-left">店铺名称</td>
            <td class="table-right" style="width: 305px;">
              <span>{{serviceParam.storeName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">采购方</td>
            <td class="table-right" style="width: 305px;">
              <span>{{serviceParam.pEnterpriseName}}</span>
            </td>
            <td class="table-left">销售方</td>
            <td class="table-right" style="width: 305px;">
              <span>{{serviceParam.eEnterpriseName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left sub-table-left">收货单位</td>
                <td class="table-right sub-table-right" colspan="3">
                    <span>{{serviceParam.receivingUnit}}</span>
                </td>
          </tr>
          <tr>
            <td class="table-left" style="border-left: none;">产商所在地</td>
            <td class="table-right select-colspan3" colspan="3">
                <span>{{selectedOptions}}</span>
            </td>
        </tr>
            <tr>
                <td class="table-left" style="border-left: none;">详细地址</td>
                <td class="table-right" colspan="3">
                    <span>{{serviceParam.address}}</span>
                </td>
            </tr>
            <tr>
            <td class="table-left">收货联系人</td>
            <td class="table-right" style="width: 305px;">
                <span>{{serviceParam.consignee}}</span>
            </td>
            <td class="table-left">联系电话</td>
            <td class="table-right" style="width: 305px;">
                <span>{{serviceParam.telephone}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">是否询价</td>
            <td class="table-right" style="width: 305px;">
              <span>否</span>
            </td>
            <td class="table-left">物流费用</td>
            <td class="table-right" style="width: 305px;">
              <span>按实际发生结算，另外结算</span>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">商品明细</td>
            <td class="table-right" colspan="3">
              <el-table
                  id="printJS-table"
                  ref="orderTable"
                  :data="orderList"
                  style="width: 700px;"
                  highlight-current-row
                  :default-sort="{ prop: 'date', order: 'descending' }"
              >
                  <el-table-column prop="index" label="序号" align="center" sortable width="70"></el-table-column>
                  <el-table-column prop="barcode" label="商品条形码" align="center" sortable show-overflow-tooltip width="140"></el-table-column>
                  <el-table-column prop="commodityName" label="商品名称" width="150" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="specsParameter" label="规格" width="120" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="brandName" label="品牌" width="120" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="tradePrice" label="批发价" width="120" align="center" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="quantity" label="购买数量"  width="120" align="center" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column label="小计金额"  width="120" align="center" sortable show-overflow-tooltip>
                    <template v-slot="scope">
                      <span>{{scope.row.quantity*scope.row.tradePrice}}</span>
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
        "address": "",
        "city": "",
        "consignee": "",
        "country": "中国",
        "county": "",
        "orderCommodityItems": {
          "barcode": [],
          "commId": [],
          "enterpriseId": [],
          "quantity": [],
          "sellingPrice": []
        },
        "penterpriseId": "",
        "province": "",
        "receivingUnit": "",
        "senterpriseId": "",
        "storeId": "",
        "telephone": "",
        "totalAmount": 0, // 订单总金额
        "totalQuantity": 0, // 订单总数
        "storeName": '',
        "eEnterpriseName": '' // 销售方
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
      enterpriseName: ''
    };
  },
  watch: {
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
            "dealNumber": this.$route.query.dealNumber,
            "enterpriseId": this.$store.state.user.enterpriseId
            }
        } 
        let res = await this.$API.order.dealDetails(params)
        if(res.code != 'SUCCESS') return false
        this.serviceParam = res.data
        this.serviceParam.pEnterpriseName = res.data.penterpriseName
        this.serviceParam.eEnterpriseName = res.data.senterpriseName
        this.orderList = res.data.orderCommodityListItems
        this.selectedOptions = `${this.serviceParam.province}${this.serviceParam.city}${this.serviceParam.county}`
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
    //选择省市区
    handleChange(value) {
      this.serviceParam.province = CodeToText[value[0]]
      this.serviceParam.city = CodeToText[value[1]]
      this.serviceParam.county = CodeToText[value[2]]
    },
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