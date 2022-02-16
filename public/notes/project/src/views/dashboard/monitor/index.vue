<template>
  <el-row :gutter="10">
    <el-col :sm="24" :lg="12">
      <Search />
    </el-col>
    <el-col :sm="24" :lg="12"><Category /></el-col>
  </el-row>
</template>

<script>
import Search from './search'
import Category from './category'

export default {
  name: 'Monitor',
  components: {
    Search,
    Category
  }
}
</script>

<style lang="sass" scoped></style>
