<template>
  <el-card class="container">
    <!-- disabled 会禁用所有表单项 -->
    <el-form inline :disabled="disabled">
      <el-form-item label="一级分类" class="category-form-item">
        <!--
          没有使用 v-model，会直接修改id数据
          我们需要发送请求，请求二级分类数据
          @change="getCategory2"
          @change="getCategory2List"
         -->
        <el-select
          :value="category1Id"
          @change="getCategory2List"
          placeholder="请选择一级分类"
        >
          <el-option
            v-for="c1 in category1List"
            :key="c1.id"
            :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类" class="category-form-item">
        <el-select
          :value="category2Id"
          @change="getCategory3List"
          placeholder="请选择二级分类"
        >
          <el-option
            v-for="c2 in category2List"
            :key="c2.id"
            :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类" class="category-form-item">
        <el-select
          :value="category3Id"
          @change="SET_CATEGORY3_ID"
          placeholder="请选择三级分类"
        >
          <el-option
            v-for="c3 in category3List"
            :key="c3.id"
            :label="c3.name"
            :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "CategorySelector",
  mounted() {
    // 请求一级分类
    this.getCategory1List();
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState("category", [
      "category1Id",
      "category2Id",
      "category3Id",
      "category1List",
      "category2List",
      "category3List",
    ]),
  },
  methods: {
    ...mapActions("category", [
      "getCategory1List",
      "getCategory2List",
      "getCategory3List",
    ]),
    ...mapMutations("category", ["SET_CATEGORY3_ID"]),
    // getCategory2(value) {
    //   this.getCategory2List(value);
    // },
  },
};
</script>

<style>
.category-form-item {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
