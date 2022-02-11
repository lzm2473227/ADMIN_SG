<template>
  <div v-if="!item.hidden" class="flat">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template slot="title">
        <item
          v-if="item.meta"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from "path";
import { isExternal } from "@/utils/validate";
import Item from "./Item";
import AppLink from "./Link";
import FixiOSBug from "./FixiOSBug";

export default {
  name: "SidebarItem",
  components: { Item, AppLink },
  mixins: [FixiOSBug],
  props: {
    // route object
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: "",
    },
  },
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {
      flat: false,
      isDisabled: false
    };
  },
  computed: {
    // ...mapGetters([
    //   'sidebar'
    // ]),
    routes() {
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      // if (meta.activeMenu) {
      //   return meta.activeMenu
      // }
      // console.log(meta.activeMenu);
      // console.log(route);
      return { meta, path }
    },
  },
  created(){
    this.isDisabled = this.$store.state.user.identityDtoList.length === 0?true:false
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.hidden) {
          return false;
        } else {
          this.onlyOneChild = item;
          // console.log(item);
          return true;
        }
      });
      // console.log(showingChildren);  所有router相关东西
      if (showingChildren.length === 1) {
        return true;
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (isExternal(routePath)) {
        // console.log(routePath);
        return routePath;
      }
      if (isExternal(this.basePath)) {
        // console.log(this.basePath);
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
    b(){
      // console.log(this.item.meta);
      // console.log(111);
      // this.flat = !this.flat
      // let a  = this.activeMenu
      // console.log( this.activeMenu);
      // console.log(a.matched[0].meta.icon);
      // if(this.flat == false){
      //   a.matched[0].meta.icon = 'dashboard'
      // }
      // if(this.flat == false){
      //   this.item.meta.icon = 'eye'
      //   console.log(111);
      // }
      // if(this.flat == false){
        // this.item.meta.icon = 'dashboard'
        // console.log(222);

      // }
    }
    // this.activeMenu.matched[0].meta.icon = ''
    // }
    // a() {
    //   this.flat = !this.flat
    //   if (this.flat != false) {
    //     var obj1 = document.getElementsByClassName("el-submenu__icon-arrow");
    //     // var beforeStyle = window.getComputedStyle(obj1, ":before");
    //     // obj1.style.display = "none"  el-submenu__icon-arrow el-icon-arrow-down
    //     console.log(obj1);   //.el-iconarr
    //     // obj1.content = "-"
    //     // console.log(beforeStyle.content);
    //     // obj1.removeClass('-').addClass('+')
    //     obj1[0].classList.remove("el-icon-arrow-down");
    //     obj1[0].classList.add("el-iconarr");
    //     console.log(111);
    //     // localStorage.setItem("obj1[0]",el-iconarr)
    //     // removeClasss(obj1,"a");
    //     // console.log(obj1.classList);
    //     // beforeStyle.CSSStyleDeclaration.content = ""+""
    //   }
    //   if (this.flat == false) {
    //     var obj1 = document.getElementsByClassName("el-submenu__icon-arrow");
    //     // var beforeStyle = window.getComputedStyle(obj1, ":before");
    //     // obj1.style.display = "none"  el-submenu__icon-arrow el-icon-arrow-down
    //     console.log(obj1);   //.el-iconarr
    //     // obj1.content = "-"
    //     // console.log(beforeStyle.content);
    //     // obj1.removeClass('-').addClass('+')
    //     obj1[0].classList.remove("el-iconarr");
    //     obj1[0].classList.add("el-icon-arrow-down");
    //     console.log(222);
    //   }
    // },
  },
  mounted(){
    
  }
};
</script>



