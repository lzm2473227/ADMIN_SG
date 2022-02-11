<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="getAddFile('4')"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">暂存内容</span></div>
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
          <p>品牌信息审批表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">审批主题</td>
            <td class="table-right" colspan="3">
              <input type="text" placeholder="关于xxx的品牌信息审批" v-model="form.title" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left">审批编号</td>
            <td colspan="3">
              <tr>
                <td class="table-right" style="width: 178px;border: none;">
                  <span v-if="form.documentNumber">{{form.documentNumber}}</span>
                  <span v-else>系统分配</span>
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
            <td class="table-right" colspan="3" style="padding: 0;">
              <textarea
                class="table-item"
                style="margin: 4px;width: 682px"
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
                  style="width: 684px;"
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
          <p>品牌信息表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left sub-table-left">品牌编号</td>
            <td class="table-right sub-table-right" style="width: 303px">
              <span v-if="serviceParam.code">{{serviceParam.code}}</span>
              <span v-else>系统分配</span>
            </td>
            <td class="table-left sub-table-left">品牌名称<br>（中文）</td>
            <td class="table-right sub-table-right" style="width: 303px">
              <input type="text" placeholder="请输入品牌名称（中文）" v-model="serviceParam.brandName" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left sub-table-left">品牌名称<br>（英文）</td>
            <td class="table-right sub-table-right">
              <input type="text" placeholder="请输入品牌名称（英文）" v-model="serviceParam.brandEnName" :disabled="isDisabled"/>
            </td>
            <td class="table-left sub-table-left">品牌首字母</td>
            <td class="table-right sub-table-right">
              <input type="text" placeholder="请输入品牌首字母" v-model="serviceParam.brandInitials" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left sub-table-left">品牌原产地</td>
            <td class="table-right sub-table-right">
              <input type="text" placeholder="请输入品牌原产地" v-model="serviceParam.countryOfOrigin" :disabled="isDisabled"/>
            </td>
            <td class="table-left sub-table-left">品牌官网</td>
            <td class="table-right sub-table-right">
              <input type="text" placeholder="请输入品牌官网" v-model="serviceParam.officialUrl" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left sub-table-left" style="height: 38px;">商品类目<p>(交易中心)</p></td>
            <td class="table-right sub-table-right">
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
            <td class="table-left sub-table-left" style="height: 38px;">商品类目<p>(卖方公司)</p></td>
            <td class="table-right sub-table-right">
              <el-cascader
                :props="{ value: 'categoryId', label: 'categoryName', children: 'subItemList' }"
                :options="optionsOrg"
                v-model="optionsValue"
                @change="changeOrg"
                style="width: 100%"
                placeholder="请选择商品类目"
                ref="cascader1"
                :disabled="isDisabled"
                >
              </el-cascader>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">品牌介绍</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="此段文字是关于品牌的相关描述"
                v-model="serviceParam.introduction"
                :disabled="isDisabled"
              ></textarea>
            </td>
          </tr>
          <!-- <tr>
                    <td class="table-left" style="border-left: none;">生产商名称</td>
                    <td class="table-right" colspan="3">
                        <input type="text" placeholder="请输入生产商名称" v-model="serviceParam.manufacturer" />
                    </td>
          </tr>
          <tr>
                    <td class="table-left" style="border-left: none;">产商所在地</td>
                    <td class="table-right select-colspan3" colspan="3">
                      <el-cascader
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange"
                        style="width: 100%"
                        placeholder="请选择产商所在地"
                      >
                      </el-cascader>
                    </td>
          </tr>
          <tr>
                    <td class="table-left" style="border-left: none;">详细地址</td>
                    <td class="table-right" colspan="3">
                        <input type="text" placeholder="请输入详细地址" v-model="serviceParam.address" />
                    </td>
          </tr>
          <tr>
                    <td class="table-left sub-table-left">归属品牌</td>
                    <td class="table-right sub-table-right">
                      <el-select v-model="serviceParam.brand" placeholder="请选择归属品牌">
                        <el-option
                          v-for="item in brandList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </td>
                    <td class="table-left sub-table-left">商品规格</td>
                    <td class="table-right sub-table-right">
                        <input type="text" placeholder="请输入商品规格" v-model="serviceParam.specsParameter" />
                    </td>
          </tr> -->
          <tr>
              <td class="table-left sub-table-left">品牌logo</td>
              <td class="table-right sub-table-right" colspan="3">
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
                              <span style="line-height: 10px">请上传品牌logo</span>
                          </i>
                      </el-upload>
                  </div>
                  <span class="pic-tip">建议上传图片格式为：<span>JPEG、PNG</span>；文件<span>小于2M</span></span>
              </td>
          </tr>
          <tr>
            <td class="table-left">授权有效期</td>
            <td class="table-right" colspan="3">
              <el-date-picker
              v-model="brandLicenseDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
              :disabled="isDisabled"
              >
              </el-date-picker>
            </td>
          </tr>
          <tr>
                <td class="table-left">品牌授权书</td>
                <td class="table-right" colspan="3">
                  <!-- <div style="display: flex; height:100px"> -->
                    <div style="display: flex;">
                    <el-upload
                      class="avatar-uploader photos-card store-avatar"
                      action="http://14.29.162.130:6602/image/imageUpload"
                      :disabled="isDisabled"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess2"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                      <i v-else class="avatar-uploader-icon">
                        <img src="@/assets/images/upload.png" alt="">
                        <span>请上传品牌授权书</span>
                      </i>
                    </el-upload>
                  </div>
                  <span class="pic-tip">建议上传图片尺寸为：<span>100×100px，</span>图片格式为：<span>JPEG、PNG</span></span>
                </td>
              </tr>
              <tr>
                <td class="table-left">商标有效期</td>
                <td class="table-right" colspan="3">
                  <el-date-picker
                    v-model="trademarkLicenseDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    :disabled="isDisabled"
                  >
                  </el-date-picker>
                </td>
              </tr>
              <tr>
                <td class="table-left">商标注册证</td>
                <td class="table-right" colspan="3">
                  <div style="display: flex;">
                    <el-upload
                      class="avatar-uploader photos-card store-avatar"
                      action="http://14.29.162.130:6602/image/imageUpload"
                      :disabled="isDisabled"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess3"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                      <i v-else class="avatar-uploader-icon">
                        <img src="@/assets/images/upload.png" alt="">
                        <span>请上传商标注册证</span>
                      </i>
                    </el-upload>
                  </div>
                  <span class="pic-tip">建议上传图片尺寸为：<span>100×100px，</span>图片格式为：<span>JPEG、PNG</span></span>
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
      optionsValue2: [],
      optionsOrg: [],
      optionsOrg1: [],
      optionsOrg2: [],
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
        reporterDept: '',
        reportName: ''
      },
      serviceParam: {
        "code": "",
        "brandEnName": "",
        "brandInitials": "",
        "brandLicense": "",
        "brandLicenseEffectiveDate": "",
        "brandLicenseExpiryDate": "",
        "brandName": "",
        "categoryId": null,
        "categoryName": "",
        "countryOfOrigin": "",
        "enterpriseId": "",
        "id": "",
        "introduction": "",
        "label": "",
        "logo": "",
        "officialUrl": "",
        "trademarkLicense": "",
        "trademarkLicenseEffectiveDate": "",
        "trademarkLicenseExpiryDate": "",
        "platformCategoryId": null
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
      brandLicenseDate: '',
      trademarkLicenseDate: '',
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
      // editorConfig: {
      //   // language: "zh-cn", // 中文
      //   placeholder: this.placeholder,
      //   toolbar: ["bold", "fontColor", "numberedList"],  //l留下加粗，字体颜色，排序
      // },
      content:"",
      isClear: false, //清除富文本编辑器内容
      ceView: '', // 交易中心分类视图 例子：饮品>酒>啤酒
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
    this.getOrg()
  },
  created(){
    this.documentId = this.$route.query.documentId
      // this.initCKEditor()
  },
  methods: {
    async init(){
      this.form.reporterDept = this.$store.state.user.deptName
      this.form.reportName = this.$store.state.user.name
      this.form.reportTime = parseTime(new Date())
      if(this.$route.query.id){
        let params = {
          "object": {
            "id": this.$route.query.id,
          }
        } 
        let res = await this.$API.commodityInfo.findSellBrandInfoById(params)
        this.serviceParam = res.data
        console.log(this.serviceParam)
        this.imageUrl1 = res.data.logo
        this.imageUrl2 = res.data.brandLicense
        this.imageUrl3 = res.data.trademarkLicense
        this.optionsValue1 = res.data.platformCategoryId // 平台
        this.optionsValue = res.data.categoryId // 卖方
        this.categoryId = res.data.categoryId
        this.ceCategoryId = res.data.platformCategoryId
        this.ceView = this.serviceParam.platformCategoryName // 平台
        this.enView = this.serviceParam.categoryName // 卖方
        this.brandLicenseDate = (`${moment(res.data.brandLicenseEffectiveDate).format("YYYY-MM-DD")},${moment(res.data.brandLicenseExpiryDate).format("YYYY-MM-DD")}`).split(',')
        this.trademarkLicenseDate = (`${moment(res.data.trademarkLicenseEffectiveDate).format("YYYY-MM-DD")},${moment(res.data.trademarkLicenseExpiryDate).format("YYYY-MM-DD")}`).split(',')
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
        this.form = res.data
        this.listLen = res.data.list.length
        this.date = moment(res.data.limitTime).format("YYYY-MM-DD")
        this.optionsValue = this.serviceParam.categoryId
        this.optionsValue1 = this.serviceParam.platformCategoryId
        this.categoryId = res.data.categoryId
        this.ceCategoryId = res.data.platformCategoryId
        this.ceView = this.serviceParam.platformCategoryName // 平台
        this.enView = this.serviceParam.categoryName // 卖方
        // this.optionsValue1 = this.serviceParam.ceCategoryId1.split(",").map(Number)
        // this.optionsValue = this.serviceParam.enCategoryId1.split(",").map(Number)
        this.imageUrl1 = this.serviceParam.logo
        this.imageUrl2 = this.serviceParam.brandLicense
        this.imageUrl3 = this.serviceParam.trademarkLicense
        this.form.reportTime = moment(res.data.reportTime).format("YYYY-MM-DD")
        this.brandLicenseDate = (`${serviceParam.brandLicenseEffectiveDate},${serviceParam.brandLicenseExpiryDate}`).split(',')
        this.trademarkLicenseDate = (`${serviceParam.trademarkLicenseEffectiveDate},${serviceParam.trademarkLicenseExpiryDate}`).split(',')
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
        if(val !== '4') state = 1
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
      if(!this.form.title) return this.$message.error('公文标题不能为空')
      if(!this.date) return this.$message.error('办文时限不能为空')
      if(!this.serviceParam.brandName) return this.$message.error('品牌名称不能为空')
      if(!this.serviceParam.brandEnName) return this.$message.error('品牌英文名称不能为空')
      if(!this.serviceParam.brandInitials) return this.$message.error('品牌首字母不能为空')
      if(!this.serviceParam.countryOfOrigin) return this.$message.error('品牌原产地不能为空')
      if(!this.serviceParam.officialUrl) return this.$message.error('品牌官网不能为空')
      if(!this.serviceParam.introduction) return this.$message.error('品牌介绍不能为空')
      if(!this.imageUrl1) return this.$message.error('请上传品牌logo')
      if(!this.brandLicenseDate[0]) return this.$message.error('品牌授权开始时间不能为空')
      if(!this.brandLicenseDate[1]) return this.$message.error('品牌授权结束时间不能为空')
      if(!this.imageUrl2) return this.$message.error('请上传品牌授权书')
      if(!this.trademarkLicenseDate[0]) return this.$message.error('商标授权开始时间不能为空')
      if(!this.trademarkLicenseDate[1]) return this.$message.error('商标授权结束时间不能为空')
      if(!this.imageUrl3) return this.$message.error('请上传商标注册证')
      let params = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentNumber": this.form.documentNumber,
          "documentType": "PPSP",
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
            "brandEnName": this.serviceParam.brandEnName,
            "brandInitials": this.serviceParam.brandInitials,
            "brandLicense": this.imageUrl2,
            "brandLicenseEffectiveDate": this.brandLicenseDate[0],
            "brandLicenseExpiryDate": this.brandLicenseDate[1],
            "brandName": this.serviceParam.brandName,
            "categoryId": this.categoryId, // 卖方类目
            // "enCategoryId1": this.optionsValue.join(),
            "categoryName": this.enView,
            "platformCategoryId": this.ceCategoryId, // 平台类目
            // "ceCategoryId1": this.optionsValue1.join(),
            "platformCategoryName": this.ceView,
            "countryOfOrigin": this.serviceParam.countryOfOrigin,
            "enterpriseId": id,
            "introduction": this.serviceParam.introduction,
            "label": '',
            "logo": this.imageUrl1,
            "officialUrl": this.serviceParam.officialUrl,
            "trademarkLicense": this.imageUrl3,
            "trademarkLicenseEffectiveDate": this.trademarkLicenseDate[0],
            "trademarkLicenseExpiryDate": this.trademarkLicenseDate[1]
          }
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
        // this.$nextTick(() => {
        // let data = {
        //   "object": {
        //     "documentId": this.documentId,
        //     "receiverIdentityList": this.checkedUserArr
        //   }
        // }
        // this.$API.OA.forwardMail(data).then(res => {
        //   if(res.code !== "SUCCESS") return false
        //   this.$router.go(-1)
        //   this.$message.success("转发公文成功")
        // })
        // })
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
        // if(val === '2') this.submitForAudit() // 转平台审核
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
    async getOrg(){
      let params = {}
      let res = await this.$API.commodityInfo.queryCategoriesCatalog(params)
      if(res.code === 'SUCCESS'){
        let data = res.data
        this.optionsOrg = data.categoriesCatalog
      }
      let res2 = await this.$API.commodityInfo.queryCategoriesCatalogApi(params)
      if(res2.code === 'SUCCESS'){
        let data = res2.data
        this.optionsOrg1 = data.categoriesCatalog
      }
    },
    async getdata() {
      let t = this;
      let id = "";
      if (t.$route.query.id) {
        id = t.$route.query.id;
        this.msg = '编辑组织'
      }else{
        this.msg = '新增组织'
      }
      if (id) {
        let params = {
          "object": {
            "id": id
          }
        };
        let res = await this.$API.orgSet.findById_Org(params)
        // httpreques("post", params, "/org-server/Org/findById").then((res) => {
          console.log(res)
          if (res.data.code === "SUCCESS") {
            //对象数据处理
            let storeobj = res.data.data;
            // storeobj.storetype = storeobj.storeType;
            // delete storeobj.storeType;
            t.selectedOptions =
              TextToCode[storeobj.province][storeobj.city][
                storeobj.district
              ].code;
            t.form = storeobj;
            this.storeId = storeobj.storeId
            this.imageUrl1 = storeobj.idPhotos
            this.imageUrl2 = storeobj.businessLicense
            this.imageUrl3 = storeobj.profilePicture
            this.imgArr.push({url: storeobj.storeLicence})
            this.dialogImageUrl = storeobj.storeLicence;
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        // });
      }
    },
    // 转平台审核
    async submitForAudit(){
      let id = this.$store.state.user.enterpriseId
      let params = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "brandEnName": this.serviceParam.brandEnName,
          "brandInitials": this.serviceParam.brandInitials,
          "brandLicense": this.imageUrl2,
          "brandLicenseEffectiveDate": this.brandLicenseDate[0],
          "brandLicenseExpiryDate": this.brandLicenseDate[1],
          "brandName": this.serviceParam.brandName,
          "categoryId": this.categoryId,
          "categoryName": this.categoryName,
          "countryOfOrigin": this.serviceParam.countryOfOrigin,
          "enterpriseId": id,
          "introduction": this.serviceParam.introduction,
          "label": '',
          "logo": this.imageUrl1,
          "officialUrl": this.serviceParam.officialUrl,
          "trademarkLicense": this.imageUrl3,
          "trademarkLicenseEffectiveDate": this.trademarkLicenseDate[0],
          "trademarkLicenseExpiryDate": this.trademarkLicenseDate[1]
        }
      }
      await this.$API.commodityInfo.addSellBrandInfo(params)
      this.$message.success('转平台审核成功')
      this.toBackList()
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
        console.log(this.orgTreeOption)
    },
    addDrand(){
      this.isDialog = true
    },
    // 卖方分类
    changeOrg(val){
      let len = val.length-1
      this.categoryId = val[len] // 卖方分类id
      this.categoryName = this.$refs["cascader1"].getCheckedNodes()[0].label
      this.enView = (this.$refs["cascader1"].getCheckedNodes()[0].pathLabels).join('>') // 交易中心分类视图 例子：饮品>酒>啤酒
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
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      },
    toBackList() {
      this.$router.push('/internalManage/commodityInfo/unreleasedBrand');
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
/deep/.table-right .el-date-editor .el-range-separator {
    line-height: 16px;
}
/deep/.table-right .el-date-editor .el-range__icon {
    line-height: 16px;
}
</style>