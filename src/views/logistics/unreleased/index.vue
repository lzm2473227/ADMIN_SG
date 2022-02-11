<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="onOrder('1')"><img class="icon" src="@/assets/images/xingchengwuliu.png" alt=""><span class="axis">形成物流审批件</span></div>
        <div class="print" @click="onAdd()"><img class="icon" src="@/assets/images/wuliuweishenpi.png" alt=""><span class="axis">物流未审核批件列表</span></div>
        <div class="print" @click="printTable('printJS-table')"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/status.png" alt=""><span class="axis">查看状态</span></div>
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
        <el-table-column label="订单编号" show-overflow-tooltip align="center" sortable width="170">
          <template v-slot="scope">
            <span class="detail-info" @click="onOrder('2', scope.row)">{{scope.row.dealNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="出库单号" show-overflow-tooltip align="center" sortable width="170">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd('3', scope.row)">{{scope.row.barcode}}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联单据" show-overflow-tooltip align="center" sortable width="170">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd('4', scope.row)">{{scope.row.barcode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" show-overflow-tooltip label="出库商品内容" sortable width="220"></el-table-column>
        <el-table-column prop="totalQuantity" label="数量" show-overflow-tooltip align="center" sortable width="100"></el-table-column>
        <el-table-column prop="senterpriseName" label="出库仓库" sortable show-overflow-tooltip width="150"></el-table-column>
        <el-table-column prop="storeName" label="仓库地址" sortable show-overflow-tooltip width="190"></el-table-column>
        <el-table-column prop="penterpriseName" label="收货单位" sortable show-overflow-tooltip width="180"></el-table-column>
        <el-table-column prop="tradePrice" label="收货联系人" sortable show-overflow-tooltip width="140" align="center"></el-table-column>
        <el-table-column prop="quantity" label="联系人手机号" sortable show-overflow-tooltip width="150" align="center"></el-table-column>
        <el-table-column prop="quantity" label="收货地址" sortable show-overflow-tooltip width="180"></el-table-column>
        <!-- <el-table-column prop="state" label="状态" align="center" sortable width="100" >
          <template v-slot="scope">
            <el-tag v-if="scope.row.state === 1" type="success" disable-transitions>生效中</el-tag>
            <el-tag v-if="scope.row.state === 2" type="info" disable-transitions>未生效</el-tag>
            <el-tag v-if="scope.row.state === 3" type="warning" disable-transitions>已过期</el-tag>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <!-- <div class="inp-bot search-set">
      <div class="search-ipt">
        <span class="ipt-left">店铺编码</span>
        <input type="text" placeholder="请输入机具编号" v-model="ruleForm.meid">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">店铺名称</span>
        <input type="text" placeholder="请输入机具名称" v-model="ruleForm.equipmentName">
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
  name: "tab",
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
    this.getdata()
  },
  methods: {
    async getdata() {
      let len = []
      this.tabledata = []
      let id = this.$store.state.user.enterpriseId
      let params = {
        "object": {
          "enterpriseId": id,
          "enterpriseType": 1
        },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await this.$API.order.closedOrderList(params)
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
            item.reportTime = moment(item.reportTime).format("YYYY-MM-DD HH:mm:ss");
            item.handleTime = moment(item.handleTime).format("YYYY-MM-DD HH:mm:ss");
          })
          this.tabledata = data
    },
    //删除
    delMachine() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要删除的审批件')
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let id = []
        _.forEach(
          JSON.parse(JSON.stringify(this.multipleSelection)),
          function (item, key) {
            id.push(item.id);
          }
        )
        let params = {
          "object": {
              "documentIdList": id
          }
        }
        this.$API.OA.deleteDocument(params)
        this.$message.success("删除审批件成功!");
        this.getdata()
      })
    },
    onOrder(val, data){
      let dealNumber = ''
      if(val === '1'){
        if(this.multipleSelection.length <= 0) return this.$message('请选择需要形成的订单审批件')
        dealNumber = this.multipleSelection[0].dealNumber
      }
      if(val === '2') return dealNumber = data.dealNumber
      // let storeIdArr = []
      // this.multipleSelection.forEach(item => {
      //   storeIdArr.push(item.storeId)
      // })
      // const elementsAreEqual = array => array.every(el => el === array[0])
      // if(!elementsAreEqual(storeIdArr)) return this.$message.error('请选择同一个店铺的商品')
      // sessionStorage.setItem('orderList', JSON.stringify(this.multipleSelection))
      // let storeName = this.multipleSelection[0].storeName
      this.$router.push({
        path: "/logistics/unreleasedLogisticsInfo",
        query: {
          dealNumber: dealNumber
        },
      })
    },
    delOrder(){
      if(this.multipleSelection.length <= 0) return this.$message('请选择需要删除的商品')
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let commodityId = []
        this.multipleSelection.forEach(item => {
          commodityId.push(item.id)
        })
        let params = {
        "object": {
            "id": commodityId,
        }
        }
        this.$API.order.deleteOrderCart(params).then(res => {
          if(res.code !== 'SUCCESS') return false
          this.$message.success('删除商品成功')
          this.getdata()
        })
      }).catch(() => {})
    },
    onLine(){
      window.open('http://sgcenter.realbrand.net','_blank')
    },
    onAdd(val, data) {
      this.$router.push({path: "/logistics/unapprovedApproval"})
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
