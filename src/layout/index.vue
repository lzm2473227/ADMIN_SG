<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div class="title-bar">
        <span>韶关全球商品交易平台</span>
        <!-- <span>{{$store.state.user.identityDtoList[0].identityEntity.orgName}}</span> -->
      </div>
      <!-- 隐藏展开左侧菜单栏 -->
      <!-- <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div> -->
      <app-main />
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  // .drawer-bg {
  //   background: #000;
  //   opacity: 0.3;
  //   width: 100%;
  //   top: 0;
  //   height: 100%;
  //   position: absolute;
  //   z-index: 999;
  // }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    // width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .title-bar{
    height: 50px;
    // width: calc(100vw - 195px);
    width: 100%;
    background: #288dff;
    opacity: 1;
    position: fixed;
    z-index: 99;
    // margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 210px;
    margin-left: -5px;
    span{
      font-size: 26px;
      font-family: STHeiti;
      font-weight: 400;
      line-height: 42px;
      color: #ffffff;
    }
  }
</style>
