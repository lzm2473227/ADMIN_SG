<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="dialogtrue()"><img class="icon" src="@/assets/images/add.png" alt=""><span class="axis">添加类别</span></div>
        <div class="print" @click="edit" ><img class="icon" src="@/assets/images/edit.png" alt=""><span class="axis">编辑类别</span></div>
        <div class="print" @click="del()"><img class="icon" src="@/assets/images/delete.png" alt=""><span class="axis">删除类别</span></div>
        <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div>
        <div class="print"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
      </div>
      <div class="right">
        <div class="setup">
          <!-- <img class="set" src="@/assets/images/ic-设置.png" alt="系统设置" @click="setup"> -->
        </div>
      </div>
    </div>
    <div class="tab-body inside-table">
      <el-table
        ref="multipleTable2"
        :data="tabledata"
        style="width: 100%"
        highlight-current-row
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'date', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
        <el-table-column prop=bid label="类别编号" align="center" sortable width="190"></el-table-column>
        <el-table-column prop="m" label="商品一级类别" sortable></el-table-column>
        <el-table-column prop="p" label="商品二级类别" sortable></el-table-column>
        <el-table-column prop="b" label="商品三级类别" sortable show-overflow-tooltip></el-table-column>
        <el-table-column label="商品三级分类图片" align="center" sortable width="160">
          <template v-slot="scope">
            <el-image class="preview-img" style="height: 20px" :src="scope.row.bimage" @click="onPre(scope.row)"></el-image>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bot">
      <Page :total="total" :current="pageNum" :pageSize="pageSize" @changeCurrentPage="changeCurrentPage"></Page>
    </div>
    <!-- <div class="inp-bot search-set">
      <div class="search-ipt">
        <span class="ipt-left">类别名称</span>
        <input type="text" placeholder="请输入类别名称" v-model="ruleForm.like">
      </div>
      <div class="search-btn">
        <button>查询</button>
        <button class="reset-btn">重置</button>
      </div>
    </div> -->
    <el-dialog
      :title='msg'
      :visible.sync="centerDialogVisible"
      width="50%"
      center
      :close-on-click-modal="false"
    >
    <el-form :model="ruleForm">
      <el-form-item label="上级类别：" style="display:flex;align-items:center;">
        <el-cascader
        :options="categoriesCatalog"
        :props="setKesLabel"
        clearable
        :disabled = 'ruleForm.bid ? true : false'
        v-model="value"
        @change="handleChange"
        ref="demoCascader"
        >
        </el-cascader>
      </el-form-item>
      <el-form-item label="类别名称：" style="display:flex">
        <el-input v-model="ruleForm.sortName" placeholder="请选择类别名称" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="类别图片：" v-if="ruleForm.rank==2 || ruleForm.rank==3 || ruleForm.bid" style="display:flex">
        <el-upload
        action="http://14.29.162.130:6602/image/imageUpload"
        list-type="picture-card"
        :file-list="fileList"
        :on-success="handleAvatarSuccess"
        >
        <template #default >
          <div  class="imgs-title">
            <!-- <img v-if="ruleForm.bid" :src="ruleForm.bimage" style="width:100%;height:100%"> -->
            <i  class="el-icon-plus"></i>
          </div>
        </template>         
      </el-upload>
      </el-form-item>
    </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="add"
          >确 定</el-button
        >
        <el-button @click="centerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
