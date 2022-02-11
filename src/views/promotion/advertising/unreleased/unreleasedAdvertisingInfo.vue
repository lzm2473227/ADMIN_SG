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
          <p>广告信息审批表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">审批主题</td>
            <td class="table-right" colspan="3">
              <input type="text" placeholder="关于xxx的广告信息审批" v-model="form.title" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left">审批编号</td>
            <td colspan="3">
              <tr>
                <td class="table-right" style="width: 170px;border: none;">
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
                style="margin: 4px;width: 702px"
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
          <p>广告信息表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">广告编号</td>
            <td class="table-right" style="width: 305px;">
              <input type="text" placeholder="系统分配" v-model="serviceParam.advertisementNumber" disabled/>
            </td>
            <td class="table-left">广告名称</td>
            <td class="table-right" style="width: 305px;">
              <input type="text" placeholder="请输入广告名称" v-model="serviceParam.advertisementName" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left">广告位置</td>
            <td class="table-right select-colspan3" :colspan="colspanNum">
                <el-select v-model="serviceParam.locationId" placeholder="请选择广告位置" :disabled="isDisabled">
                    <el-option
                    v-for="item in locationList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </td>
            <td class="table-left" v-show="isShowObjectName && serviceParam.locationId !== ''">展示{{showMsg}}</td>
            <td class="table-right sub-table-right" v-show="isShowObjectName && serviceParam.locationId !== ''">
                <span>{{serviceParam.objectName}}</span>
                <span @click="addDrand('1')" class="choose-commodity" v-show="!isDisabled">选择{{showMsg}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left sub-table-left">有效时间</td>
                <td class="table-right sub-table-right" colspan="3">
                  <el-date-picker
                    v-model="serviceParam.time"
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
          <!-- 位置排序 -->
          <tr v-show="isShowSort && serviceParam.locationId !== ''">
            <td class="table-left">位置排序</td>
            <td class="table-right" style="width: 305px;" :colspan="serviceParam.locationId === '5'?1:3">
              <el-input-number v-model="serviceParam.sort" @change="handleChangeNum" :min="1" :max="24" label="描述文字"></el-input-number>
            </td>
            <td class="table-left" v-show="serviceParam.locationId === '5'">一句话宣传语</td>
            <td class="table-right" style="width: 305px;" v-show="serviceParam.locationId === '5'">
              <input type="text" placeholder="请输入宣传语" v-model="serviceParam.introduction" :disabled="isDisabled"/>
            </td>
          </tr>
          <!-- 位置排序 -->
          <!-- 品牌专栏banner -->
          <tr v-show="serviceParam.locationId === '2'">
            <td class="table-left" style="padding-top: 12px;vertical-align: top">品牌介绍</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">品牌中文名</td>
                <td class="table-right sub-table-right">
                  <span>{{serviceParam.brandName}}</span>
                </td>
                <td class="table-left sub-table-left">品牌原产地</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span>{{serviceParam.sourceArea}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">品牌外文名</td>
                <td class="table-right sub-table-right">
                  <span>{{serviceParam.brandEnName}}</span>
                </td>
                <td class="table-left sub-table-left">产品特点</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <input type="text" placeholder="请输入产品特点" v-model="serviceParam.brandTrait	" :disabled="isDisabled"/>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">创始时间</td>
                <td class="table-right sub-table-right">
                  <el-date-picker class="brand-time" v-model="serviceParam.initialTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
                </td>
                <td class="table-left sub-table-left">主要产业</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <input type="text" placeholder="请输入主要产业" v-model="serviceParam.majorIndustry" :disabled="isDisabled"/>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">品牌LOGO</td>
                <td class="table-right sub-table-right">
                  <img :src="serviceParam.logo" alt="" style="width: 22px; height: 22px;">
                </td>
                <td class="table-left sub-table-left">品牌官网</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <input type="text" placeholder="请输入品牌官网" v-model="serviceParam.officialUrl" :disabled="isDisabled"/>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom: none">品牌简介</td>
                <td class="table-right sub-table-right" colspan="3" style="border-right: none; border-bottom: none">
                  <textarea
                    class="table-item"
                    placeholder="请输入品牌简介"
                    v-model="serviceParam.introduction"
                    :disabled="isDisabled"
                  ></textarea>
                </td>
              </tr>
            </td>
          </tr>
          <!-- 品牌专栏banner -->
          <tr style="vertical-align: top" v-show="serviceParam.locationId === '11'">
            <td class="table-left" style="padding-top: 12px">活动商品</td>
            <td class="table-right" colspan="3">
              <el-table
                  id="printJS-table"
                  ref="singleTable"
                  :data="commodityArr"
                  style="width: 700px;"
                  highlight-current-row
                  @selection-change="handleSelectionChange"
                  :default-sort="{ prop: 'date', order: 'descending' }"
              >
                  <el-table-column type="selection" width="55" align="center"></el-table-column>
                  <el-table-column prop="index" label="序号" align="center" sortable width="70"></el-table-column>
                  <el-table-column prop="barcode" label="商品条形码" align="center" sortable width="120"></el-table-column>
                  <el-table-column prop="commodityName" label="商品名称" width="150" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="specsParameter" label="规格" width="120" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="brandName" label="品牌" width="120" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="retailPrice" label="普通零售价" width="120" align="center" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="tradePrice" label="普通批发价"  width="120" align="center" sortable show-overflow-tooltip></el-table-column>
                  <el-table-column prop="storeName" label="所属店铺" width="120" show-overflow-tooltip sortable></el-table-column>
              </el-table>
              <div class="bot" style="margin-left: 0; width: 100%; margin-top: 0; border: none">
                <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
              </div>
            </td>
          </tr>
          <tr style="vertical-align: top" v-show="!isShowStoreName && serviceParam.locationId !== '2'">
            <td class="table-left" style="padding-top: 12px">广告描述</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="此段文字是关于广告的相关描述"
                v-model="serviceParam.advertisementDescribe"
                 :disabled="isDisabled"
              ></textarea>
            </td>
          </tr>
          <tr style="vertical-align: top" v-show="!isShowStoreName">
            <td class="table-left" style="padding-top: 12px">图片广告</td>
            <td class="table-right" colspan="3" style="padding-top: 6px;">
              <div style="display: flex;">
                <el-upload
                  class="avatar-uploader photos-card store-avatar"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess3"
                  :before-upload="beforeAvatarUpload"
                  :disabled="isDisabled">
                  <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传图片广告</span>
                  </i>
                </el-upload>
              </div>
              <span class="pic-tip">建议上传图片尺寸为：<span>200×200px，</span>图片格式为：<span>JPEG、PNG</span></span>
            </td>
          </tr>
          <tr style="vertical-align: top" v-show="!isShowStoreName">
            <td class="table-left" style="padding-top: 12px">店铺视频</td>
            <td class="table-right" colspan="3" style="padding-top: 6px;">
              <div style="display: flex; height:100px">
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload"
                  :disabled="isDisabled">
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传店铺视频</span>
                  </i>
                </el-upload>
              </div>
              <span class="pic-tip">建议上传视频大小为：<span>50Mb</span></span>
            </td>
          </tr>
          <tr style="vertical-align: top">
            <td class="table-left" style="padding-top: 12px">备注事项</td>
            <td class="table-right" colspan="3">
              <textarea
                class="table-item"
                placeholder="备注事项的相关描述"
                v-model="serviceParam.remarks"
                :disabled="isDisabled"
              ></textarea>
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
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content" style="width: 620px">
        <div class="dialog-top">
          <span>选择{{showMsg}}</span>
          <img @click="onClose" src="@/assets/images/close.png" alt="">
        </div>
        <!-- 店铺列表 -->
        <div class="table-main" v-show="serviceParam.locationId === '5'">
          <el-table
            id="printJS-table"
            ref="singleTable"
            :data="storeData"
            style="width: 100%; padding: 8px;"
            highlight-current-row
            @selection-change="handleSelectionChange2"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="storeCode" label="店铺编码" align="center" width="140"></el-table-column>
            <el-table-column prop="storeName" label="店铺名称" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="storeIntroduce" label="店铺介绍" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="bot" style="margin-left: 0; width: 100%; margin-top: 0; border: none">
            <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
          </div>
          <div class="scan-code">
            <button class="sure" @click="onSure">确定</button>
            <button @click="onClose">取消</button>
          </div>
        </div>
        <!-- 品牌列表 -->
        <div class="table-main" v-show="serviceParam.locationId === '2' || serviceParam.locationId === '6'">
          <el-table
            id="printJS-table"
            ref="singleTable"
            :data="brandData"
            style="width: 100%; padding: 8px;"
            highlight-current-row
            @selection-change="handleSelectionChange3"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="code" label="品牌编号" align="center" width="140"></el-table-column>
            <el-table-column prop="brandName" label="品牌名称" show-overflow-tooltip></el-table-column>
            <el-table-column prop="introduction" label="品牌介绍" show-overflow-tooltip></el-table-column>
          </el-table>
          <div class="bot" style="margin-left: 0; width: 100%; margin-top: 0; border: none">
            <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
          </div>
          <div class="scan-code">
            <button class="sure" @click="onSure">确定</button>
            <button @click="onClose">取消</button>
          </div>
        </div>
        <!-- 商品列表 -->
        <div class="table-main" v-show="serviceParam.locationId === '3' || serviceParam.locationId === '4' || serviceParam.locationId === '7' || serviceParam.locationId === '8' || serviceParam.locationId === '10' || serviceParam.locationId === '11'">
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
            <el-table-column prop="barcode" label="商品条形码"></el-table-column>
            <el-table-column prop="commodityName" label="商品名称" show-overflow-tooltip align="center"></el-table-column>
            <el-table-column prop="brandName" label="品牌" show-overflow-tooltip></el-table-column>
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
      commodityArr: [],
      multipleSelection: [],
      multipleSelection2: [],
      multipleSelection3: [],
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
      locationList: [{
        value: '1',
        label: '交易中心首页banner'
      },{
        value: '2',
        label: '首页推荐品牌'
      },
      // {
      //   value: '3',
      //   label: '首页推荐单品'
      // },
      {
        value: '4',
        label: '首页推荐商品'
      },{
        value: '5',
        label: '首页精选店铺'
      },
      // {
      //   value: '6',
      //   label: '品牌专栏banner'
      // },
      // {
      //   value: '7',
      //   label: '品牌专栏推单品'
      // },
      {
        value: '8',
        label: '品牌专栏推荐商品'
      },
      {
        value: '9',
        label: '店铺首页banner'
      },
      // {
      //   value: '10',
      //   label: '店铺首页推荐单品'
      // },
      {
        value: '11',
        label: '店铺首页推荐商品'
      }],
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
        "advertisementDescribe": "",
        "advertisementName": "",
        "advertisementNumber": "",
        "brandEnName": "",
        "brandName": "",
        "brandTrait": "",
        "enableState": false,
        "endTime": '',
        "enterpriseId": "",
        "foreignKey": "",
        "id": "",
        "identityId": "",
        "initialTime": '',
        "introduction": '',
        "locationId": "",
        "logo": "",
        "majorIndustry": "",
        "objectName": '',
        "officialUrl": "",
        "picPosition": "",
        "remarks": "",
        "sort": null,
        "sourceArea": "",
        "startTime": '',
        "videoPosition": "",
        "time": "",
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
      isDialog: false,
      storeData: [],
      brandData: [],
      commodityData: [],
      colspanNum: '3',
      isShowStoreName: false,
      isShowSort: false,
      isShowObjectName: false,
      showMsg: '',
      advMsg: '', // 判断是否存在位置
    };
  },
  watch: {
    'serviceParam.locationId': {
      handler(newV, oldV){
        if(newV === '1' || newV === '11' || newV === '9'){
          this.isShowSort = false // 是否显示位置排序按钮
          this.isShowObjectName = false
          this.colspanNum = '3'
        }else{
          this.colspanNum = '1'
          this.isShowSort = true
          this.isShowObjectName = true
        }
        this.isShowStoreName = newV === '1' || newV === '2' || newV === '5' || newV === '9'?false:true
        if(newV === '5') this.showMsg = '店铺'
        if(newV === '2') this.showMsg = '品牌'
        if(newV === '4' || newV === '8' || newV === '11') this.showMsg = '商品'
        // this.serviceParam.advertisementDescribe = ''
        if(newV === '11') this.getCommodityList()
      }
    },
    'serviceParam.sort': {
      handler(newV, oldV){
        
      }
    },
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
    this.getDept1()
  },
  created(){
    this.documentId = this.$route.query.documentId
  },
  methods: {
    async init(){
      // 修改详情
      if(this.$route.query.id){
        let params = {
          "object": {
            "id": this.$route.query.id
          }
        }
        let res = await this.$API.advertisement.advertisementList(params)
        this.serviceParam = res.data[0]
        this.imageUrl3 = this.serviceParam.picPosition
        this.serviceParam.time = (`${moment(res.data[0].startTime).format("YYYY-MM-DD")},${moment(res.data[0].endTime).format("YYYY-MM-DD")}`).split(',')
        this.serviceParam.startTime = moment(res.data.startTime).format("YYYY-MM-DD")
        this.serviceParam.endTime = moment(res.data.endTime).format("YYYY-MM-DD")
        this.serviceParam.initialTime = moment(res.data.initialTime).format("YYYY-MM-DD")
        this.imageUrl1 = this.serviceParam.videoPosition
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
        this.form.reporterDept = res.data.reporterDept
        this.form.reportName = res.data.reportName
        this.form.reportTime = moment(res.data.reportTime).format("YYYY-MM-DD")
        this.serviceParam.initialTime = moment(res.data.initialTime).format("YYYY-MM-DD")
        this.imageUrl3 = this.serviceParam.picPosition
        this.serviceParam.time = (`${this.serviceParam.startTime},${this.serviceParam.endTime}`).split(',')
        // this.imageUrl1 = serviceParam.storePhoto
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
      if(this.serviceParam.locationId === '11'){
        let id = []
        this.multipleSelection.forEach(item => {
          id.push(item.id)
        })
        this.serviceParam.foreignKey = id.join(',')
      }
      let id = this.$store.state.user.enterpriseId
      this.serviceParam.startTime = this.serviceParam.time[0]
      this.serviceParam.endTime = this.serviceParam.time[1]
      this.serviceParam.picPosition = this.imageUrl3
      this.serviceParam.enterpriseId = this.$store.state.user.enterpriseId
      this.serviceParam.identityId = this.$store.state.user.id
      delete this.serviceParam.time
      let serviceParam = this.serviceParam
      let params = {
        "creatorIdentityId": this.$store.state.user.id,
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": serviceParam
      }
      await this.$API.advertisement.insertAdvertisement(params)
      this.$message.success('转平台审核成功')
      this.$router.go(-1)
      // let par = {
      //   "creatorIdentityId": "",
      //   "creatorUserId": this.$store.state.user.registerUserId,
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
      let documentType = this.$route.query.id ? "GGBJ" : "GGSP"
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
      if(this.serviceParam.locationId === '11'){
        let id = []
        this.multipleSelection.forEach(item => {
          id.push(item.id)
        })
        this.serviceParam.foreignKey = id.join(',')
      }
      if(this.isShowSort){
        if(this.advMsg === 'FAILED') return this.$message('此位置已有广告')
      }else{
        this.advMsg = ''
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
      this.serviceParam.startTime = this.serviceParam.time[0]
      this.serviceParam.endTime = this.serviceParam.time[1]
      this.serviceParam.picPosition = this.imageUrl3
      this.serviceParam.enterpriseId = this.$store.state.user.enterpriseId
      delete this.serviceParam.time
      let serviceParam = this.serviceParam
      let params = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
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
          "serviceParam": serviceParam
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
    handleChangeNum(value) {
      if(value === 1) return
      let params = {
        "object": {
          "location": this.serviceParam.locationId,
          "sort": value
        }
      }
      this.$API.advertisement.boolAdvertisement(params).then(res => {
        this.advMsg = res.code // FAILED-已有广告
        // if(!res.data) return this.$message.error('此位置序号已占')
      })
    },
    addDrand(val){
      let locationId = this.serviceParam.locationId
      this.isDialog = true
      if(locationId === '5') this.getStoreList() // 获取店铺列表
      if(locationId === '2' || locationId === '6') this.getBrandList() // 获取品牌列表
      if(locationId === '3' || locationId === '4' || locationId === '7' || locationId === '8' || locationId === '10') this.getCommodityList() // 获取商品列表
    },
    getStoreList(){
        let len = []
        let params = {
            "object": {
                "enterpriseId": this.$store.state.user.enterpriseId,
            },
            pageNum: this.pageNum,
            pageSize: this.pageSize
        }
        this.$API.storeInfo.publishedStoreList(params).then(res => {
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
            this.storeData = res.data
        })
    },
    // 获取品牌列表
    getBrandList(){
      let len = []
      let params = {
        "object": {
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
      }
      this.$API.commodityInfo.findCurrEnterpriseSellBrandInfoList(params).then(res => {
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
        this.brandData = res.data
      })
    },
    // 获取商品列表
    getCommodityList() {
      let len = []
      let params = {
        "object": {
          "enterpriseId": this.$store.state.user.enterpriseId,
          // "needPrice": 1 // 是否需要价格，0-不需要、1-需要
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$API.storeInfo.matchCommodityList(params).then(res => {
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
            if(item.storeName) item.storeName = item.storeName.join('、')
          });
          this.commodityData = res.data
          this.commodityArr = res.data
        })
    },
    onClose(){
      this.isDialog = false
      this.storeData = []
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleSelectionChange2(val){
      this.multipleSelection2 = val
    },
    handleSelectionChange3(val){
      this.multipleSelection3 = val
    },
    handleSelectionChange4(val){
      this.multipleSelection4 = val
    },
    onSure(){
      let locationId = this.serviceParam.locationId
      if(locationId === '5'){
        this.serviceParam.objectName = this.multipleSelection2[0].storeName
        this.serviceParam.foreignKey = this.multipleSelection2[0].storeId
      }
      // if(locationId === '2' || locationId === '6'){
      //   this.serviceParam.objectName = this.multipleSelection3[0].brandName
      //   this.serviceParam.foreignKey = this.multipleSelection3[0].id
      //   this.serviceParam.logo = this.multipleSelection3[0].logo
      // }
      if(locationId === '2'){
          this.serviceParam.brandName = this.multipleSelection3[0].brandName
          this.serviceParam.objectName = this.multipleSelection3[0].brandName
          this.serviceParam.foreignKey = this.multipleSelection3[0].id
          this.serviceParam.sourceArea = this.multipleSelection3[0].countryOfOrigin
          this.serviceParam.brandEnName = this.multipleSelection3[0].brandEnName
          this.serviceParam.logo = this.multipleSelection3[0].logo
          this.serviceParam.advertisementDescribe = this.multipleSelection3[0].introduction
      }
      if(locationId === '3' || locationId === '4' || locationId === '7' || locationId === '8' || locationId === '10'){
        this.serviceParam.objectName = this.multipleSelection4[0].commodityName
        this.serviceParam.foreignKey = this.multipleSelection4[0].id
      }
      this.isDialog = false
      // if(this.characteristic  === '1'){

      // }
    },
    changeCurrentPage(val) {
      this.pageNum = val;
    },
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
      this.$router.push('/promotion/advertising/unreleased')
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
/deep/.el-table .cell{
  line-height: 14px;
}
/deep/.el-table td, .el-table th{
  padding: 6px 0;
}
/deep/.brand-time input{
  padding-left: 24px;
  width: 245px;
}
</style>