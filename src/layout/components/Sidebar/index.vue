<template>
  <div :class="{'has-logo':showLogo}">
    <div class="title-bar"></div>
    <div class="userid">
      <div class="userbody">
        <div class="info">管理后台</div>
        <img src="@/assets/images/8592.png" alt="">
        <div class="user-info">
          <a>{{username}}</a>
          <!-- <div class="cut" @click="flat">切换身份</div> -->
        </div>
          <button type="button" class="logout" @click="logout">退出</button>
      </div>
    </div>
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        @select='asda'
        @open="handleOpen"
        @close="handleClose"
        class="el-menu-vertical-demo"
        text-color="rgb(96, 98, 102)"
        active-text-color="#ccc"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBgc"
        :unique-opened="false"
        :collapse-transition="false"
        mode="vertical"
      >
        <!-- <sidebar-item @click="a" v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> -->
        <sidebar-item @click="a" v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
    <div class="pay-dialog" v-show="isDialog">
      <!-- 活动弹窗 -->
      <div class="dialog-content">
        <div class="dialog-top">
          <span>选择指定消费者</span>
          <img @click="onCancel" src="@/assets/images/close.png" alt="">
        </div>
        <div class="dialog-body">
          <span>请选择身份</span>
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
          <div class="scan-code">
            <button class="sure" @click="onCancel()">确定</button>
            <button @click="onCancel">取消</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import store from '@/store'

export default {
  data(){
    return{
      // openeds: ['1'],
      username:"",
      active:"",
      isDialog: false,
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
      ]
    }
  },
  mounted(){
    this.username = this.$store.state.user.name
  },
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    routes() {
      console.log(this.$router.options.routes)
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // console.log(route);
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        // console.log(111);
        return meta.activeMenu 
      }
      // console.log(meta.activeMenu);
      // console.log(route);
      // console.log(this.$store);
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
  },
  methods:{
    logout() {
      this.$store.dispatch('user/resetToken')
      // store.state.user.token = removeToken('KAI_HUA_ADMIN_TOKEN')
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      // console.log(store);
      // removeToken('vue_admin_template_token')
      this.$router.push('/login')
    },
    selected(name){
      this.active = name;
    },
    onCancel(){
      this.isDialog = false
    },
    flat(){
      this.isDialog = true
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
      // console.log(this.$route);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    asda(index, keyPath) {
      // console.log(index, keyPath);
    },
    a(){
      // console.log(111);
    },
  }
}
</script>    
<style lang="scss" scoped>
  #app .sidebar-container .el-scrollbar {
    height: 670px;
    padding-left: 25px;
    margin-left: -10px;
}
.title-bar{
  height: 50px;
  background-color: #288dff;
}
.userid{
  width: 180px;
  height: 180px;
  background-color: #fff;
  border: 1px solid #E0E1E6;
  margin: 15px;
}
.userbody{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  img{
    display: block;
    width: 60px;
    height: 60px;
    margin-top: 10px;
  }
  .user-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // margin-bottom: -15px;
    margin-top: 6px;
    div{
      font-size: 14px;
      
    }
    a{
      font-size: 14px;
      color: #3377FF;
      text-decoration: underline;
    }
    span{
      font-size: 16px;
      margin-bottom: 6px;
    }
  }
  .info{
    height: 40px;
    font-size: 16px;
    width: 178px;
    background: #F2F4F8;
    opacity: 1;
    color: #333333;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
  }
}
//menu导航条css
/deep/.el-scrollbar__wrap {
  height: 666px;
  overflow: scroll;
  background-color: #E7E8EC;
}
#app .sidebar-container 
/deep/.el-submenu li.is-active{
  background-color: #4E83FF !important;
  color: #fff !important;
  span{
    // color: #fff;
  }
}
#app .sidebar-container 
/deep/.is-active > .el-submenu__title {
  color: rgb(96, 98, 102) !important;
}
#app .sidebar-container .nest-menu 
/deep/.el-submenu > .el-submenu__title:active,
#app .sidebar-container 
/deep/.el-submenu .el-menu-item:active {
  background-color: #4E83FF !important;
  // color: #fff !important;
  span{
    // color: #fff;
  }
}
#app .sidebar-container /deep/.nest-menu 
.el-submenu > .el-submenu__title,
#app .sidebar-container 
/deep/.el-submenu .el-menu-item {
  min-width: 200px !important;
  height: 38px;
  background-color: #E7E8EC !important;
  display: flex;
  // justify-content: center;
  align-items: center;
  color: #333;
  span{
    font-size: 14px;
  }
}
#app .sidebar-container 
/deep/.el-submenu__title:hover {
  background-color: #b2becc !important;
}
/deep/.el-submenu__title{
  background-color: #E7E8EC !important;
  height: 38px;
  display: flex;
  // justify-content: center;
  align-items: center;
  span{
    font-size: 14px;
    // font-weight: bold;
    color: #333;
  }
}
/deep/.el-submenu__title i{
  margin-right: 10px;
}
/deep/.el-icon-arrow-down::before{
  content: "";
}
/deep/.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
    /* -webkit-transform: rotateZ(180deg); */
  transform: rotateZ(0deg);
}
 /deep/.el-table__expand-icon 
  /deep/.el-icon-arrow-right:before{
    content: "\e6d9";
    border: 1px solid #ccc;
    padding: 2px;
  }

  /deep/.el-table__expand-icon--expanded
  /deep/.el-icon-arrow-right:before{
    content: "\e6d8";
  }
  /deep/.el-submenu__title svg{
    position: absolute;
    left: 141px;
    top: 14px;
    // z-index: 9999;
  }
/deep/.el-icon-arrow-down:before{
  width: 16px;
  height: 16px;
  background-color: #fff;
  border-radius: 1px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #a0c3f1;
  position: absolute;
  right: 0px;
  top: 0px;
  content: "+";
  font-weight: bold;
  font-size: 16px;
  font-style: normal;
  color: black;
}
.cut{
  width: 72px;
  height: 28px;
  background: #438AFE;
  opacity: 1;
  border-radius: 2px;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  cursor: pointer;
}
@import '@/styles/reset.scss';
.dialog-body span{
  display: block;
  width: 80px;
  height: 21px;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 21px;
  color: #666666;
  padding-top: 40px ;
  margin-bottom: 35px;
  margin-left: 105px;
}
.scan-code{
  margin-top: 40px;
  padding:  24px 0;
  background-color: #F8F8F8;
  display: flex;
  justify-content: center;
  align-items: center;
}
.dialog-content .dialog-body {
  display: block;
  padding: 0 ;
  ul{
    display: flex;
    flex-wrap: wrap;
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
    }
    li:hover{
      border: 1px solid #438AFE;
    }
  }
}
.acc{
  width: 400px;
  margin: 0 auto;
  span{
    width: 100px;
    text-align: right;
    font-size: 16px;
    color: #384F71;
    margin-right: 36px;
    margin-top: 32px;
  }
  span.last{
    margin-bottom: 32px;
  }
}
.bot{
  width: 100%;
}
.active{
  border: 1px solid #438AFE;
  
}
.logout{
  width: 60px;
  height: 28px;
  margin-top: 10px;
  background-color: rgb(15, 131, 240);
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 2px;
  color: #fff;
  font-size: 14px;
}
</style>

