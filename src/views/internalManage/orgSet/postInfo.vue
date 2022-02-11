<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回列表</span></div>
        <div class="print" @click="addstore()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">保存内容</span></div>
        <div class="print" @click="isDialog = true"><img class="icon" src="@/assets/images/moban.png" alt=""/><span class="axis">岗位模板</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印列表</span></div> -->
        <!-- <div class="print"><img class="icon" src="@/assets/images/derive.png" alt="" /><span class="axis">导出表格</span></div> -->
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="" class="info-form">
        <div class="table-title">
          <p>{{msg}}</p>
        </div>
        <table border="1" class="">

          <tr>
            <td class="table-left">岗位编码</td>
            <td class="table-right">
              <input type="text" placeholder="请输入岗位编码" v-model="form.privateCode" />
            </td>
            <td class="table-left">所属组织</td>
            <td class="table-right">
              <el-cascader
                :props="{ value: 'id', label: 'name', children: 'subList', checkStrictly: true }"
                :options="optionsOrg"
                v-model="optionsValue"
                @change="changeOrg"
                style="width: 100%"
                placeholder="请选择组织"
                ref="cascader"
              >
              </el-cascader>
            </td>
          </tr>

          <tr>
            <td class="table-left">所属部门</td>
            <td class="table-right" >
              <select placeholder="请选择所属部门" v-model="form.deptName" @change="changeStore($event)">
                <option :value="item.name" v-for="(item, index) in deptData" :key="index">{{item.name}}</option>
              </select>
            </td>
            <td class="table-left">岗位名称</td>
            <td class="table-right" >
              <input type="text" placeholder="请输入岗位名称" v-model="form.name" />
            </td>
          </tr>
          <tr>
            <td class="table-left">备注信息</td>
            <td class="table-right" colspan="3">
              <input type="text" placeholder="请输入备注信息" v-model="form.remark" />
            </td>
          </tr>
          
          <tr>
            <td class="table-left">数据范围</td>
            <td class="table-right" colspan="3">
              <el-radio-group v-model="form.a" class="radios">
                <el-radio label="1" style="margin-right:40px">仅自己</el-radio>
                <el-radio label="2" style="margin-right:40px" @change="onScope">指定范围<span style="color: #438AFE">（+选择范围）</span></el-radio>
              </el-radio-group>
            </td>
          </tr>

          <tr>
            <td class="table-left">功能权限</td>
            <td class="table-right" colspan="3">
              <el-tree
                :data="roleTreeData"
                show-checkbox
                node-key="id"
                ref="tree"
                @check="changeRole"
                :default-checked-keys="defaultChecked"
                :props="{ value: 'id', label: 'name', children: 'subList', checkStrictly: true }">
              </el-tree>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div class="pay-dialog" v-show="centerDialogVisible">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>选择范围</span>
          <img @click="onCancel" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <div class="acc groupTree">
            <el-tree
              :data="groupTree"
              show-checkbox
              node-key="id"
              ref="group"
              @check="changeGroupTree"
              :default-checked-keys="defaultCheckedTree"
              :props="{ value: 'id', label: 'name', children: 'subList'}">
            </el-tree>
          </div>
          <div class="scan-code">
            <button class="sure" @click="onCancel()">确定</button>
            <button @click="onCancel">取消</button>
          </div>
        </div>
      </div>
    </div>
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>岗位模板</span>
          <img @click="isDialog = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <!-- <el-radio v-model="radio" label=""></el-radio>
          <el-radio v-model="radio" label=""></el-radio> -->
          <div class="check1">
            <el-checkbox v-model="checked" @change="changeCheck(index = '1')"></el-checkbox>
            <span class="check1-text">UI</span>
            <el-checkbox v-model="checked" @change="changeCheck(index = '2')"></el-checkbox>
            <span class="check1-text">测试</span>
          </div>
          <div class="check1">
            <el-checkbox v-model="checked" @change="changeCheck(index = '3')"></el-checkbox>
            <span class="check1-text">前端</span>
            <el-checkbox v-model="checked" @change="changeCheck(index = '4')"></el-checkbox>
            <span class="check1-text">后端</span>
          </div>
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
import {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
} from "element-china-area-data";
export default {
  name: "Newproduct",
  data() {
    return {
      centerDialogVisible:false,
      optionsValue: [],
      optionsOrg: [],
      roleTreeData: [],
      defaultChecked: [],
      defaultCheckedTree: [],
      groupTree: [],
      defaultProps: {
        children: "subList",
        label: "name",
        value:"id"
      },
      data: [{
        id: 1,
        label: '全部功能',
        children: [
          {
            id: 2,
            label: '收货',
            children: [
              {
                id: 3,
                label: '待收货',
                children:[
                  {id:5,label:'查询'},{id:6,label:'增加商品'},{id:7,label:'删除商品'},
                  {id:8,label:'确认货物'},{id:9,label:'统计商品'},{id:10,label:'打印列表'},
                  {id:11,label:'导出表格'},{id:12,label:'显示字段'},{id:13,label:'查看单品编码详情'},
                ]
              },
              {
                id: 4,
                label: '已收货',
                children:[
                  {id:5,label:'查询'},{id:6,label:'增加商品'},{id:7,label:'删除商品'},
                  {id:8,label:'确认货物'},{id:9,label:'统计商品'},{id:10,label:'打印列表'},
                  {id:11,label:'导出表格'},{id:12,label:'显示字段'},{id:13,label:'查看单品编码详情'},
                ]
              },
            ]
          },
          {
            id:100,
            label: '盘货',
          },
          {
            id:200,
            label: '销售',
          },
          {
            id:300,
            label: '银行开户',
          },
          {
            id:400,
            label: '保单推送',
          },
          {
            id:500,
            label: '内部管理',
          }
        ]
      }],
      options: regionData,
      optionss: [],
      selectedOptions: [],
      form: {
        privateCode: "",
        deptName: "",
        name: "",
        remark: "",
        province: "",
        legalPersonName: "",
        contactNumber: "",
        legalPersonIdNumber: "",
        introduction: "",
        storeLicence: "", //默认选中显示
        a:""
      },
      dialogImageUrl: "",
      dialogVisible: false,
      imgArr: [],
      checkList: [],
      date: [],
      msg: '',
      hoursSelected1: '',
      hoursSelected2: '',
      minSelected1: '',
      minSelected2: '',
      imageUrl1: '', // 门店许可证
      imageUrl2: '', // 营业执照
      imageUrl3: '', // 门店照
      storeId: 0,
      isDialog: false,
      deptData: [],
      orgName: '',
      orgId: '',
      deptId: '',
      resourceIdSet: [],
      includedGroupIdSet: [],
      checked: false
    };
  },
  mounted() {
    this.getAllTree() // 获取功能树
    this.getOrg() // 获取组织
    this.getdata()
  },
  methods: {
      onSure(){},
    async getDept(val){
      let params = {
        "object": {
          "orgId": val
        },
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.orgSet.queryList_Dept(params)
    //   httpreques( "post", params, "/org-server/Dept/queryList").then((res) => {
        this.deptData = res.data
    //   })
    },
    // 获取组织
    async getOrg(){
        let params = {}
        let res = await this.$API.orgSet.findAllOrgTree_Org(params)
    //   httpreques( "post", { }, "/org-server/Org/findAllOrgTree").then((res) => {
        this.optionsOrg = res.data
    //   })
    },
    // 获取功能树
    async getAllTree(){
      let params = {
        "object": {
          "orgId": this.deptId
        }
      }
      let res = await this.$API.orgSet.loadAllResourceTree_Resource(params)
    //   httpreques( "post", params, "/org-server/Resource/loadAllResourceTree").then((res) => {
        this.roleTreeData = res.data
    //   })
    },
    // 获取指定范围数据
    async getGroupTree(){
      let params = {
        "object": {
          "orgId": this.deptId
        }
      }
      let res = await this.$API.orgSet.loadAllGroupTree_Group(params)
    //   httpreques( "post", params, "/org-server/Group/loadAllGroupTree").then((res) => {
        console.log(res)
        this.groupTree = res.data
    //   })
    },
    // 提交选中功能权限
    changeRole(){
      this.resourceIdSet = []
      let data = this.$refs.tree.getCheckedNodes()
      data.forEach(item => {
        this.resourceIdSet.push(item.id)
      })
    },
    // 提交选中数据范围
    changeGroupTree(){
      this.includedGroupIdSet = []
      let data = this.$refs.group.getCheckedNodes()
      data.forEach(item => {
        this.includedGroupIdSet.push(item.id)
      })
    },
    async getdata() {
      let t = this;
      let id = "";
      if (t.$route.query.id) {
        id = t.$route.query.id;
        this.msg = '编辑岗位'
      }else{
        this.msg = '新增岗位'
      }
      if (id) {
        let params = {
          "object": {
            "id": id
          }
        };
        let res = await this.$API.orgSet.findRoleById_Role(params)
        // httpreques("post", params, "/org-server/Role/findRoleById").then((res) => {
          console.log(res)
          if (res.data.code === "SUCCESS") {
            //对象数据处理
            let storeobj = res.data.data.entity;
            // storeobj.storetype = storeobj.storeType;
            // delete storeobj.storeType;
            // t.selectedOptions = TextToCode[storeobj.province][storeobj.city][storeobj.county].code;
            t.form = storeobj;
            this.deptId = storeobj.id
            this.form.deptName = storeobj.deptName
            this.optionsValue = storeobj.orgId.split(",")
            this.imageUrl1 = storeobj.storeLicence
            this.imageUrl2 = storeobj.businessLicense
            this.imageUrl3 = storeobj.profilePicture
            this.imgArr.push({url: storeobj.storeLicence})
            this.dialogImageUrl = storeobj.storeLicence;
            this.defaultChecked = res.data.data.roleResourceDto.resourceIdSet // 默认选中功能权限
            this.defaultCheckedTree = res.data.data.dataPermissionDto.includedGroupIdSet // 默认选中功能权限
            this.getDept(storeobj.orgId)
          } else {
            //接口错误处理
            t.$message.error(res.data.msg);
          }
        // });
      }
    },
    addstore() {
      let t = this;
      if(!this.form.privateCode) return this.$message.error('部门内部编码不能为空')
      if(!this.orgId) return this.$message.error('请选择组织')
      if(!this.form.name) return this.$message.error('岗位名称不能为空')
      let id = this.$route.query.id ? this.$route.query.id : ''
      let params = {
        "object": {
          "dataPermissionDto": {
            "excludedGroupIdSet": [],
            "includedGroupIdSet": this.includedGroupIdSet
          },
          "entity": {
            "privateCode": this.form.privateCode,
            "deptId": this.deptId,
            "deptName": this.form.deptName,
            "id": id,
            "name": this.form.name,
            "orgId": this.orgId,
            "orgName": this.orgName,
            "remark": this.form.remark
          },
          "roleResourceDto": {
            "resourceIdSet": this.resourceIdSet
          }
        }
      }
      if(this.$route.query.id){
        this.$API.orgSet.updateRole_Role(params)
        this.$message.success('修改成功')
      }else{
        this.$API.orgSet.createRole_Role(params)
        this.$message.success('添加成功')
      }
      this.toBackList()
    },
    changeStore(e){
      this.form.deptName = e.target.value // 获取部门名称
      this.deptData.forEach(item => {
        if(item.name == this.form.deptName) this.deptId = item.id // 获取部门id
      })
    },
    changeOrg(val){
      let len = val.length-1
      this.orgId = val[len]
      this.orgName = this.$refs["cascader"].getCheckedNodes()[0].label
      this.getDept(val[len])
    },
    //预览图片
    handlePictureCardPreview(res, file){
      // console.log(file);
      console.log(res);
      this.dialogVisible = true;
      this.form.storeLicence = res.response.data;
    },
    handleAvatarSuccess1(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl1 = res.data; // 身份证正面
      }
    },
    handleAvatarSuccess2(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl2 = res.data; // 身份证反面
      }
    },
    handleAvatarSuccess3(res, file) {
      if (res.code === "SUCCESS") {
        this.dialogImageUrl = res.data;
        this.imageUrl3 = res.data; // 个人照
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (file.type != 'image/jpeg' && file.type != 'image/png') {
        this.$message.error('上传头像图片只能是 JPG 格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false
      }
    },
    //图片
    handleAvatarSuccess(res, file) {
      console.log(file);
      console.log(res);
      // return
      this.dialogImageUrl = res.data;
      this.form.storeLicence = res.data;
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
      },
    toBackList() {
      this.$router.go(-1);
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
    onScope(){
      this.centerDialogVisible= true
      this.getGroupTree() // 获取指定范围数据
    },
    onCancel(){
      this.centerDialogVisible = false
    },
  },
};
</script>
<style lang="scss" scoped>
/deep/.el-cascader .el-input .el-input__inner {
  width: 100%;
  height: 20px;
  line-height: 28px;
  font-size: 12px;
  padding: 4px;
  color: #333;
  outline: none;
}
/deep/.el-input--small{
  line-height: 28px;
}
/deep/.el-cascader--small{
  line-height: 28px;
}
/deep/.el-cascader .el-input .el-input__inner:focus {
  border: 1px solid #ddd;
}
/deep/.el-cascader .el-input__inner::-webkit-input-placeholder {
  color: #ddd;
}
/deep/.el-cascader .el-input__inner::-moz-input-placeholder {
  color: #ddd;
}
/deep/.el-cascader .el-input__inner::-ms-input-placeholder {
  color: #ddd;
}
.time{
  display: flex;
  align-items: center;
  margin: 8px 0 10px 0;
  span{
    color: #384F71;
  }
  /deep/.el-checkbox{
    margin-right: 12px;
    .el-checkbox__input{
      margin-right: 4px;
    }
  }
  /deep/input{
    border: none
  }
}
.table-main table .table-right .business-time select{
  width: 70px;
  margin-right: 10px;
}
.business-time{
  display: flex;
}
@import "@/styles/reset.scss";
.table-main .table-title{
  width: 589px;
  background: none;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column;
    color: #8c939d;
    width: 120px;
    height: 125px;
    // line-height: 120px;
    span{
      padding-top: 10px;
      font-style:normal;
      font-size: 12px;
      color: #999;
    }
  }
  .photos-card{
    width: 140px;
    height: 96px;
    background: #F8F8F8;
    border: 1px dashed #ddd;
    border-radius: 4px;
    .avatar-uploader-icon{
      width: 140px;
      height: 96px;
    }
    .avatar {
      width: 138px;
      height: 94px;
      display: block;
  }
  }
  .pic-tip{
    display: inline-block;
    padding: 8px 0;
    color: #999;
    span{
      color: #384F71;
    }
  }
  .store-avatar{
    width: 120px;
    height: 120px;
    .avatar-uploader-icon{
      width: 120px;
      height: 120px;
    }
    .avatar {
      width: 118px;
      height: 118px;
      display: block;
    }
  }
  .radios{
    display: flex;
    margin-top: 5px;
  }
  /deep/.el-radio__label{
    color: #384F71;
    font-size: 12px;
  }
  .el-tree{
    background: #FFFFFF;
    height: 635px;
    // overflow-y: scroll;
    padding: 10px;
    // box-sizing: border-box;
    border: 1px solid #DEDEDE;
  }
  .groupTree .el-tree{
    height: 470px;
    margin: 16px;
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
  display: block;
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
  border-bottom: 1px solid #DEDEDE;
  .el-checkbox{
    width: 10%;
    padding: 14px 0;
    text-align: center;
    border-right: 1px solid #DEDEDE;
    border-left: 1px solid #DEDEDE;
  }
  .el-checkbox:first-child{
    border-left: none;
  }
  .check1-text{
    display: inline-block;
    width: 40%;
    padding-left: 20px;
    color: #444;
  }
}
</style>