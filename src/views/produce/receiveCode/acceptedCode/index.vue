<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="printTable('printJS-table')"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
        <div class="print"><img class="icon" src="@/assets/images/status.png" alt=""><span class="axis">查看状态</span></div>
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
        <el-table-column label="单品编码" show-overflow-tooltip align="center" sortable width="180">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd(scope.row)">{{scope.row.commNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联箱码" show-overflow-tooltip align="center" sortable width="180">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd(scope.row)">{{scope.row.boxNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column label="关联垛码" show-overflow-tooltip align="center" sortable width="180">
          <template v-slot="scope">
            <span class="detail-info" @click="onAdd(scope.row)">{{scope.row.stackNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="barcode" label="产品条形码" sortable align="center" width="140"></el-table-column>
        <el-table-column prop="commodityName" show-overflow-tooltip label="产品名称" sortable min-width="180"></el-table-column>
        <el-table-column prop="manufacturer" show-overflow-tooltip label="产品规格" sortable min-width="160"></el-table-column>
        <el-table-column prop="brandName" label="产品品牌" show-overflow-tooltip sortable width="160"></el-table-column>
        <el-table-column prop="productionOrder" label="生产单号" show-overflow-tooltip sortable align="center" width="160"></el-table-column>
        <el-table-column prop="succeedNumber" label="生产批次" show-overflow-tooltip sortable align="center" width="140"></el-table-column>
        <el-table-column prop="manufacturingShop" label="生产车间" show-overflow-tooltip sortable width="160"></el-table-column>
        <el-table-column prop="functionary" label="生产负责人" show-overflow-tooltip sortable align="center" width="110"></el-table-column>
        <!-- <el-table-column prop="state" label="状态" align="center" sortable width="100" >
          <template v-slot="scope">
            <el-tag v-if="scope.row.state === 1" type="success" disable-transitions>生效中</el-tag>
            <el-tag v-if="scope.row.state === 2" type="info" disable-transitions>未生效</el-tag>
            <el-tag v-if="scope.row.state === 3" type="warning" disable-transitions>已过期</el-tag>
          </template>
        </el-table-column> -->
        <el-table-column prop="createTime" label="打码时间" align="center" sortable width="160"></el-table-column>
        <el-table-column label="接收编码批" align="center" sortable width="160">
            <template v-slot="scope">
              <span class="detail-info" @click="onAdd(scope.row.receiveNumber)">查看</span>
            </template>
        </el-table-column>
        <el-table-column prop="receiveTime" label="接收时间" align="center" sortable width="160"></el-table-column>
        <el-table-column label="是否已发送平台" align="center" sortable width="150">
          <template v-slot="scope">
            <span v-show="scope.row.type === 1">是</span>
            <span v-show="scope.row.type === 2">否</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>编码详情</span>
          <img @click="isDialog = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body table-main" style="padding: 10px;">
          <table border="1" class="">
          <tr>
            <td class="table-left table-vertical">码信息</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">编码</td>
                <td class="table-right sub-table-right found-time">
                  <span></span>
                </td>
                <td class="table-left sub-table-left">编码类型</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span></span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">二维码形状</td>
                <td class="table-right sub-table-right found-time">
                  <span></span>
                </td>
                <td class="table-left sub-table-left">二维码长 * 宽</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span> 毫米</span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码内容</td>
                <td class="table-right sub-table-right found-time" style="border-bottom:none;">
                  <span></span>
                </td>
                <td class="table-left sub-table-left" style="border-bottom:none;">二维码网址</td>
                <td class="table-right sub-table-right" style="border-right: none; border-bottom:none;">
                  <span></span>
                </td>
              </tr>
            </td>
          </tr>
          <tr>
            <td class="table-left table-vertical">产品信息</td>
            <td colspan="3">
              <tr>
                <td class="table-left sub-table-left">产品条形码</td>
                <td class="table-right sub-table-right found-time">
                  <span></span>
                </td>
                <td class="table-left sub-table-left">产品名称</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span></span>
                </td>
              </tr>
              <tr>
                <td class="table-left sub-table-left">产品规格</td>
                <td class="table-right sub-table-right found-time">
                  <span></span>
                </td>
                <td class="table-left sub-table-left">产品品牌</td>
                <td class="table-right sub-table-right" style="border-right: none">
                  <span></span>
                </td>
              </tr>
            </td>
          </tr>
        </table>
        </div>
        <div class="scan-code">
            <button @click="isDialog = false">关闭</button>
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
      isDialog: false,
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
      let res = await this.$API.code.backCodeList(params)
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
            item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss")
            item.receiveTime = moment(item.receiveTime).format("YYYY-MM-DD HH:mm:ss")
          })
          this.tabledata = data
    },
    onAdd(data){
      this.$router.push({
        path: "/produce/receiveCode/toBereceivedCodeInfo",
        query: {
          id: data.id,
        },
      })
      this.isDialog = true
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
.dialog-content{
    width: 680px;
    background: #fff;
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
.dialog-content .dialog-body{
  input{
    width: 380px;
    height: 44px;
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 2px;
    outline: none;
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
.table-main table .table-right{
  width: 248px;
}
</style>
