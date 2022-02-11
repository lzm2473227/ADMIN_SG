<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="getAddFile()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">暂存内容</span></div>
        <div class="print" @click="forward"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转内部审核</span></div>
        <div class="print" @click="toPlatform('1')"><img class="icon" src="@/assets/images/sure.png" alt="" /><span class="axis">转已办件</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print" @click="onState('1')"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <!-- <div class="print" @click="toPlatform('2')"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台审核</span></div> -->
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title examine">
          <p>产品编码计划审批表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">审批件标题</td>
            <td class="table-right" colspan="3">
              <input type="text" placeholder="关于xxx的编码计划审批" v-model="form.title" :disabled="isDisabled"/>
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
          <p>产品编码计划表</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">编码计划编号</td>
            <td class="table-right" style="width: 305px;">
              <input type="text" placeholder="系统分配" v-model="serviceParam.codeInfoEntity.codeNumber" disabled/>
            </td>
            <td class="table-left">计划说明</td>
            <td class="table-right" style="width: 305px;">
              <input type="text" placeholder="请输入计划说明" v-model="serviceParam.codeInfoEntity.codeExplain" :disabled="isDisabled"/>
            </td>
          </tr>
          <tr>
            <td class="table-left">产品条形码</td>
            <td class="table-right sub-table-right">
                <span>{{commodityObj.barcode}}</span>
                <span @click="onAddComm('1')" class="choose-commodity" v-show="!isDisabled">选择产品</span>
            </td>
            <td class="table-left">产品名称</td>
            <td class="table-right" style="width: 305px;">
              <span>{{commodityObj.commodityName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">产品品牌</td>
            <td class="table-right" style="width: 305px;">
              <span>{{commodityObj.brandName}}</span>
            </td>
            <td class="table-left">产品规格</td>
            <td class="table-right" style="width: 305px;">
              <span>{{commodityObj.specsParameter}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">单品/箱/垛设置</td>
            <td colspan="3">
              <!-- <tr> -->
                <!-- <td class="table-left sub-table-left">生码数量</td> -->
                <div class="code-set">
                  <span class="code-num">生码数量</span>
                  <input type="text" placeholder="单品数量" v-model="serviceParam.codeInfoEntity.item" @change="changeCode" /> :
                  <input type="text" placeholder="箱码数量" v-model="serviceParam.codeInfoEntity.box" @change="changeBox" /> :
                  <input type="text" placeholder="垛数量" v-model="serviceParam.codeInfoEntity.stack" @change="changeStack" />
                  <span class="detail-info" style="margin-left: 5px" @click="onState('2')">查看数量填写说明</span>
                </div>
                <!-- <td class="table-right sub-table-right" colspan="3" style="border-right: none">
                  <input type="text" placeholder="" v-model="serviceParam.codeInfoEntity.item" style="width:60px; text-align: center;"/> :
                  <input type="text" placeholder="" v-model="serviceParam.codeInfoEntity.box" style="width:60px; text-align: center;" /> :
                  <input type="text" placeholder="" v-model="serviceParam.codeInfoEntity.stack" style="width:60px; text-align: center;" />
                  <span class="detail-info">查看数量填写说明</span>
                </td> -->
                <!-- <td class="table-left sub-table-left" style="border-right: none; background: none"></td>
                <td class="table-right sub-table-right" style="border-right: none"></td> -->
              <!-- </tr> -->
              <div class="code-set">
                <span class="code-num">数量比例</span>
                <span>单品：箱 = {{item}}:{{box1}}; 箱：垛 = {{box2}}:{{stack}}</span>
                <!-- <span>单品：箱 = {{serviceParam.codeInfoEntity.item/serviceParam.codeInfoEntity.box}}:{{serviceParam.codeInfoEntity.box/serviceParam.codeInfoEntity.box}}; 箱：垛 = {{serviceParam.codeInfoEntity.box/serviceParam.codeInfoEntity.stack}}:{{serviceParam.codeInfoEntity.stack/serviceParam.codeInfoEntity.stack}}</span> -->
              </div>
              <!-- <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">数量比例</td>
                <td class="table-right sub-table-right" colspan="3" style="border-bottom:none;border-right: none">
                  <span>单品：箱 = {{serviceParam.codeInfoEntity.item/serviceParam.codeInfoEntity.box}}:{{serviceParam.codeInfoEntity.box/serviceParam.codeInfoEntity.box}}; 箱：垛 ={{serviceParam.codeInfoEntity.box/serviceParam.codeInfoEntity.stack}}:{{serviceParam.codeInfoEntity.stack/serviceParam.codeInfoEntity.stack}}</span>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;border-right: none; background: none"></td>
                <td class="table-right sub-table-right" style="border-bottom:none;border-right: none"></td>
              </tr> -->
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">单品编码设置</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">单品数量</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{serviceParam.codeInfoEntity.item}}</span>
                </td>
                <td class="table-left sub-table-left">打码位置</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <input type="text" placeholder="根据商品形状来描述" v-model="serviceParam.codeCommEntity.printerPosition" />
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">二维码形状</td>
                <td class="table-right sub-table-right found-time">
                  <input type="text" placeholder="请输入二维码形状" v-model="serviceParam.codeCommEntity.qrCodeForm" />
                </td>
                <td class="table-left sub-table-left">二维码长 * 宽</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <input type="text" placeholder="长" v-model="serviceParam.codeCommEntity.chang" style="width:70px; text-align: center;"/> *
                  <input type="text" placeholder="宽" v-model="serviceParam.codeCommEntity.kuan" style="width:70px; text-align: center;" />
                  <span> 毫米</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码内容</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                  <el-radio-group v-model="serviceParam.codeCommEntity.qrCodeContent">
                    <el-radio :label="1" style="margin-left: 20px;">编码</el-radio>
                    <el-radio :label="2" style="margin-left: 20px;">网址 + 编码</el-radio>
                  </el-radio-group>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码网址</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <input type="text" placeholder="请输入二维码网址" v-model="serviceParam.codeCommEntity.qrCodeUrl	" />
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">箱码设置</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">箱数量</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{serviceParam.codeInfoEntity.box}}</span>
                </td>
                <td class="table-left sub-table-left">打码位置</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <input type="text" placeholder="根据商品形状来描述" v-model="serviceParam.codeBoxEntity.printerPosition" />
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">二维码形状</td>
                <td class="table-right sub-table-right found-time">
                  <input type="text" placeholder="请输入二维码形状" v-model="serviceParam.codeBoxEntity.qrCodeForm" />
                </td>
                <td class="table-left sub-table-left">二维码长 * 宽</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <input type="text" placeholder="长" v-model="serviceParam.codeBoxEntity.chang" style="width:70px; text-align: center;"/> *
                  <input type="text" placeholder="宽" v-model="serviceParam.codeBoxEntity.kuan" style="width:70px; text-align: center;" />
                  <span> 毫米</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码内容</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                  <el-radio-group v-model="serviceParam.codeBoxEntity.qrCodeContent">
                    <el-radio :label="1" style="margin-left: 20px;">编码</el-radio>
                    <el-radio :label="2" style="margin-left: 20px;">网址 + 编码</el-radio>
                  </el-radio-group>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码网址</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <input type="text" placeholder="请输入二维码网址" v-model="serviceParam.codeBoxEntity.qrCodeUrl" />
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">垛码设置</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">垛数量</td>
                <td class="table-right sub-table-right found-time">
                  <span>{{serviceParam.codeInfoEntity.stack}}</span>
                </td>
                <td class="table-left sub-table-left">打码位置</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <input type="text" placeholder="根据商品形状来描述" v-model="serviceParam.codeStackEntity.printerPosition" />
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">二维码形状</td>
                <td class="table-right sub-table-right found-time">
                  <input type="text" placeholder="请输入二维码形状" v-model="serviceParam.codeStackEntity.qrCodeForm" />
                </td>
                <td class="table-left sub-table-left">二维码长 * 宽</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <input type="text" placeholder="长" v-model="serviceParam.codeStackEntity.chang" style="width:70px; text-align: center;"/> *
                  <input type="text" placeholder="宽" v-model="serviceParam.codeStackEntity.kuan" style="width:70px; text-align: center;" />
                  <span> 毫米</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码内容</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                  <el-radio-group v-model="serviceParam.codeStackEntity.qrCodeContent">
                    <el-radio :label="1" style="margin-left: 20px;">编码</el-radio>
                    <el-radio :label="2" style="margin-left: 20px;">网址 + 编码</el-radio>
                  </el-radio-group>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码网址</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <input type="text" placeholder="请输入二维码网址" v-model="serviceParam.codeStackEntity.qrCodeUrl" />
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
      <div class="dialog-content" style="width: 600px" v-if="valIndex === '1'">
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
      <div class="dialog-content" style="width: 600px;" v-else>
        <div class="dialog-top">
          <span>单品/箱/垛数量填写的说明</span>
          <img @click="isState = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body state-dialog">
          <p><input type="text" value="240" style="width: 100px; " disabled> : <input type="text" value="20" style="width: 100px; " disabled> : <input type="text" value="1" style="width: 100px;" disabled></p>
          <p style="text-align: left;line-height: 26px;font-size: 16px;">1、若3个框都填写的大于0的整数，比如240:20:1，则第1个方框的数字为单品编码总数，第2个方框的数字为箱码总数，第3个方框的数字为垛码总数；后面的数字要能被前面的数字整除。</p>
          <p style="text-align: left;line-height: 26px;font-size: 16px;">2、若只需要单品编码和箱码，则第3个方框填写0即可。</p>
          <p style="text-align: left;line-height: 26px;font-size: 16px;">3、若只需要单品编码，则第2个和第3个方框填写0即可。</p>
          <p style="text-align: left;line-height: 26px;font-size: 16px;">4、当方框数字为大于0的整数时，数量比例自动计算；当方框数字为0时，数量比例不做自动计算，用“--”表示。</p>
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
      tabledata1: [],
      multipleSelection: [],
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
      commodityObj: {
        barcode: '',
        commodityName: '',
        brandName: '',
        specsParameter: '',
        commId: null
      },
      serviceParam: {
        "codeBoxEntity": { // 箱码设置
          "printerPosition": "",
          "qrCodeContent": 1,
          "qrCodeForm": "",
          "qrCodeSize": "",
          "qrCodeUrl": "",
          "chang": '',
          "kuan": ''
        },
        "codeCommEntity": { // 单品编码设置
          "commId": "",
          "printerPosition": "",
          "qrCodeContent": 1,
          "qrCodeForm": "",
          "qrCodeSize": "",
          "qrCodeUrl": "",
          "chang": '',
          "kuan": ''
        },
        "codeInfoEntity": { // 生码
          "barcode": "",
          "box": null,
          "codeExplain": "",
          "codeNumber": "",
          "commId": "",
          "commName": "",
          "enterpriseId": "",
          "identityId": "",
          "item": null,
          "ratio": "",
          "receive": 0,
          "stack": null,
          "commBoxRatio": '',
          "boxStackRatio": ''
        },
        "codeStackEntity": { // 垛码设置
          "printerPosition": "",
          "qrCodeContent": 1,
          "qrCodeForm": "",
          "qrCodeSize": "",
          "qrCodeUrl": "",
          "chang": '',
          "kuan": ''
        }
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
      isShowSort: true,
      isShowComm: false,
      showMsg: '',
      radioDan: 0,
      radioXiang: 0,
      radioDuo: 0,
      valIndex: '',
      // item: null,
      // box: null,
      // stack: null
    };
  },
  computed: {
    item(){
      if(parseInt(this.serviceParam.codeInfoEntity.box) !== 0){
        return this.serviceParam.codeInfoEntity.item/this.serviceParam.codeInfoEntity.box
      }else{
        return this.serviceParam.codeInfoEntity.item
      }
    },
    box1(){
      if(parseInt(this.serviceParam.codeInfoEntity.box) === 0){
        return 0
      }else{
        return this.serviceParam.codeInfoEntity.box/this.serviceParam.codeInfoEntity.box
      }
    },
    box2(){
      if(parseInt(this.serviceParam.codeInfoEntity.box) === 0){
        return 0
      }else{
        if(parseInt(this.serviceParam.codeInfoEntity.stack) === 0){
          return this.serviceParam.codeInfoEntity.box
        }else{
          return this.serviceParam.codeInfoEntity.box/this.serviceParam.codeInfoEntity.stack
        }
      }
    },
    stack(){
      if(parseInt(this.serviceParam.codeInfoEntity.stack) === 0){
        return 0
      }else{
        if(parseInt(this.serviceParam.codeInfoEntity.box) === 0){
          return this.serviceParam.codeInfoEntity.stack
        }
        return this.serviceParam.codeInfoEntity.stack/this.serviceParam.codeInfoEntity.stack
      }
    },
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
    this.getDept1()
  },
  created(){
    this.documentId = this.$route.query.documentId
  },
  methods: {
    async init(){
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
        this.serviceParam = JSON.parse(res.data.serviceParam).object
        console.log(this.serviceParam)
        this.form = res.data
        this.listLen = res.data.list.length
        this.date = res.data.limitTime
        this.form.reportTime = moment(res.data.reportTime).format("YYYY-MM-DD")
        this.getCommodityInfo(this.serviceParam.codeInfoEntity)
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
    // 获取商品信息
    async getCommodityInfo(data){
      let params = {
        "object": {
          "barcode": data.barcode,
          "enterpriseId": this.$store.state.user.enterpriseId
        }
      } 
      let res = await this.$API.commodityInfo.CommodityDetails(params)
      if(res.code === 'SUCCESS'){
        this.commodityObj = res.data
        this.commodityObj.commId = parseInt(res.data.id)
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
    async getCheckedNodes(){},
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
      if(!this.form.opinion) return this.$message.error('意见不能为空')
      if(!this.serviceParam.codeInfoEntity.codeExplain) return this.$message.error('计划说明不能为空')
      if(!this.commodityObj.barcode) return this.$message.error('请选择产品')
      if(!this.serviceParam.codeInfoEntity.item) return this.$message.error('生成单品编码数量不能为空')
      if(!this.serviceParam.codeInfoEntity.box) return this.$message.error('生成箱码数量不能为空')
      if(!this.serviceParam.codeInfoEntity.stack) return this.$message.error('生产垛码数量不能为空')
      // if(!this.form.onlineCustomerService) return this.$message.error('在线客服账号不能为空')
      // if(!this.form.remark) return this.$message.error('备注事项不能为空')
      // if(!this.form.storeIntroduce) return this.$message.error('店铺介绍不能为空')
      // if(!this.imageUrl1) return this.$message.error('请上传店铺店招')
      // if(!this.imageUrl3) return this.$message.error('请上传店铺LOGO')
      this.serviceParam.codeInfoEntity.enterpriseId = this.$store.state.user.enterpriseId
      this.serviceParam.codeInfoEntity.barcode = this.commodityObj.barcode
      this.serviceParam.codeInfoEntity.commId = this.commodityObj.commId
      this.serviceParam.codeCommEntity.commId = this.commodityObj.commId
      this.serviceParam.codeInfoEntity.identityId = this.$store.state.user.id
      this.serviceParam.codeInfoEntity.item = parseInt(this.serviceParam.codeInfoEntity.item)
      this.serviceParam.codeInfoEntity.box = parseInt(this.serviceParam.codeInfoEntity.box)
      this.serviceParam.codeInfoEntity.stack = parseInt(this.serviceParam.codeInfoEntity.stack)
      // 判断单品编码的二维码长宽
      if(this.serviceParam.codeCommEntity.chang && this.serviceParam.codeCommEntity.kuan){
        this.serviceParam.codeCommEntity.qrCodeSize = `${this.serviceParam.codeCommEntity.chang}, ${this.serviceParam.codeCommEntity.kuan}`
      }
      if(!this.serviceParam.codeCommEntity.chang && !this.serviceParam.codeCommEntity.kuan){
        this.serviceParam.codeCommEntity.qrCodeSize = ''
      }
      if(this.serviceParam.codeCommEntity.chang && !this.serviceParam.codeCommEntity.kuan){
        return this.$message('请输入单品编码的二维码宽')
      }
      if(!this.serviceParam.codeCommEntity.chang && this.serviceParam.codeCommEntity.kuan){
        return this.$message('请输入单品编码的二维码长')
      }
      // 判断箱码的二维码长宽
      if(this.serviceParam.codeBoxEntity.chang && this.serviceParam.codeBoxEntity.kuan){
        this.serviceParam.codeBoxEntity.qrCodeSize = `${this.serviceParam.codeBoxEntity.chang}, ${this.serviceParam.codeBoxEntity.kuan}`
      }
      if(!this.serviceParam.codeBoxEntity.chang && !this.serviceParam.codeBoxEntity.kuan){
        this.serviceParam.codeBoxEntity.qrCodeSize = ''
      }
      if(this.serviceParam.codeBoxEntity.chang && !this.serviceParam.codeBoxEntity.kuan){
        return this.$message('请输入箱码的二维码宽')
      }
      if(!this.serviceParam.codeBoxEntity.chang && this.serviceParam.codeBoxEntity.kuan){
        return this.$message('请输入箱码的二维码长')
      }
      // 判断垛码的二维码长宽
      if(this.serviceParam.codeStackEntity.chang && this.serviceParam.codeStackEntity.kuan){
        this.serviceParam.codeStackEntity.qrCodeSize = `${this.serviceParam.codeStackEntity.chang}, ${this.serviceParam.codeStackEntity.kuan}`
      }
      if(!this.serviceParam.codeStackEntity.chang && !this.serviceParam.codeStackEntity.kuan){
        this.serviceParam.codeStackEntity.qrCodeSize = ''
      }
      if(this.serviceParam.codeStackEntity.chang && !this.serviceParam.codeStackEntity.kuan){
        return this.$message('请输入垛码的二维码宽')
      }
      if(!this.serviceParam.codeStackEntity.chang && this.serviceParam.codeStackEntity.kuan){
        return this.$message('请输入垛码的二维码长')
      }
      this.serviceParam.codeInfoEntity.commBoxRatio = `${this.item}:${this.box1}`
      this.serviceParam.codeInfoEntity.boxStackRatio = `${this.box2}:${this.stack}`
      // this.serviceParam.codeInfoEntity.commBoxRatio = `${this.serviceParam.codeInfoEntity.item/this.serviceParam.codeInfoEntity.box}:${this.serviceParam.codeInfoEntity.box/this.serviceParam.codeInfoEntity.box}`
      // this.serviceParam.codeInfoEntity.boxStackRatio = `${this.serviceParam.codeInfoEntity.box/this.serviceParam.codeInfoEntity.stack}:${this.serviceParam.codeInfoEntity.stack/this.serviceParam.codeInfoEntity.stack}`
      this.serviceParam.codeInfoEntity.ratio = `${this.serviceParam.codeInfoEntity.item}:${this.serviceParam.codeInfoEntity.box}:${this.serviceParam.codeInfoEntity.stack}`
      let serviceParam = this.serviceParam
      let params = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentNumber": this.form.documentNumber,
          "documentType": "BMSP",
          "id": documentId,
          "limitTime": moment(this.date).valueOf(),
          "remark": this.form.remark,
          // "reportIdentityId": "string",
          "reportTime": moment(this.form.reportTime).valueOf(),
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
    async onState(val){
      this.isState = true
      this.valIndex = val
      if(val === '1'){
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
      }
    },
    onExplain(){

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
          "enterpriseId": this.$store.state.user.enterpriseId,
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      this.$API.code.productionCommodityList(params).then(res => {
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
            // item.price = item.price.toFixed(2)
            // item.b = item.classifyRsp.b
            // item.m = item.classifyRsp.m
            // item.p = item.classifyRsp.p
          });
          this.commodityData = res.data
        })
    },
    onClose(){
      this.isShowComm = false
      this.multipleSelection4 = []
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    handleSelectionChange4(val){
      this.multipleSelection4 = val
    },
    onSure(){
      this.commodityObj.barcode = this.multipleSelection4[0].barcode
      this.commodityObj.commodityName = this.multipleSelection4[0].commodityName
      this.commodityObj.brandName = this.multipleSelection4[0].brandName
      this.commodityObj.specsParameter = this.multipleSelection4[0].specsParameter
      this.commodityObj.commId = this.multipleSelection4[0].id
      this.isShowComm = false
    },
    changeCurrentPage(val) {
      this.pageNum = val;
    },
    changeCode(){
      if(!(/^([1-9]\d*|[0]{1,1})$/.test(this.serviceParam.codeInfoEntity.item))) return this.$message('单品数量只能为数字')
    },
    changeBox(){
      if(!(/^([1-9]\d*|[0]{1,1})$/.test(this.serviceParam.codeInfoEntity.box))) return this.$message('箱码数量只能为数字')
    },
    changeStack(){
      if(!(/^([1-9]\d*|[0]{1,1})$/.test(this.serviceParam.codeInfoEntity.stack))) return this.$message('垛数量只能为数字')
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
    handleAvatarSuccess4(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl4 = res.data; // 身份证正面
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
      this.$router.go(-1)
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
.code-num{
  display: inline-block;
  background: #F6F7FB;
  color: #384F71;
  padding: 0 4px;
  height: 34px;
  line-height: 34px;
  width: 101px;
  text-align: center;
  border-right: 1px solid #DADBDF;
  margin-right: 4px;
}
.code-set{
  input{
    width:80px;
    text-align: center;
    height: 26px;
    line-height: 26px;
    padding: 4px;
    border: 1px solid #DDDDDD;
    outline: none;
    border-radius: 2px;
  }
}
.code-set:first-child{
  border-bottom: 1px solid #DADBDF;
}
</style>