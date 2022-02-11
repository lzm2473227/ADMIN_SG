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
        <!-- <div class="print" @click="toPlatform('2')"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台审核</span></div> -->
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
              <input type="text" placeholder="关于xxx的检测信息审批" v-model="form.title" :disabled="isDisabled"/>
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
                  <el-date-picker v-model="date" type="date" placeholder="选择日期" :disabled="isDisabled"></el-date-picker>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">呈报时间</td>
                <td class="table-right" style="width: 173px;border: none;">
                  <span>{{form.reportTime}}</span>
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">备注事项</td>
                <td class="table-right submit-time" style="width: 173px;border: none;">
                  <input type="text" placeholder="请输入备注事项" v-model="form.remark" :disabled="isDisabled"/>
                </td>
              </tr>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">您的意见</td>
            <td class="table-right" colspan="3" style="padding: 0;">
              <textarea
                class="table-item"
                style="margin: 4px;width: 712px"
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
              <input type="text" placeholder="系统分配" v-model="serviceParam.detectNumber" disabled/>
            </td>
            <td class="table-left">检测说明</td>
            <td class="table-right" style="width: 300px;">
              <input type="text" placeholder="请输入检测说明" v-model="serviceParam.explain" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left">检测机构</td>
            <td class="table-right">
              <input type="text" placeholder="请输入检测机构" v-model="serviceParam.testOrg" :disabled="isDisabled" />
            </td>
            <td class="table-left">备注事项</td>
            <td class="table-right">
              <input type="text" placeholder="请输入备注事项" v-model="serviceParam.remark" :disabled="isDisabled" />
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">样品信息</td>
            <td colspan="3">
                <tr>
                <td class="table-left sub-table-left">送检样品</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right: none;position: relative;">
                    <span>{{commodityObj.commodityName}}</span>
                    <span @click="onAddComm('1')" class="choose-sample" v-show="!isDisabled">选择样品</span>
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
                  <input type="text" placeholder="请输入规格" v-model="commodityObj.specsParameter" />
                </td>
                <td class="table-left sub-table-left" style="border-bottom: none">生产日期/批次</td>
                <td class="table-right sub-table-right" style="border-bottom: none">
                    <input type="text" placeholder="请输入生产日期/批次" v-model="commodityObj.manufactureDate" />
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
                  <input type="text" placeholder="请参考报告填写" v-model="serviceParam.client" />
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom: none">委托单位地址</td>
                <td class="table-right sub-table-right" colspan="3" style="border-bottom: none">
                  <input type="text" placeholder="请参考报告填写" v-model="serviceParam.clientAddress" />
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
                    <input type="text" placeholder="请参考报告填写" v-model="serviceParam.number" />
                    </td>
                    <td class="table-left sub-table-left" style="border-top: none">报告查询验证码</td>
                    <td class="table-right sub-table-right" style="border-top: none; border-right: none">
                        <input type="text" placeholder="请参考报告填写" v-model="serviceParam.authCode" />
                    </td>
                </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none">检测报告上传</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right:none;border-bottom:none">
                  <div style="display: flex; height: 80px;">
                      <el-upload
                        class="upload-demo"
                        action="http://14.29.162.130:6602/image/imageUpload"
                        :on-change="handleChange"
                        :on-success="handleAvatarSuccess"
                        :on-remove="handleRemove"
                        :before-upload="beforeAvatarUpload"
                        :file-list="fileList">
                        <el-button size="small" type="primary">点击上传</el-button>
                        <!-- <div slot="tip" class="el-upload__tip">只能上传jpeg/png/pdf文件，且不超过10M</div> -->
                    </el-upload>
                <!-- <el-upload
                  class="avatar-uploader photos-card store-avatar"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload"
                  :disabled="isDisabled">
                  <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传店铺LOGO</span>
                  </i>
                </el-upload> -->
              </div>
              <!-- <span class="pic-tip">建议上传图片格式为：<span>JPEG、PNG</span>；文件<span>小于2M</span></span> -->
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
          <!-- <div class="but-outer">
            <button type="button">选择全体</button>
            <div class="groupTree">
              <el-tree
                :data="groupTree"
                show-checkbox
                node-key="id"
                ref="group"
                @check="changeGroupTree"
                :default-checked-keys="defaultCheckedTree"
                :props="{ value: 'id', label: 'name', children: 'subList'}">
              </el-tree>
            </div>
          </div> -->
          <div class="acc dept">
            <div class="but-outer">
              <button type="button" @click="getCheckedNodes">选择部门</button>
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
                        @change="changeOrg()"
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
            <el-table-column prop="barcode" label="商品条形码" show-overflow-tooltip align="center" width="150"></el-table-column>
            <el-table-column prop="commodityName" label="商品名称" show-overflow-tooltip></el-table-column>
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
        title: '关于xxx的检测信息审批',
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
      fileList: []
    };
  },
  watch: {
    'userEntityArray.userInfo.userEntity.name': {
      handler(newV, oldV){
        console.log(newV)
      }
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
        this.getAddFile('4')
        // let par = {
        //   "creatorIdentityId": "",
        //   "creatorUserId": this.$store.state.user.registerUserId,
        // "object": {
        //     "attachments": this.form.attachments,
        //     "documentId": this.documentId,
        //     "opinion": this.form.opinion,
        //     "verdict": this.radio1
        //   }
        // }
        // this.$API.OA.dispose(par).then(res => { // 意见处理
        //   if(res.code !== 'SUCCESS') return false
        // })
        // let data = {
        //   "creatorIdentityId": "",
        //   "creatorUserId": this.$store.state.user.registerUserId,
        //   "object": {
        //     "documentId": this.documentId,
        //     "verdict": this.radio1,
        //     "opinion": this.form.opinion,
        //     "attachments": this.form.attachments,
        //   }
        // }
        // this.$API.OA.processed(data)
        // this.$router.go(-1);
        // this.$message.success('转已办件成功')
      }else{
        // 新建公文时转已办件
        this.getAddFile('1')
      }  
    },
    // 转平台审核
    async submitForAudit(){
      let id = this.$store.state.user.enterpriseId
      let par = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentId": this.documentId,
          "documentType": 'DPSP'
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
    // 获取组织列表
    async getOrg(){
        let params = {}
        let res = await this.$API.orgSet.findAllOrgTree_Org(params)
        this.orgTreeOption = res.data
    },
    changeOrg(){
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
    async getCheckedNodes(){
      // console.log(this.$refs.group.getCheckedNodes());
      // let deptId = this.$refs.group.getCheckedNodes()[0].id
      // let orgId = this.$refs.group.getCheckedNodes()[0].parentId
      // console.log(deptId);
      // let data = {
      //   "object": {
      //     "deptId": deptId,
      //     'orgId':orgId,
      //   },
      //   "pageNum": 1,
      //   "pageSize": 20
      // }
      // let res = await this.$API.OA.getClerk(data)
      // console.log(res);
    },
    // 新建编辑公文
    // 处理意见
    async getAddFile(val) {
      let receiverIdentityList = []
      let id = this.$store.state.user.enterpriseId
      let documentId = ''
      let state = 0
      let isSubmit = false
      let documentType = this.$route.query.storeId ? 'JCBJ' : 'JCSP'
      if(this.$route.query.documentId){
        documentId = this.$route.query.documentId
        state = 1
      }else{
        receiverIdentityList = this.checkedUserArr
      }
      // 新增公文时转已办件
      if(val === '1' || val === '4'){
        state = 1
      }
      // 转平台审核
      if(val === '3'){
        state = 1
        isSubmit = true
      }
      if(!this.form.title) return this.$message.error('公文标题不能为空')
      if(!this.date) return this.$message.error('办文时限不能为空')
      if(!this.serviceParam.testOrg) return this.$message.error('检测机构不能为空')
      if(!this.commodityObj.commodityName) return this.$message.error('请选择送检样品')
      if(!this.serviceParam.client) return this.$message.error('委托单位不能为空')
      if(!this.serviceParam.clientAddress) return this.$message.error('委托单位地址不能为空')
      if(!this.serviceParam.number) return this.$message.error('检测报告编号不能为空')
      if(!this.serviceParam.authCode) return this.$message.error('报告查询验证码不能为空')
      if(this.fileList.length < 1) return this.$message.error('情上传检测报告')
      this.serviceParam.barcode = this.commodityObj.barcode
      this.serviceParam.commName = this.commodityObj.commodityName
      this.serviceParam.brand = this.commodityObj.brandName
      this.serviceParam.specsParameter = this.commodityObj.specsParameter
      this.serviceParam.productionCommId = this.commodityObj.id
      this.serviceParam.manufactureDate = this.commodityObj.manufactureDate
      this.serviceParam.enterpriseId = id
      this.serviceParam.identityId = this.$store.state.user.id
      let arr = []
      this.fileList.forEach(item => {
        arr.push(item.response.data)
      })
      this.serviceParam.enterprisePdfUrl = arr.join(',')
      this.serviceParam.urlList = this.fileList
      delete this.serviceParam.state
      let params = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentId": documentId,
          "documentNumber": this.form.documentNumber,
          "documentType": documentType,
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
          "serviceParam": this.serviceParam
        }
      }
      console.log(params)
      // 新建公文再修改后有公文id转已办件
      if(val === '4'){
        let res = await this.$API.OA.processed(params)
        if(res.code === "SUCCESS"){
          this.$message.success('转已办件成功')
        }else{
          return false
        }
      }else{
        // 保存公文、新建公文时转已办件
        let res = await this.$API.OA.addFile(params)
        if(res.code === "SUCCESS"){
          if(val === '1'){
            this.$message.success('转已办件成功')
          }else if(val === '2'){
            this.$message.success('转发成功')
          }else if(val === '3'){
            this.$message.success('转平台成功')
          }else{
            this.$message.success('保存成功')
          }
        }else{
          return false
        }
      }
      this.toBackList()
    },
    // 商品列表弹窗
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
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$API.code.productionCommodityList(params).then(res => {
            if(res.code === 'SUCCESS'){
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
                });
                this.commodityData = res.data
            }
        })
    },
    onSure(){
        this.commodityObj = this.multipleSelection4[0]
        this.isShowComm = false
    },
    onClose(){
      this.isShowComm = false
      this.multipleSelection4 = []
    },
    handleSelectionChange4(val){
        this.multipleSelection4 = val
    },
    // 转发选中的人
    handleCheckedCitiesChange(val){
      // this.checkedUserArr.forEach(item => {
      //   this.userArr.push(item.userInfo.userEntity.name)
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
    changeCurrentPage(val) {
      this.pageNum = val;
    },
    // 选择省市区
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
    handleAvatarSuccess(res, file) {
      let arr = []
      arr.push(file)
      this.fileList = arr.slice(-3)
      console.log(this.fileList)
    //   if (res.code === "SUCCESS") {
    //     this.dialogImageUrl = res.data;
    //     this.imageUrl3 = res.data; // 个人照
    //   }
    },
    handleChange(file, fileList) {
        // let arr = []
        // arr.push(file)
        // this.fileList = arr.slice(-3);
        // console.log(this.fileList)
    },
    beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 10;

    //   if (file.type != 'image/jpeg' && file.type != 'image/png') {
    //     this.$message.error('上传头像图片只能是 JPG 格式!');
    //     return false
    //   }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!');
        return false
      }
      const fileSuffix = file.name.substring(file.name.lastIndexOf(".") + 1);
      const whiteList = ["pdf", "jpg", "jpeg", "png"];
      if (whiteList.indexOf(fileSuffix) === -1) {
        this.$message.error("上传文件只能是 pdf、jpg、jpeg、png");
        return false;
      }
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList.forEach((item, index) => {
          if(item.response.data === file.response.data) this.fileList.splice(index, 1)
        })
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      },
    toBackList() {
      this.$router.go(-1)
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
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
        position: absolute;
        right: 30px;
        top: 50%;
        transform: translateY(-50%);
        padding: 4px 10px;
        background: #ECF2FF;
        border: 1px solid #6593FF;
        border-radius: 2px;
        color: #6593FF;
        cursor: pointer;
  }
</style>