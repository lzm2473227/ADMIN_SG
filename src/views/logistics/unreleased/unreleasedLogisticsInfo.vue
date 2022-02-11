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
          <p>物流申请审批表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">审批件标题</td>
            <td class="table-right" colspan="3">
              <input type="text" placeholder="关于xxx的物流申请审批" v-model="form.title" :disabled="isDisabled"/>
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
          <p>物流单</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">物流编号</td>
            <td class="table-right" style="width: 305px;">
              <input type="text" placeholder="系统分配" v-model="bianhao" disabled/>
            </td>
            <td class="table-left">物流说明</td>
            <td class="table-right" style="width: 305px;">
              <input type="text" placeholder="物流说明" v-model="shuoming" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left">物流承运方</td>
            <td class="table-right" style="width: 305px;">
              <span>跨越速运</span>
            </td>
            <td class="table-left">物流运单号</td>
            <td class="table-right" style="width: 305px;">
              <span>暂无</span>
            </td>
          </tr>
          <!-- 发货信息 -->
          <tr>
            <td class="table-left table-vertical">发货信息</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">发货单位</td>
                <td class="table-right sub-table-right found-time" colspan="3" style="border-right: none">
                  <span>{{serviceParam.dcompanyName}}</span>
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
                        <el-cascader
                        :options="options"
                        v-model="selectedOptions"
                        @change="handleChange"
                        style="width: 100%"
                        placeholder="请选择发货地址"
                        :disabled="isDisabled"
                        >
                        </el-cascader>
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">详细地址</td>
                    <td class="table-right" colspan="3" style="border-right: none">
                        <input type="text" placeholder="请输入详细地址" v-model="serviceParam.daddress" :disabled="isDisabled" />
                    </td>
                </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">发货联系人</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                    <input type="text" placeholder="请输入发货联系人" v-model="serviceParam.dperson" :disabled="isDisabled" />
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">联系人手机<br>号码</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <input type="text" placeholder="请输入联系人手机号码" v-model="serviceParam.dphone" :disabled="isDisabled" />
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
                  <input type="text" placeholder="请输入收货单位" v-model="serviceParam.pcompanyName" :disabled="isDisabled" />
                </td>
              </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">收货地址</td>
                    <td class="table-right select-colspan3" colspan="3" style="border-right: none">
                        <el-cascader
                        :options="options1"
                        v-model="selectedOptions1"
                        @change="handleChange1"
                        style="width: 100%"
                        placeholder="请选择收货地址"
                        :disabled="isDisabled"
                        >
                        </el-cascader>
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none;">详细地址</td>
                    <td class="table-right" colspan="3" style="border-right: none">
                      <input type="text" placeholder="请输入详细地址" v-model="serviceParam.paddress" :disabled="isDisabled" />
                    </td>
                </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">收货联系人</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                    <input type="text" placeholder="请输入收货联系人" v-model="serviceParam.pperson" :disabled="isDisabled" />
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">收货人手机<br>号码</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <input type="text" placeholder="请输入收货人手机号码" v-model="serviceParam.pphone" :disabled="isDisabled" />
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
                        <input type="text" placeholder="请输入托寄物" v-model="serviceParam.goodsType" :disabled="isDisabled" />
                    </td>
                  </tr>
                <tr>
                    <td class="table-left sub-table-left" style="border-bottom:none;">打包总件数（件）</td>
                    <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                        <input type="text" placeholder="请输入打包总件数" v-model="serviceParam.count" :disabled="isDisabled" />
                    </td>
                    <td class="table-left sub-table-left" style="border-bottom:none;">总重量(千克)</td>
                    <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                        <input type="text" placeholder="请输入总重量" v-model="serviceParam.actualWeight" :disabled="isDisabled" />
                    </td>
                </tr>
                <tr>
                    <td class="table-left" style="border-left: none; border-bottom:none;">货物总体积</td>
                    <td class="table-right" colspan="3" style="border-right: none; border-bottom:none;">
                      <input type="text" placeholder="长" v-model="serviceParam.length" :disabled="isDisabled" style="width: 60px; text-align: center" />
                      <span style="padding: 0 8px">×</span>
                      <input type="text" placeholder="宽" v-model="serviceParam.width" :disabled="isDisabled" style="width: 60px; text-align: center" />
                      <span style="padding: 0 8px">×</span>
                      <input type="text" placeholder="高" v-model="serviceParam.height" :disabled="isDisabled" style="width: 60px; text-align: center" />
                      <span style="padding: 0 8px">厘米</span>
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
                  <span class="detail-info">{{serviceParam.orderId}}</span>
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
                  <el-table-column prop="quantity" label="数量" width="120" align="center" sortable show-overflow-tooltip></el-table-column>
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
                            <el-radio-group v-model="serviceParam.payMode">
                                <el-radio :label="10" style="margin-left: 20px;">寄方付</el-radio>
                                <el-radio :label="20" style="margin-left: 20px;">收方付</el-radio>
                                <el-radio :label="30" style="margin-left: 20px;">第三方付，付款账号</el-radio>
                            </el-radio-group>
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
                            <el-radio-group v-model="serviceParam.receiptFlag">
                                <el-radio :label="30" style="margin-left: 20px;">回单图片</el-radio>
                                <el-radio :label="10" style="margin-left: 20px;">回单原件</el-radio>
                            </el-radio-group>
                        </td>
                        <td class="table-left sub-table-left" >回单数量</td>
                        <td class="table-right sub-table-right" style="border-right: none;">
                            <input type="text" placeholder="请输入回单数量" v-model="serviceParam.receiptCount" />
                        </td>
                    </tr>
                    <tr>
                        <td class="table-left sub-table-left" style="border-bottom:none;">保价声明（元）</td>
                        <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                            <input type="text" placeholder="请输入保价" v-model="serviceParam.insuranceValue" />
                        </td>
                        <td class="table-left sub-table-left" style="border-bottom:none;">包装服务</td>
                        <td class="table-right sub-table-right woodenFrame" style="border-right: none; border-bottom:none;">
                          <el-select v-model="serviceParam.woodenFrame" placeholder="请选择包装服务" :disabled="isDisabled">
                            <el-option
                              v-for="item in woodenFrame"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            >
                            </el-option>
                          </el-select>
                        </td>
                    </tr>
                    <tr>
                        <td class="table-left" style="border-left: none; border-bottom:none;">备注事项</td>
                        <td class="table-right" colspan="3" style="border-right: none; border-bottom:none;">
                          <textarea
                            class="table-item"
                            placeholder="请输入备注事项"
                            v-model="serviceParam.waybillRemark"
                            :disabled="isDisabled"
                          ></textarea>
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
          <span>选择商品</span>
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
            <el-table-column prop="index" label="序号" align="center" width="60"></el-table-column>
            <el-table-column prop="barcode" label="商品条形码" align="center" width="140"></el-table-column>
            <el-table-column prop="commodityName" label="商品名称" align="center" show-overflow-tooltip></el-table-column>
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
        "paddress": "",
        "payMode": 20,
        "paymentCustomer": "666666",
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
      bianhao: '',
      senterpriseId: '',
      penterpriseId: ''
    };
  },
  watch: {
    'serviceParam.locationId': {
      handler(newV, oldV){
        this.tabledata1 = []
        this.isShowSort = newV === '1' ? true:false // 是否显示位置排序按钮
        if(newV === '1') this.handleChangeNum(this.serviceParam.sort)
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
    // this.getData()
    this.getDept1()
  },
  created(){
    this.documentId = this.$route.query.documentId
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
        this.selectedOptions = TextToCode[this.serviceParam.dprovinceName][this.serviceParam.dcityName][this.serviceParam.dcountyName].code
        this.selectedOptions1 = TextToCode[this.serviceParam.pprovinceName][this.serviceParam.pcityName][this.serviceParam.pcountyName].code
        // this.serviceParam.tiji = `${this.serviceParam.length} * ${this.serviceParam.width} * ${this.serviceParam.height} 厘米`
        orderId = this.serviceParam.orderId
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
      // 获取订单详情
      this.getOrderDetail(orderId)
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
        this.serviceParam.pcompanyName = res.data.receivingUnit
        this.serviceParam.paddress = res.data.address
        this.serviceParam.pperson = res.data.consignee
        this.serviceParam.pphone = res.data.telephone
        this.serviceParam.pprovinceName = res.data.province
        this.serviceParam.pcityName = res.data.city
        this.serviceParam.pcountyName = res.data.county
        this.selectedOptions1 = TextToCode[res.data.province][res.data.city][res.data.county].code
        this.serviceParam.orderId = this.$route.query.dealNumber
      }
      // this.serviceParam.orderId = res.data.dealNumber
      this.serviceParam.senterpriseId = res.data.senterpriseId // 销售方id
      this.serviceParam.penterpriseId = res.data.penterpriseId
      this.serviceParam.dcompanyName = res.data.senterpriseName
      this.orderList = res.data.orderCommodityListItems
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
      let commIdArr = []
      this.multipleSelection.forEach(item => {
        commIdArr.push(item.id)
      })
      let id = this.$store.state.user.enterpriseId
      this.serviceParam.platformPic = `${this.imageUrl1},${this.imageUrl2}` // 交易中心首页图片
      this.serviceParam.storePic = `${this.imageUrl3},${this.imageUrl4}` // 店铺图
      this.serviceParam.enterpriseId = this.$store.state.user.enterpriseId
      this.serviceParam.identityId = this.$store.state.user.id
      this.serviceParam.commId = commIdArr.join(',')
      delete this.serviceParam.time
      let serviceParam = this.serviceParam
      let params = {
        "creatorIdentityId": this.$store.state.user.id,
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": serviceParam
      }
      let res = await this.$API.activity.insertActivity(params)
      if(res.code === 'SUCCESS'){
        this.$message.success('转平台审核成功')
        this.$router.go(-1)
      }
      // let par = {
      //   "creatorIdentityId": "",
      //   "creatorUserId": this.$store.state.user.registerUserId,
      //   "object": {
      //     "documentId": this.documentId,
      //     "documentType": "HDSP"
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
      if(!this.form.title) return this.$message.error('公文标题不能为空')
      if(!this.date) return this.$message.error('办文时限不能为空')
      if(!this.form.remark) return this.$message.error('备注事项不能为空')
      if(!this.form.opinion) return this.$message.error('意见不能为空')
      if(!this.selectedOptions) return this.$message.error('发货地址不能为空')
      if(!this.serviceParam.daddress) return this.$message.error('发货详细地址不能为空')
      if(!this.serviceParam.dperson) return this.$message.error('发货联系人不能为空')
      if(!this.serviceParam.dphone) return this.$message.error('发货联系人手机号码不能为空')
      if(!this.serviceParam.goodsType) return this.$message.error('托寄物不能为空')
      if(!this.serviceParam.count) return this.$message.error('打包总件数（件）不能为空')
      if(!this.serviceParam.actualWeight) return this.$message.error('总重量不能为空')
      if(!this.serviceParam.length) return this.$message.error('货物长不能为空')
      if(!this.serviceParam.width) return this.$message.error('货物宽不能为空')
      if(!this.serviceParam.height) return this.$message.error('货物高不能为空')
      if(!this.serviceParam.payMode) return this.$message.error('请选择付款方式')
      if(!this.serviceParam.serviceMode) return this.$message.error('请选择服务方式')
      if(!this.serviceParam.receiptFlag) return this.$message.error('请选择签回单')
      if(!this.serviceParam.receiptCount) return this.$message.error('回单数量不能为空')
      if(!this.serviceParam.insuranceValue) return this.$message.error('保价不能为空')
      if(!this.serviceParam.woodenFrame) return this.$message.error('请选择包装服务')
      if(!this.serviceParam.waybillRemark) return this.$message.error('货物备注事项不能为空')
      // this.serviceParam.length = this.serviceParam.tiji
      // this.serviceParam.width = this.serviceParam.tiji
      // this.serviceParam.height = this.serviceParam.tiji
      this.serviceParam.paymentCustomer = '666666'
      if(this.$route.query.dealNumber){
        this.serviceParam.denterpriseId = this.serviceParam.senterpriseId // 销售方
        this.serviceParam.penterpriseId = this.serviceParam.penterpriseId // 采购方
      }
      // this.serviceParam.denterpriseId = this.senterpriseId
      // this.serviceParam.penterpriseId = this.penterpriseId
      this.serviceParam.dcountry = '中国'
      this.serviceParam.pcountry = '中国'
      this.serviceParam.actualWeight = parseFloat(this.serviceParam.actualWeight)
      this.serviceParam.count = parseInt(this.serviceParam.count)
      this.serviceParam.receiptCount = parseInt(this.serviceParam.receiptCount)
      this.serviceParam.insuranceValue = parseFloat(this.serviceParam.insuranceValue)
      // this.serviceParam.orderId = this.$route.query.dealNumber
      let serviceParam = this.serviceParam
      delete serviceParam.orderCommodityListItems
      delete serviceParam.address
      delete serviceParam.city
      delete serviceParam.consignee
      delete serviceParam.country
      delete serviceParam.county
      delete serviceParam.penterpriseName
      delete serviceParam.province
      delete serviceParam.receivingUnit
      delete serviceParam.senterpriseName
      delete serviceParam.storeId
      delete serviceParam.storeName
      delete serviceParam.telephone
      delete serviceParam.totalAmount
      delete serviceParam.totalQuantity
      // delete serviceParam.tiji
      // serviceParam.penterpriseId
      delete serviceParam.senterpriseId
      let params = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentNumber": this.form.documentNumber,
          "documentType": "WLSP",
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
      console.log(serviceParam)
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
        // if(!res.data) return this.$message.error('此位置序号已占')
      })
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
    onSure(){
      this.tabledata1 = this.multipleSelection4
      this.tabledata1.forEach((item, index) => {
        item.index = index+1
      })
      this.tabledata1.reverse()
      this.onClose()
      this.$nextTick(() => {
        this.tabledata1.forEach(row => {
          this.$refs.singleTable1.toggleRowSelection(row, true)
        })
      })
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
      this.serviceParam.dprovinceName = CodeToText[value[0]]
      this.serviceParam.dcityName = CodeToText[value[1]]
      this.serviceParam.dcountyName = CodeToText[value[2]]
    },
    //选择省市区
    handleChange1(value) {
      this.serviceParam.pprovinceName = CodeToText[value[0]]
      this.serviceParam.pcityName = CodeToText[value[1]]
      this.serviceParam.pcountyName = CodeToText[value[2]]
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