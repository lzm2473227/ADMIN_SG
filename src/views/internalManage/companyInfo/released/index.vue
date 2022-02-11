<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="onBack">
          <img class="icon" src="@/assets/images/recall.png" alt="" /><span class="axis">撤回审批件</span>
        </div>
        <div class="print" @click="printTable('printJS-table')">
          <img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印列表</span>
        </div>
        <div class="print">
          <img class="icon" src="@/assets/images/derive.png" alt="" /><span class="axis">导出表格</span>
        </div>
        <div class="print"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
        <div class="print" @click="toPlatform()"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转平台审核</span></div>
      </div>
      <div class="right">
        <!-- <div class="setup"><img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup" /></div> -->
      </div>
    </div>
    <div class="tab-body inside-table">
      <el-table
        id="printJS-table"
        :row-class-name="tableRowClassName"
        ref="multipleTable2"
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
        <el-table-column prop="handleTime" label="办结时间" align="center" sortable width="160"></el-table-column>
        <el-table-column label="呈报人/部门" align="center" sortable width="160" show-overflow-tooltip>
          <template v-slot="scope">
            <span>{{scope.row.reportName}} / {{scope.row.reporterDept}}</span>
          </template>
        </el-table-column>
        <el-table-column label="最后经办人/部门" align="center"  sortable width="150" show-overflow-tooltip>
          <template v-slot="scope">
            <span>{{scope.row.lastHandleName}} / {{scope.row.lastHandleDept}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <!-- <div class="inp-bot search-set">
      <div class="search-ipt search-select">
        <select v-model="name">
          <option value="1">商品名称</option>
          <option value="2">69码</option>
        </select>
        <input v-if="name === '1'" type="text" placeholder="请输入商品名称" v-model="ruleForm.commodityName">
        <input v-else type="text" placeholder="请输入或扫描商品69码" v-model="ruleForm.barCode">
        <img v-show="name === '2'" @click="scan" src="@/assets/images/ic-code.png" alt="">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">商品单价</span>
        <input type="text" placeholder="请输入商品单价" v-model="ruleForm.price">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">商品品牌</span>
        <input type="text" placeholder="请输入商品品牌" v-model="ruleForm.brand">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">商品类别</span>
        <select name="" id="" v-model="ruleForm.category">
          <option value="一级类别">一级类别</option>
          <option value="二级类别">二级类别</option>
          <option value="三级类别">三级类别</option>
        </select>
      </div>
      <div class="search-btn">
        <button>查询</button>
        <button class="reset-btn">重置</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import moment from "moment";
import Page from '@/components/pages/index.vue'
// import httpreques from "../../utils/httpreques";
// import {export_json_to_excel} from "@/utils/Export2Excel";
// import printJS from 'print-js'

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
      radio1: "按商品69编码统计",
      textarea: "",
      tabledata: [],
      totalNum: 0,
      multipleSelection: [],
      ruleForm: {
        commodityName: "",
        barCode: '',
        price: "",
        brand:"",
        category:""
      },
      name: '1',
      srcList: [],
      isDialog: false,
      code: 'NATIONAL_DISTRIBUTOR'
    };
  },
  created() {
    // this.code = this.$store.state.user.currentUser.identities[0].role.code
    this.getdata();
  },
  methods: {
    async getdata() {
      let len = []
      this.tabledata = []
      let id = this.$store.state.user.enterpriseId
      let params = {
       "object": {
          "documentType": "GSSP",
          "state": 1 // 0.未审批 1.已审批
       },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await this.$API.OA.done(params)
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
            item.handleTime = moment(item.handleTime).format("YYYY-MM-DD HH:mm:ss")
          })
          this.tabledata = data
    },
    async onBack(){
      if(this.multipleSelection.length !== 1) return this.$message('请选择一项审批件')
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
        this.getdata()
      }else{
        return false
      }
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
      let par = {
       "creatorIdentityId": "",
       "creatorUserId": this.$store.state.user.registerUserId,
        "object": {
          "documentId": this.multipleSelection[0].id,
          "documentType": 'GSSP'
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
    addProduct() {
      // this.$router.replace("/internalManage/commodityInfo/priceDetailInfo");
    },
    onAdd(data){
      this.$router.push({
        path: "ReleasedCompanyDetailInfo",
        query: {
          documentId: data.id,
        },
      })
    },
    editproduct(data, val) {
      let barcode = ''
      if(val === '2'){
        barcode = data.barcode
      }else{
        if(this.multipleSelection.length <= 0) return this.$message('请选择一项需要编辑的商品')
        barcode = this.multipleSelection[0].barcode
      }
      this.$router.push({
        path: "/internalManage/commodityInfo/priceDetailInfo",
        query: {
          barcode: barcode,
        },
      });
    },
    delproduct() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要删除的商品')
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      let t = this;
      //抽取commoditycode
      let codearr = [];
      _.forEach(
        JSON.parse(JSON.stringify(t.multipleSelection)),
        function (item, key) {
          codearr.push(item.barcode);
        }
      );
      let params = {
        barcode: codearr
      };
      let url = "/realbrand-management-service/CommodityMgt/DeleteBarcode";
      httpreques("post", params, url).then((res) => {
        // console.log(res)
        if (res.data.code == "SUCCESS") {
          t.$message({
            message: "删除成功",
            type: "success",
          });
          t.getdata();
        } else {
          //接口错误处理
          t.$message.error(res.data.msg);
        }
      });
      });
    },
    //上架
    putaway() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要上架的商品')
      let t = this;
      let codearr = [];
      _.forEach(
        JSON.parse(JSON.stringify(t.multipleSelection)),
        function (item, key) {
          codearr.push(item.barcode);
        }
      );
      // console.log(codearr);  //要进行数据转换，把数组变为字符串
      // codearr = codearr.toString();
      // console.log(t.multipleSelection);
      // console.log(codearr);
      let params = {
        barcode: codearr,commodityState:1
      };
      httpreques(
        "post",
        params,
        "/realbrand-management-service/CommodityMgt/ChangeCommodityState"
      ).then((res) => {
        console.log(res);
        if (res.data.code == "SUCCESS") {
          this.$message.success("上架成功!");
        } else {
          this.$message(res.data.msg);
        }
      });
    },
    // 图片预览
    onPre(data){
      this.srcList = []
      let list = `${data.filePath}`
      this.srcList = list.split(',')
    },
    scan() {
      this.isDialog = true;
    },
    onBtn(val){
      if(val === '1') this.isDialog = false;
      if(val === '2') this.getdata()
    },
    //分页
    changeCurrentPage(val) {
      this.pageNum = val;
      this.getdata();
    },
    submitForm(){
      this.getdata()
    },
    resetForm(){
      this.ruleForm = {}
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
        header: '商品列表',
        headerStyle: 'text-align:center;color:#000;width:100%;border:1px #000 solid;',
        // targetStyles: ['border', 'padding: 15px'],
        scanStyles: false,
        style: 'table tr td,th { border-collapse: collapse;padding: 15px;border:1px #000 solid; }' // 表格样式
      })

      div.remove()
    },
    exportExcel() {
      let t = this;
      var tHeader = [
        "商品69编码",
        "商品名称",
        "规格",
        "品牌",
        "生产厂商",
        "商品一级类别",
        "商品二级类别",
        "商品三级类别",
        "单价（元）",
        "图片",
      ];
      var filterVal = [
        "barcode",
        "commodityName",
        "specsParameter",
        "brandName",
        "manufacturer",
        "m",
        "p",
        "b",
        "price",
        "filePath"
      ];

      var filename = "商品列表";
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
    },
    //添加class样式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "warning-row";
      }
      return "";
    },
    formatter(row, column) {
      return row.address;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/reset.scss";
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
</style>
