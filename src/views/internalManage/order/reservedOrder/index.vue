<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="onBack"><img class="icon" src="@/assets/images/recall.png" alt=""><span class="axis">撤回审批件</span></div>
        <div class="print" @click="printTable('printJS-table')"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
        <div class="print"><img class="icon" src="@/assets/images/status.png" alt=""><span class="axis">查看状态</span></div>
        <!-- <div class="print" @click="changeOrder"><img class="icon" src="@/assets/images/sure.png" alt=""><span class="axis">转为交易订单</span></div> -->
        <div class="print" @click="toPlatform()"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台审核</span></div>
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
        <el-table-column label="批件编号" show-overflow-tooltip align="center" sortable width="170">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd(scope.row)">{{scope.row.documentNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" show-overflow-tooltip label="审批件标题" sortable></el-table-column>
        <!-- <el-table-column prop="commodityName" label="订单金额" align="center" sortable width="110"></el-table-column>
        <el-table-column prop="specsParameter" label="询价单金额" align="center" sortable width="120"></el-table-column>
        <el-table-column prop="brandName" label="报价单金额" sortable align="center" width="120"></el-table-column>
        <el-table-column prop="storeName" label="采购方" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="storeName" label="店铺名称" sortable show-overflow-tooltip></el-table-column> -->
        <el-table-column prop="handleTime" label="办结时间" align="center" sortable width="170"></el-table-column>
        <el-table-column label="呈报人/部门" align="center" sortable width="160" show-overflow-tooltip >
          <template v-slot="scope">
            <span>{{scope.row.reportName}} / {{scope.row.reporterDept}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="state" label="状态" align="center"  sortable width="100" >
          <template v-slot="scope">
            <el-tag v-if="scope.row.state === 0" type="success" disable-transitions>正常</el-tag>
            <el-tag v-if="scope.row.state === 1" type="danger" disable-transitions>异常</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column label="最后经办人/部门" align="center"  sortable width="150" show-overflow-tooltip >
          <template v-slot="scope">
            <span>{{scope.row.lastHandleName}} / {{scope.row.lastHandleDept}}</span>
          </template>
        </el-table-column>
        <el-table-column label="是否转为交易订单" align="center" sortable width="160">
          <template v-slot="scope">
            <el-tag v-if="scope.row.platformAuditState === '0' || scope.row.platformAuditState === '1'" type="warning" disable-transitions>否</el-tag>
            <el-tag v-if="scope.row.platformAuditState === '2'" type="success" disable-transitions>是</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
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
          "documentType": "DDSP",
          "state": 1 // 0.未审批 1.已审批
       },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await this.$API.order.saleDocumentList(params)
          let data = res.data;
          this.total = res.total;
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          data.forEach((item, key) => {
            item.index = len[key]
            item.handleTime = moment(item.handleTime).format("YYYY-MM-DD HH:mm:ss")
          })
          this.tabledata = data
    },
    onAdd(data){
      this.$router.push({
        path: "/internalManage/order/reservedOrderInfo",
        query: {
          documentId: data.id,
        },
      })
    },
    // 转为交易订单
    changeOrder(){
      if(this.multipleSelection.length < 1) return this.$message('请选择一项审批件')
      let msg = "是否确定转为交易订单？"
      this.$confirm(msg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          "object": {
              "documentType": "DDSP",
              "documentId": this.multipleSelection[0].id
          }
        }
        this.$API.order.transformToData(params).then(res => {
          if(res.code === 'SUCCESS'){
            this.$message.success('转交易订单成功')
            this.getdata()
          }
        })
      }).catch(() => {})
    },
    // 转平台审核
    toPlatform(){
      if(this.multipleSelection.length < 1) return this.$message('请选择一项审批件')
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
      let id = this.$store.state.user.enterpriseId
      let par = {
       "creatorIdentityId": "",
       "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentId": this.multipleSelection[0].id,
        }
      }
      let res = await this.$API.OA.submitForAudit(par)
        if(res.code === 'SUCCESS'){
          this.$message.success('转平台审核成功')
          this.getdata()
        }else{
          return false
        }
    },
    async onBack(){
      let documentId = this.multipleSelection[0].id
      let par = {
        "creatorIdentityId": "",
        "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentId": documentId,
        }
      }
      let res = await this.$API.OA.recallDocument(par)
      if(res.code === 'SUCCESS'){
        this.$message.success('撤回审批件成功')
      }else{
        return false
      }
    },
    // 新增机具
    addMachine(val, data) {
      // console.log(this.$route)
      if(val){
        let meid = ''
        if(data){
          meid = data.meid
        }else{
          if(this.multipleSelection.length != 1) return this.$message('请选择一项需要编辑的审批件')
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
@import "@/styles/image1.scss";
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
</style>
