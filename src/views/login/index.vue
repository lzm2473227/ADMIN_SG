<template>
 <div class="login">
    <div class="login-content">
      <div class="content-form">
        <div class="form-title">
          <img
            src="../../assets/images/login_logo.png"
          />
          <div class="managetitle">韶关全球商品交易平台</div>
        </div>
        <div class="form-content">
          <div class="login-info">
            <div class="select-user">
              <el-radio-group v-model="radio">
                <el-radio :label="0">个人用户</el-radio>
                <el-radio :label="1">企业用户</el-radio>
              </el-radio-group>
            </div>
            <form action="" v-show="isLogin">
              <div class="username">
                <span>手机号码:</span>
                <input type="text" v-model="loginForm.username" placeholder="请输入手机号码">
                <!-- <span class="descfont">（18位身份证号码）</span> -->
              </div>
              <div class="username">
                <span>登录密码:</span>
                <input type="password" v-model="loginForm.password" placeholder="请输入密码">
                <span class="descfont">（密码为6-16位）</span>
              </div>
              <!-- <div class="username">
                <span class="verification-code">验证密码:</span>
                <input type="text" v-model="loginForm.verificationCode" placeholder="请输入验证码">
                <span class="descfont rand-code" @click="sendSMS">（点击随机码）</span>
              </div> -->
              <el-checkbox class="save-login" v-model="saveUser">保存登录信息</el-checkbox>
              <div class="login-btn">
                <button @click.prevent="handleLogin($event)" type="button">登录</button>
              </div>
              <div class="register">
                <span @click="onChangeLogin('1')" class="register-btn">免费注册&nbsp;&nbsp;>></span>
                <!-- <span>忘记密码？</span> -->
              </div>
            </form>
            <form action="" v-show="isRegister">
              <div class="username">
                <span>手机号码:</span>
                <input type="text" v-model="telNum" placeholder="请输入手机号码">
                <!-- <span class="descfont">（18位身份证号码）</span> -->
              </div>
              <!-- <div class="username">
                <span class="verification-code">验证密码:</span>
                <input type="text" v-model="loginForm.verificationCode" placeholder="请输入验证码">
                <span class="descfont rand-code" @click="sendSMS">（点击随机码）</span>
              </div> -->
              <div class="username">
                <span>设置密码:</span>
                <input type="password" v-model="pwd" placeholder="请输入密码">
                <span class="descfont">（密码为6-16位）</span>
              </div>
              <div class="username">
                <span>确认密码:</span>
                <input type="password" v-model="pwd2" placeholder="请再次输入密码">
                <span class="descfont">（密码为6-16位）</span>
              </div>
              <el-checkbox class="save-login" v-model="agree">我已阅读并同意<span style="color: #008bd6">《服务协议》</span>和<span style="color: #008bd6">《隐私政策》</span></el-checkbox>
              <div class="login-btn">
                <button @click.prevent="onRegister($event)" type="button">立即注册</button>
              </div>
              <div class="register">
                <span>已有账号？</span>
                <span @click="onChangeLogin('2')" class="register-btn">请登录&nbsp;&nbsp;>></span>
              </div>
            </form>
            <div v-if="isInfo" class="identity-info">
              <p>完善身份信息</p>
              <div class="acc">
                <ul>
                  <li 
                    v-for="item in userlist" 
                    :key='item.id'
                    :class="{active : active == item.name}"
                    @click="selected(item.name)"
                  >{{item.name}}</li>
                </ul>
              </div>
              <div class="login-btn">
                <button @click.prevent="onInfo($event)" type="button">确定</button>
              </div>
              <div class="register">
                <span>已有账号？</span>
                <span @click="onChangeLogin('3')" class="register-btn">请登录&nbsp;&nbsp;>></span>
              </div>
            </div>
          </div>
          <div class="dottline"></div>
          <div class="technology-support">
            <span>技术支持电话：0755-83825745</span>
            <span>©2021 深圳凯华技术有限公司版权所有</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import Cookies from 'js-cookie'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('Please enter the correct user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    return {
      saveUser:{},
      loginForm: {
        username: '',
        password: '',
        verificationCode:""
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      userlist:[
        {
          name:'企业买方',id:1
        },
        {
          name:'企业卖方',id:2
        },
        {
          name:'物流提供商',id:3
        },
        {
          name:'仓储服务商',id:4
        },
        {
          name:'银行机构',id:5
        },
        {
          name:'保险机构',id:6
        },
      ],
      loading: false,
      passwordType: 'password',
      redirect: undefined,
      isLogin: true,
      telNum: '',
      pwd: '',
      pwd2: '',
      captcha: '123456',
      agree: false,
      active:"",
      isInfo: false,
      isRegister: false,
      radio: 0
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
        // console.log(this.redirect);
      },
      immediate: true
    }
  },
  methods: {
    selected(name){
      this.active = name;
    },
    onRegister(){
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if(reg.test(this.telNum) === false) return this.$message.error('请输入正确的手机号码')
      if(!this.pwd) return this.$message.error('请输入密码')
      if(this.pwd !== this.pwd2) return this.$message.error('两次输入的密码不一致')
      if(!this.agree) return this.$message('请勾选阅读并同意协议')
      if(this.radio === 0){
        let params = {
          "object": {
            "captcha": this.captcha,
            "password": this.pwd2,
            "telNum": this.telNum
          }
        }
        this.$API.login.registerUser(params).then((res) => {
          if(res.code === 'SUCCESS'){
            this.$message.success("注册成功")
            this.isLogin = true
            this.isInfo = false
            this.isRegister = false
            this.radio === 0
          }
        })
      }
      if(this.radio === 1){
        let params = {
          "object": {
            "captcha": this.captcha,
            "password": this.pwd2,
            "telNum": this.telNum
          }
        }
        this.$API.user.registerUser(params).then((res) => {
          if(res.code === 'SUCCESS'){
            this.$message.success("注册成功")
            this.isLogin = true
            this.isInfo = false
            this.isRegister = false
            this.radio === 1
            // this.getEnterpriseId() 
          }
        })
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    async handleLogin() {
      // this.$refs.loginForm.validate(valid => {
        // if (valid) {
          if(this.radio === 0) {
            let params = {
              password: this.loginForm.password,
              username: this.loginForm.username
            }
            let res = await this.$API.login.login(params)
            if(res.code === 'SUCCESS'){
              this.$message.success("登录成功")
              Cookies.set('token_personal', res.data.token, { domain: '.realbrand.net' })
              // Cookies.set('id_personal', res.data.id, { domain: '.realbrand.net' })
              window.location.href = 'http://trades.realbrand.net/'
            }else{
              return false
            }
          }
          if(this.radio === 1){
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm).then(() => {
              this.loading = false
              // if(this.$store.state.user.id === ''){
              //   this.isLogin = false
              //   this.isRegister = false
              //   this.isInfo = true
              //   return false
              // }
              // if(!this.$store.state.user.enterpriseId){
              //   this.isLogin = false
              //   this.isRegister = false
              //   this.isInfo = true
              //   // return false
              // }
              // this.$message.success("成功登录")
              // if(this.$store.state.user.identityDtoList && this.$store.state.user.identityDtoList.length === 0){
              //   this.$router.push('/internalManage/companyInfo/companyDetailInfo')
              // }else{
                this.$router.push({ path: this.redirect || '/'})
                // this.$router.push('/internalManage/companyInfo/companyDetailInfo')
              // }
            }).catch(() => {
              this.loading = false
            })
          }
        // } 
        // else {
          // console.log('error submit!!')
          // return false
        // }
      // })
    },
    onInfo(){
      this.$router.push('CompanyDetailInfo')
    },
    onChangeLogin(val){
      if(val === '1'){
        this.isLogin = false
        this.isRegister = true
      }
      if(val === '2'){
        this.isLogin = true
        this.isRegister = false
      }
      if(val === '3'){
        this.isLogin = true
        this.isRegister = false
        this.isInfo = false
      }
    },
    //验证码
    sendSMS(){

    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    // width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      // &:-webkit-autofill {
        // box-shadow: 0 0 0px 1000px $bg inset !important;
        // -webkit-text-fill-color: $cursor !important;
      // }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    // background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    position: relative;
    // width: 420px;
    // max-width: 100%;
    // padding: 160px 35px 0;
    // margin: 0 auto;
    // overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
.login {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.login-role {
  height: 80px;
  background: linear-gradient(150deg, #2699d2, #3183c6);
}
.role-list {
  width: 1200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  text-align: center;
  margin: 0 auto;
}
.list-base {
  padding: 31px 15px 31px 15px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.login-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.roleactive {
  background: #0566B2;
}
.content-form {
  width: 650px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
}
.form-title {
  height: 90px;
  // padding: 0 120px 0 120px;
  background-image: url("../../assets/images/login_titlebg.png");
  background-size: cover;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.form-content {
  background: #f8f8f8;
}
.descfont{
    font-size: 14px;
font-family: Source Han Sans CN;
 
line-height: 44px;
color: #666666;
}
.managetitle {
  font-size: 32px;
  font-family: FZShuSong-Z01;
  padding-left: 30px;
}
.dottline {
  height: 1px;
  background-image: linear-gradient(
    to right,
    #0a73fc 0%,
    #0a73fc 50%,
    transparent 0%
  );
  background-size: 10px 1px;
  background-repeat: repeat-x;
}
.technology-support {
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-family: Source Han Sans CN;
  font-weight: 400;
  line-height: 27px;
  color: #999999;
  opacity: 1;
}
.info-username {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 550px;
}
.usernamelabel {
  width: 80px;
}
.login-info {
  form{
    position: relative;
  }
  display: flex;
  flex-direction: column;
  // height: 250px;
  padding: 50px 0 0 0;
  align-items: center;
  justify-content: space-between;
}
.username{
  position: relative;
  margin-bottom: 20px;
  input{
    width: 270px;
    height: 40px;
    margin-left: 10px;
    padding-left: 10px;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    outline: none;
    color: #606266;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
  input:focus{
    outline: none;
    border-color: #409eff;
  }
}
.info-psw {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 550px;
}
.verification-code{
  color: #008BD6;
  text-decoration: underline;
}
.rand-code{
  cursor: pointer;
}
.rand-code:hover{
  color: #008BD6;
}
.tip{
  position: absolute;
  top: 48px;
  left: 78px;
  font-size: 12px;
  color: #FC0E0E;
}
.register{
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: right;
  span{
    display: inline-block;
    padding: 5px;
    cursor: pointer;
  }
  .register-btn{
    color: #008bd6;
  }
}
/deep/.el-form-item__label{
font-size: 16px;
font-family: Source Han Sans CN;
line-height: 44px;
color: #333333;
}
/deep/.verification-code{
    .el-form-item__label{
      color: #008BD6;
      text-decoration: underline;
    }
  }
.login-btn{
  text-align: center;
  button{
    width: 330px;
    height: 44px;
    background: #008bd6;
    border: none;
    border-radius: 4px;
    outline: none;
    color: #fff;
    cursor: pointer;
  }
}
ul{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0;
    li{
      width: 115px;
      height: 40px;
      background: #F3F8FF;
      opacity: 1;
      border-radius: 2px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5px;
      cursor: pointer;
      color: #333;
    }
    li:hover{
      border: 1px solid #438AFE;
    }
  }
.acc{
  width: 460px;
  margin: 0 auto;
  span{
    width: 100px;
    text-align: right;
    font-size: 16px;
    color: #384F71;
    margin-top: 32px;
  }
  span.last{
    margin-bottom: 32px;
  }
}
.active{
  border: 1px solid #438AFE;
}
.select-user{
  margin-bottom: 30px;
}
/deep/.login-form{
  .el-input--small{
    // width: 280px;
  }
  .el-input--small .el-input__inner{
    height: 44px;
  }
}
/deep/.el-form-item--small.el-form-item{
  margin-bottom: 24px;
}
/deep/.el-form-item--small.el-form-item:last-child{
  margin-bottom: 0;
}
/deep/.save-login{
  margin-bottom: 24px;
  margin-left: 78px;
}
/deep/.el-form-item{
  display: flex;
} 
</style>
