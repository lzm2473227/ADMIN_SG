<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="onWaybillCode('1')"><img class="icon" src="@/assets/images/quhuo.png" alt=""><span class="axis">通知取货</span></div>
        <div class="print" @click="onBack"><img class="icon" src="@/assets/images/quxiaofahuo.png" alt=""><span class="axis">取消取货</span></div>
        <div class="print" @click="onBack"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印运单</span></div>
        <div class="print" @click="onBack"><img class="icon" src="@/assets/images/ic-examine.png" alt=""><span class="axis">查看回单</span></div>
        <div class="print" @click="printTable('printJS-table')"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
        <div class="print"><img class="icon" src="@/assets/images/status.png" alt=""><span class="axis">查看状态</span></div>
        <div class="print" @click="onBack"><img class="icon" src="@/assets/images/weituo.png" alt=""><span class="axis">货运委托书</span></div>
        <!-- <div class="show-field">
        <div class="print isshow-set" @mouseover="mouseOver"><img class="icon" src="@/assets/images/ziduan.png" alt=""><span class="axis">显示字段</span></div>
          <el-checkbox-group v-model="checkList" class="check-field" @mouseleave="mouseLeave" v-show="isShowField">
            <el-checkbox label="1">商品规格</el-checkbox>
            <el-checkbox label="2">商品名称</el-checkbox>
            <el-checkbox label="3">活动名称</el-checkbox>
            <el-checkbox label="4">售出时间</el-checkbox>
            <el-checkbox label="5">订单类型</el-checkbox>
          </el-checkbox-group>
        </div> -->
      </div>
      <div class="right">
        <div class="setup">
          <!-- <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup"> -->
        </div>
      </div>
    </div>
    <div class="tab-body inside-table">
      <el-table
      id="printJS-table"
      :row-class-name="tableRowClassName"
      ref="singleTable"
      :data="tabledata"
      style="width: 100%"
      highlight-current-row
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column label="物流编号" show-overflow-tooltip align="center" sortable width="160">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd(scope.row)">{{scope.row.waybillCode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联出库单" show-overflow-tooltip align="center" sortable width="160">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd(scope.row)">{{scope.row.dealNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联单据" show-overflow-tooltip align="center" sortable width="160">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd(scope.row)">{{scope.row.dealNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" show-overflow-tooltip label="商品内容" sortable min-width="200"></el-table-column>
        <el-table-column prop="count" label="数量" align="center" sortable width="100"></el-table-column>
        <el-table-column prop="penterpriseName" label="收货单位" show-overflow-tooltip sortable width="160"></el-table-column>
        <el-table-column prop="pperson" label="收货联系人" sortable show-overflow-tooltip width="120" align="center"></el-table-column>
        <el-table-column prop="pphone" label="联系人手机号码" sortable show-overflow-tooltip width="150" align="center"></el-table-column>
        <el-table-column prop="address" label="收货地址" sortable show-overflow-tooltip width="180" align="center"></el-table-column>
        <el-table-column prop="waybillNumber" label="物流承运方" sortable show-overflow-tooltip width="150" align="center">
          <template v-slot="scope">
            <span @click="onRoute(scope.row)">跨越速运</span>
          </template>
        </el-table-column>
        <el-table-column prop="dealStatus" label="运单状态" align="center" sortable width="110" >
          <template v-slot="scope">
            <span>暂无</span>
            <el-tag v-if="scope.row.dealStatus === 0" type="warning" disable-transitions>待付款</el-tag>
            <el-tag v-if="scope.row.dealStatus === 1" type="warning" disable-transitions>待发货</el-tag>
            <el-tag v-if="scope.row.dealStatus === 2" type="warning" disable-transitions>待自提</el-tag>
            <el-tag v-if="scope.row.dealStatus === 3" disable-transitions>已收货</el-tag>
            <el-tag v-if="scope.row.dealStatus === 4" type="success" disable-transitions>已完成</el-tag>
            <el-tag v-if="scope.row.dealStatus === 5" type="info" disable-transitions>待收货</el-tag>
            <el-tag v-if="scope.row.dealStatus === 6" type="danger" disable-transitions>交易关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="goodsTime" label="货好时间" align="center" sortable width="160"></el-table-column>
        <el-table-column label="付款方式" align="center"  sortable width="100" >
          <template v-slot="scope">
            <el-tag v-show="scope.row.payMode === 10">寄方付</el-tag>
            <el-tag v-show="scope.row.payMode === 20">收方付</el-tag>
            <el-tag v-show="scope.row.payMode === 30">第三方付</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="运单费用" sortable width="120" align="center">暂无</el-table-column>
        <el-table-column prop="waybillNumber" label="物流运单号" sortable width="150" align="center">
          <template v-slot="scope">
            <span class="detail-info" @click="onWaybillCode('2', scope.row)">{{scope.row.waybillNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="merchandiser" label="揽货员" sortable width="120" align="center"></el-table-column>
        <el-table-column prop="solicitationTime" label="揽货时间" align="center" sortable width="160"></el-table-column>
        <el-table-column prop="courier" label="派送员" sortable width="120" align="center"></el-table-column>
        <el-table-column prop="deliveryTime" label="派送时间" align="center" sortable width="160"></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="pay-dialog" v-show="isShowComm">
      <div class="dialog-content" style="width: 620px">
        <div class="dialog-top">
          <span>物流轨迹</span>
          <img @click="onClose" src="@/assets/images/close.png" alt="">
        </div>
        <div class="table-main">
          <div class="guiji">
            <div v-for="(item, index) in items" :key="index" class="guiji-sub">
              <span>{{item.uploadDate}}</span>
              <span>{{item.routeStep}}</span>
              <span>{{item.routeDescription}}</span>
              <span>当前在<span>{{item.city}}</span></span>
            </div>
          </div>
          <div class="scan-code">
            <button @click="onClose">关闭</button>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-dialog" v-show="isQuhuo">
      <div class="dialog-content" style="width: 620px">
        <div class="dialog-top">
          <span>通知司机取货</span>
          <img @click="onClose" src="@/assets/images/close.png" alt="">
        </div>
        <div class="table-main">
          <div class="yundan">
            <p>已选运单：{{num}}票</p>
            <div class="dialog-ipt">
              <el-date-picker v-model="goodsTime" type="date" placeholder="选择日期"></el-date-picker>
              
            </div>
          </div>
          <div class="scan-code">
            <button @click="onClose">关闭</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="inp-bot search-set">
      <div class="search-ipt">
        <span class="ipt-left">店铺编码</span>
        <input type="text" placeholder="请输入店铺编码" v-model="ruleForm.meid">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">店铺名称</span>
        <input type="text" placeholder="请输入店铺名称" v-model="ruleForm.equipmentModel">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">归属部门</span>
        <input type="text" placeholder="请输入归属部门" v-model="ruleForm.equipmentName">
      </div>
      <div class="search-btn">
        <button @click="submitForm">查询</button>
        <button @click="resetForm" class="reset-btn">重置</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import Page from '@/components/pages/index.vue'
// import httpreques from '../../utils/httpreques';
import moment from "moment";
// import {export_json_to_excel} from "@/utils/Export2Excel";
// import confirm from '@/components/Confirm/confirm'
// import printJS from 'print-js'
// import { getCurrentInstance, onMounted } from "vue";

export default {
  name: "Unreleased",
  components: {
    Page
  },
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      tabledata: [],
      totalNum: 0,
      filePath:"",
      ruleForm: {
        meid: '',
        storeName: '',
        equipmentName: '',
        equipmentModel: '',
        equipmentSupplier: ''
      },
      multipleSelection : [],
      srcList: [],
      code: 'NATIONAL_DISTRIBUTOR',
      checkList: [],
      isShowField: false, // 显示字段
      isShowComm: false,
      isQuhuo: false,
      items: [],
      goodsTime: ''
    };
  },
  // setup( ) {
  //   const { ctx } = getCurrentInstance(); //获取上下文实例
  //     console.log(ctx, "ctx");
  //     ctx.$toast('测试');
  // },
  created() {
    // this.code = this.$store.state.user.currentUser.identities[0].role.code
    this.getdata();
  },
  methods: {
    async getdata() {
      let id = this.$store.state.user.enterpriseId
      let len = []
      this.tabledata = []
      let params = {
        "object": {
          "enterpriseId": id
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await this.$API.logistics.waybillList(params)
        console.log(res);
          let data = res.data;
          this.total = res.total;
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          data.forEach((item, key) => {
            item.index = len[key]
            item.address = `${item.pprovince}${item.pcity}${item.pcounty}${item.paddress}`
            item.deliveryTime = item.deliveryTime == null ? '暂无':moment(item.deliveryTime).format("YYYY-MM-DD HH:mm:ss")
            item.solicitationTime = item.solicitationTime == null ? '暂无':moment(item.solicitationTime).format("YYYY-MM-DD HH:mm:ss")
            item.goodsTime = item.goodsTime == null ? '暂无':moment(item.goodsTime).format("YYYY-MM-DD HH:mm:ss")
            if(item.merchandiser == null) item.merchandiser = '暂无'
            if(item.courier == null) item.courier = '暂无'
          })
          this.tabledata = data
    },
    async onWaybillCode(val, data){
      if(val === '1'){
        this.isQuhuo = true
      }
      if(val === '2'){
        this.isShowComm = true
        let params = {
          "object": {
            "waybillNumber": data.waybillNumber
          }
        }
        let res = await this.$API.logistics.queryRoute(params)
        console.log(res.data)
        this.items = res.data
      }
    },
    onClose(){
      this.isShowComm = false
      this.isQuhuo = false
    },
    onRoute(){},
    onAdd(data){
      this.$router.push({
        path: "/logistics/publishedLogisticsInfo",
        query: {
          waybillNumber: data.waybillNumber,
        },
      })
    },
    onBack(){},
    // 新增机具
    addMachine(val, data) {
      // console.log(this.$route)
      if(val){
        let meid = ''
        if(data){
          meid = data.meid
        }else{
          if(this.multipleSelection.length != 1) return this.$message('请选择一项需要编辑的店铺')
          meid = this.multipleSelection[0].meid
        }
        this.$router.push({
          path: "/internalManage/storeInfo/storeDetailInfo",
          query: {
            meid: meid,
          },
        });
      } else{
        this.$router.push({path: "/internalManage/storeInfo/storeDetailInfo"});
      }
    },
    // 机具图片预览
    onPre(data){
      this.srcList = []
      let list = `${data.filePath}`
      this.srcList = list.split(',')
    },
    mouseOver(){
      this.isShowField = true
    },
    mouseLeave(){
      this.isShowField = false
    },
    submitForm(){
      this.getdata()
    },
    resetForm(){
      this.ruleForm = {}
    },
    handleSelectionChange(val){
      this.multipleSelection = val
    },
    changeCurrentPage(val) {
      this.pageNum = val
      this.getdata();
    },
    //添加class样式
    tableRowClassName({row, rowIndex}){
      if (rowIndex === 0) {
        return 'warning-row';
      }
      return '';
    },
    formatter(row, column) {
      return row.address;
    },
    printTable(id) {
      const html = document.querySelector('#' + id).innerHTML
      // 新建一个 DOM
      const div = document.createElement('div')
      const printDOMID = 'printDOMElement'
      div.id = printDOMID
      div.innerHTML = html

      // 提取第一个表格的内容 即表头
      const ths = div.querySelectorAll('.el-table__header-wrapper th')
      const ThsTextArry = []
      for (let i = 0, len = ths.length; i < len; i++) {
        // if (ths[i].innerText !== '') 
        ThsTextArry.push(ths[i].innerText)
      }

      // 删除多余的表头
      div.querySelector('.hidden-columns').remove()
      // 第一个表格的内容提取出来后已经没用了 删掉
      div.querySelector('.el-table__header-wrapper').remove()

      // 将第一个表格的内容插入到第二个表格
      let newHTML = '<tr>'
      for (let i = 0, len = ThsTextArry.length; i < len; i++) {
        newHTML += '<td style="text-align: center; font-weight: bold">' + ThsTextArry[i] + '</td>'
      }
      newHTML += '</tr>'
      div.querySelector('.el-table__body-wrapper table').insertAdjacentHTML('afterbegin', newHTML)
      // 将新的 DIV 添加到页面 打印后再删掉
      document.querySelector('body').appendChild(div)

      printJS({
        printable: printDOMID,
        type: 'html',
        header: '机具列表',
        headerStyle: 'text-align:center;color:#000;width:100%;border:1px #000 solid;',
        // targetStyles: ['border', 'padding: 15px'],
        scanStyles: false,
        style: 'table tr td,th { border-collapse: collapse;padding: 5px;border:1px #000 solid; }' // 表格样式
      })

      div.remove()
    },
    exportExcel() {
      let t = this;
      var tHeader = [
        "机具编码（MEID）",
        "机具型号",
        "机具名称",
        "机具供应商",
        "所属门店",
        "门店地址",
        "机具图片",
        "启用时间",
        "状态",
        "所在市",
        "所在省"
      ];
      var filterVal = [
        "meid",
        "equipmentModel",
        "equipmentName",
        "equipmentSupplier",
        "storeName",
        "address",
        "filePath",
        "bindingTime",
        "state",
        "city",
        "province"
      ];

      var filename = "机具列表";
      const list = this.tabledata;
      var data = t.formatJson(filterVal, list);
      export_json_to_excel({header: tHeader, data, filename});
    },
    //序列化json数据
    formatJson(filterVal, tableData) {
      return tableData.map((v) => {
        return filterVal.map((j) => {
          return v[j];
        });
      });
    }
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/reset.scss';
@import "@/styles/image3.scss";
@import "@/styles/dialog.scss";
/deep/.tab-body{
  height: 655px;
}
/deep/.inside-table .el-table .el-table__header th{
  padding: 5px 0;
}
/deep/.inside-table .el-table .el-table__body td{
  padding: 2px 0;
}
.show-field{
  position: relative;
}
.check-field{
  position: absolute;
  top: 35px;
  left: 0;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.16);
  padding: 10px;
  z-index: 999;
}
/deep/.show-field .el-checkbox-group .el-checkbox{
  display: block;
  padding-bottom: 10px;
  .el-checkbox__label{
    padding-left: 10px;
  }
}
/deep/.show-field .el-checkbox-group .el-checkbox:last-child{
  padding-bottom: 0;
}
.guiji{
  height: 320px;
  padding: 20px;
  .guiji-sub{
    margin-bottom: 10px;
    line-height: 20px;
    span{
      margin-right: 10px;
    }
  }
  .guiji-sub span:last-child span{
    font-weight: 600;
  }
}
</style>
