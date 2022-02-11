<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addclerk()">
          <img
            class="icon"
            src="@/assets/images/add.png"
            alt=""
          /><span class="axis">新增模板</span>
        </div>
        <div class="print" @click="getDelTemplate()">
          <img
            class="icon"
            src="@/assets/images/delete.png"
            alt=""
          /><span class="axis">删除模板</span>
        </div>
        <div class="print" @click="printTable('printJS-table')">
          <img
            class="icon"
            src="@/assets/images/print.png"
            alt=""
          /><span class="axis">打印列表</span>
        </div>
        <div class="print" @click="exportExcel">
          <img
            class="icon"
            src="@/assets/images/derive.png"
            alt=""
          /><span class="axis">导出表格</span>
        </div>
        <div class="print"><img class="icon" src="@/assets/images/ziduan.png" alt=""><span class="axis">显示字段</span></div>
      </div>
      <div class="right">
        <div class="setup">
        </div>
      </div>
    </div>
    <div class="tab-body inside-table">
      <el-table
        id="printJS-table"
        ref="singleTable"
        :data="tabledata1"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column label="模板编号" align="center" sortable width="340">
          <template v-slot="scope">
            <span class="detail-info" @click="clerkDetail(scope.row)">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="templateName" label="模板名称" width="756" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="reportName" label="创建人姓名" align="center" sortable width="120"></el-table-column>
        <el-table-column prop="reporterDept" label="所属部门" sortable width="170" show-overflow-tooltip></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="180" align="center" sortable show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <!-- <div class="inp-bot search-set">
      <div class="search-ipt">
        <span class="ipt-left">姓名</span>
        <input type="text" placeholder="请输入姓名" v-model="ruleForm.name">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">手机号码</span>
        <input type="text" placeholder="请输入手机号码" v-model="ruleForm.equipmentModel">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">岗位</span>
        <input type="text" placeholder="请输入岗位" v-model="ruleForm.storeName">
      </div>
      <div class="search-btn">
        <button @click="submitForm">查询</button>
        <button type="button" @click="resetForm()" class="reset-btn">重置</button>
      </div>
    </div> -->
  </div>
</template>

<script>
import Page from '@/components/pages/index.vue'
import moment from 'moment'
// import { export_json_to_excel } from "@/utils/Export2Excel";


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
      tabs: ["当日", "当周", "当月"],
      active: 0,
      radio1: "按商品69编码统计",
      textarea: "",
      tabledata: [],
      tabledata1: [],
      totalNum: 0,
      multipleSelection: [],
      ruleForm: {
        name: "",
        equipmentModel: "",
        storeName: "",
        id:[],
      },
      srcList: [],
      code: 'NATIONAL_DISTRIBUTOR'
    };
  },
  mounted() {
    this.getdata();
  },
  methods: {
    //模板列表
   async getdata(){
      let len = []
      let data = {
        "object": {},
        "pageNum": this.pageNum,
        "pageSize": this.pageSize,
      }
      let res = await this.$API.OA.templateList(data)
      this.total = res.total;
      let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
        return index+1;
      })
      arr = arr.reverse()
      len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize)
      this.tabledata1 = res.data
      res.data.forEach((item,index)=>{
        item.index = len[index]
        item.index = this.formatInt(item.index,3)
        item.updateTime = moment(item.updateTime).format("YYYY-MM-DD HH:mm:ss");
        item.reporterDept = this.$store.state.user.deptName
      })
    },
    formatInt(number,len) {
      var mask = "";
      var returnVal = "";
      for(var i=0;i<len;i++) mask+="0";
      returnVal = mask + number;
      returnVal = returnVal.substr(returnVal.length-len,len);
      return returnVal;
    },
    // 查询
    submitForm(){
      this.getdata()
    },
    // 重置
    resetForm(){
      this.ruleForm = {}
    },
    //删除模板
    getDelTemplate(){
      this.multipleSelection.forEach((item,index)=>{
        this.ruleForm.id.push(item.id)
      })
      // console.log(this.ruleForm.id);
      let data = {
        'object':{
          'id':this.ruleForm.id
        }
      }
      this.$API.OA.delTemplate(data)
      this.getdata()
    },
    // 证件预览
    onPre(data){
      this.srcList = []
      let list = `${data.frontId},${data.reverseId}`
      this.srcList = list.split(',')
    },
    addclerk() {
      this.$router.push({path: "AddFileModule",})
    },
    //详情
    clerkDetail(data){  
      this.$router.push({
        path: "/internalManage/fileModuleSet/AddFileModule",
        query: {
          id: data.id,
        },
      });
    },
    changeCurrentPage(val) {
      this.pageNum = val;
      // console.log(val);
      this.getdata();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    formatter(row, column) {
      return row.address;
    },
    handleCurrentChange(val) {
      this.currentRow = val;
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
        header: '门店列表',
        headerStyle: 'text-align:center;color:#000;width:100%;border:1px #000 solid;',
        // targetStyles: ['border', 'padding: 15px'],
        scanStyles: false,
        style: 'table tr td,th { border-collapse: collapse;padding: 15px;border:1px #000 solid; }' // 表格样式
      })

      div.remove()
    },
    exportExcel() {
      //将对应的属性名转换成中文
      const tHeader = [
        '身份证号码', 
        '姓名', 
        '手机号码', 
        '证件照',
        '个人住址',
        '所属门店',
        '角色',
        '所在市',
        '所在省'
      ];
      //table表格中对应的属性名
      const filterVal = [
        'idNumber', 
        'name', 
        'telNum', 
        'urls', 
        'address', 
        'storeName',
        'station',
        'city',
        'province'
      ];
      const filename = "职员列表"
      const list = this.tabledata;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel({header: tHeader, data, filename})
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/styles/reset.scss";
@import "@/styles/image3.scss";
/deep/.inside-table .el-table .el-table__header th{
  padding: 5px 0;
}
/deep/.inside-table .el-table .el-table__body td{
  padding: 2px 0;
}

</style>
