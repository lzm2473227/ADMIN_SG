<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <!-- <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""><span class="axis">返回列表</span></div>
        <div class="print" @click="addMachine()"><img class="icon" src="@/assets/images/save.png" alt=""><span class="axis">保存内容</span></div> -->
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt=""><span class="axis">打印列表</span></div>
        <div class="print" @click="exportExcel"><img class="icon" src="@/assets/images/derive.png" alt=""><span class="axis">导出表格</span></div> -->
      </div>
      <div class="right">
        <!-- <div class="setup">
          <img class="set" src="../../assets/images/ic-设置.png" alt="系统设置" @click="setup">
        </div> -->
      </div>
    </div>
    <div class="table-main">
      <div class="table-title">
        <p>编辑角色</p>
      </div>
      <span @click="onAddMenu" style="display: inline-block;padding: 10px 20px; background: #4E83FF; color: #fff; margin: 20px; cursor: pointer;">新增一级菜单</span>
      <div class="editrole">
        <el-tree
        :props="{ value: 'code', label: 'name', children: 'subList' }"
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false">
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a
              @click="append(data)">
              添加
            </a>
            <a
              @click="remove(node, data)">
              删除
            </a>
          </span>
        </span>
      </template>
    </el-tree>
      </div>
    </div>
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>新增角色</span>
          <img @click="isDialog = false" src="@/assets/images/close.png" alt="">
        </div>
          <div class="check1">
            <input type="text" placeholder="请输入名称" v-model="name">
            <input type="text" placeholder="请输入code" v-model="code">
            <input type="text" placeholder="请输入urlPath" v-model="urlPath">
            <select name="" id="" v-model="resourceAuthLevel">
              <option value="AUTHORIZATION_REQUIRED">需要授权</option>
              <option value="IDENTITY_REQUIRED">需要身份</option>
              <option value="LOGIN_REQUIRED">需要登录</option>
              <option value="PUBLIC">公开</option>
            </select>
          </div>
        <div class="scan-code">
            <button class="sure" @click="onSure">确定</button>
            <button @click="isDialog = false">取消</button>
          </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
let id = 1000;
export default {
  name: "Newproduct",
  data() {
      return {
        data: [],
        isDialog: false,
        resourceAuthLevel: '',
        val: '',
        name: '',
        code: '',
        urlPath:''
      }
  },
  mounted() {
    // this.StoreNameList()
    this.getdata()
  },
  methods: {
    append(data) {
      this.isDialog = true
      this.roleData = data
    },
    onAddMenu(){
      this.isDialog = true
      this.val = '1'
    },
    onSure(){
      if(this.val === '1'){
        let params = {
          "object": {
            "code": this.code,
            "id": "",
            "name": this.name,
            "parentId": '',
            "resourceAuthLevel": this.resourceAuthLevel,
            "urlPath": this.urlPath
          }
        }
        this.$API.resource.resource_Create(params).then((res) => {
          if (res.code === "SUCCESS") {
            this.$message.success('新增成功')
            this.isDialog = false
            this.val = ''
            this.getdata()
            this.code = ''
            this.name = ''
            this.resourceAuthLevel = ''
            this.urlPath = ''
          } else {
            this.$message.error(res.data.msg);
          }
        })
      }else{
        let params = {
          "object": {
            "code": this.code,
            "id": "",
            "name": this.name,
            "parentId": this.roleData.id,
            // "type": this.type,
            "urlPath": this.urlPath,
            "resourceAuthLevel": this.resourceAuthLevel
          }
        }
        axios.post('http://192.168.1.130:20003/org-server/Resource/create', params, {headers: {'Region': 'SG'}}).then((res) => {
        // this.$API.resource.resource_Create(params).then((res) => {
          console.log(res)
          if (res.data.code === "SUCCESS") {
            this.$message.success('添加成功')
            const newChild = { 
              id: res.data.id, 
              name: this.name,
              code: this.code,
              parentId: this.roleData.parentId,
              resourceAuthLevel: this.resourceAuthLevel,
              urlPath: this.urlPath,
              subList: [] 
            }
            this.isDialog = false
            if (!this.roleData.subList) {
              this.roleData.subList = []
            }
            // if(data.subList === null) data.subList = []
            this.roleData.subList.push(newChild);
            this.data = [...this.data]
            // this.getdata()
            this.code = ''
            this.name = ''
            this.resourceAuthLevel = ''
            this.urlPath = ''
          } else {
              //接口错误处理
            this.$message.error(res.data.msg);
          }
        })
      }
    },
    remove(node, data) {
      console.log(data)
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = []
          ids.push(data.id)
          let params = {
            "object": {
              "ids": ids
            }
          }
          this.$API.resource.resource_batchDelete(params).then((res) => {
            console.log(res)
            if (res.code === "SUCCESS") {
              this.$message.success('删除成功')
              const parent = node.parent;
              const children = parent.data.subList || parent.data;
              const index = children.findIndex(d => d.id === data.id);
              children.splice(index, 1);
              this.data = [...this.data]
            } else {
                //接口错误处理
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {

        });
    },
    getdata() {
      let params = {}
      axios.post('http://192.168.1.130:20003/org-server/Resource/loadAllResourceTree', params, {headers: {'Region': 'SG'}}).then((res) => {
      // this.$API.resource.resource_loadAllResourceTree(params).then((res) => {
          console.log(res)
          if (res.data.code === "SUCCESS") {
            this.data = res.data.data
          } else {
            //接口错误处理
            this.$message.error(res.data.msg);
          }
        });
    },
    toBackList(){
      this.$router.go(-1)
    },
  }
};
</script>
<style lang="scss" scoped>
@import '@/styles/reset.scss';
@import "@/styles/image1.scss";
.editrole{
  width: 600px;
}
/deep/.editrole .el-tree{
  background: #fff;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  
  .dialog-content{
    width: 450px;
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
.check1{
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0;
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
.check1{
  margin-top: 20px;
  border-bottom: 1px solid #DEDEDE;
  input{
    margin-bottom: 20px;
  }
  select{
    width: 380px;
    outline: none;
    margin-bottom: 20px;
    border: 1px solid #ddd;
  }
}
</style>