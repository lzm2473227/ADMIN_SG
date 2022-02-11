<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
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
        <el-table-column label="单品编码" show-overflow-tooltip align="center" sortable width="170">
          <template v-slot="scope">
            <span class="detail-info" @click="edit('2', scope.row)">{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="关联箱码" sortable show-overflow-tooltip align="center" width="170"></el-table-column>
        <el-table-column prop="address" label="产品条形码" sortable show-overflow-tooltip align="center" width="140"></el-table-column>
        <el-table-column prop="warehouseName" show-overflow-tooltip label="产品名称" sortable width="170"></el-table-column>
        <el-table-column prop="contacts" label="产品规格" show-overflow-tooltip align="center" sortable width="150"></el-table-column>
        <el-table-column prop="contactNumber" label="产品品牌" sortable show-overflow-tooltip align="center" width="150"></el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <!-- 品牌弹窗 -->
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>添加品牌</span>
          <img @click="onClose" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body table-main" style="padding: 10px;">
          <form action="">
            <table border="1" class="" style="width: 100%; font-size: 14px;">
              <tr>
                <td class="table-left">仓库编码</td>
                <td class="table-right">
                  <span v-if="ruleForm.code">{{ruleForm.warehouseCode}}</span>
                  <span v-else>系统分配</span>
                </td>
                <td class="table-left">仓库名称</td>
                <td class="table-right">
                  <input v-show="isEdit === '1'" type="text" placeholder="请输入品牌名称 (中文)" v-model="ruleForm.warehouseName" />
                  <span v-show="isEdit === '2'">{{ruleForm.warehouseName}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left">仓库联系人</td>
                <td class="table-right">
                  <input v-show="isEdit === '1'" type="text" placeholder="请输入品牌名称 (英文)" v-model="ruleForm.contacts" />
                  <span v-show="isEdit === '2'">{{ruleForm.contacts}}</span>
                </td>
                <td class="table-left">联系人手机号</td>
                <td class="table-right">
                  <input v-show="isEdit === '1'" type="text" placeholder="请输入备注事项" v-model="ruleForm.contactNumber	" />
                  <span v-show="isEdit === '2'">{{ruleForm.contactNumber}}</span>
                </td>
              </tr>
              <tr>
                <td class="table-left" style="border-left: none;">仓库所在地</td>
                <td class="table-right select-colspan3" colspan="3">
                  <el-cascader
                    v-show="isEdit === '1'"
                    :options="options"
                        v-model="selectedOptions"
                        @change="handleChange"
                        style="width: 100%"
                        placeholder="请选择仓库所在地"
                      >
                      </el-cascader>
                      <span v-show="isEdit === '2'">{{ruleForm.province}}{{ruleForm.city}}{{ruleForm.county}}</span>
                    </td>
                </tr>
                <tr>
                  <td class="table-left" style="border-left: none;">详细地址</td>
                  <td class="table-right" colspan="3">
                      <input v-show="isEdit === '1'" type="text" placeholder="请输入详细地址" v-model="ruleForm.address" />
                      <span v-show="isEdit === '2'">{{ruleForm.address}}</span>
                  </td>
                </tr>
              <tr>
                <td class="table-left">仓库介绍</td>
                <td class="table-right" colspan="3">
                  <textarea
                    class="table-item"
                    placeholder="此段文字是关于经营范围的相关描述"
                    v-model="ruleForm.introduction"
                    v-show="isEdit === '1'"
                  ></textarea>
                  <span v-show="isEdit === '2'">{{ruleForm.introduction}}</span>
                </td>
              </tr>
            </table>
          </form>
        </div>
        <div class="scan-code" v-show="isEdit === '1'">
          <button class="sure" @click="onSure">确定</button>
          <button @click="onClose">取消</button>
        </div>
        <div class="scan-code" v-show="isEdit === '2'">
          <button @click="onClose">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Page from '@/components/pages/index.vue'
import moment from "moment"
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data"
// import {export_json_to_excel} from "@/utils/Export2Excel";
// import confirm from '@/components/Confirm/confirm'

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
      options: regionData,
      selectedOptions: [],
      tabledata: [],
      totalNum: 0,
      filePath:"",
      ruleForm: {
        "address": "",
        "city": "",
        "contactNumber": "",
        "contacts": "",
        "country": "中国",
        "county": "",
        "enterpriseId": "",
        "introduction": "",
        "province": "",
        "warehouseName": "",
        "warehouseCode": ''
      },
      multipleSelection : [],
      srcList: [],
      code: 'NATIONAL_DISTRIBUTOR',
      checkList: [],
      isShowField: false, // 显示字段
      isDialog: false,
      logo: '',
      isEdit: '',
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
       },
        pageNum: this.pageNum,
        pageSize: this.pageSize
      }
      let res = await this.$API.stock.warehouseList(params)
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
            item.address = `${item.province}${item.city}${item.county}${item.address}`
          })
          this.tabledata = data
    },
    async onSure(){
      this.ruleForm.enterpriseId = this.$store.state.user.enterpriseId
      let data = {
        "object": this.ruleForm
      }
      let res = await this.$API.stock.insertWarehouse(data)
      if(res.code === 'SUCCESS'){
        this.$message.success('新增仓库成功')
        this.ruleForm = {}
        this.logo = ''
        this.isDialog = false
        this.getdata()
      }else{
        return false
      }
    },
    del(){
      let warehouseCode = []
      if(this.multipleSelection.length <= 0) return this.$message('请选择一个需要删除的仓库')
      this.multipleSelection.forEach(item => {
        warehouseCode.push(item.warehouseCode)
      })
      var data = {
        "object": {
          "warehouseCode": warehouseCode
        },
      };
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async ()=>{
      let res = await this.$API.stock.deleteWarehouse(data)
      if(res.code === 'SUCCESS'){
        this.$message.success("删除成功");
        this.getdata()
      }else{
        return false
      }
      }) 
    },
    edit(val, data){
      this.isEdit = val
      if(val === '1'){
        if(this.multipleSelection.length != 1) return this.$message('请选择一个需要编辑的仓库')
        this.getBrandInfo(this.multipleSelection[0].id)
      }
      if(val === '2'){
        this.getBrandInfo(data.id)
      }
    },
    getBrandInfo(id){
      this.isDialog = true
      let data = {
        "object": {
          "warehouseId": id
        }
      }
      this.$API.stock.warehouseDetail(data).then(res => {
        if(res.code === 'SUCCESS'){
          this.ruleForm = res.data
          this.selectedOptions = TextToCode[res.data.province][res.data.city][res.data.county].code
        }else{
          return false
        }
      })
    },
    onAddBrand(){
      this.isDialog = true
      this.isEdit = '1'
    },
    onClose(){
      this.logo = ''
      this.ruleForm = {}
      this.selectedOptions = []
      this.isDialog = false
    },
    //选择省市区
    handleChange(value) {
      this.ruleForm.province = CodeToText[value[0]];
      this.ruleForm.city = CodeToText[value[1]];
      this.ruleForm.county = CodeToText[value[2]];
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
    toBackList(){
      this.$router.go(-1)
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
@import "@/styles/image2.scss";
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
.table-main table .table-right{
  width: 248px;
}
</style>
