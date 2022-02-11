<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addStore" v-show="code === 'NATIONAL_DISTRIBUTOR'"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">新增部门</span></div>
        <div class="print" @click="editstore()" v-show="code === 'NATIONAL_DISTRIBUTOR'"><img class="icon" src="@/assets/images/edit.png" alt=""><span class="axis">编辑部门</span></div>
        <div class="print" @click="delstore" v-show="code === 'NATIONAL_DISTRIBUTOR'"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">删除部门</span></div>
        <div class="print" @click="printTable('printJS-table')"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
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
        <el-table-column label="部门内部编码" align="center" sortable width="200">
          <template v-slot="scope">
            <span class="detail-info" @click="editstore(scope.row)">{{scope.row.privateCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orgName" label="所属组织" align="center" sortable width="150" show-overflow-tooltip></el-table-column>
        <el-table-column prop="name" label="部门名称" sortable width="220" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="部门地址" sortable show-overflow-tooltip></el-table-column>
        <!-- <el-table-column prop="city" label="部门营业时间" align="center" sortable width="180"></el-table-column> -->
        <el-table-column prop="remark" label="部门介绍" align="center" sortable></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot search-set">
      <div class="search-ipt">
        <span class="ipt-left">部门名称</span>
        <input type="text" placeholder="请输入部门名称" v-model="ruleForm.storeName">
      </div>
      <!-- <div class="search-ipt">
        <span class="ipt-left">门店类型</span>
        <select name="" id="" v-model="ruleForm.storeType">
          <option value="直营店">直营店</option>
          <option value="加盟店">加盟店</option>
        </select>
      </div> -->
      <div class="search-btn">
        <button @click="submitForm">查询</button>
        <button @click="resetForm" class="reset-btn">重置</button>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '@/components/pages/index.vue'
// import httpreques from '../../utils/httpreques';
// import {export_json_to_excel} from "@/utils/Export2Excel";
// import printJS from 'print-js'
import { queryList_Dept } from '@/api/orgSet'
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
      dialogImageUrl:"",
      ruleForm: {
          storeName: '',
          storeType: ''
      },
      multipleSelection: [],
      srcList: [],
      code: 'NATIONAL_DISTRIBUTOR',
      
    };
  },
  created() {
    this.getdata()
  },
  methods: {
    async getdata(){
      let t = this;
      let len = []
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
      };
      this.tabledata = []
      await queryList_Dept(params).then(res => {
        // console.log(res);
        if (res.code === "SUCCESS") {
          t.total= res.total;
          let arr=new Array(res.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          res.data.forEach((item,key) => {
            item.urls = []
            item.index = len[key]; //加入index
            let address = item.province + item.city + item.district;
            item.address = address + item.address;
            item.urls = (`${item.storeLicence},${item.businessLicense}`).split(',')
          });
          t.tabledata = res.data;
          // t.tabledata.reverse()
        } else {
          this.$message(res.msg)
        }
      });
    },
    delstore() {
      if(this.multipleSelection.length <= 0) return this.$message.error({message: '请选择需要删除的门店'})
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let t = this;
        let id = []
        _.forEach(
          JSON.parse(JSON.stringify(this.multipleSelection)),
          function (item, key) {
            id.push(item.id);
          }
        )
        let params = {
          "object": {
            "ids": id
          }
        };
        this.$API.orgSet.batchDelete_Dept(params).then((res) => {
        // httpreques("post", params, "/org-server/Dept/batchDelete").then((res) => {
          if (res.data.code === "SUCCESS") {
            t.$message.success("删除成功")
            t.getdata()
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        });
      })
    },
    editstore(data) {
      let id = ''
      if(data){
        id = data.id
      }else{
        if(this.multipleSelection.length != 1) return this.$message('请选择一个需要编辑的门店')
        id = this.multipleSelection[0].id
      }
      // console.log(data);
      this.$router.push({
        path: "/internalManage/orgSet/departmentInfo",
        query: {
          id: id,
        },
      });
    },
    // 证件预览
    onPre(data){
      this.srcList = []
      let list = `${data.storeLicence},${data.businessLicense},${data.profilePicture}`
      this.srcList = list.split(',')
    },
    // 搜索
    submitForm(){
      this.getdata()
    },
    // 重置
    resetForm(){
      this.ruleForm = {}
    },
    addStore() {
      this.$router.push({ path: "/internalManage/orgSet/departmentInfo" });
    },
    changeCurrentPage(val){
      this.pageNum = val
      this.getdata()
    },
    handleSelectionChange(val){
      this.multipleSelection = val
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
        header: '门店列表',
        headerStyle: 'text-align:center;color:#000;width:100%;border:1px #000 solid;',
        // targetStyles: ['border', 'padding: 15px'],
        scanStyles: false,
        style: 'table tr td,th { border-collapse: collapse;padding: 15px;border:1px #000 solid; }' // 表格样式
      })

      div.remove()
    },
    // 导出表格
    exportExcel() {
      //将对应的属性名转换成中文
      const tHeader = [
        '门店机构代码',
        '门店名称',
        '门店地址',
        '门店类别',
        '证件照',
        '所在市',
        '所在省',
        '对公账户'
      ];
      //table表格中对应的属性名
      const filterVal = [
        'orgCode',
        'storeName',
        'address',
        'storeType',
        'urls',
        'city',
        'province',
        'num'
      ];
      const filename = "门店列表"
      const list = this.tabledata;
      const data = this.formatJson(filterVal, list);
      export_json_to_excel({header: tHeader, data, filename})
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => {
        return filterVal.map(j => {
          return v[j]
        })
      })
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/reset.scss';
@import "@/styles/image1.scss";
/deep/.inside-table .el-table .el-table__header th{
  padding: 5px 0;
}
/deep/.inside-table .el-table .el-table__body td{
  padding: 2px 0;
}
</style>
