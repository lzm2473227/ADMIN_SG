<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="cancelbtn">
          <img
            class="icon"
            src="@/assets/images/back.png"
            alt=""
          /><span class="axis">返回列表</span>
        </div>
        <div class="print" @click="addstore()">
          <img
            class="icon"
            src="@/assets/images/save.png"
            alt=""
          /><span class="axis">保存内容</span>
        </div>
        <!-- <div class="print">
          <img
            class="icon"
            src="@/assets/images/print.png"
            alt=""
          /><span class="axis">打印列表</span>
        </div> -->
        <!-- <div class="print">
          <img
            class="icon"
            src="@/assets/images/derive.png"
            alt=""
          /><span class="axis">导出表格</span>
        </div> -->
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="#" class="info-form">
        <div class="table-title">
          <p>{{msg}}</p>
        </div>
        <table border="1" class="">
          <tr>
            <td class="table-left">姓名</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入姓名"
                v-model="ruleForm.name"
              />
            </td>
            <td class="table-left">性别</td>
            <td class="table-right mini">
              <el-radio-group v-model="ruleForm.gender">
                <el-radio label="1">男</el-radio>
                <el-radio label="2">女</el-radio>
              </el-radio-group>
            </td>
          </tr>

          <tr>
            <td class="table-left">籍贯</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入籍贯"
                v-model="ruleForm.hometown"
              />
            </td>
            <td class="table-left">民族</td>
            <td class="table-right mini">
              <select type="checkout" v-model="ruleForm.ethnicity" style="width: 144px;">
                <option :value="item.name" v-for="item in nation" :key="item.id">{{item.name}}</option>
              </select>
            </td>
          </tr>

          <tr>
            <td class="table-left">政治面貌</td>
            <td class="table-right">
              <select type="checkout" v-model="ruleForm.politicalStatus">
                <option value="群众">群众</option>
                <option value="党团">党团</option>
              </select>
            </td>
            <td class="table-left">出生年月</td>
            <td class="table-right mini" id="brithday">
              <el-date-picker
                v-model="birthday"
                type="date"
                prefix-icon="false"
                :clearable="false"
              >
              </el-date-picker>
            </td>
          </tr>
          <tr>
            <td class="table-left">联系号码</td>
            <td class="table-right mini">
              <input
                type="text"
                placeholder="请输入联系号码"
                v-model="ruleForm.telNum"
                @blur="istelNumr(ruleForm.telNum)"
              />
            </td>
            <td class="table-left">身份证号</td>
            <td class="table-right">
              <input
                style="width: 144px;"
                type="text"
                placeholder="请输入身份证号"
                v-model="ruleForm.idNumber"
                @blur="isCardNo(ruleForm.idNumber)"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">最高学历</td>
            <td class="table-right mini">
              <select type="checkout" v-model="ruleForm.education">
                <option value="本科">本科</option>
                <option value="大专">大专</option>
              </select>
            </td>
            <td class="table-left">所学专业</td>
            <td class="table-right" colspan="3">
              <input
                type="text"
                placeholder="请输入专业"
                v-model="ruleForm.profession"
              />
            </td>
          </tr>

          <tr>
            <td class="table-left">毕业院校</td>
            <td class="table-right">
              <input
                type="text"
                placeholder="请输入毕业院校"
                v-model="ruleForm.school" style="width:100%"
              />
            </td>
            <td class="table-left">账号密码</td>
            <td class="table-right">
              <input
                type="password"
                placeholder="请输入密码"
                v-model="ruleForm.pwd"
                style="width: 190px;"
              />
              <span style="display: inline-block; background: #438AFE;padding: 3px 5px; color: #fff; margin-left: 7px; cursor: pointer;">重置密码</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">居住地址</td>
            <td class="table-right" colspan="3" style="padding: 6px;">
              <el-cascader
                :options="options"
                v-model="selectedOptions"
                @change="handleChange"
                style="width: 100%"
                placeholder="请选择居住地址"
              >
              </el-cascader>
              <br />
              <input
                type="text"
                placeholder="请输入居住详情地址"
                style="margin-top: 6px; width: 100%"
                v-model="ruleForm.address"
              />
            </td>
          </tr>
          <tr style="vertical-align: top;">
            <td class="table-left" style="padding: 12px;">证件照</td>
            <td class="table-right" colspan="3" style="padding-top: 6px;">
              <div style="display: flex;">
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess1"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传身份证正面</span>
                  </i>
                </el-upload>
                <el-upload
                  class="avatar-uploader photos-card"
                  action="http://14.29.162.130:6602/image/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                  style="margin-left: 10px;">
                  <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                  <i v-else class="avatar-uploader-icon">
                    <img src="@/assets/images/upload.png" alt="">
                    <span>请上传身份证反面</span>
                  </i>
                </el-upload>
              </div>
              <span class="pic-tip">建议上传图片格式为：<span>JPEG、PNG</span>，大小为：<span>2MB</span></span>
            </td>
          </tr>

          <tr style="vertical-align: top;">
            <td class="table-left" style="height:390px;padding-top:22px;">分配岗位</td>
            <td class="table-right choose-post" colspan="3" style="padding: 0;">
              <div class="parent-orgtree" v-for="(item, index) in postsData.postsList" :key="index">
                <div class="gangwei-left">
                  <div class="orgtree">
                    <span class="orgtree-text">所属组织</span> 
                    <el-cascader
                        ref="cascader"
                        v-model="item.orgTreeValue"
                        :options="item.orgTreeOption"
                        :props="{ value: 'id', label: 'name', children: 'subList', checkStrictly: true }"
                        @change="changeOrg(item)"
                        placeholder="请选择组织"
                    ></el-cascader>
                  </div>
                  <div class="orgtree">
                    <span class="orgtree-text">所属部门</span> 
                    <select placeholder="请选择部门" v-model="item.deptName" @change="changeStore($event, item)">
                      <option :value="item1.name" v-for="(item1, index) in item.deptData" :key="index">{{item1.name}}</option>
                    </select>
                  </div>
                  <div class="orgtree">
                    <span class="orgtree-text gangwei">岗位</span>
                    <el-select v-model="item.roleValue" multiple filterable default-first-option placeholder="请选择岗位">
                      <el-option v-for="item2 in item.roleData" :key="item2.id" :label="item2.name" :value="item2.id"></el-option>
                    </el-select>
                  </div>
                </div>
                <div class="delete-post">
                  <span :disabled="postsData.postsList.length === 1" class="delete-text" @click="remove(item)">删除</span>
                </div>
              </div>
              <span @click="add" class="addpost">添加</span>
            </td>
          </tr>

          <el-upload
            class="avatar-uploader personal-portrait"
            action="http://14.29.162.130:6602/image/imageUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess3"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
            <i v-else class="avatar-uploader-icon">
              <img src="@/assets/images/upload.png" alt="">
              <span>请上传个人照</span>
            </i>
          </el-upload>
        </table>
      </form>
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
import moment from "moment";
export default {
  name: "Newproduct",
  data() {
    return {
      postsData: {
        postsList: [{
          orgTreeValue: [],
          orgTreeOption: [],
          deptData: [],
          deptName: '',
          deptId: '',
          roleValue: [],
          roleData: [],
          orgId: '',
          orgName: ''
        }]
      },
      dialogImageUrl: "", //图片服务器的图片的地址
      dialogVisible:false,
      options: regionData,   //地址相关
      selectedOptions: [],    //地址相关
      orgTreeOption: [],
      orgTreeValue: [],
      pageSize:"",
      total:"",
      ruleForm: {
        name: "",
        idNumber: "",
        telNum: "",
        password: "",
        reverseId: "", //身份证后照
        frontId: "", //身份证前照
        station: "1111",
        storeName: "",
        gender: "1",
        hometown: "",
        ethnicity: "",
        politicalStatus: "",
        education: "",
        profession: "",
        school: '',
        address: "",   //省地址
        province: "",  //地址
        county: "",
        city: "",
        pwd: '666666',
        deptName: '',
        deptId: ''
      },
      station: [],
      clerkroles: [],
      //民族
      nation:[
        {id:1 ,name:'汉族'},
        {id:2 ,name:'蒙古族'},
        {id:3 ,name:'回族'},
        {id:4 ,name:'藏族'},
        {id:5 ,name:'维吾尔族'},
        {id:6 ,name:'苗族'},
        {id:7 ,name:'彝族'},
        {id:8 ,name:'壮族'},
        {id:9 ,name:'布依族'},
        {id:10,name:'朝鲜族'},
        {id:11,name:'满族'},
        {id:12,name:'侗族'},
        {id:13,name:'瑶族'},
        {id:14,name:'白族'},
        {id:15,name:'土家族'},
        {id:16,name:'哈尼族'},
        {id:17,name:'哈萨克族'},
        {id:18,name:'傣族'},
        {id:19,name:'黎族'},
        {id:20,name:'傈僳族'},
        {id:21,name:'佤族'},
        {id:22,name:'畲族'},
        {id:23,name:'高山族'},
        {id:24,name:'拉祜族'},
        {id:25,name:'水族'},
        {id:26,name:'东乡族'},
        {id:27,name:'纳西族'},
        {id:28,name:'景颇族'},
        {id:29,name:'柯尔克孜族'},
        {id:30,name:'土族'},
        {id:31,name:'达翰尔族'},
        {id:32,name:'么佬族'},
        {id:33,name:'羌族'},
        {id:34,name:'布朗族'},
        {id:35,name:'撒拉族'},
        {id:36,name:'毛南族'},
        {id:37,name:'仡佬族'},
        {id:38,name:'锡伯族'},
        {id:39,name:'阿昌族'},
        {id:40,name:'普米族'},
        {id:41,name:'塔吉克族'},
        {id:42,name:'怒族'},
        {id:43,name:'乌孜别克族'},
        {id:44,name:'俄罗斯族'},
        {id:45,name:'鄂温克族'},
        {id:46,name:'德昂族'},
        {id:47,name:'保安族'},
        {id:48,name:'裕固族'},
        {id:49,name:'京族'},
        {id:50,name:'塔塔尔族'},
        {id:51,name:'独龙族'},
        {id:52,name:'鄂伦春族'},
        {id:53,name:'赫哲族'},
        {id:54,name:'门巴族'},
        {id:55,name:'珞巴族'},
        {id:56,name:'基诺族'},
      ],
      storeNameItemList: [],
      imgArr: [],
      roleUuid: '',
      groupUuid: '',
      uuidArr: [],
      msg: '',
      imageUrl1: '', // 正面
      imageUrl2: '', // 反面
      imageUrl3: '', // 个人照
      birthday: '',
      storeid: null,
      deptData: [],
      orgName: '',
      orgId: '',
      deptId: '',
      roleData: [],
      roleValue: [],
      orgData: []
    };
  },
  mounted() {
    this.getdata();
    // this.StoreNameList();
    // this.getRoleUuid()
    this.getOrg()
  },
  methods: {
    add(){
      this.postsData.postsList.push({
        orgTreeValue: [],
        orgTreeOption: this.orgData,
        deptName: '',
        deptId: '',
        roleValue: [],
        deptData: [],
        roleData: [],
        orgId: '',
        orgName: ''
      })
    },
    remove(item) {
      console.log(item)
      var index = this.postsData.postsList.indexOf(item)
      if (index !== -1) {
        this.postsData.postsList.splice(index, 1)
      }
    },
    async getOrg(){
        let params = {}
        let res = await this.$API.orgSet.findAllOrgTree_Org(params)
        console.log(res.data)
        // let data = res.data
        this.orgData = res.data
        this.postsData.postsList[0].orgTreeOption = res.data
    },
    // 图片预览
    handlePictureCardPreview(res, file){
      // console.log(file);
      console.log(res);
      this.dialogVisible = true;
      this.ruleForm.frontId = res.response.data;
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
    async getdata() {
      let t = this;
      let id = "";
      if (t.$route.query.id) {
        id = t.$route.query.id;
        this.postsData.postsList = []
        this.msg = '编辑人员'
      }else{
        this.msg = '新增人员'
      }
      if (id) {
        let params = {
          "object": {
            "id": id
          }
        };
        let res = await this.$API.orgSet.findUserById_User(params)
          console.log(res)
            // 基本信息
            let storeobj = res.data.userInfo.userDetailEntity;
            this.selectedOptions = TextToCode[storeobj.province][storeobj.city][storeobj.county].code;
            this.birthday = moment(storeobj.birthday).format(
              "YYYY-MM-DD"
            )
            storeobj.gender = storeobj.gender.toString();
            delete storeobj.storeType;
            t.ruleForm = storeobj;
            this.ruleForm.name = res.data.userInfo.userEntity.username
            this.imageUrl1 = storeobj.frontId
            this.imageUrl2 = storeobj.reverseId
            this.imageUrl3 = storeobj.profilePicture
            this.imgArr.push({url: storeobj.frontId})
            this.dialogImageUrl = storeobj.frontId;

            // 岗位信息
            let list = res.data.identityDtoList
            list.forEach((item, index) => {
              console.log(item)
              let orgTreeValue = []
              let roleValue = []
              item.roleDtoList.forEach((role, index) => {
                roleValue.push(role.entity.name)
              })
              this.postsData.postsList.push({
                orgTreeValue: orgTreeValue.push(item.identityEntity.orgId),
                orgTreeOption: this.orgData,
                deptName: item.identityEntity.deptName,
                deptId: item.identityEntity.deptId,
                roleValue: roleValue,
                // deptData: [],
                // roleData: [],
                orgId: item.identityEntity.orgId,
                orgName: item.identityEntity.orgName
              })
              console.log(orgTreeValue)
            })
              console.log(this.postsData)
      }
    },
    async addstore() {
      if(!this.ruleForm.name) return this.$message('姓名不能为空')
      // if(!this.ruleForm.hometown) return this.$message('籍贯不能为空')
      // if(!this.ruleForm.ethnicity) return this.$message('民族不能为空')
      // if(!this.ruleForm.politicalStatus) return this.$message('政治面貌不能为空')
      // if(!this.ruleForm.profession) return this.$message('所学专业不能为空')
      // if(!this.ruleForm.education) return this.$message('最高学历不能为空')
      // if(!this.ruleForm.school) return this.$message('毕业院校不能为空')
      // if(!this.birthday) return this.$message('出生年月不能为空')
      if(!this.ruleForm.telNum) return this.$message('联系号码不能为空')
      if(!this.ruleForm.idNumber) return this.$message('身份证号不能为空')
      // if(!this.ruleForm.province) return this.$message('居住地址不能为空')
      if(!this.imageUrl1) return this.$message('请上传身份证正面')
      if(!this.imageUrl2) return this.$message('请上传身份证反面')
      if(!this.imageUrl3) return this.$message('请上传个人照')

      let params = {
        "object": {
          "userDetailEntity": {
            "address": this.ruleForm.address,
            "birthday": this.birthday,
            "city": this.ruleForm.city,
            "county": this.ruleForm.county,
            "education": this.ruleForm.education,
            "ethnicity": this.ruleForm.ethnicity,
            "frontId": this.imageUrl1,
            "gender": parseInt(this.ruleForm.gender),
            "height": 0,
            "hometown": this.ruleForm.hometown,
            "id": "",
            "idNumber": this.ruleForm.idNumber,
            "politicalStatus": this.ruleForm.politicalStatus,
            "profession": this.ruleForm.profession,
            "profilePicture": this.imageUrl3,
            "province": this.ruleForm.province,
            "reverseId": this.imageUrl2,
            "school": this.ruleForm.school,
            "telNum": this.ruleForm.telNum,
            "userId": "",
            "weight": 0
          },
          "userEntity": {
            "id": "",
            "name": this.ruleForm.name,
            "password": this.ruleForm.pwd,
            "userDetailId": "",
            "username": this.ruleForm.telNum // 登录账号
          }
        }
      }
      // this.istelNumr(this.ruleForm.telNum)
      // this.isCardNo(this.ruleForm.idNumber)
      // if(this.istelNumr(this.ruleForm.telNum) === false) return this.$message.error("联系号码输入格式错误")
      // if(this.isCardNo(this.ruleForm.idNumber) === false) return this.$message.error("身份证输入不合法")
      if (this.$route.query.id) {
        this.$API.orgSet.updateUser_User(params)
          if ((res.code === "SUCCESS")) {
            this.$message.success("编辑员工成功");
            this.$router.replace("/internalManage/clerkSet/clerkList");
          } else {
            this.$message.error("编辑员工失败");
          }
      } else {
        let res = await this.$API.orgSet.createUser_User(params)
          console.log(res)
          if ((res.code === "SUCCESS")) {
            await this.addPost(res.data.id) // 分配岗位
          } else {
            this.$message.error("新增员工失败");
          }
      }
    },
    // 分配岗位
    async addPost(userId){
      let params = {
        "object": {
          "roleId": this.postsData.postsList[0].roleValue[0],
          "userId": userId
        }
      }
      let res = await this.$API.orgSet.userAddRole_Identity(params)
          // console.log(res)
          if ((res.code === "SUCCESS")) {
            this.$message.success("新增员工成功");
            this.$router.replace("/internalManage/clerkSet/clerkList");
          } else {
            this.$message.error("新增员工失败");
          }
    },
    changeOrg(val){
      console.log(val)
      let len = val.orgTreeValue.length-1
      val.orgId = val.orgTreeValue[len]
      // val.orgName = this.$refs["cascader"].getCheckedNodes()[0].label
      this.getDept(val)
    },
    async getDept(val){
      let params = {
        "object": {
          "orgId": val.orgId
        },
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.orgSet.queryList_Dept(params)
      val.deptData = res.data
    },
    // 获取部门id
    changeStore(e, val){
      val.deptName = e.target.value // 获取部门名称
      val.deptData.forEach(item => {
        if(item.name == val.deptName) val.deptId = item.id // 获取部门id
      })
      this.getRoleData(val)
    },
    // 根据部门id查找岗位
    async getRoleData(val){
      let params = {
        "object": {
          "deptId": val.deptId
        },
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.orgSet.findRoleList_Role(params)
        console.log(res)
        let data = res.data
        data.forEach(item => {
          val.roleData.push({
            name: item.entity.name,
            id: item.entity.id,
            deptId: item.entity.deptId,
          })
        })
    },
    // 获取岗位
    changeStation() {
      this.identityItems = []
      let obj = {}
      for(let i in this.clerkroles){
        obj[this.clerkroles[i].name] = this.clerkroles[i]
      }
      for(let item of this.station){
        if(obj[item]){
          this.uuidArr.push(obj[item].uuid)
        }
      }
    },
    //选择省市区
    handleChange(value) {
      let t = this;
      t.ruleForm.province = CodeToText[value[0]];
      t.ruleForm.city = CodeToText[value[1]];
      t.ruleForm.county = CodeToText[value[2]];
    },
    //手机号效验
    istelNumr(tel){
      var reg = /(^\d{11}$)/;
      if(reg.test(tel) === false) { 
        return false; 
      }
    },
    //身份证效验
     isCardNo(card) { 
    var reg = /(^\d{18}$)|(^\d{17}(\d|X|x)$)/; 
    if(reg.test(card) === false) { 
        return false; 
      } 
    },
    cancelbtn() {
      let t = this;
      this.$router.go(-1);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "@/styles/reset.scss";
.table-main table{
  border-bottom: none;
}
/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 196px;
}
/deep/.el-checkbox{
 width: 100px;
}
/deep/.el-radio{
  width: 50px;
}
.imgs-title{
  position: relative;
}
.el-icon-upload{
  position: absolute;
  top: 30px;
  left: 60px;
}
/deep/.el-cascader .el-input .el-input__inner{
  width: 100%;
}
/deep/.el-date-editor.el-input{
  width: 130px;
  
}
/deep/.table-main table .table-right.mini input{
  width: 130px;
}
/deep/#brithday {
  .el-date-editor.el-input{
    width: 144px;
  }
  .table-main table .table-right.mini input{
    width: 144px;
  }
}
.table-main table .table-right{
  width: 130px;
}
.table-main table .table-right select{
  width: 130px;
  height: 26px;
  line-height: 28px;
}
/deep/.table-main table .table-right input{
  width: 265px;
}
/deep/.el-upload--picture-card{
  height: 130px;
  width: 136px;
}
/deep/.el-upload--picture-card{
  line-height: 160px;
}
.el-icon-upload{
    top: 40px;
    left: 55px;
}
/deep/ .personal .el-upload--picture-card{
  width: 120px;
  height: 121px;
  line-height: 120px;
  border: none;
  background: #F8F8F8;
  border-left: 1px solid #DADBDF;
  border-radius: 0;
}
.table-right .el-checkbox{
  margin-top: 8px;
}
.personal .el-icon-upload{
    top: 20px;
    left: 50px;
}
.table-main .table-title{
  width: 586px;
  background: #fff;
}
.personal-portrait{
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid #DADBDF;
  border-right: 1px solid #DADBDF;
  background: #F8F8F8;
  font-size: 0;
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
    height: 139px;
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
  .avatar {
    width: 120px;
    height: 139px;
    display: block;
  }
  /deep/.el-select .el-input__suffix{
    top: 5px;
  }
  /deep/.el-select .el-input .el-select__caret.is-reverse{
    transform: rotateZ(180deg);
    // position: absolute;
    // top: -10px;
    // left: -20px;
  }
  .ganwei{
    display: inline-block;
    margin-right: 28px;
    margin-top: 12px;
  }
  .name-pwd td{
    display: flex;
    border: none;
    border-right: 1px solid #DADBDF;
  }
  .pic-tip{
    display: inline-block;
    padding-top: 8px;
    padding-bottom: 4px;
    color: #999;
    span{
      color: #384F71;
    }
  }
  .orgtree{
    // width: 70%;
    padding: 5px 0;
    .orgtree-text{
      margin-right: 10px;
    }
  }
  .orgtree:first-child{
    padding: 0;
  }
  .gangwei{
    margin-left: 28px;
  }
  .parent-orgtree{
    display: flex;
    border-bottom: 1px solid #DADBDF;
    .gangwei-left{
      width: 80%;
      // position: relative;
      border-right: 1px solid #DADBDF;
      padding: 6px;
    }
  }
  .delete-post{
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    .delete-text{
      cursor: pointer;
    }
    .delete-text:hover{
      color: #409EFF;
    }
  }
  .table-main table .table-right .orgtree select{
    width: 265px;
  }
  /deep/.table-main table .table-right .orgtree input.el-input__inner{
    width: 265px;
  }
  /deep/.gangwei-left .el-cascader .el-input .el-input__inner{
    width: 265px;
  }
  /deep/#brithday .el-input--small{
    line-height: 0;
  }
  /deep/#brithday input.el-input__inner{
    width: 144px;
    height: 26px;
  }
  .addpost{
    display: inline-block;
    padding: 6px 20px;
    margin: 6px;
    border: 1px solid #438AFE;
    border-radius: 2px;
    color: #438AFE;
    cursor: pointer;
  }
</style>