<template>
 <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="cancel"><img class="icon" src="@/assets/images/back-commodity.png" alt=""><span class="axis">撤回表单</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
        <div class="print"><img class="icon" src="@/assets/images/zhuangtai.png" alt=""><span class="axis">查看状态</span></div>
        <div class="print"><img class="icon" src="@/assets/images/ziduan.png" alt=""><span class="axis">显示字段</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="tab-body inside-table">
      <el-table
        id="printJS-table"
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
        <el-table-column label="公文编号" align="center" sortable width="200">
          <template v-slot="scope">
            <span class="detail-info" @click="doneDetail(scope.row)">{{scope.row.documentNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="公文标题" width="746" show-overflow-tooltip sortable></el-table-column>
        <el-table-column prop="reportTime" label="呈报时间" align="center" sortable width="180"></el-table-column>
        <el-table-column prop="limitTime" label="办文时限" align="center" sortable width="180" show-overflow-tooltip></el-table-column>
        <el-table-column prop="reporter" label="公文呈报人" align="center" sortable width="120" show-overflow-tooltip></el-table-column>
        <el-table-column prop="deptName" label="最后经办人" sortable width="140" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <!-- <div class="inp-bot search-set">
      <div class="search-ipt search-select">
        <select v-model="name">
          <option value="1">商品名称</option>
          <option value="2">商品69码</option>
        </select>
        <input v-if="name === '1'" type="text" placeholder="请输入商品名称" v-model="ruleForm.commodityName">
        <input v-else type="text" placeholder="请输入或扫描商品69码" v-model="ruleForm.commodityName">
        <img v-show="name === '2'" @click="scan('2')" src="@/assets/images/ic-code.png" alt="">
      </div>
      <div class="search-ipt">
        <span class="ipt-left">商品品牌</span>
        <input type="text" placeholder="请输入商品品牌" v-model="ruleForm.brand">
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
import moment  from 'moment'
export default {
  name: 'Table1',
  data(){
    return{
      tabledata:[],
      total:0,
      pageSize: 20,
      pageNum: 1,
      name:"1",
      ruleForm: {
        commodityName:"",
        brand:"",
      },
      multipleSelection:[],
       
    }
  },
  components:{
    Page
  },
  mounted(){
    this.getdata()
  },
  methods:{
    // 撤回
    async cancel(){
      let documentNumber = this.multipleSelection[0].documentNumber
      let data = {
        object:{
          document_id:documentNumber
        } 
      }
      let res = await this.$API.OA.getCancel(data)
      console.log(res);
    },
    //列表
     async getdata() {
      let len = []
      this.tabledata = []
      let params = {
       "object": {
          "state": 1,
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
            item.reportTime = moment(item.reportTime).format("YYYY-MM-DD HH:mm:ss");
            item.limitTime = moment(item.limitTime).format("YYYY-MM-DD HH:mm:ss");
            item.reporter = this.$store.state.user.name
          })
          this.tabledata = data
    },
    doneDetail(data){
      this.$router.push({
        path: "particular",
        query: {
          id: data.id,
        },
      });
    },
    exportExcel(){},
    submitForm(){},
    resetForm(){},
    //获取表格的所有值
    handleSelectionChange(val){
      this.multipleSelection = val
      console.log(this.multipleSelection);
    },  
    onPre(){},
    changeCurrentPage(){},
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总计';
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += ' 元';
        } else {
          sums[index] = 'N/A';
        }
      });

      return sums;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../styles/reset.scss';
@import "../../../../styles/image1";
/deep/.inside-table .el-table .el-table__header th{
  padding: 5px 0;
}
/deep/.inside-table .el-table .el-table__body td{
  padding: 2px 0;
}
</style>
