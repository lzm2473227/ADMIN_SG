<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="toPlatform()"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台审核</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title examine">
          <p>价格信息审批表</p>
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
                <td class="table-right" style="width: 175px;border: none;">
                  <span>{{form.documentNumber}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">审批呈报人</td>
                <td class="table-right" style="width: 172px;border: none;">
                  <span>{{form.reportName}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">所在部门</td>
                <td class="table-right submit-time" style="width: 172px;border: none;">
                  <span>{{form.reporterDept}}</span>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left">办文时限</td>
            <td colspan="3">
              <tr>
                <td class="table-right submit-time" style="width: 175px;border: none;">
                  <span>{{date}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">呈报时间</td>
                <td class="table-right" style="width: 172px;border: none;">
                  <span>{{form.reportTime}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">备注事项</td>
                <td class="table-right submit-time" style="width: 172px;border: none;">
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
                  :data="opinionData"
                  style="width: 680px;"
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
          <p>价格信息表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left table-vertical"><span>基</span><span>本</span><span>信</span><span>息</span></td>
            <td colspan="3">
                <tr>
                    <td class="table-left sub-table-left">商品条形码</td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.barcode}}</span>
                      <span v-show="!isDisabled" @click="addDrand('1')" class="choose-commodity">选择商品</span>
                    </td>
                    <td class="table-left sub-table-left">商品名称</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{commodityForm.commodityName}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">商品类目<br>(交易中心)</td>
                    <td class="table-right sub-table-right">
                      <span>{{commodityForm.ceView}}</span>
                    </td>
                    <td class="table-left sub-table-left">商品类目<br>(卖方公司)</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                        <span>{{commodityForm.enView}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">生产商名称</td>
                    <td class="table-right sub-table-right" colspan="3">
                        <span>{{commodityForm.manufacturer}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none; border-bottom: none;">归属品牌</td>
                    <td class="table-right" style="border-left: none; border-bottom: none;">
                      <span>{{commodityForm.brandName}}</span>
                    </td>
                    <td class="table-left" style="border-left: none; border-bottom: none;">商品规格</td>
                    <td class="table-right" style="border-left: none; border-bottom: none;">
                      <span>{{commodityForm.specsParameter}}</span>
                    </td>
                </tr>
              </td>
          </tr>
          <tr>
            <td class="table-left table-vertical"><span>普</span><span>通</span><span>价</span><span>格</span></td>
              <td colspan="3">
                <tr>
                    <td class="table-left sub-table-left">时间段</td>
                    <td class="table-right sub-table-right">
                      <span>长期</span>
                    </td>
                    <td class="table-left sub-table-left">货币单位</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <el-select v-model="serviceParam.monetaryUnit" placeholder="请选择货币单位" :disabled="isDisabled">
                        <el-option value="人民币">人民币</el-option>
                        <el-option value="美元">美元</el-option>
                        <el-option value="欧元">欧元</el-option>
                        <el-option value="日元">日元</el-option>
                        <el-option value="英镑">英镑</el-option>
                        <el-option value="加拿大元">加拿大元</el-option>
                        <el-option value="港币">港币</el-option>
                      </el-select>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">普通零售价</td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.retailPrice}} 元</span>
                    </td>
                    <td class="table-left sub-table-left">零售起订量</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.retailMinimumQuantity}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">普通批发价</td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.tradePrice}} 元</span>
                    </td>
                    <td class="table-left sub-table-left">批发起订量</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                        <input type="text" placeholder="批发起订量" v-model="serviceParam.tradeMinimumQuantity" :disabled="isDisabled"/>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left" style="border-bottom:none">普通区间<br>价格</td>
                    <td class="table-right sub-table-right" colspan="3" style="border-right:none;border-bottom:none">
                      <el-table
                        id="printJS-table"
                        ref="singleTable"
                        :data="tabledata"
                        style="width: 597px; margin-top: 8px;"
                        highlight-current-row
                        :default-sort="{ prop: 'date', order: 'descending' }"
                      >
                        <el-table-column prop="index" label="序号" align="center" width="60"></el-table-column>
                        <el-table-column label="订货数量" show-overflow-tooltip>
                          <template v-slot="scope">
                            <span v-if="scope.row.index !== '05'">{{scope.row.num1}}≤</span>
                            <span style="padding: 0 8px;">X</span>
                            <span v-if="scope.row.index === '05'">></span>
                            <span v-else>≤</span>
                            <span>{{scope.row.num2}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column prop="price" label="订货价（货币单位）" align="center">
                          <template v-slot="scope">
                            <span>{{scope.row.price1}}</span>
                            <span>~</span>
                            <span>{{scope.row.price2}}</span>
                          </template>
                        </el-table-column>
                      </el-table>
                    </td>
                </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical"><span>特</span><span>惠</span><span>价</span><span>格</span></td>
              <td colspan="3">
                <tr>
                    <td class="table-left sub-table-left">时间段</td>
                    <td class="table-right sub-table-right">
                        <el-date-picker
                          v-model="serviceParam.preferential"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          value-format="yyyy-MM-dd"
                          :disabled="isDisabled"
                        >
                        </el-date-picker>
                    </td>
                    <td class="table-left sub-table-left">货币单位</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <el-select v-model="serviceParam.pMonetaryUnit" placeholder="请选择货币单位" :disabled="isDisabled">
                        <el-option value="人民币">人民币</el-option>
                        <el-option value="美元">美元</el-option>
                        <el-option value="欧元">欧元</el-option>
                        <el-option value="日元">日元</el-option>
                        <el-option value="英镑">英镑</el-option>
                        <el-option value="加拿大元">加拿大元</el-option>
                        <el-option value="港币">港币</el-option>
                      </el-select>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">普通零售价</td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.preferentialRetailPrice}} 元</span>
                    </td>
                    <td class="table-left sub-table-left">零售起订量</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.pRetailMinimumQuantity}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left">普通批发价</td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.preferentialTradePrice}} 元</span>
                    </td>
                    <td class="table-left sub-table-left">批发起订量</td>
                    <td class="table-right sub-table-right" style="border-right: none">
                      <span>{{serviceParam.pTradeMinimumQuantity}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="table-left sub-table-left" style="border-bottom:none">特惠区间<br>价格</td>
                    <td class="table-right sub-table-right" colspan="3" style="border-right:none;border-bottom:none">
                      <el-table
                        id="printJS-table"
                        ref="singleTable"
                        :data="tabledata"
                        style="width: 597px; margin-top: 8px;"
                        highlight-current-row
                        :default-sort="{ prop: 'date', order: 'descending' }"
                      >
                        <el-table-column prop="index" label="序号" align="center" width="60"></el-table-column>
                        <el-table-column label="订货数量（x）" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="telNum" label="订货价（货币单位）" align="center"></el-table-column>
                      </el-table>
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
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content" style="width: 620px">
        <div class="dialog-top">
          <span>{{msg}}</span>
          <img @click="isDialog = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body table-main">
          <!-- 商品列表 -->
          <div v-if="characteristic === '1'">
          <el-table
            id="printJS-table"
            ref="singleTable"
            :data="commodityData"
            style="width: 584px; margin: 8px;"
            highlight-current-row
            @selection-change="handleSelectionChange"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="barcode" label="商品条形码"></el-table-column>
            <el-table-column prop="commodityName" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="brandName" label="品牌"></el-table-column>
          </el-table>
          <div class="bot" style="margin-left: 0; width: 100%;">
            <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
          </div>
          </div>
          <!-- 价格区间 -->
          <el-table
            v-else
            id="printJS-table"
            ref="singleTable"
            :data="priceData"
            style="width: 600px; margin-top: 8px;"
            highlight-current-row
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column prop="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column label="订货数量（x）" align="center">
              <template v-slot="scope">
                <input v-show="scope.row.index !== '05'" type="text" v-model="scope.row.num1">
                <span v-show="scope.row.index !== '05'">≤</span>
                <span style="padding: 0 8px;">X</span>
                <span v-show="scope.row.index !== '05'">≤</span>
                <span v-show="scope.row.index === '05'">＞</span>
                <input type="text" v-model="scope.row.num2">
              </template>
            </el-table-column>
            <el-table-column label="订货价折扣范围" align="center">
              <template v-slot="scope">
                <input type="text" v-model="scope.row.price1">
                <span>%</span>
                <span style="padding: 0 8px;">至</span>
                <input type="text" v-model="scope.row.price2">
                <span>%</span>
              </template>
            </el-table-column>
          </el-table>
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
import { parseTime } from '@/utils/index'
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
// import CKEditor from "@ckeditor/ckeditor5-vue";
import CKEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import '@ckeditor/ckeditor5-build-decoupled-document/build/translations/zh-cn' // 中文包
export default {
  name: "Newproduct",
  components: {
    Page
    // ckeditor: CKEditor.component
  },
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      options: regionData,
      optionss: [],
      orgTreeOption: [],
      selectedOptions: [],
      optionsValue: [],
      optionsOrg: [],
      tabledata: [],
      opinionData: [],
      commodityData: [],
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
      priceData: [
        {
          index: '01',
          num1: null,
          num2: null,
          price1: null,
          price2: null
        },
        {
          index: '02',
          num1: null,
          num2: null,
          price1: null,
          price2: null
        },
        {
          index: '03',
          num1: null,
          num2: null,
          price1: null,
          price2: null
        },
        {
          index: '04',
          num1: null,
          num2: null,
          price1: null,
          price2: null
        },
        {
          index: '05',
          num1: null,
          num2: null,
          price1: null,
          price2: null
        }
      ],
      form: {
        title: '',
        documentNumber: '',
        reportName: '',
        reporterDept: '',
        reportTime: '',
        remark: '',
        opinion: ''
      },
      commodityForm: {
        brandName: '',
        enView: '',
        ceView: '',
        specsParameter: '',
        commodityName: '',
        manufacturer: ''
      },
      serviceParam: {
        "barcode": "",
        "discountRange": "",
        "enterpriseId": 1,
        "monetaryUnit": "",
        "pDiscountRange": "",
        "pMonetaryUnit": "",
        "pQuantityRange": "",
        "pRetailMinimumQuantity": null,
        "pTradeMinimumQuantity": null,
        "preferential": '',
        "preferentialRetailPrice": null,
        "preferentialTradePrice": null,
        "quantityRange": "",
        "retailMinimumQuantity": null,
        "retailPrice": null,
        "tradeMinimumQuantity": null,
        "tradePrice": null
      },
      quantityRange: [],
      pQuantityRange: [],
      discountRange: [],
      pDiscountRange: [],
      preferential: '',
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
      date: '',
      isDialog: false,
      characteristic: '',
      multipleSelection: [],
      deptName: '',
      name: '',
      reportTime: '',
      value: '',
      isForward: false,
      documentId: '',
      radio1: '0',
      isDisabled: true,
      documentId: '',
      isState: false, // 状态弹窗
      stateList: [], // 公文流转流水
      listLen: 0,
      orgId: '',
      categoryIdArr: [],

      editor: null,
      content: "sssss",
      editorConfig: {
        // language: "zh-cn", // 中文
        placeholder: this.placeholder,
        toolbar: ["bold", "fontColor", "numberedList"],  //l留下加粗，字体颜色，排序
      },
    };
  },
  watch: {
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
    // this.getOrg()
  },
  created(){
    this.documentId = this.$route.query.documentId
    var  obj1=['1','2']
    var obj2=['5','6']
    var obj3 = ['9','10']
    var obj4 = ['9','10']
      function trans (arr) {
        let result = []
            arr.forEach(item => {
                item.forEach((d, i)=> {
                  let a = result[i] = result[i] || []
                      a.push(d)
              })
          })
          console.log(result)
          return result
    
        }
        trans([obj1,obj2,obj3,obj4])
  },
  methods: {
    async init(){
      this.form.reporterDept = this.$store.state.user.deptName
      this.form.reportName = this.$store.state.user.name
      this.form.reportTime = parseTime(new Date())
      // 公文详情
      if(this.documentId){
        let params = {
          "object": {
            "documentId": this.documentId,
            "documentNumber": ''
          }
        } 
        let res = await this.$API.OA.editFile(params)
        // this.isDisabled = this.$store.state.user.id === res.data.reportIdentityId ? false : true // 当前用户是否与呈报人一致，否-禁用输入框
        let serviceParam = JSON.parse(res.data.serviceParam).object
        this.serviceParam = serviceParam
        this.form = {
          title: res.data.title,
          documentNumber: res.data.documentNumber,
          opinion: res.data.opinion,
          remark: res.data.remark,
          reportName: res.data.reportName,
          reporterDept: res.data.reporterDept,
          reportTime: moment(res.data.reportTime).format("YYYY-MM-DD")
        }
        this.date = moment(res.data.limitTime).format("YYYY-MM-DD")
        this.listLen = res.data.list.length
        this.serviceParam.preferential = (`${serviceParam.preferentialStartTime},${serviceParam.preferentialEndTime}`).split(',')
        // 办理意见
        res.data.list.forEach((item, index) => {
          item.index = index+1
          item.handleTime = moment(item.handleTime).format("YYYY-MM-DD HH:mm:ss")
          if(item.verdict === '0') item.verdict = '同意'
          if(item.verdict === '1') item.verdict = '不同意'
          if(item.opinion == null) item.opinion = ''
          item.opinion = `${item.opinion}${' '}${item.verdict}`
        })
        this.opinionData = res.data.list
        this.commodityInfo(serviceParam.barcode)
      }
    },
    async commodityInfo(barcode){
      let id = this.$store.state.user.enterpriseId
      let params = {
        "object": {
          "barcode": barcode,
          "enterpriseId": id
        }
      }
      let res = await this.$API.commodityInfo.CommodityDetails(params)
      this.commodityForm = res.data
    },
    // 转平台审核
    toPlatform(val){
      let msg = "是否确定转平台审核？"
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitForAudit() // 新建完成后转平台审核
      }).catch(() => {})
    },
    // 转平台审核
    async submitForAudit(){
      let id = this.$store.state.user.enterpriseId
      // let params = {
      //   "creatorIdentityId": "",
      //   "creatorUserId": this.$store.state.user.registerUserId,
      //   "object": {
      //     "barcode": this.serviceParam.barcode,
      //     "discountRange": "90,91,92,93",
      //     "enterpriseId": id,
      //     "monetaryUnit": this.serviceParam.monetaryUnit,
      //     "pDiscountRange": "40,41,42,43",
      //     "pMonetaryUnit": this.serviceParam.pMonetaryUnit,
      //     "pQuantityRange": "11,12,13,14",
      //     "pRetailMinimumQuantity": this.serviceParam.pRetailMinimumQuantity,
      //     "pTradeMinimumQuantity": this.serviceParam.pTradeMinimumQuantity,
      //     "preferentialEndTime": this.serviceParam.preferential[1],
      //     "preferentialRetailPrice": parseFloat(this.serviceParam.preferentialRetailPrice),
      //     "preferentialStartTime": this.serviceParam.preferential[0],
      //     "preferentialTradePrice": parseFloat(this.serviceParam.preferentialTradePrice),
      //     "quantityRange": "1,2,3,4",
      //     "retailMinimumQuantity": this.serviceParam.retailMinimumQuantity,
      //     "retailPrice": parseFloat(this.serviceParam.retailPrice),
      //     "tradeMinimumQuantity": this.serviceParam.tradeMinimumQuantity,
      //     "tradePrice": parseFloat(this.serviceParam.tradePrice)
      //   }
      // }
      // let res = await this.$API.commodityInfo.insertCommodityPrice(params)
      // if(res.code === 'SUCCESS'){
      //   this.$message.success('转平台审核成功')
      //   this.$router.go(-1)
      // }
      let par = {
        "object": {
          "documentId": this.documentId,
          "documentType": 'JGSP'
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
    changeOrg1(){
      this.orgId = this.$refs["cascader"].getCheckedNodes()[0].value
      this.getDept()
    },
    // 获取部门列表
    async getDept(){
      let params = {
        "object": {
          "orgId": this.orgId
        },
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.orgSet.queryList_Dept(params)
      this.deptData = res.data
    },
    // 部门id
    changeStore(val){
      this.deptId = val // 部门id
      this.userArr = []
      this.getRoleData()
    },
    // 所在部门的所有人员
    async getRoleData(){
      let data = {
        "object": {
          "deptId": this.deptId
        },
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.OA.getClerk(data)
      this.userEntityArray = res.data
      // console.log(res);
      // res.data.forEach((item,index)=>{
      //   console.log(item);
      //   this.stationName = item.userInfo.userEntity.name
      //   console.log(this.stationName);
      // })
    },
    // 转发选中的人
    handleCheckedCitiesChange(val){
      // this.checkedUserArr.forEach(item => {
      //   this.userArr.push(item.identityEntity.name)
      // })
    },
    // 选择全部人员
    checkAll(){
      if(this.stationName.length === this.userEntityArray.length){
        return this.stationName = []
      }
      this.stationName = []
      this.userEntityArray.forEach(item => {
        this.stationName.push(item.identityEntity.name)
      })
      this.checkedUserArr = this.userEntityArray
    },
    changeDelCheck(val, index){
      this.userArr.splice(index, 1)
    },
    // 删除全体人员
    delAll(){
      this.userArr = []
      this.stationName = []
      this.checkedUserArr = []
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
    // 获取组织列表
    async getOrg1(){
        let params = {}
        let res = await this.$API.orgSet.findAllOrgTree_Org(params)
        this.orgTreeOption = res.data
    },
    async getOrg(){
        let params = {}
        let res = await this.$API.orgSet.findAllOrgTree_Org(params)
        console.log(res)
        let data = res.data
        this.optionsOrg = data
    },
    addstore() {
      let id = this.$store.state.user.enterpriseId
      // let t = this;
      // let params = t.form;
      // let businessDate = this.checkList.join()
      // if(!params.org_code) return this.$message.error('机构代码不能为空')
      // if(!params.name) return this.$message.error('组织名称不能为空')
      // if(!params.province) return this.$message.error('组织地址不能为空')
      // if(!params.remark) return this.$message.error('组织介绍不能为空')
      // if(!this.imageUrl1) return this.$message.error('请上传门店许可证')
      // if(!this.imageUrl2) return this.$message.error('请上传营业执照')
      // if(!this.imageUrl3) return this.$message.error('请上传门店照')
      
      // params.businessLicense = this.imageUrl2; // 营业执照
      // params.storeLicence = this.imageUrl1; // 门店许可证
      // params.profilePicture = this.imageUrl3; // 门店照
      let params = {
        "object": {
          "barcode": this.form.barcode,
          "discountRange": "90,91,92,93",
          "enterpriseId": id,
          "monetaryUnit": this.form.monetaryUnit,
          "pDiscountRange": "40,41,42,43",
          "pMonetaryUnit": this.form.pMonetaryUnit,
          "pQuantityRange": "11,12,13,14",
          "pRetailMinimumQuantity": this.form.pRetailMinimumQuantity,
          "pTradeMinimumQuantity": this.form.pTradeMinimumQuantity,
          "preferentialEndTime": this.form.preferential[1],
          "preferentialRetailPrice": parseFloat(this.form.preferentialRetailPrice),
          "preferentialStartTime": this.form.preferential[0],
          "preferentialTradePrice": parseFloat(this.form.preferentialTradePrice),
          "quantityRange": "1,2,3,4",
          "retailMinimumQuantity": this.form.retailMinimumQuantity,
          "retailPrice": parseFloat(this.form.retailPrice),
          "tradeMinimumQuantity": this.form.tradeMinimumQuantity,
          "tradePrice": parseFloat(this.form.tradePrice)
        }
      }

      // this.isContactNumber(this.form.contactNumber)
      // if(this.isContactNumber(this.form.contactNumber) === false) return this.$message.error("联系号码输入格式错误")
      // if (this.$route.query.name) params.storeId = this.storeId
      //判断url
      // let url = t.$route.query.name
      this.$API.commodityInfo.insertCommodityPrice(params).then((res) => {
        this.$message.success("新增价格成功")
        this.$router.go(-1)
      })
      // });
    },
    onSure(){
      if(this.characteristic  === '1'){
        this.serviceParam.barcode = this.multipleSelection[0].barcode
        this.commodityForm.brandName = this.multipleSelection[0].brandName
        this.commodityForm.ceView = this.multipleSelection[0].ceView
        this.commodityForm.commodityName = this.multipleSelection[0].commodityName
        this.commodityForm.enView = this.multipleSelection[0].enView
        this.commodityForm.specsParameter = this.multipleSelection[0].specsParameter
        this.commodityForm.manufacturer = this.multipleSelection[0].manufacturer
      }
      if(this.characteristic  === '2'){
        this.tabledata = this.priceData
        this.priceData.forEach((item, index) => {
          console.log(item)
          this.quantityRange.push(item.num1)
          // this.quantityRange.push(item.num2)
          // this.pQuantityRange.push(item.num2)
          // this.discountRange.push(item.price1)
          // this.pDiscountRange.push(item.price2)
        })
        console.log(this.quantityRange)
      }
      this.isDialog = false
    },
    addDrand(val){
      this.characteristic = val
      if(val === '1'){
        this.msg = '选择商品'
        this.getCommodityList() // 获取商品列表
      }
      if(val === '2'){
        this.msg = '设置普通区间价格'
      }
      if(val === '3'){
        this.msg = '设置特惠区间价格'
      }
      this.isDialog = true
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
    changeOrg(val){
      let len = val.length-1
      this.orgId = val[len]
      this.orgName = this.$refs["cascader"].getCheckedNodes()[0].label
    },
    //分页
    changeCurrentPage(val) {
      this.pageNum = val;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
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
.table-main table .table-right .business-time select{
  width: 70px;
  margin-right: 10px;
}
.business-time{
  display: flex;
}
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
  /deep/.table-main .table-right .el-date-editor .el-range-separator{
    line-height: 18px;
  }
  /deep/.table-right .el-input__inner{
    height: 26px;
  }
  /deep/.table-right .el-date-editor .el-range__icon{
    line-height: 12px;
  }
  /deep/.table-right .el-date-editor .el-range-separator{
    line-height: 12px;
  }
  /deep/.table-right .el-date-editor .el-range__close-icon{
    line-height: 12px;
  }
  /deep/.submit-time .el-input__inner{
    width: 170px;
  }
  /deep/.submit-time .el-date-editor.el-input{
    width: 170px;
  } 
  /deep/.submit-time .el-date-editor.el-input__inner{
    width: 170px;
  }
  /deep/.submit-time .el-input__icon{
    line-height: 20px;
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
.pay-dialog .dialog-content .dialog-body input{
  width: 70px;
  height: 26px;
  padding: 5px;
}
/deep/.el-table td, .pay-dialog .el-table th{
  padding: 6px 0;
}
.choose-commodity{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  background: #eee;
  cursor: pointer;
}
</style>