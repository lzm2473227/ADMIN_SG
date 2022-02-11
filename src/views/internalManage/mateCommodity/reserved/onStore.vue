<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="printTable('printJS-table')"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
        <div class="show-field">
        <div class="print isshow-set" @mouseover="mouseOver"><img class="icon" src="@/assets/images/ziduan.png" alt=""><span class="axis">显示字段</span></div>
          <el-checkbox-group v-model="checkList" class="check-field" @mouseleave="mouseLeave" v-show="isShowField">
            <el-checkbox label="1">平台类目</el-checkbox>
            <el-checkbox label="2">公司内部类目</el-checkbox>
            <el-checkbox label="3">普通零售价</el-checkbox>
            <el-checkbox label="4">普通批发价</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <div class="right">
        <div class="setup">
          <!-- <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup"> -->
        </div>
      </div>
    </div>
    <div class="tab-body inside-table">
      <div class="table-top">
        <p>店铺编码：<span @click="toStoreDetail">{{storeCode}}</span></p>
        <p>店铺名称：{{storeName}}<span class="choose-store" @click="onChoose">选择店铺</span></p>
      </div>
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
        <el-table-column label="商品条形码" show-overflow-tooltip align="center" sortable width="170">
          <template v-slot="scope">
            <span class="detail-info" @click="addMachine('2', scope.row)">{{scope.row.barcode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" show-overflow-tooltip label="商品名称" align="center" sortable width="200"></el-table-column>
        <el-table-column prop="specsParameter" label="规格" show-overflow-tooltip sortable width="150"></el-table-column>
        <el-table-column prop="brandName" label="品牌" sortable width="130" show-overflow-tooltip></el-table-column>
        <el-table-column prop="ceView" label="平台类目" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="enView" label="公司内部类目" sortable show-overflow-tooltip></el-table-column>
        <el-table-column prop="retailPrice" label="普通零售价(元)" align="center"  sortable width="160" ></el-table-column>
        <!-- <el-table-column prop="state" label="状态" align="center"  sortable width="100" >
          <template v-slot="scope">
            <el-tag v-if="scope.row.state === 0" type="success" disable-transitions>正常</el-tag>
            <el-tag v-if="scope.row.state === 1" type="danger" disable-transitions>异常</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="tradePrice" label="普通批发价(元)" align="center"  sortable width="150" ></el-table-column>
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
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content" style="width: 620px">
        <div class="dialog-top">
          <span>选择店铺</span>
          <img @click="onClose" src="@/assets/images/close.png" alt="">
        </div>
        <div class="table-main">
          <!-- 店铺列表 -->
          <el-table
            id="printJS-table"
            ref="singleTable"
            :data="storeData"
            style="width: 100%; padding: 8px;"
            highlight-current-row
            @selection-change="handleSelectionChange2"
            :default-sort="{ prop: 'date', order: 'descending' }"
          >
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="index" label="序号" align="center" width="80"></el-table-column>
            <el-table-column prop="storeCode" label="店铺编码" align="center" width="140"></el-table-column>
            <el-table-column prop="storeName" label="店铺名称" align="center"></el-table-column>
            <el-table-column prop="storeIntroduce" label="店铺介绍" show-overflow-tooltip></el-table-column>
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
import moment from "moment"
import Page from '@/components/pages/index.vue'
// import httpreques from '../../utils/httpreques';
// import moment from "moment";
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
      storeData: [],
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
      multipleSelection1: [],
      srcList: [],
      code: 'NATIONAL_DISTRIBUTOR',
      checkList: [],
      isDialog: false,
      storeCode: '',
      storeName: '',
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
      this.storeCode = this.$route.query.storeCode
      this.storeName = this.$route.query.storeName
      let id = this.$store.state.user.enterpriseId
      let len = []
      this.tabledata = []
      let params = {
       "object": {
         "enterpriseId": id,
          "storeCode": this.storeCode
       },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await this.$API.storeInfo.matchCommodityList(params)
          let data = res.data;
          this.total = res.total;
          let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
            return index+1;
          })
          arr = arr.reverse()
          len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
          data.forEach((item, key) => {
            item.index = len[key]
            if(item.storeName) item.storeName = item.storeName.join('、')
          })
          this.tabledata = data
    },
    async onChoose(){
      this.isDialog = true
      let id = this.$store.state.user.enterpriseId
      let params = {
        "object": {
          "enterpriseId": id
        },
        "pageNum": this.pageNum,
        "pageSize": this.pageSize
      }
      let res = await this.$API.storeInfo.publishedStoreList(params)
      this.storeData = res.data
    },
    async onSure(){
      if(this.multipleSelection1.length <= 0) return this.$message.error('请选择店铺')
      this.$router.replace({
        path: "/internalManage/mateCommodity/onStore",
        query: {
          storeCode: this.multipleSelection1[0].storeCode,
          storeName: this.multipleSelection1[0].storeName,
          storeId: this.multipleSelection1[0].storeId,
        }
      })
      this.onClose()
      this.getdata()
    },
    onClose(){
      this.isDialog = false
      this.storeData = []
    },
    toStoreDetail(){
      this.$router.replace({
        path: "/internalManage/storeInfo/publishedStoreDetailInfo",
        query: {
          storeId: this.$route.query.storeId,
        }
      })
    },
    // 新增机具
    addMachine(val, data) {
      if(val){
        let meid = ''
        if(data){
          meid = data.meid
        }else{
          if(this.multipleSelection.length != 1) return this.$message('请选择一项需要编辑的机具')
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
    toBackList() {
      this.$router.go(-1);
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
    handleSelectionChange2(val){
      this.multipleSelection1 = val
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
.table-top{
  display: flex;
  font-size: 14px;
  margin-bottom: 8px;
  color: #666;
  p{
    margin-right: 40px;
  }
  span{
    display: inline-block;
    padding: 5px 10px;
    color: #0f83f0;
    cursor: pointer;
  }
}
.dialog-top{
  span{
    font-size: 16px;
    letter-spacing: 1px;
  }
  img{
    cursor: pointer;
  }
}
.scan-code{
  text-align: center;
  background: #F8F8F8;
  padding: 18px 0;
  button{
    height: 36px;
    padding: 0 20px;
    background: #FAFCFE;
    border: 1px solid #BBCBDF;
    border-radius: 2px;
    color: #333;
    outline: none;
    cursor: pointer;
  }
  .sure{
    margin-right: 20px;
    background: #438AFE;
    border: 1px solid #438AFE;
    color: #fff;
  }
}
.pay-dialog{
  z-index: 1999;
}
.pay-dialog .dialog-content .dialog-body input{
  width: 70px;
  height: 26px;
  padding: 5px;
}
/deep/.el-table td, .pay-dialog .el-table th{
  padding: 6px 0;
}
.choose-commodity{
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  padding: 5px 10px;
  background: #eee;
  cursor: pointer;
}
</style>
