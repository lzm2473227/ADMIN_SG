<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="getAddFile()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">暂存内容</span></div>
        <div class="print" @click="forward"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转内部审核</span></div>
        <div class="print" @click="toPlatform('1')"><img class="icon" src="@/assets/images/sure.png" alt="" /><span class="axis">转已办件</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="toPlatform('2')"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台审核</span></div>
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
              <input type="text" placeholder="请输入审批主题" v-model="form.title" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left">审批编号</td>
            <td colspan="3">
              <tr>
                <td class="table-right" style="width: 178px;border: none;">
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
                  <el-date-picker v-model="date" type="date" placeholder="选择日期" :disabled="isDisabled"></el-date-picker>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">呈报时间</td>
                <td class="table-right" style="width: 170px;border: none;">
                  <span>{{form.reportTime}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">备注事项</td>
                <td class="table-right submit-time" style="width: 170px;border: none;">
                  <input type="text" placeholder="请输入备注事项" v-model="form.remark" :disabled="isDisabled"/>
                </td>
              </tr>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">您的意见</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="请输入您的意见"
                v-model="form.opinion"
              ></textarea>
              <div style="border-top: 1px solid #ddd; padding: 20px 10px;" v-show="documentId && listLen != 0">
              <span class="idea">结论性意见：</span>
              <el-radio v-model="radio1" label="0" style="margin-left: 20px;">同意</el-radio>
              <el-radio v-model="radio1" label="1" style="margin-left: 20px;">不同意</el-radio>
              </div>
            </td>
          </tr>
          <tr style="vertical-align: top" v-show="documentId && listLen != 0">
            <td class="table-left" style="padding-top: 12px">办理意见</td>
            <td class="table-right" colspan="3">
              <el-table
                  id="printJS-table"
                  ref="singleTable"
                  :data="tabledata"
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
                <td class="table-left sub-table-left">单编编码</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right: none;">
                  <input type="text" placeholder="请输入单编编码" v-model="serviceParam.commodityCode" :disabled="isDisabled"/>
                </td>
              </tr>
                <tr>
                    <td class="table-left sub-table-left">商品条形码</td>
                    <td class="table-right sub-table-right">
                      <span>{{serviceParam.barcode}}</span>
                      <span @click="addDrand('1')" class="choose-commodity" v-show="!isDisabled">选择商品</span>
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
                    <td class="table-left sub-table-left" style="border-bottom: none;">单品普通零售价</td>
                    <td class="table-right sub-table-right" style="border-bottom: none;" colspan="3">
                      <input type="text" placeholder="普通零售价" v-model="serviceParam.retailPrice" style="width: 250px;" :disabled="isDisabled"/>
                      <span class="unit" style="left: 209px;">元</span>
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
                    <td class="table-left sub-table-left" style="border-bottom: none;">单品特惠零售价</td>
                    <td class="table-right sub-table-right" style="border-bottom: none;" colspan="3">
                        <input type="text" placeholder="普通零售价" v-model="serviceParam.preferentialRetailPrice" style="width: 250px;" :disabled="isDisabled"/>
                        <span class="unit" style="left: 209px;">元</span>
                    </td>
                </tr>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div class="pay-dialog" v-show="isForward">
      <div class="dialog-content forward-con">
        <div class="dialog-top">
          <span>用户选择框</span>
          <img @click="isForward = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="menu-but">
          <button type="button" @click="getForwardMail()">确定发送</button>
        </div>
        <div class="dialog-body">
          <div class="acc dept">
            <div class="but-outer">
              <button type="button">选择部门</button>
            </div>
            <div class="groupTree">
                <div class="gangwei-left">
                  <div class="orgtree">
                    <span class="orgtree-text">所属组织</span> 
                    <el-cascader
                        ref="cascader"
                        v-model="value"
                        :options="orgTreeOption"
                        :props='setKesLabel'
                        @change="changeOrg1()"
                        placeholder="请选择组织"
                    ></el-cascader>
                  </div>
                   <div class="orgtree">
                    <span class="orgtree-text">所属部门</span>
                    <el-select v-model="deptData.name" @change="changeStore($event)" placeholder="请选择所属部门">
                      <el-option
                        v-for="item in deptData"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                      >
                      {{item.name}}
                      </el-option>
                    </el-select>
                  </div>
                </div>
              </div>
            <div>
            </div>
          </div>
          <!-- 全选 -->
          <div class="acc">
            <div class="but-outer">
              <button type="button" @click="checkAll">选择全体</button>
            </div>
            <el-checkbox-group v-model="stationName" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="ite in userEntityArray" :label="ite.identityEntity.name" :value="ite.identityEntity.id" :key="ite.identityEntity.id">
                  {{ite.identityEntity.name}}
                </el-checkbox>
              </el-checkbox-group>
            <div>
            </div>
          </div>
          <!-- 全删 -->
          <div class="acc">
            <div class="but-outer">
              <button type="button" @click="delAll">删除全体</button>
            </div>
            <div class="alluser">
              <p class="choose-user">已选择用户</p>
              <p v-for="(item, index) in userArr" :key="index">{{item}}<img @click="changeDelCheck(item, index)" src="@/assets/images/close2.png"></p>
              <!-- <el-checkbox-group v-model="checkedItem" @change="changeDelCheck">
                <el-checkbox v-for="item in userArr" :label="item" :value="item" :key="item">
                  {{item}}
                </el-checkbox>
              </el-checkbox-group> -->
            </div>
          </div>
        </div>
      </div>
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
        "commodityCode": '',
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
      isDisabled: false,
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
  },
  methods: {
    async init(){
      this.form.reporterDept = this.$store.state.user.deptName
      this.form.reportName = this.$store.state.user.name
      this.form.reportTime = parseTime(new Date())
      // 修改价格信息
      if(this.$route.query.commodityCode){
        let params = {
          "object": {
            "commodityCode": this.$route.query.commodityCode
          }
        } 
        let res = await this.$API.commodityInfo.commodityCodePriceDetails(params)
        this.serviceParam = res.data
        res.data.preferentialStartTime = moment(res.data.preferentialStartTime).format("YYYY-MM-DD")
        res.data.preferentialEndTime = moment(res.data.preferentialEndTime).format("YYYY-MM-DD")
        this.serviceParam.preferential = (`${res.data.preferentialStartTime},${res.data.preferentialEndTime}`).split(',')
        this.commodityInfo(res.data.barcode)
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
        this.listLen = res.data.list.length
        this.date = moment(res.data.limitTime).format("YYYY-MM-DD")
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

      // params.storePhoto = this.imageUrl1; // 店铺店招
      // params.storeLogo = this.imageUrl3; // 店铺logo
      let params = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentNumber": this.form.documentNumber,
          "documentType": "DPJG",
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
          "serviceParam": {
            "commodityCode": this.serviceParam.commodityCode,
            "barcode": this.serviceParam.barcode,
            "discountRange": "90,91,92,93",
            "enterpriseId": id,
            "filePath": '',
            "monetaryUnit": this.serviceParam.monetaryUnit,
            "pDiscountRange": "40,41,42,43",
            "pMonetaryUnit": this.serviceParam.pMonetaryUnit,
            "pQuantityRange": "11,12,13,14",
            "pRetailMinimumQuantity": this.serviceParam.pRetailMinimumQuantity,
            "pTradeMinimumQuantity": this.serviceParam.pTradeMinimumQuantity,
            "preferentialEndTime": this.serviceParam.preferential[1],
            "preferentialRetailPrice": parseFloat(this.serviceParam.preferentialRetailPrice),
            "preferentialStartTime": this.serviceParam.preferential[0],
            "preferentialTradePrice": parseFloat(this.serviceParam.preferentialTradePrice),
            "quantityRange": "1,2,3,4",
            "retailMinimumQuantity": this.serviceParam.retailMinimumQuantity,
            "retailPrice": parseFloat(this.serviceParam.retailPrice),
            "tradeMinimumQuantity": this.serviceParam.tradeMinimumQuantity,
            "tradePrice": parseFloat(this.serviceParam.tradePrice)
          }
        }
      }
      let res = await this.$API.OA.addFile(params)
      if(res.code !== "SUCCESS") return false
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
    // 确定转发公文
    async getForwardMail(){
      if(this.userArr.length === 0) return this.$message('请选择用户')
      if(this.documentId){
        // 已新建公文直接转发公文
        let data = {
          "object": {
            "documentId": this.documentId,
            "receiverIdentityList": this.checkedUserArr
          }
        }
        this.$API.OA.forwardMail(data).then(res => {
          if(res.code !== "SUCCESS") return false
          this.$router.go(-1)
          this.$message.success("转发公文成功")
        })
      }else{
        // 新增公文时转发公文，需要先创建公文，再获取到公文id转发公文
        this.getAddFile('2')
      }
    },
    // 转已办件、转平台审核
    toPlatform(val){
      let msg = val === '1'?"是否确定转已办件？":"是否确定转平台审核？"
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if(val === '1') this.getProcessed() // 转已办件
        if(val === '2'){
          if(this.$route.query.documentId){
            this.submitForAudit() // 新建完成后转平台审核
          }else{
            this.getAddFile('3') // 新建时转平台审核
          }
        }
      }).catch(() => {})
    },
    // 转已办件
    getProcessed(){
      if(this.documentId){ // 编辑后的公文再转已办件
        let par = {
          "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
            "attachments": this.form.attachments,
            "documentId": this.documentId,
            "opinion": this.form.opinion,
            "verdict": this.radio1
          }
        }
        this.$API.OA.dispose(par).then(res => { // 意见处理
          if(res.code !== 'SUCCESS') return false
        })
        let data = {
          "creatorIdentityId": "",
          "creatorUserId": this.$store.state.user.registerUserId,
          "object": {
            "documentId": this.documentId,
            "verdict": this.radio1,
            "opinion": this.form.opinion,
            "attachments": this.form.attachments,
          }
        }
        this.$API.OA.processed(data)
        this.$router.go(-1);
        this.$message.success('转已办件成功')
      }else{
        // 新建公文时转已办件
        this.getAddFile('1')
      }  
    },
    // 转平台审核
    async submitForAudit(){
      let id = this.$store.state.user.enterpriseId
      let params = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "commodityCode": this.serviceParam.commodityCode,
          "barcode": this.serviceParam.barcode,
          "discountRange": "",
          "enterpriseId": id,
          "filePath": '',
          "monetaryUnit": this.serviceParam.monetaryUnit,
          "pDiscountRange": "",
          "pMonetaryUnit": this.serviceParam.pMonetaryUnit,
          "pQuantityRange": "",
          "pRetailMinimumQuantity": 0,
          "pTradeMinimumQuantity": 0,
          "preferentialEndTime": this.serviceParam.preferential[1],
          "preferentialRetailPrice": 0,
          "preferentialStartTime": this.serviceParam.preferential[0],
          "preferentialTradePrice": 0,
          "quantityRange": "",
          "retailMinimumQuantity": 0,
          "retailPrice": parseFloat(this.serviceParam.retailPrice),
          "tradeMinimumQuantity": 0,
          "tradePrice": parseFloat(this.serviceParam.tradePrice)
        }
      }
      await this.$API.commodityInfo.insertCommodityCodePrice(params)
      this.$message.success('转平台审核成功')
      this.$router.go(-1)
      // let par = {
      //   "object": {
      //     "documentId": this.documentId,
      //   }
      // }
      // let res = await this.$API.OA.submitForAudit(par)
      //   if(res.code === 'SUCCESS'){
      //     this.$message.success('转平台审核成功')
      //     this.$router.go(-1)
      //   }else{
      //     return false
      //   }
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
        let data = res.data
        this.optionsOrg = data
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
    background: url('../../../assets/images/sort.png') center no-repeat;
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