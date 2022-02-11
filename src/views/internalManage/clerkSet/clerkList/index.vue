<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="addclerk()" v-show="code === 'NATIONAL_DISTRIBUTOR'">
          <img
            class="icon"
            src="@/assets/images/add.png"
            alt=""
          /><span class="axis">新增职员</span>
        </div>
        <div class="print" @click="editclerk()" v-show="code === 'NATIONAL_DISTRIBUTOR'">
          <img
            class="icon"
            src="@/assets/images/edit.png"
            alt=""
          /><span class="axis">编辑职员</span>
        </div>
        <div class="print" @click="delclerk" v-show="code === 'NATIONAL_DISTRIBUTOR'">
          <img
            class="icon"
            src="@/assets/images/delete.png"
            alt=""
          /><span class="axis">删除职员</span>
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
      </div>
      <div class="right">
        <div class="setup">
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
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column label="身份证号码" align="center" sortable width="200">
          <template v-slot="scope">
            <span class="detail-info" @click="clerkDetail(scope.row)">{{scope.row.idNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" show-overflow-tooltip sortable width="110"></el-table-column>
        <el-table-column
          prop="telNum"
          label="手机号码"
          align="center"
          sortable
          width="160"
        ></el-table-column>
        <!-- <el-table-column
          label="证件照"
          align="center"
          sortable
          width="160"
        >
        <template v-slot="scope">
          <el-image class="preview-img" v-for="url in scope.row.urls" :src="url" :key="url" :preview-src-list="srcList" @click="onPre(scope.row)"></el-image>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="address"
          label="个人住址"
          sortable
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="roleName"
          label="岗位"
          sortable
          width="130"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="deptName"
          label="所属部门"
          sortable
          width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="orgName" label="所属组织" align="center" width="170" show-overflow-tooltip></el-table-column>
        <el-table-column prop="orgName" label="上级组织" align="center" width="170" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot search-set">
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
      <!-- <div class="search-ipt">
        <span class="ipt-left">所属部门</span>
        <select name="" id="" v-model="ruleForm.storeType">
          <option value="店长">店长</option>
          <option value="全国经销商">全国经销商</option>
        </select>
      </div>
      <div class="search-ipt">
        <span class="ipt-left">所属组织</span>
        <select name="" id="" v-model="ruleForm.storeType">
          <option value="店长">店长</option>
          <option value="全国经销商">全国经销商</option>
        </select>
      </div>
      <div class="search-ipt">
        <span class="ipt-left">上级组织</span>
        <select name="" id="" v-model="ruleForm.storeType">
          <option value="店长">店长</option>
          <option value="全国经销商">全国经销商</option>
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
      totalNum: 0,
      multipleSelection: [],
      ruleForm: {
        name: "",
        tel: "",
        station: ""
      },
      srcList: [],
      code: 'NATIONAL_DISTRIBUTOR'
    };
  },
  created() {
    // this.code = this.$store.state.user.currentUser.identities[0].role.code
    this.getdata();
  },
  methods: {
    //店员列表
    async getdata() {
      let len = []
      this.tabledata = []
      let params = {
        "object": {
            "userDetailEntity": {
            //   "address": "string",
            //   "birthday": "2021-08-19T08:24:50.921Z",
            //   "city": "string",
            //   "county": "string",
            //   "education": "string",
            //   "ethnicity": "string",
            //   "frontId": "string",
            //   "gender": "string",
            //   "height": 0,
            //   "hometown": "string",
            //   "id": "string",
            //   "idNumber": "string",
            //   "politicalStatus": "string",
            //   "profession": "string",
            //   "profilePicture": "string",
            //   "province": "string",
            //   "reverseId": "string",
            //   "school": "string",
            //   "telNum": "string",
            //   "userId": "string",
            //   "weight": 0
            },
            "userEntity": {
            //   "id": "string",
            //   "name": "string",
            //   "password": "string",
            //   "userDetailId": "string",
            //   "username": "string"
            }
          },
          pageNum: this.pageNum,
          pageSize: this.pageSize
      }
      let res = await this.$API.orgSet.queryList_User(params)
        console.log(res);
        // if ((res.code === "SUCCESS")) {
          let data = res.data;
          this.total = res.total;
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          data.forEach((item, key) => {
            item.urls = []
            item.index = len[key]
            item.address = item.province + item.city + item.county + item.address
            item.urls = (`${item.frontId},${item.reverseId}`).split(',')
          })
          console.log(data)
          this.tabledata = data
          // this.tabledata.reverse();
        // } else {
        //   this.$message(res.msg);
        // }
    },
    // 查询
    submitForm(){
      this.getdata()
    },
    // 重置
    resetForm(){
      this.ruleForm = {}
    },
    //删除
    delclerk() {
      if(this.multipleSelection.length <= 0) return this.$message.error('请选择需要删除的职员')
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      let list = []
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          list.push(item.uuid);
        }
      )
        httpreques(
          "post",
          {
            list: list,
          },
          "/realbrand-management-service/StoreUserMgt/DeleteStoreUser"
        ).then((result) => {
          console.log(result);
          if (result.data.code === "SUCCESS") {
            this.$message.success("删除员工成功!");
            this.getdata()
            // this.tabledata.splice(index, 1);
          } else {
            this.$message.error("删除员工失败");
          }
        })
      })
    },
    // 证件预览
    onPre(data){
      this.srcList = []
      let list = `${data.frontId},${data.reverseId}`
      this.srcList = list.split(',')
    },
    addclerk() {
      this.$router.push({path: "/internalManage/clerkSet/clerkInfo",})
    },
    //编辑
    editclerk() {
      if(this.multipleSelection.length != 1) return this.$message('请选择一项数据进行编辑')
      let id = this.multipleSelection[0].id
      console.log(this.multipleSelection)
      this.$router.push({
        path: "/internalManage/clerkSet/clerkInfo",
        query: { id: id },
      })
    },
    clerkDetail(data){
      this.$router.push({
        path: "/internalManage/clerkSet/clerkInfo",
        query: { id: data.id },
      })
    },
    changeCurrentPage(val) {
      this.pageNum = val;
      this.getdata();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
.search-set{
  padding-top: 22px;
}
.search-btn button{
  margin-top: 10px;
}
</style>
