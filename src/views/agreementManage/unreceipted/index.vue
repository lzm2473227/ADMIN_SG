<template>
 <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="onForm"><img class="icon" src="@/assets/images/form.png" alt=""><span class="axis">形成合同</span></div>
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
      show-summary
      style="width: 100%"
      highlight-current-row
      :summary-method="getSummaries"
      @selection-change="handleSelectionChange"
      :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop="equipmentModel" label="合同编号 (拟) " width="160" show-overflow-tooltip align="center" sortable ></el-table-column>
        <el-table-column prop="equipmentModel" label="合同金额 (元) " width="164" align="center" sortable ></el-table-column>
        <el-table-column prop="equipmentName" label="关联订单编号" width="160" show-overflow-tooltip align="center" sortable></el-table-column>
        <el-table-column prop="equipmentSupplier" label="商品数量" width="144" sortable show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="storeName" label="商品内容" sortable show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="address" label="买方" sortable width="162" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="address" label="呈报时间" sortable width="162" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="address" label="呈报人 / 部门" sortable width="162" show-overflow-tooltip align="center"></el-table-column>
        <el-table-column prop="address" label="最后经办人 / 部门" sortable width="162" show-overflow-tooltip align="center"></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="inp-bot search-set">
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
    </div>
  </div>
</template>

<script>
import Page from '@/components/pages/index.vue'
export default {
  name: 'Table2',
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
    }
  },
  components:{
    Page
  },
  methods:{
    onForm(){
      this.$router.push('agreementForm')
    },
    exportExcel(){},
    submitForm(){},
    resetForm(){},
    handleSelectionChange(){},
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
@import '../../../styles/reset.scss';
@import "../../../styles/image3";
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
