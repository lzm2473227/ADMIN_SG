<template>
  <div class="tab">
    <div class="tab-title">
      <div class="left">
        <div class="print" @click="toBackList"><img class="icon" src="@/assets/images/back.png" alt=""/><span class="axis">返回</span></div>
        <div class="print" @click="getAddFile()"><img class="icon" src="@/assets/images/save.png" alt=""/><span class="axis">暂存内容</span></div>
        <div class="print" @click="forward"><img class="icon" src="@/assets/images/relay.png" alt="" /><span class="axis">转发公文</span></div>
        <div class="print" @click="getProcessed"><img class="icon" src="@/assets/images/sure.png" alt="" /><span class="axis">转已办件</span></div>
        <!-- <div class="print"><img class="icon" src="@/assets/images/print.png" alt="" /><span class="axis">打印表单</span></div> -->
        <div class="print"><img class="icon" src="@/assets/images/status.png" alt="" /><span class="axis">查看状态</span></div>
      </div>
      <div class="right">
      </div>
    </div>
    <div class="table-main">
      <form action="">
        <div class="table-title">
          <p>凯华公司内部文件处理单</p>
        </div>
        <table border="1" class="">
            <tr>
            <td class="table-left">公文标题</td>
            <td class="table-right" colspan="5">
              <input type="text" placeholder="请输入公文标题" v-model="form.fileTitle" />
            </td>
          </tr>
          <tr>
            <td class="table-left">公文编号</td>
            <td class="table-right">
              <span>{{form.fileCode}}</span>
            </td>
            <td class="table-left">公文呈报人</td>
            <td class="table-right">
              <span>{{form.name}}</span>
            </td>
            <td class="table-left">所在部门</td>
            <td class="table-right">
              <span>{{form.deptName}}</span>
            </td>
          </tr>
          <tr>
            <td class="table-left">办文时限</td>
            <td class="table-right mini" id="brithday">
               <el-date-picker
                v-model="form.limitTime"
                type="date"
                prefix-icon="false"
                :clearable="false"
                placeholder="请输入办文时限"
              >
              </el-date-picker>
            </td>
            <td class="table-left">呈报时间</td>
            <td class="table-right">
              <span>{{form.reportTime}}</span>
            </td>
            <td class="table-left">备注事项</td>
            <td class="table-right">
              <input type="text" placeholder="请输入备注" v-model="form.fileRemark" />
            </td>
          </tr>
          <tr>
            <td class="table-left">公文主件</td>
            <td class="table-right" colspan="5">
                <div class="file-button">
                    <div class="file-button lefts">
                      <el-upload
                        class="upload-demo"
                        action="http://14.29.162.130:6602/image/imageUpload"
                        :on-success="handleAvatarSuccess"
                        :file-list="fileList">
                        <div class="icondownload">
                          <img src="../../../assets/images/Cloud Download On.png" alt="">
                        </div>
                        <el-button size="small" type="primary">上传公文</el-button>
                      </el-upload>
                  </div>
                  <button type='button' class="del" @click="delAttachments">
                    <img src="@/assets/images/delete.png" alt="">删除公文
                  </button>
                  <button type='button' @click="download">
                    <img src="@/assets/images/Cloud Download On.png" alt="">下载公文
                  </button>
                  <button type='button' @click="isDialog = true">
                    <img src="@/assets/images/ic-xuanze.png" alt="">选择模板
                  </button>                   
                </div>
                <el-table
                    id="printJS-table"
                    ref="singleTable"
                    :data="tabledata4"
                    style="width: 100%;"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                >
                    <el-table-column type="selection" align="center" sortable width="45"></el-table-column>
                    <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
                    <el-table-column prop="fileName" label="主件名称" width="264" sortable show-overflow-tooltip></el-table-column>
                    <el-table-column prop="reporterName" label="上传人" align="center" sortable show-overflow-tooltip width="100"></el-table-column>
                    <el-table-column prop="createTime" label="上传时间" width="170" align="center" show-overflow-tooltip sortable></el-table-column>
                </el-table>
            </td>
          </tr>
          <tr style="vertical-align:top;">
            <td class="table-left" style="padding-top: 12px;height:100px;">公文附件</td>
            <td class="table-right" colspan="5">
                <div class="file-button">
                    <el-upload  
                      class="upload-demo"
                      action="http://14.29.162.130:6604/file/fileUpload"
                      :on-success="handleAvatarSuccess1"
                      :file-list="fileList">
                      <div class="icondownload">
                          <img src="../../../assets/images/Cloud Download On.png" alt="">
                        </div>
                      <el-button size="small" type="primary">上传附件</el-button>
                    </el-upload>
                    <button type='button' @click="delAttachments" class="del">
                      <img src="@/assets/images/delete.png" alt="">删除附件
                    </button>
                    <button type='button' @click="download">
                      <img src="@/assets/images/Cloud Download On.png" alt="">下载附件
                    </button>
                </div>
                <el-table
                    id="printJS-table"
                    ref="singleTable"
                    :data="tabledata3"
                    style="width: 100%;"
                    highlight-current-row
                    @selection-change="handleSelectionChange"
                    :default-sort="{ prop: 'date', order: 'descending' }"
                >
                    <el-table-column type="selection" align="center" sortable width="45"></el-table-column>
                    <el-table-column prop="index" label="序号" align="center" sortable width="80"></el-table-column>
                    <el-table-column prop="fileName" label="附件名称" width="264" sortable show-overflow-tooltip></el-table-column>
                    <el-table-column prop="reporterName" label="上传人" align="center" sortable show-overflow-tooltip width="100"></el-table-column>
                    <el-table-column prop="createTime" label="上传时间" width="170" align="center" show-overflow-tooltip sortable></el-table-column>
                </el-table>
            </td>
          </tr>
          <tr>
            <td class="table-left" style="padding-top: 12px">办理意见</td>
            <td class="table-right" colspan="5">
              <el-table
                  id="printJS-table"
                  ref="singleTable"
                  :data="tabledata2"
                  style="width: 100%;"
                  highlight-current-row
                  @selection-change="handleSelectionChange"
                  :default-sort="{ prop: 'date', order: 'descending' }"
              >
                  <el-table-column prop="index" label="办理顺序" align="center" sortable width="100"></el-table-column>
                  <el-table-column prop="handleTime" label="办理时间" width="160" align="center" show-overflow-tooltip sortable></el-table-column>
                  <el-table-column prop="q" label="办理人" align="center" sortable width="120"></el-table-column>
                  <el-table-column prop="verdict" label="办理意见" width="278" sortable show-overflow-tooltip></el-table-column>
              </el-table>
            </td>
          </tr>
          <tr>
            <td class="table-left" style="padding-top: 12px;height:120px">您的意见</td>
            <td class="table-right" colspan="5">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="请输入您的意见"
                v-model="form.opinion">
              </el-input>
              <hr/>
              <span class="idea">结论性意见：</span>
              <el-radio class="top" v-model="radio1" label="0">同意</el-radio>
              <el-radio v-model="radio1" label="1">不同意</el-radio>
            </td>
          </tr>
        </table>
      </form>
    </div>
    <div class="pay-dialog" v-show="isDialog">
      <div class="dialog-content">
        <div class="dialog-top">
          <span>公文模板</span>
          <img @click="isDialog = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
            <el-radio-group v-model="radio">
                <el-radio v-for="item in tabledata1" :key="item.id" :label="item.id" @change="radioId">
                  {{item.templateName}}
                </el-radio>
            </el-radio-group>
        </div>
        <div class="scan-code">
            <button class="sure" @click="onSure">确定</button>
            <button @click="isDialog = false">取消</button>
          </div>
      </div>
    </div>
    <div class="pay-dialog" v-show="isForward">
      <div class="dialog-content forward-con">
        <div class="dialog-top">
          <span>用户选择框</span>
          <img @click="isForward = false" src="@/assets/images/close.png" alt="">
        </div>
        <div class="menu-but">
          <button type="button" @click="getForwardMail()">确定发送</button>
        </div>
        <div class="dialog-body">
          <!-- <div class="but-outer">
            <button type="button">选择全体</button>
            <div class="groupTree">
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
          </div> -->
          <div class="acc">
            <div class="but-outer">
              <button type="button" @click="getCheckedNodes">选择部门</button>
              <div class="groupTree">
                <div class="gangwei-left">
                  <div class="orgtree">
                    <span class="orgtree-text">所属组织</span> 
                    <el-cascader
                        ref="cascader"
                        v-model="value"
                        :options="orgTreeOption"
                        :props='setKesLabel'
                        @change="changeOrg()"
                        placeholder="请选择组织"
                    ></el-cascader>
                  </div>
                   <div class="orgtree">
                    <span class="orgtree-text">所属部门</span> 
                    <select placeholder="请选择部门" v-model="deptData.name" @change="changeStore($event)">
                      <option :value="item1.id" v-for="item1 in deptData" :key="item1.id">{{item1.name}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div>

            </div>
          </div>
          <!-- 全选 -->
          <div class="acc">
            <div class="but-outer">
              <button type="button">选择全体</button>
              <el-checkbox-group v-model="stationName" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="ite in userEntityArray" :label="ite" :key="ite.id">
                  {{ite.identityEntity.name}}
                </el-checkbox>
              </el-checkbox-group>
            </div>
            <div>
            </div>
          </div>
          <!-- 全删 -->
          <div class="acc">
            <div class="but-outer">
              <button type="button">删除全体</button>
            </div>
            <div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { jsonp } from 'vue-jsonp'
import moment from 'moment';
export default {
  name: "Newproduct",
  components: {
    
  },
  data() {
    return {
      textInfo:[],
      // attachmentList:[],
      radioid:"",    //下载要传的id
      userEntityArray:[],   //根据部门id获取的人员数组
      userEntityobj:{},   //转发要的人
      stationName:[],//选中的岗位人员姓名
      deptId:"", //部门id
      setKesLabel:{   //联动组件数据配置
        value:'id',
        label:'name',
        children:'subList',
        checkStrictly: true
      },
      deptData:[],   //选中的部门数据
      orgTreeOption:[],
      value:"",
      birthday: '',  //办公时限
      groupTree: [],  //Tree列表
      defaultCheckedTree:[],
      optionss: [],
       defaultProps: {
        children: "subList",
        label: "name",
        value:"id"
      },
      identityEntity:{
        receiverIdentityId:"",  //接收人身份id
        receiverDept:"",    //接收人部门
        receiverName:"",    //接收人姓名
        receiverId:""       //接收人id
      },
      checkedCities:['666','kh'],
      selectedOptions: [],
      optionsValue: [],
      optionsOrg: [],
      form: {
        fileTitle:"",
        fileCode:"", //编号
        fileName:"", //呈报人
        reportTime:"", //呈报时间
        limitTime:"",//办文时限时间
        fileRemark:"",//备注
        text:"",//公文主件
        attachments:"",//公文附件
        fileIdea:"",//您的意见
        id:"",
        opinion:"",//处理意见
        verdict:"",
        name:"",     //呈报人
        deptName:"",  //呈报人部门所在
        fileUrl:"",    //上传得文件地址
        attachmentName:"",  //上传文件名字
        textName:"",  //上传主件名字
      },
      tabledata: [],
      tabledata1: [],
      tabledata2: [],
      tabledata3: [],
      tabledata4: [],
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
      storeId: 0,
      orgId: '',
      orgName: '',
      isDialog: false,
      isForward:false,
      radio1: '0',
      radio: 3,
      file:"",//文件
      fileList:[], //展示的文件列表
      url:" " ,   //模板的下载地址
    };
  },
  mounted() {
    this.getdata()
    this.getdatass()
    // this.preNewDocument()
    this.getOrg()
  },
  methods: {
    //模板列表
    async getdatass(){
      let data = {
        "object": {},
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.OA.templateList(data)
      this.tabledata1 = res.data
      // console.log(res);
    },
    //文件预览
    async preNewDocument(){
      let data ={}
      let res = await this.$API.OA.preNewDocument(data)
      // console.log(res);
    },
    //上传附件
    async getUploadAttachments(){
      let documentId = this.$route.query.id;
      // console.log(documentId);
      let data = { 
        "object": {
          "documentId": documentId,
          "fileUrl": this.file,
          "fileName":this.form.attachmentName,
          isMainDocument:false
        }
      }
    let res = await this.$API.OA.uploadAttachments(data)
    this.attachmentList = res.data
    console.log(res);
    },
    //上传主件
    async getUploadText(){
      let documentId = this.$route.query.id;
      // console.log(documentId);
      let data = { 
        "object": {
          "documentId": documentId,
          "fileUrl": this.form.text,
          "fileName":this.form.textName,
          isMainDocument:true
        }
      }
    let res = await this.$API.OA.uploadAttachments(data)
    this.textList = res.data
    console.log(res);
    console.log(2222);
    },
    //删除附件
    async delAttachments(){
      let id = this.multipleSelection[0].id
      let data = {
        "object": {
          "id": id,
        }
      }
    await this.$API.OA.delAttachment(data)
    this.getdata()
    // console.log(res);
    },
    //公文主件
    handleAvatarSuccess(res, file){
      console.log(file);
      this.form.text = res.data
      this.form.textName = file.name
    },
    //附件文件
    handleAvatarSuccess1(res, file) {
        this.file = res.data;
        this.form.attachments = res.data; 
        this.form.attachmentName = file.name
    },
    // 转发选中的人
    handleCheckedCitiesChange(value){
    // console.log(value);
    this.userEntityobj = value
    },
    // 已办件
     getProcessed(){
      let par = {
       "object": {
          "attachments": this.form.attachments,
          "documentId": this.$route.query.id,
          "opinion": this.form.opinion,
          "verdict": this.radio1
        }
     }
      this.$API.OA.dispose(par)
      let id = this.$route.query.id;
      let data = {
        "object": {
          "documentId": id,
          "verdict": this.radio1,
          "opinion": this.form.opinion,
          "attachments": this.form.attachments,
          }
        }
      this.$API.OA.processed(data)
      this.$router.go(-1);
      this.$message.success('转已办件成功')
    },
    // 转发公文
    async getForwardMail(){
        this.getAddFile()
        let id = this.$route.query.id;
        // console.log(this.userEntityobj);
        this.userEntityobj.forEach((item,index)=>{
          this.identityEntity.receiverIdentityId = item.identityEntity.id
          this.identityEntity.receiverDept = item.identityEntity.deptName
          this.identityEntity.receiverName = item.identityEntity.name
          this.identityEntity.receiverId = item.identityEntity.userId
          // console.log(this.identityEntity);
        })
        let data = {
          "object": {
            "documentId": id,
            'receiverIdentityList':[
              {
                "receiverDept": this.identityEntity.receiverDept,
                "receiverId": this.identityEntity.receiverId,
                "receiverIdentityId": this.identityEntity.receiverIdentityId,
                "receiverName": this.identityEntity.receiverName
              }
            ]
          }
        }
        let res = await this.$API.OA.forwardMail(data)
        // console.log(res);
        this.$message.success("转发公文成功")
        this.$router.push("/internalManage/fileSet/notDone")
    },
    async getdata() {
      if(this.$route.query.id){
      let id = this.$route.query.id;
      let params = {
       "object": {"documentId": id,}}
      let res =await this.$API.OA.editFile(params)
      console.log(res);
      this.form.fileCode = res.data.documentNumber;
      this.form.fileTitle = res.data.title;
      this.form.limitTime = res.data.limitTime;
      this.form.reportTime = moment(res.data.reportTime).format("YYYY-MM-DD");
      this.form.fileRemark = res.data.remark; 
      this.form.name = this.$store.state.user.name
      this.form.deptName = this.$store.state.user.deptName
      res.data.reporter = this.$store.state.user.name
      res.data.deptName = this.$store.state.user.deptName
      this.tabledata2 = res.data.list

      res.data.list.forEach((item, key)=>{
        this.form.opinion = item.opinion + ' '
        if(item.handleTime != null){
          item.index = key + 1
          item.handleTime = moment(item.handleTime).format("YYYY-MM-DD HH:mm:ss");
        }
        if(item.verdict == 0)  item.verdict = "同意"
        if(item.verdict ==1)  item.verdict = "不同意"
        item.verdict = `${item.opinion}${'　'}${item.verdict}`
      })
      }
    let id = this.$route.query.id;
    let data = {
      "object":{
        'documentId':id,
        'isMainDocument':false,
      }
    }
    let dataText = {
      "object":{
        'documentId':id,
        'isMainDocument':true,
      }
    }
    let result = await this.$API.OA.attachmentsList(data)
    let resultText = await this.$API.OA.attachmentsList(dataText)
    this.tabledata3 = result.data
    this.tabledata4 = resultText.data
    _.forEach(result.data, function(item, key){
        if(item.fileUrl != null){
          item.index = key + 1
          item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
        }
      })
    _.forEach(resultText.data, function(item, key){
        if(item.fileUrl != null){
          item.index = key + 1
          item.createTime = moment(item.createTime).format("YYYY-MM-DD HH:mm:ss");
        }
      })
    },
    forward(){
      this.isForward = true
    },
    // async getGroupTree(){
    //   let params = {"orgId": this.deptId}
    //   let res = await this.$API.orgSet.loadAllGroupTree_Group(params)
    //     console.log(res)
    //     this.groupTree = res.data
    // },
    // tree事件
    // handleCheckChange(data, checked, indeterminate) {
    //   // console.log(data, checked, indeterminate);  
    // },
    async getCheckedNodes(){
      // console.log(this.$refs.group.getCheckedNodes());
      // let deptId = this.$refs.group.getCheckedNodes()[0].id
      // let orgId = this.$refs.group.getCheckedNodes()[0].parentId
      // console.log(deptId);
      // let data = {
      //   "object": {
      //     "deptId": deptId,
      //     'orgId':orgId,
      //   },
      //   "pageNum": 1,
      //   "pageSize": 20
      // }
      // let res = await this.$API.OA.getClerk(data)
      // console.log(res);
    },
    radioId(value){
      this.radioid = value
      // console.log(value);
    },
    // 选择模板
    async onSure(){
      let data = {
        "object": {
          id:this.radioid
        },
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.OA.templateList(data)
      // console.log(res);
      let url = res.data[0].url
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      iframe.style.height = 0; 
      iframe.src = url; 
      document.body.appendChild(iframe);
      this.isDialog = false
    },
    // 下载附件
    download(){
      let fileUrl = []
      this.multipleSelection.forEach((item,index)=>{
        fileUrl.push(item.fileUrl)
      })

      fileUrl.forEach(url =>{
        console.log(url);
        const iframe = document.createElement("iframe");
        iframe.style.display = "none"; 
        iframe.style.height = 0; 
        iframe.src = url; 
        document.body.appendChild(iframe);
      })
    },
    // 处理意见
    // 新建编辑
   async getAddFile() {
    if(!this.form.fileTitle) return this.$message.error('公文标题不能为空')
    if(!this.form.limitTime) return this.$message.error('办文时限不能为空')
      let params = {
        "object": {
          attachmentList:this.attachmentList,
          "state":0,  //0-未办件,1-已办件
          'documentType':"FF",
          'submit':"false",
          "title": this.form.fileTitle,
          "documentNumber": this.form.fileCode,
          "limitTime": this.form.limitTime,
          "remark": this.form.fileRemark,
          "textFileName": this.form.text,
          "opinion": this.form.opinion,
          "reportTime": this.form.reportTime,
          "id":this.$route.query.id ? this.$route.query.id:this.form.id,
          verdict:""
        }
      }
      params.object.limitTime = new Date(this.form.limitTime).getTime()
      params.object.reportTime = new Date(this.form.reportTime).getTime()
     if(this.$route.query.id){
      await this.$API.OA.addFile(params)
      this.$message.success('编辑成功')
     }else{
      await this.$API.OA.addFile(params)
      this.$message.success('新增成功')
     }
     let par = {
       "object": {
          "attachments": this.file,
          "documentId": this.$route.query.id,
          "opinion": this.form.opinion,
          "verdict": this.radio1
        }
     }
     let result = await this.$API.OA.dispose(par)
     console.log(result);
      if(this.file != ''){
        this.getUploadAttachments()
        console.log(11);
      }
      if(this.form.text != ''){
        this.getUploadText()
        console.log(222);
      }
      this.toBackList()
    },
    toBackList() {
      this.$router.go(-1);
    },
    cancelbtn() {
      let t = this;
      t.$router.push({ path: "/product" });
    },
    // 组织
    async getOrg(){
        let params = {}
        let res = await this.$API.orgSet.findAllOrgTree_Org(params)
        this.orgTreeOption = res.data
    },
    changeOrg(){
      this.orgId = this.$refs["cascader"].getCheckedNodes()[0].value
      this.getDept()
    },
    async getDept(){
      let params = {
        "object": {
          "orgId": this.orgId
        },
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.orgSet.queryList_Dept(params)
      this.deptData = res.data
    },
    // 部门id
    changeStore(e){
      this.deptId = e.target.value 
      this.getRoleData()
    },
    // 所在部门的所有人员
    async getRoleData(){
      let data = {
        "object": {
          "deptId": this.deptId
        },
        "pageNum": 1,
        "pageSize": 20
      }
      let res = await this.$API.OA.getClerk(data)
      this.userEntityArray = res.data
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
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
@import "@/styles/dialog.scss";
/deep/.el-table .caret-wrapper {
    background: url('../../../assets/images/sort.png') center no-repeat;
    width: 12px;
    height: 12px;
    margin-left: 4px;
}
/deep/.el-table .sort-caret{
  border: none;
}
.table-main .table-title{
    width: 764px;
}
.table-main table .table-right{
    width: 168px;
}
/deep/.el-upload {
    display: flex;
    justify-content: center;
    align-items: center;
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

  .lefts{
    padding: 0 !important;
  }

.file-button{
    display: flex;
    padding-bottom: 12px;
    padding-top: 6px;
    button{
        margin-right: 8px;
        padding: 6px;
        border: none;
        border-radius: 2px;
        background: #438AFE;
        color: #fff;
        outline: none;
        cursor: pointer;
        display: flex;
        line-height: 16px;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 14px;
        height: 28px;
    }
    img{
        margin-right: 5px;
    }
}

.file-content{
    padding: 8px 6px;
    margin-top: 8px;
    margin-bottom: 4px;
    background: #fff;
    color: #438AFE;
    height: 28px;
    font-size: 14px;
    span{
        cursor: pointer;
    }
}

/deep/hr{
  margin-top: 8px;
  border: 0;
  border-top: 1px solid #E0E1E6;
}

.top{
  padding-top: 20px;
  margin-right: 60px;
  margin-bottom: 16px;
}

.idea{
  margin: 0 30px;
}

/deep/.el-table th{
    padding: 1px 0 !important;
}

/deep/.el-table td{
  padding: 2px 0;
}

.table-right /deep/.el-table{
    width: 661px !important;
}

.table-main{
  margin-left: 10px;
}

.outerBut{
  display: flex;
  background: #438AFE;
  align-items: center;
  img{
    width: 12px;
    height: 12px;
    margin-right: 0px;
    margin-left: 6px;
  }
}
button img{
  width: 16px;
  height: 16px;
}
.file-button button{
  background-color: #FFDFCB !important;
  color:#333 !important;
}
.icondownload{
  width: 21px;
  height: 28px;
  background-color: #FFDFCB;
  line-height: 32px;
  padding-left: 5px;
  z-index: 6;
  margin-right: -8px;
}
.file-button img.icondownload{
  margin-right: 0px !important;
}
</style>