</div>
</template>
<script>
import Page from '@/components/pages/index.vue'
export default {
  name: "commodity1",
  data() {
    return {
      total: 0,
      pageSize: 20,
      pageNum: 1,
      centerDialogVisible: false,  //弹出框开关
      centerDialogVisible2: true,  //弹出框开关
      textarea: "",
      tabledata: [],   //列表数据
      categoriesCatalog:[],//三级目录
      setKesLabel:{
              value:'categoryName',
              label:'categoryName',
              children:'subItemList',
              checkStrictly: true,
      },//自定义  级联选择器value label
      value: [],    /* 选中的标签 */
      // total: "",
      fileList:[],
      ruleForm: {
        commodityName: "",
        price: "",
        sort:"",
        sortName:"",
        b:"",
        bid:"",
        pid:"",
        mid:"",
        categoryId: "0",
        like: '',
        rank:"",   //三级目录标识
        bimage:"",   //三级目录图片
        
      },
      multipleSelection:[],
      imgArr:[],
      fenlei:[],
      code: 'NATIONAL_DISTRIBUTOR',
      msg:""
    };
  },
  components: {
    Page
  },
  mounted(){
    this.getdata()
    this.threedirectories()
    // this.handleSelectionChange()
  },
  methods:{
    submitForm(){},
    barcode(){},
    dialogtrue(){
      this.centerDialogVisible = true
      this.msg = "添加类别" 
    },
    edit(){    
      this.msg = "编辑类别" 
      if(this.multipleSelection.length != 1) return this.$message('请选择一个需要编辑的商品')  
      this.centerDialogVisible = true
      console.log(this.multipleSelection);
      this.ruleForm.bimage = this.multipleSelection[0].bimage
      this.ruleForm.bid = this.multipleSelection[0].bid
      this.ruleForm.pid = this.multipleSelection[0].pid
      this.ruleForm.mid = this.multipleSelection[0].mid
      this.ruleForm.sortName = this.multipleSelection[0].b
      // this.ruleForm.rank = this.multipleSelection[0].b
    },
    //联动触发事件
    handleChange(){
      const obj = this.$refs['demoCascader'].getCheckedNodes()
      // console.log(obj[0].data)  // 打印出当前选择的value所对应的对象
      // console.log(obj[0].data.categoryId)  
      this.ruleForm.categoryId = obj[0].data.categoryId
      this.ruleForm.rank = obj[0].data.rank
      this.ruleForm.sortName = obj[0].data.b
      this.ruleForm.bid = obj[0].data.bid
      this.ruleForm.pid = obj[0].data.pid
      this.ruleForm.mid = obj[0].data.mid
      // console.log(this.ruleForm.categoryId);
      console.log(obj[0].data);
    },
    //获取表格的所有值
    handleSelectionChange(val){
      this.multipleSelection = val
      console.log(val);
    },  
     del(){
      let id = []
      let ip = []
      let im = []
      let t = this
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          id.push(item.bid);
        }
      )
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          ip.push(item.pid);
        }
      )
      _.forEach(
        JSON.parse(JSON.stringify(this.multipleSelection)),
        function (item, key) {
          im.push(item.mid);
        }
      )
      id = id.toString()
      ip = ip.toString()
      im = im.toString()
      this.id = id ? id : ip ?ip : im;
      if(!this.id) return this.$message('请选择要删除的分类')
      var data = {
        "object": {
          id: id ? id : ip ?ip : im,
        },
      };
      this.$confirm('此操作将永久删除数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then( async ()=>{
      let res = await this.$API.code.deleteClassify(data)
      if(res.code !== 'SUCCESS') return false
      this.$message.success("删除成功");
      this.getdata()
      }) 
    },
    async getdata() {
      let data = {       
      "object": {
      },
      "pageNum": this.pageNum,
      "pageSize": this.pageSize
      }
      let res = await this.$API.code.catalog(data)
      if(res.code !== 'SUCCESS') return false
      let len = []
      this.total = res.total;
      // 序号倒序排列
      let arr=new Array(this.total).join(',').split(',').map((item,index)=>{
        return index+1;
      })
      arr = arr.reverse()
      len = arr.slice((this.pageNum-1)*this.pageSize, this.pageNum*this.pageSize) // 获取数组最后 20 个元素
      _.forEach(res.data, function (item, key) {
        item.index = len[key]
      });
      this.tabledata = res.data;
    },
    // 新增分类
    async add() {
      if(!this.ruleForm.bid){
        if(!this.ruleForm.sortName) return this.$message('分类名字不能为空')
        let data = {
          "object": {
            categoryName: this.ruleForm.sortName, //分类名字
            categoryId: this.ruleForm.categoryId,
            categoryImage:this.ruleForm.bimage,
          }
        }
        let res = await this.$API.code.insertClassify(data)
        if(res.code !== 'SUCCESS') return false
        this.$message.success("添加成功");
        this.centerDialogVisible = false
      }
      if(this.ruleForm.bid){
        console.log(222);
        let data = {
          "object": {
            name: this.ruleForm.sortName, //分类名字
            id:this.ruleForm.bid,   //活动id
            url: this.ruleForm.bimage, //分类图片
          }
        }
        let res = await this.$API.code.updateClassify(data)
        if(res.code !== 'SUCCESS') return false
        this.$message.success("编辑成功");
        this.centerDialogVisible = false
      }
      this.getdata()
    },
    //三级目录
    async threedirectories() {
      let data = {       
      "object": {},
      }
      let res = await this.$API.code.queryCategoriesCatalog(data)
      console.log(res);
      this.categoriesCatalog = res.data.categoriesCatalog;
      console.log(this.categoriesCatalog);
      // this.getTreeData(this.categoriesCatalog)  //处理空白的bug
    },
    //解决出现空白选项的bug
    getTreeData(data){
        // 循环遍历json数据
        for(var i=0;i<data.length;i++){
            if(data[i].subItemList== "null"||data[i].subItemList.length<1){
                // children若为空数组，则将children设为undefined
                data[i].subItemList=undefined;
            }else {
                // children若不为空数组，则继续 递归调用 本方法
                this.getTreeData(data[i].subItemList);
            }
        }
        return data;
    },
    handleAvatarSuccess(res, file) {
        this.dialogImageUrl = res.data;
        this.ruleForm.bimage = res.data;
    },
    //分页
    changeCurrentPage(val) {
      this.pageNum = val;
      this.getdata();
    // },
    // onPre(data){
    //   this.srcList = []
    //   let list = `${data.image}`
    //   this.srcList = list.split(',')
    },
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/reset.scss';
@import "@/styles/image1.scss";
/deep/.el-form-item--small .el-form-item__content{
 margin-left: 0;
}
/deep/.inside-table .el-table .el-table__header th{
  padding: 5px 0;
}
/deep/.inside-table .el-table .el-table__body td{
  padding: 2px 0;
}
/deep/.dialog-footer button{
  width: 100px;
  height: 40px;
  background: #438AFE;
  opacity: 1;
  border-radius: 2px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #FFFFFF;
}
/deep/.dialog-footer button:last-of-type{
  width: 100px;
  height: 40px;
  background: #FAFCFE;
  border: 1px solid #BBCBDF;
  opacity: 1;
  border-radius: 2px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #333333;
}
/deep/.el-form-item__label{
  height: 21px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #666666;
  opacity: 1;
}
/deep/.el-input__inner{
  width: 420px;
  height: 40px;
  background: #FFFFFF;
  border: 1px solid #DDDDDD;
  opacity: 1;
  border-radius: 2px;
}
/deep/.el-form-item{
  margin-top: 16px;
}
/deep/.el-dialog--center .el-dialog__body {
    text-align: initial;
    padding: 25px 25px 10px;
}
.imgs-title{
  width: 150px;
  height: 150px;
}
</style>
