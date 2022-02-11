<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表格</span></div> -->
        <div class="print" @click="onState"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="toPlatform('2')"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台审核</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
      <div class="table-title examine">
          <p>公司信息审批表</p>
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
                  <span style="display: inline-block;">{{form.documentNumber}}</span>
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
          <tr style="vertical-align: top">
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
          <p>公司信息表</p>
        </div>
        <table border="1" class="">
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
              <span>{{registerEnterpriseDto.province}}{{registerEnterpriseDto.city}}{{registerEnterpriseDto.district}}</span>
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
                  :disabled="isDisabled"
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
                  :disabled="isDisabled"
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
                      :disabled="isDisabled"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess3"
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
                      :disabled="isDisabled"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess4"
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
                   :disabled="isDisabled"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess5"
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
                   :disabled="isDisabled"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess6"
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

          <!-- 银行信息和品牌信息 -->
          <!-- <tr>
            <td class="table-left table-vertical"><span>开</span><span>户</span><span>银</span><span>行</span><span>许</span><span>可</span><span>证</span></td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">开户银行</td>
                <td class="table-right sub-table-right" style="border-right: none; width:620px" colspan="5">
                  <input type="text" placeholder="请输入备注信息" v-model="form.bankName" />
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="text-align: left;padding: 4px">开户银行支行名称</td>
                <td class="table-right sub-table-right" style="border-right: none;" colspan="5">
                  <input type="text" placeholder="请输入开户银行支行名称" v-model="form.bankBranchName" style="height: 100%"/>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="text-align: left;padding: 4px">开户银行支行所在地</td>
                <td class="table-right sub-table-right" style="border-right: none;" colspan="5">
                  <el-cascader
                    :options="options2"
                    v-model="selectedOptions2"
                    @change="handleChange2"
                    style="width: 100%"
                    placeholder="请选择机构所在地"
                  >
                  </el-cascader>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">公司银行账号</td>
                <td class="table-right sub-table-right" style="border-right: none;" colspan="5">
                  <input type="text" placeholder="请输入公司银行账号" v-model="form.bankAccount" />
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
              <div class="file-button">
                    <button type='button' @click="addBrand"><img src="@/assets/images/file-add.png" alt="">添加</button>
                    <button type='button'><img src="@/assets/images/file-edit.png" alt="">修改</button>
                    <button type='button'><img src="@/assets/images/file-del.png" alt="">删除</button>
                </div>
                <el-table
                    id="printJS-table"
                    ref="singleTable"
                    :data="brandList"
                    style="width: 100%; margin-top: 8px;"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                >
                    <el-table-column type="selection" align="center" width="40"></el-table-column>
                    <el-table-column prop="index" label="序号" align="center" width="60"></el-table-column>
                    <el-table-column prop="brandName" label="品牌名称" width="80" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="categoryName" label="商品类目" width="90" align="center"></el-table-column>
                    <el-table-column prop="" label="品牌授权书" width="100"></el-table-column>
                    <el-table-column label="授权有效期" width="120" show-overflow-tooltip>
                      <template v-slot="scope">
                        <span>{{scope.row.brandLicenseEffectiveDate}}</span><br>
                        <span>{{scope.row.brandLicenseExpiryDate}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" label="商标注册证" width="100" show-overflow-tooltip></el-table-column>
                    <el-table-column label="商标有效期" width="120">
                      <template v-slot="scope">
                        <span>{{scope.row.trademarkLicenseEffectiveDate}}</span><br>
                        <span>{{scope.row.trademarkLicenseExpiryDate}}</span>
                      </template>
                    </el-table-column>
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

    <!-- 品牌弹窗 -->
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
                  <input type="text" placeholder="请输入品牌名称 (中文)" v-model="brandForm.brandName" />
                </td>
                <td class="table-left">品牌名称 (英文)</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌名称 (英文)" v-model="brandForm.brandEnName" />
                </td>
              </tr>
              <tr>
                <td class="table-left">品牌首字母</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌首字母" v-model="brandForm.brandInitials" />
                </td>
                <td class="table-left">品牌原产地</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌原产地" v-model="brandForm.countryOfOrigin" />
                </td>
              </tr>
              <tr>
                <td class="table-left">商品类目</td>
                <td class="table-right">
                  <el-cascader
                      :props="{ value: 'categoryId', label: 'categoryName', children: 'subItemList' }"
                      :options="optionsOrg"
                      v-model="optionsValue"
                      @change="changeOrg"
                      style="width: 100%"
                      placeholder="请选择商品类目"
                      ref="cascader"
                    >
                    </el-cascader>
                </td>
                <td class="table-left">品牌官网</td>
                <td class="table-right">
                  <input type="text" placeholder="请输入品牌官网" v-model="brandForm.officialUrl" />
                </td>
              </tr>
              <tr>
                <td class="table-left">品牌介绍</td>
                <td class="table-right" colspan="3">
                  <textarea
                    class="table-item"
                    placeholder="此段文字是关于经营范围的相关描述"
                    v-model="brandForm.introduction"
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
                    v-model="brandLicenseDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
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
                    v-model="trademarkLicenseDate"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
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
import { parseTime } from '@/utils/index'
import moment from "moment"
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
    Map
  },
  data() {
    return {
      options: regionData,
      options2: regionData,
      // optionss: [],
      selectedOptions: [],
      selectedOptions2: [],
      orgTreeOption: [],
      tabledata: [],
      optionsValue: [],
      optionsOrg: [],
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
        title: '',
        documentNumber: '',
        reportName: '',
        reporterDept: '',
        reportTime: '',
        remark: '',
        opinion: ''
      },
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
      brandForm: {
        brandEnName: "",
        brandInitials: "",
        brandLicense: "",
        brandLicenseEffectiveDate: "",
        brandLicenseExpiryDate: "",
        brandName: "",
        enterpriseId: "",
        label: "",
        categoryId: null,
        countryOfOrigin: "",
        introduction: "",
        logo: "",
        officialUrl: "",
        trademarkLicense: "",
        trademarkLicenseEffectiveDate: "",
        trademarkLicenseExpiryDate: "",
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgArr: [],
      date: [],
      msg: '',
      imageUrl1: '', // 身份证正面
      imageUrl2: '', // 身份证反面
      imageUrl3: '', // 营业执照
      imageUrl4: '', // 其他证件
      imageUrl5: '', // 税务登记
      imageUrl6: '', // 资格证明
      date: '',
      isDialog: false,
      categoryId: '',
      categoryName: '',
      brandList: [],
      brandLicenseDate: '', // 品牌授权有效期
      trademarkLicenseDate: '', // 商标有效期
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
    // this.getdata()
  },
  created(){
    this.documentId = this.$route.query.documentId
    console.log(this.$store.state.user.identityDtoList.length === 0)
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
        this.enterpriseBusinessLicenseEntity = serviceParam.enterpriseBusinessLicenseEntity
        this.enterpriseTaxEntity = serviceParam.enterpriseTaxEntity
        this.registerEnterpriseDto = serviceParam.registerEnterpriseDto
        this.enterpriseBusinessLicenseEntity.operatingPeriod = (`${serviceParam.enterpriseBusinessLicenseEntity.operatingPeriodStartDate},${serviceParam.enterpriseBusinessLicenseEntity.operatingPeriodEndDate}`).split(',')
        this.imageUrl1 = serviceParam.registerEnterpriseDto.legalIdPhotos.split(',')[0]
        this.imageUrl2 = serviceParam.registerEnterpriseDto.legalIdPhotos.split(',')[1]
        this.imageUrl3 = serviceParam.enterpriseTaxEntity.taxIdPhotos.split(',')[0]
        this.imageUrl4 = serviceParam.enterpriseTaxEntity.taxIdPhotos.split(',')[1]
        this.imageUrl5 = serviceParam.enterpriseBusinessLicenseEntity.enterpriseIdPhotos.split(',')[0]
        this.imageUrl6 = serviceParam.enterpriseBusinessLicenseEntity.enterpriseIdPhotos.split(',')[1]
        if(this.registerEnterpriseDto.enterpriseType === 'DEALER') this.registerEnterpriseDto.enterpriseType = '经销商'
        if(this.registerEnterpriseDto.enterpriseType === 'MANUFACTURER') this.registerEnterpriseDto.enterpriseType = '制造商'
        if(this.registerEnterpriseDto.enterpriseType === 'AGENT') this.registerEnterpriseDto.enterpriseType = '代理商'
        if(this.enterpriseTaxEntity.taxpayerType === 'LEGAL_PERSON') this.enterpriseTaxEntity.taxpayerType = '法人'
        if(this.enterpriseTaxEntity.taxpayerType === 'NATURAL_PERSON') this.enterpriseTaxEntity.taxpayerType = '自然人'
        this.enterpriseBusinessLicenseEntity.operatingPeriodStartDate = moment(this.enterpriseBusinessLicenseEntity.operatingPeriodStartDate).format("YYYY-MM-DD")
        if(this.enterpriseBusinessLicenseEntity.operatingPeriodEndDate == '无限期经营'){
            this.checkedOperating = true
          }else{
            this.enterpriseBusinessLicenseEntity.operatingPeriodEndDate = moment(this.enterpriseBusinessLicenseEntity.operatingPeriodEndDate).format("YYYY-MM-DD")
          }
        this.form = res.data
        this.form.reportTime = moment(this.form.reportTime).format("YYYY-MM-DD")
        this.date = moment(this.form.limitTime).format("YYYY-MM-DD")
        if(res.data.list){
          this.listLen = res.data.list.length
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
      }
    },
    // 新建编辑公文
    async getAddFile(val) {
      let legalIdPhotos = `${this.imageUrl1},${this.imageUrl2}`
      let enterpriseIdPhotos = `${this.imageUrl3},${this.imageUrl4}`
      let taxIdPhotos = `${this.imageUrl5},${this.imageUrl6}`
      let receiverIdentityList = []
      let id = this.$store.state.user.enterpriseId
      let documentId = ''
      let state = 0
      let lat = 0
      let lng = 0
      if(this.$route.query.documentId){
        documentId = this.$route.query.documentId
        state = 1
      }else{
        receiverIdentityList = this.checkedUserArr
      }
      let address = `${this.registerEnterpriseDto.province}${this.registerEnterpriseDto.city}${this.registerEnterpriseDto.district}${this.registerEnterpriseDto.address}`
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
        "object": {
          "documentNumber": this.form.documentNumber,
          "documentType": "GSSP",
          "id": documentId,
          "limitTime": moment(this.date).valueOf(),
          "remark": this.form.remark,
          // "reportIdentityId": "string",
          "reportTime": moment(this.reportTime).valueOf(),
          "text": "",
          "title": this.form.title,
          "state": state, // 0-未办件(新增公文),1-转已办件
          "opinion": this.form.opinion,
          "verdict": this.radio1,
          "receiverIdentityList": receiverIdentityList,
          "attachmentList": [],
          // 公文内容
          "serviceParam": {
            // 银行信息
          "enterpriseBankAccountLicenseEntity": {
            "bankAccount": this.enterpriseBankAccountLicenseEntity.bankAccount,
            "bankBranchName": this.enterpriseBankAccountLicenseEntity.bankBranchName,
            "bankName": this.enterpriseBankAccountLicenseEntity.bankName,
            "city": this.enterpriseBankAccountLicenseEntity.city,
            "country": "中国",
            "district": this.enterpriseBankAccountLicenseEntity.district,
            // "enterpriseId": "string",
            // "id": "string",
            "licenseIdPhotos": "",
            "province": this.enterpriseBankAccountLicenseEntity.province
          },
          // 营业执照信息
          "enterpriseBusinessLicenseEntity": {
            "businessScope": this.enterpriseBusinessLicenseEntity.businessScope,
            "dateOfEstablishment": this.enterpriseBusinessLicenseEntity.dateOfEstablishment,
            // "enterpriseId": "string",
            "enterpriseIdPhotos": enterpriseIdPhotos,
            // "id": "string",
            "operatingPeriodEndDate": this.enterpriseBusinessLicenseEntity.operatingPeriod[0],
            "operatingPeriodStartDate": this.enterpriseBusinessLicenseEntity.operatingPeriod[1],
            "registeredCapital": this.enterpriseBusinessLicenseEntity.registeredCapital
          },
          // "enterpriseId": "string",
          // 品牌信息
          "enterpriseSellBrandInfoEntityList": this.brandList,
          // 税务信息
          "enterpriseTaxEntity": {
            // "enterpriseId": "string",
            // "id": "",
            "taxIdPhotos": taxIdPhotos,
            "taxTypeTaxCode": this.enterpriseTaxEntity.taxTypeTaxCode,
            "taxpayerIdentificationNumber": this.enterpriseTaxEntity.taxpayerIdentificationNumber,
            "taxpayerType": "LEGAL_PERSON"
          },
          // 基本信息
          "registerEnterpriseDto": {
            "address": this.registerEnterpriseDto.address,
            "city": this.registerEnterpriseDto.city,
            "country": "中国",
            "district": this.registerEnterpriseDto.district,
            "email": this.registerEnterpriseDto.email,
            "enterpriseType": "AGENT",
            "latitude": lat,
            "legalIdPhotos": legalIdPhotos,
            "legalPersonIdNumber": this.registerEnterpriseDto.legalPersonIdNumber,
            "legalPersonName": this.registerEnterpriseDto.legalPersonName,
            "longitude": lng,
            "orgCode": this.registerEnterpriseDto.orgCode,
            "orgName": this.registerEnterpriseDto.orgName,
            "enterpriseUrl": this.registerEnterpriseDto.enterpriseUrl,
            "province": this.registerEnterpriseDto.province,
            "registerUserId": this.$store.state.user.registerUserId,
            "remark": this.registerEnterpriseDto.remark,
            "telNum": this.registerEnterpriseDto.telNum
          }
        }
        }
      }
      let res = await this.$API.OA.addFile(params)
      if(res.code !== "SUCCESS") return false
      if(val === '1'){
        this.$message.success('转已办件成功')
      }else if(val === '2'){
        this.$message.success('转发成功')
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
    // 转平台审核
    toPlatform(){
      let msg = "是否确定转平台审核？"
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.submitForAudit()
      }).catch(() => {})
    },
    // 转平台审核
    async submitForAudit(){
      let par = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentId": this.$route.query.documentId,
          "documentType": 'GSSP'
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
    // 转平台审核
    async submitForAudit10(){
      let legalIdPhotos = `${this.imageUrl1},${this.imageUrl2}`
      let enterpriseIdPhotos = `${this.imageUrl3},${this.imageUrl4}`
      let taxIdPhotos = `${this.imageUrl5},${this.imageUrl6}`
      let id = this.$store.state.user.enterpriseId
      let lat = 0
      let lng = 0
      let address = `${this.registerEnterpriseDto.province}${this.registerEnterpriseDto.city}${this.registerEnterpriseDto.district}${this.registerEnterpriseDto.address}`
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
      let params = {
        "object": {
          // 银行信息
          "enterpriseBankAccountLicenseEntity": {
            "bankAccount": this.enterpriseBankAccountLicenseEntity.bankAccount,
            "bankBranchName": this.enterpriseBankAccountLicenseEntity.bankBranchName,
            "bankName": this.enterpriseBankAccountLicenseEntity.bankName,
            "city": this.enterpriseBankAccountLicenseEntity.city,
            "country": "中国",
            "district": this.enterpriseBankAccountLicenseEntity.district,
            // "enterpriseId": "string",
            // "id": "string",
            "licenseIdPhotos": "",
            "province": this.enterpriseBankAccountLicenseEntity.province
          },
          // 营业执照信息
          "enterpriseBusinessLicenseEntity": {
            "businessScope": this.enterpriseBusinessLicenseEntity.businessScope,
            "dateOfEstablishment": this.enterpriseBusinessLicenseEntity.dateOfEstablishment,
            // "enterpriseId": "string",
            "enterpriseIdPhotos": enterpriseIdPhotos,
            // "id": "string",
            "operatingPeriodEndDate": this.enterpriseBusinessLicenseEntity.operatingPeriod[0],
            "operatingPeriodStartDate": this.enterpriseBusinessLicenseEntity.operatingPeriod[1],
            "registeredCapital": this.enterpriseBusinessLicenseEntity.registeredCapital
          },
          // "enterpriseId": "string",
          // 品牌信息
          // "enterpriseSellBrandInfoEntityList": this.brandList,
          "enterpriseSellBrandInfoEntityList": [],
          // 税务信息
          "enterpriseTaxEntity": {
            // "enterpriseId": "string",
            // "id": "",
            "taxIdPhotos": taxIdPhotos,
            "taxTypeTaxCode": this.enterpriseTaxEntity.taxTypeTaxCode,
            "taxpayerIdentificationNumber": this.enterpriseTaxEntity.taxpayerIdentificationNumber,
            "taxpayerType": "LEGAL_PERSON"
          },
          // 基本信息
          "registerEnterpriseDto": {
            "address": this.registerEnterpriseDto.address,
            "city": this.registerEnterpriseDto.city,
            "country": "中国",
            "district": this.registerEnterpriseDto.district,
            "email": this.registerEnterpriseDto.email,
            "enterpriseType": "AGENT",
            "enterpriseUrl": this.registerEnterpriseDto.email,
            "latitude": lat,
            "legalIdPhotos": legalIdPhotos,
            "legalPersonIdNumber": this.registerEnterpriseDto.legalPersonIdNumber,
            "legalPersonName": this.registerEnterpriseDto.legalPersonName,
            "longitude": lng,
            "orgCode": this.registerEnterpriseDto.orgCode,
            "orgName": this.registerEnterpriseDto.orgName,
            "province": this.registerEnterpriseDto.province,
            "registerUserId": this.$store.state.user.registerUserId,
            "remark": this.registerEnterpriseDto.remark,
            "telNum": this.registerEnterpriseDto.telNum
          }
        }
      }
      await this.$API.enterpriseInfo.registerSellerInfo(params)
      this.$message.success('转平台审核成功')
      this.$router.push('/internalManage/companyInfo/unreleased')
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
    // 点击添加品牌
    addBrand(){
      this.isDialog = true
      this.getOrg()
    },
    // 确定添加品牌到表格
    onSure(){
      this.brandList.push({
        brandEnName: this.brandForm.brandEnName,
        brandInitials: this.brandForm.brandInitials,
        brandLicense: "",
        brandLicenseEffectiveDate: this.brandLicenseDate[0],
        brandLicenseExpiryDate: this.brandLicenseDate[1],
        brandName: this.brandForm.brandName,
        categoryId: this.categoryId,
        categoryName: this.categoryName,
        countryOfOrigin: this.brandForm.countryOfOrigin,
        // "enterpriseId": "string",
        // "id": "string",
        introduction: this.brandForm.introduction,
        // "label": "string",
        logo: "",
        officialUrl: this.brandForm.officialUrl,
        trademarkLicense: "",
        trademarkLicenseEffectiveDate: this.trademarkLicenseDate[0],
        trademarkLicenseExpiryDate: this.trademarkLicenseDate[1]
      })
      this.brandList.forEach((item, index) => {
        item.index = index+1
      })
      this.isDialog = false
      this.brandForm = {}
      this.brandLicenseDate = ''
      this.trademarkLicenseDate = ''
      this.categoryId = null
      this.categoryName = ''
    },
    // 获取商品类目
    async getOrg(){
      let params = {}
      let res = await this.$API.commodityInfo.queryCategoriesCatalog(params)
      let data = res.data
      this.optionsOrg = data.categoriesCatalog
    },
    async getdata() {
      let id = this.$store.state.user.enterpriseId
      let params = {
        "object": {
          "id": id
        }
      }
        let res = await this.$API.enterpriseInfo.findEnterpriseInfoById(params)
        console.log(res)
        let storeobj = res.data
        this.selectedOptions = TextToCode[storeobj.province][storeobj.city][storeobj.district].code;
        // this.form = storeobj;
        // this.imageUrl1 = storeobj.idPhotos
        // this.imageUrl2 = storeobj.businessLicense
        // this.imageUrl3 = storeobj.profilePicture
        // this.imgArr.push({url: storeobj.storeLicence})
        // this.dialogImageUrl = storeobj.storeLicence
    },
    addstore() {
      this.brandList.forEach(item => {
        delete item.index
      })
      let lat = 0
      let lng = 0
      let address = `${this.form.province}${this.form.city}${this.form.district}${this.form.address}`
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
          // 银行信息
          "enterpriseBankAccountLicenseEntity": {
            "bankAccount": this.form.bankAccount,
            "bankBranchName": this.form.bankBranchName,
            "bankName": this.form.bankName,
            "city": this.form.bank_city,
            "country": "中国",
            "district": this.form.bank_district,
            // "enterpriseId": "string",
            // "id": "string",
            "licenseIdPhotos": "",
            "province": this.form.bank_province
          },
          // 营业执照信息
          "enterpriseBusinessLicenseEntity": {
            "businessScope": this.form.businessScope,
            "dateOfEstablishment": this.form.dateOfEstablishment,
            // "enterpriseId": "string",
            "enterpriseIdPhotos": "",
            // "id": "string",
            "operatingPeriodEndDate": this.form.operatingPeriod[0],
            "operatingPeriodStartDate": this.form.operatingPeriod[1],
            "registeredCapital": this.form.registeredCapital
          },
          // "enterpriseId": "string",
          // 品牌信息
          "enterpriseSellBrandInfoEntityList": this.brandList,
          // 税务信息
          "enterpriseTaxEntity": {
            // "enterpriseId": "string",
            // "id": "",
            "taxIdPhotos": "",
            "taxTypeTaxCode": this.form.taxTypeTaxCode,
            "taxpayerIdentificationNumber": this.form.taxpayerIdentificationNumber,
            "taxpayerType": "LEGAL_PERSON"
          },
          // 基本信息
          "registerEnterpriseDto": {
            "address": this.form.address,
            "city": this.form.city,
            "country": "中国",
            "district": this.form.district,
            "email": this.form.email,
            "enterpriseType": "AGENT",
            "latitude": lat,
            "legalIdPhotos": this.form.telNum,
            "legalPersonIdNumber": this.form.legalPersonIdNumber,
            "legalPersonName": this.form.legalPersonName,
            "longitude": lng,
            "orgCode": this.form.orgCode,
            "orgName": this.form.orgName,
            "orgUrl": this.form.telNum,
            "province": this.form.province,
            "registerUserId": "A90A88A9894C4C5181F47ABB991D2048",
            "remark": this.form.remark,
            "telNum": this.form.telNum
          }
        }
      }

      // this.isContactNumber(this.form.contactNumber)
      // if(this.isContactNumber(this.form.contactNumber) === false) return this.$message.error("联系号码输入格式错误")
      // if (this.$route.query.name) params.storeId = this.storeId
      // 判断url
      // let url = t.$route.query.name
      this.$API.enterpriseInfo.registerSellerInfo(params).then((res) => {
        this.$message.success("暂存成功")
        this.$router.go(-1)
      })
      // });
    },
    // 商品类目
    changeOrg(val){
      let len = val.length-1
      this.categoryId = val[len] // 交易中心分类id
      this.categoryName = this.$refs["cascader"].getCheckedNodes()[0].label
      // this.ceView = (this.$refs["cascader"].getCheckedNodes()[0].pathLabels).join('>') // 交易中心分类视图 例子：饮品>酒>啤酒
    },
    //选择省市区
    handleChange(value) {
      let t = this;
      t.registerEnterpriseDto.province = CodeToText[value[0]];
      t.registerEnterpriseDto.city = CodeToText[value[1]];
      t.registerEnterpriseDto.district = CodeToText[value[2]];
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
    handleAvatarSuccess1(res, file) {
      this.dialogImageUrl = res.data;
      this.imageUrl1 = res.data // 身份证正面
    },
    handleAvatarSuccess2(res, file) {
      this.dialogImageUrl = res.data;
      this.imageUrl2 = res.data // 身份证反面
    },
    handleAvatarSuccess3(res, file) {
      this.dialogImageUrl = res.data;
      this.imageUrl3 = res.data // 营业执照
    },
    handleAvatarSuccess4(res, file) {
      this.dialogImageUrl = res.data;
      this.imageUrl4 = res.data // 其他证件
    },
    handleAvatarSuccess5(res, file) {
      this.dialogImageUrl = res.data;
      this.imageUrl5 = res.data // 税务登记
    },
    handleAvatarSuccess6(res, file) {
      this.dialogImageUrl = res.data;
      this.imageUrl6 = res.data // 资格证明
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
    background: url('../../../../assets/images/sort.png') center no-repeat;
    width: 12px;
    height: 12px;
    margin-left: 4px;
}
/deep/.el-table .sort-caret{
  border: none;
}
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
  /deep/.el-cascader .el-input__inner{
    width: 100%;
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