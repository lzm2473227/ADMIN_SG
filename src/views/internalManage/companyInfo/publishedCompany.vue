<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表格</span></div> -->
        <div class="print"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="onEdit"><img class="icon" src="@/assets/images/edit.png" alt=""/><span class="axis">修改公司信息</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title">
          <p>公司信息表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">企业ID</td>
            <td class="table-right">
              <span>{{enterpriseId}}</span>
            </td>
            <td class="table-left">注册时间</td>
            <td class="table-right">
              <span>{{registerEnterpriseDto.createTime}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">所在机构代码</td>
            <td class="table-right">
              <span>{{registerEnterpriseDto.orgCode}}</span>
            </td>
            <td class="table-left">所在机构名称</td>
            <td class="table-right">
              <span>{{registerEnterpriseDto.orgName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">法定代表人<br>姓名</td>
            <td class="table-right">
              <span>{{registerEnterpriseDto.legalPersonName}}</span>
            </td>
            <td class="table-left">法定代表人<br>身份证号</td>
            <td class="table-right">
              <span>{{registerEnterpriseDto.legalPersonIdNumber}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">注册人手机</td>
            <td class="table-right" style="width: 360px;">
              <span>{{registerEnterpriseDto.telNum}}</span>
            </td>
            <td class="table-left">电子邮箱</td>
            <td class="table-right" style="width: 260px;">
              <span>{{registerEnterpriseDto.email}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">机构所在地</td>
            <td class="table-right" colspan="3">
              <span>{{registerEnterpriseDto.city}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">机构详细地址</td>
            <td class="table-right" colspan="3">
              <span>{{registerEnterpriseDto.address}}</span>
            </td>
          </tr>
          <tr style="vertical-align: top;">
            <td class="table-left" style="padding: 12px;">法定代表人<br>证件照</td>
            <td class="table-right" colspan="3" style="padding-top: 6px;">
              <div style="display: flex;">
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  disabled
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传身份证正面</span>
                  </i>
                </el-upload>
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  disabled
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                  style="margin-left: 10px;">
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传身份证反面</span>
                  </i>
                </el-upload>
              </div>
            </td>
          </tr>
          <tr>
            <td class="table-left">机构网址</td>
            <td class="table-right" colspan="3">
              <span>{{registerEnterpriseDto.enterpriseUrl}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">公司类型</td>
            <td class="table-right">
              <span>{{registerEnterpriseDto.enterpriseType}}</span>
            </td>
            <td class="table-left">备注信息</td>
            <td class="table-right">
              <span>{{registerEnterpriseDto.remark}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical"><span>营</span><span>业</span><span>执</span><span>照</span><span>信</span><span>息</span></td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">成立日期</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{enterpriseBusinessLicenseEntity.dateOfEstablishment}}</span>
                </td>
                <td class="table-left sub-table-left">注册资本</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{enterpriseBusinessLicenseEntity.registeredCapital}}万元</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">营业期限</td>
                <td class="table-right sub-table-right" colspan="3">
                  <span>{{enterpriseBusinessLicenseEntity.operatingPeriodStartDate}} 至 {{enterpriseBusinessLicenseEntity.operatingPeriodEndDate}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">经营范围</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right:none;">
                  <span>{{enterpriseBusinessLicenseEntity.businessScope}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none">公司证件照</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right:none;border-bottom:none">
                  <div style="display: flex; height:100px">
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  disabled
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传营业执照</span>
                  </i>
                </el-upload>
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  disabled
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                  style="margin-left: 10px;">
                  <img v-if="imageUrl4" :src="imageUrl4" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传其他证件照</span>
                  </i>
                </el-upload>
              </div>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical"><span>税</span><span>务</span><span>登</span><span>记</span><span>证</span></td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">纳税人识别号</td>
                <td class="table-right sub-table-right">
                  <span>{{enterpriseTaxEntity.taxpayerIdentificationNumber}}</span>
                </td>
                <td class="table-left sub-table-left">纳税人类型</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{enterpriseTaxEntity.taxpayerType}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">纳税类型税码</td>
                <td class="table-right sub-table-right" colspan="3">
                  <span>{{enterpriseTaxEntity.taxTypeTaxCode}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none">税务相关证照</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right:none;border-bottom:none">
                  <div style="display: flex; height:100px">
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  disabled
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl5" :src="imageUrl5" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传税务登记证明照</span>
                  </i>
                </el-upload>
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  disabled
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                  style="margin-left: 10px;">
                  <img v-if="imageUrl6" :src="imageUrl6" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传一般纳税人资格证明照</span>
                  </i>
                </el-upload>
              </div>
                </td>
              </tr>
            </td>
          </tr>
          <!-- <tr>
            <td class="table-left table-vertical"><span>开</span><span>户</span><span>银</span><span>行</span><span>许</span><span>可</span><span>证</span></td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">开户银行</td>
                <td class="table-right sub-table-right" style="border-right: none; width:620px" colspan="5">
                  <span>{{form.enterpriseEntity.address}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="text-align: left;padding: 4px">开户银行支行名称</td>
                <td class="table-right sub-table-right" style="border-right: none;" colspan="5">
                  <span>{{form.enterpriseEntity.address}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="text-align: left;padding: 4px">开户银行支行所在地</td>
                <td class="table-right sub-table-right" style="border-right: none;" colspan="5">
                  <span>{{form.enterpriseEntity.address}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">公司银行账号</td>
                <td class="table-right sub-table-right" style="border-right: none;" colspan="5">
                  <span>{{form.enterpriseEntity.address}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="text-align: left;border-bottom:none">银行开户许可证照</td>
                <td class="table-right sub-table-right" colspan="5" style="border-right:none;border-bottom:none">
                  <div style="display: flex; height:100px">
                    <el-upload
                      class="avatar-uploader photos-card"
                      action="http://14.29.162.130:6602/image/imageUpload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess1"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                      <i v-else class="avatar-uploader-icon">
                        <img src="@/assets/images/upload.png" alt="">
                        <span>请上传银行开户许可证照</span>
                      </i>
                    </el-upload>
                  </div>
                  <span class="pic-tip">建议上传图片格式为：<span>JPEG、PNG</span>；文件<span>小于2M</span></span>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical"><span>售</span><span>卖</span><span>商</span><span>品</span><span>品</span><span>牌</span><span>信</span><span>息</span></td>
            <td class="table-right" colspan="3">
                <el-table
                    id="printJS-table"
                    ref="singleTable"
                    :data="form.enterpriseSellBrandInfoEntityList"
                    style="width: 100%;"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                >
                    <el-table-column type="selection" align="center" width="40"></el-table-column>
                    <el-table-column prop="index" label="序号" align="center" width="60"></el-table-column>
                    <el-table-column prop="name" label="品牌名称" width="80" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="telNum" label="商品类目" width="90" align="center"></el-table-column>
                    <el-table-column prop="address" label="品牌授权书" width="100"></el-table-column>
                    <el-table-column prop="address" label="授权有效期" width="120" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="商标注册证" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="address" label="商标有效期" width="120"></el-table-column>
                </el-table>
            </td>
          </tr> -->
          <!-- <tr>
            <td class="table-left">呈报人</td>
            <td colspan="3">
              <tr>
                <td class="table-right" style="width: 180px;border: none;">
                  <input type="text" placeholder="请输入呈报人" v-model="form.org_code" />
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">所属部门</td>
                <td class="table-right" style="width: 180px;border: none;">
                  <input type="text" placeholder="请输入所属部门" v-model="form.org_code" />
                </td>
                <td class="table-left" style="border-top: none; border-bottom: none;">呈报时间</td>
                <td class="table-right submit-time" style="width: 180px;border: none;">
                  <el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
                </td>
              </tr>
            </td>
          </tr> -->
        </table>
      </form>
    </div>
    <!-- <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>添加品牌</span>
          <img @click="isDialog = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body table-main">
          <form action="">
            <table border="1" class="" style="width: 100%; font-size: 14px;">
              <tr>
                <td class="table-left">品牌名称 (中文)</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌名称 (中文)" v-model="form.name" />
                </td>
                <td class="table-left">品牌名称 (英文)</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌名称 (英文)" v-model="form.name" />
                </td>
              </tr>
              <tr>
                <td class="table-left">品牌首字母</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌首字母" v-model="form.name" />
                </td>
                <td class="table-left">品牌原产地</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌原产地" v-model="form.name" />
                </td>
              </tr>
              <tr>
                <td class="table-left">商品类目</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入商品类目" v-model="form.name" />
                </td>
                <td class="table-left">品牌官网</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌官网" v-model="form.name" />
                </td>
              </tr>
              <tr>
                <td class="table-left">品牌介绍</td>
                <td class="table-right" colspan="3">
                  <textarea
                    class="table-item"
                    placeholder="此段文字是关于经营范围的相关描述"
                    v-model="form.remark"
                  ></textarea>
                </td>
              </tr>
              <tr>
                <td class="table-left">品牌Logo</td>
                <td class="table-right" colspan="3">
                  <div style="display: flex;">
                    <el-upload
                      class="avatar-uploader photos-card store-avatar"
                      action="http://14.29.162.130:6602/image/imageUpload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess3"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                      <i v-else class="avatar-uploader-icon">
                        <img src="@/assets/images/upload.png" alt="">
                        <span>请上传品牌Logo</span>
                      </i>
                    </el-upload>
                  </div>
                  <span class="pic-tip">建议上传图片尺寸为：<span>100×100px，</span>图片格式为：<span>JPEG、PNG</span></span>
                </td>
              </tr>
              <tr>
                <td class="table-left">授权有效期</td>
                <td class="table-right" colspan="3">
                  <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  >
                  </el-date-picker>
                </td>
              </tr>
              <tr>
                <td class="table-left">品牌授权书</td>
                <td class="table-right" colspan="3">
                    <div style="display: flex;">
                    <el-upload
                      class="avatar-uploader photos-card store-avatar"
                      action="http://14.29.162.130:6602/image/imageUpload"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess3"
                      :before-upload="beforeAvatarUpload">
                      <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
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
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
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
        <div class="scan-code">
            <button class="sure" @click="onSure">确定</button>
            <button @click="isDialog = false">取消</button>
          </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import { jsonp } from 'vue-jsonp'
import moment from "moment"
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
    Map
  },
  data() {
    return {
      options: regionData,
      optionss: [],
      selectedOptions: [],
      optionsValue: [],
      optionsOrg: [],
      tabledata: [],
      registerEnterpriseDto: {
        address: "",
        city: "",
        country: "",
        district: "",
        email: "",
        enterpriseType: "",
        latitude: 0,
        legalIdPhotos: "",
        legalPersonIdNumber: "",
        legalPersonName: "",
        longitude: 0,
        orgCode: "",
        orgName: "",
        orgUrl: "",
        province: "",
        remark: "",
        telNum: "",
      },
      enterpriseTaxEntity: {
        enterpriseId: "",
        taxIdPhotos: "",
        taxTypeTaxCode: "",
        taxpayerIdentificationNumber: "",
        taxpayerType: "",
      },
      enterpriseBusinessLicenseEntity: {
        businessScope: "",
        dateOfEstablishment: "",
        enterpriseId: "",
        enterpriseIdPhotos: "",
        operatingPeriod: "",
        registeredCapital: null,
        enterpriseId: ""
      },
      enterpriseBankAccountLicenseEntity: {
        bankAccount: "",
        bankBranchName: "",
        bankName: "",
        city: "",
        country: "",
        district: "",
        enterpriseId: "",
        licenseIdPhotos: "",
        province: ""
      },
      form: {
        enterpriseBankAccountLicenseEntity: {
          bankAccount: "",
          bankBranchName: "",
          bankName: "",
          city: "",
          country: "",
          district: "",
          enterpriseId: "",
          id: "",
          licenseIdPhotos: "",
          province: ""
        },
        enterpriseBusinessLicenseEntity: {
          businessScope: "",
          dateOfEstablishment: "",
          enterpriseId: "",
          enterpriseIdPhotos: "",
          id: "",
          operatingPeriodEndDate: "",
          operatingPeriodStartDate: "",
          registeredCapital: 0
        },
        enterpriseEntity: {
          address: "",
          city: "",
          country: "",
          district: "",
          email: "",
          enterpriseType: "",
          enterpriseUrl: "",
          id: "",
          latitude: 0,
          legalIdPhotos: "",
          legalPersonIdNumber: "",
          legalPersonName: "",
          longitude: 0,
          orgCode: "",
          orgId: "",
          orgName: "",
          province: "",
          remark: "",
          telNum: "",
          selectedOptions: ''
        },
        enterpriseSellBrandInfoEntityList: [
          // {
          //   brandEnName: "",
          //   brandInitials: "",
          //   brandLicense: "",
          //   brandLicenseEffectiveDate: "",
          //   brandLicenseExpiryDate: "",
          //   brandName: "",
          //   categoryId: 0,
          //   categoryName: "",
          //   countryOfOrigin: "",
          //   enterpriseId: "",
          //   id: "",
          //   introduction: "",
          //   label: "",
          //   logo: "",
          //   officialUrl: "",
          //   trademarkLicense: "",
          //   trademarkLicenseEffectiveDate: "",
          //   trademarkLicenseExpiryDate: ""
          // }
        ],
        enterpriseTaxEntity: {
          enterpriseId: "string",
          id: "",
          taxIdPhotos: "",
          taxTypeTaxCode: "",
          taxpayerIdentificationNumber: "",
          taxpayerType: ""
        }
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
      imageUrl3: '',
      imageUrl4: '',
      imageUrl5: '',
      imageUrl6: '',
      storeId: 0,
      orgId: '',
      orgName: '',
      date: '',
      isDialog: false,
      enterpriseId: ''
    };
  },
  mounted() {
    this.getdata()
  },
  created(){
    if(this.$store.state.user.enterpriseId) this.enterpriseId = this.$store.state.user.enterpriseId
  },
  methods: {
    onSure(){},
    async getdata() {
      let id = this.$store.state.user.enterpriseId
      let params = {
        "object": {
          "id": id
        }
      }
        let res = await this.$API.enterpriseInfo.findEnterpriseInfoById(params)
        let info = res.data
        if(info.enterpriseEntity !== null){
          this.registerEnterpriseDto = info.enterpriseEntity
          this.imageUrl1 = info.enterpriseEntity.legalIdPhotos.split(',')[0]
          this.imageUrl2 = info.enterpriseEntity.legalIdPhotos.split(',')[1]
          if(info.enterpriseEntity.enterpriseType === 'DEALER') this.registerEnterpriseDto.enterpriseType = '经销商'
          if(info.enterpriseEntity.enterpriseType === 'MANUFACTURER') this.registerEnterpriseDto.enterpriseType = '制造商'
          if(info.enterpriseEntity.enterpriseType === 'AGENT') this.registerEnterpriseDto.enterpriseType = '代理商'
          this.registerEnterpriseDto.createTime = moment(info.enterpriseEntity.createTime).format("YYYY-MM-DD hh:mm:ss")
        }
        if(info.enterpriseTaxEntity !== null){
          this.enterpriseTaxEntity = info.enterpriseTaxEntity
          this.imageUrl5 = info.enterpriseTaxEntity.taxIdPhotos.split(',')[0]
          this.imageUrl6 = info.enterpriseTaxEntity.taxIdPhotos.split(',')[1]
          if(info.enterpriseTaxEntity.taxpayerType === 'LEGAL_PERSON') this.enterpriseTaxEntity.taxpayerType = '法人'
          if(info.enterpriseTaxEntity.taxpayerType === 'NATURAL_PERSON') this.enterpriseTaxEntity.taxpayerType = '自然人'
        }
        if(info.enterpriseBusinessLicenseEntity !== null){
          this.enterpriseBusinessLicenseEntity = info.enterpriseBusinessLicenseEntity
          this.imageUrl3 = info.enterpriseBusinessLicenseEntity.enterpriseIdPhotos.split(',')[0]
          this.imageUrl4 = info.enterpriseBusinessLicenseEntity.enterpriseIdPhotos.split(',')[1]
          this.enterpriseBusinessLicenseEntity.dateOfEstablishment = moment(info.enterpriseBusinessLicenseEntity.dateOfEstablishment).format("YYYY-MM-DD")
          this.enterpriseBusinessLicenseEntity.operatingPeriodStartDate = moment(info.enterpriseBusinessLicenseEntity.operatingPeriodStartDate).format("YYYY-MM-DD")
          if(this.enterpriseBusinessLicenseEntity.operatingPeriodEndDate == '无限期经营'){
            this.checkedOperating = true
          }else{
            this.enterpriseBusinessLicenseEntity.operatingPeriodEndDate = moment(info.enterpriseBusinessLicenseEntity.operatingPeriodEndDate).format("YYYY-MM-DD")
          }
        }
        this.registerEnterpriseDto.city = `${info.enterpriseEntity.province}${info.enterpriseEntity.city}${info.enterpriseEntity.district}`
        // this.imgArr.push({url: storeobj.storeLicence})
        // this.dialogImageUrl = storeobj.storeLicence
    },
    addstore() {
      let lat = 0
      let lng = 0
      let address = `${this.form.province}${this.form.city}${this.form.county}${this.form.address}`
      console.log(address)
      jsonp('http://api.map.baidu.com/geocoding/v3/', {
        address: address,
        output: 'json',
        ak: 'mTdnjQQTwYOAbrpdLKBDqG9mCKiGe8ZK'
      }).then(json => {
        // 得到我们想要的内容
        lat = json.result.location.lat
        lng = json.result.location.lng
        console.log(json)
      }).catch(err => {
        console.log(err)
      })

      let t = this;
      let params = t.form;
      let businessDate = this.checkList.join()
      if(!params.org_code) return this.$message.error('机构代码不能为空')
      if(!params.name) return this.$message.error('组织名称不能为空')
      if(!params.province) return this.$message.error('组织地址不能为空')
      if(!params.remark) return this.$message.error('组织介绍不能为空')
      if(!this.imageUrl1) return this.$message.error('请上传门店许可证')
      if(!this.imageUrl2) return this.$message.error('请上传营业执照')
      if(!this.imageUrl3) return this.$message.error('请上传门店照')
      
      params.businessLicense = this.imageUrl2; // 营业执照
      params.storeLicence = this.imageUrl1; // 门店许可证
      params.profilePicture = this.imageUrl3; // 门店照
      delete params.storeaccount;
      delete params.storepsw;
      params = {
        "object": {
          "address": this.form.address,
          "city": this.form.city,
          "district": this.form.county,
          "id": "",
          "idPhotos": this.imageUrl1,
          "latitude": lat,
          "longitude": lng,
          "name": this.form.name,
          "org_code": this.form.org_code,
          "parentId": this.orgId,
          "profilePicture": this.imageUrl3,
          "province": this.form.province,
          "remark": this.form.remark
        }
      }

      // this.isContactNumber(this.form.contactNumber)
      // if(this.isContactNumber(this.form.contactNumber) === false) return this.$message.error("联系号码输入格式错误")
      if (this.$route.query.name) params.storeId = this.storeId
      //判断url
      let url = t.$route.query.name
        ? "/org-server/Org/update"
        : "/org-server/Org/create";

      httpreques("post", params, url).then((res) => {
        if (res.data.code === "SUCCESS") {
          t.$message({
            message: t.$route.query.name ? "修改成功" : "添加成功",
            type: "success",
          });
          t.toBackList();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
      // });
    },
    onEdit(){
      this.$router.push({
        path: '/internalManage/companyInfo/CompanyDetailInfo',
        query: {
          id: this.$store.state.user.enterpriseId
        }
      })
    },
    addDrand(){
      this.isDialog = true
    },
    changeOrg(val){
      let len = val.length-1
      this.orgId = val[len]
      this.orgName = this.$refs["cascader"].getCheckedNodes()[0].label
    },
    //选择省市区
    handleChange(value) {
      let t = this;
      t.form.province = CodeToText[value[0]];
      t.form.city = CodeToText[value[1]];
      t.form.county = CodeToText[value[2]];
    },
    handleSelectionChange(){},
    //预览图片
    handlePictureCardPreview(res, file){
      // console.log(file);
      console.log(res);
      this.dialogVisible = true;
      this.form.storeLicence = res.response.data;
    },
    handleAvatarSuccess1(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl1 = res.data; // 身份证正面
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
      this.$router.go(-1);
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/reset.scss";
.table-main table .table-left{
  width: 100px;
}
.table-main .table-title{
  width: 822px;
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
    height: 24px;
  }
  /deep/.table-right .el-date-editor .el-range__icon{
    line-height: 16px;
  }
  /deep/.table-right .el-date-editor .el-range-separator{
    line-height: 16px;
  }
  /deep/.table-right .el-date-editor .el-range__close-icon{
    line-height: 16px;
  }
  /deep/.submit-time .el-input__inner{
    width: 170px;
    padding-left: 40px;
  }
  /deep/.found-time .el-input__inner{
    padding-left: 35px;
  }
  /deep/.found-time .el-input__prefix{
    left: 0;
  }
  /deep/.submit-time .el-date-editor.el-input{
    width: 170px;
  } 
  /deep/.submit-time .el-date-editor.el-input__inner{
    width: 170px;
  }
  /deep/.found-time .el-input__icon{
    line-height: 24px;
  }
  /deep/.submit-time .el-input__icon{
    line-height: 24px;
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
  display: block;
  padding: 0;
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