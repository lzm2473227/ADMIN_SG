<template>
  <el-card class="container">
    <el-button
      type="primary"
      icon="el-icon-plus"
      :disabled="!category3Id"
      @click="$emit('updateIsShow', 2)"
    >
      添加SPU
    </el-button>

    <el-table
      v-loading="loading"
      :data="spuList"
      border
      class="container-table"
    >
      <el-table-column label="序号" width="50" type="index" align="center" />
      <el-table-column prop="spuName" label="SPU名称" />
      <el-table-column prop="description" label="SPU描述" />
      <el-table-column label="操作">
        <template v-slot="{ row }">
          <el-tooltip content="添加SKU" placement="top">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click="showAddSku(row.id)"
            />
          </el-tooltip>

          <el-tooltip content="修改SPU" placement="top">
            <el-button type="warning" icon="el-icon-edit" size="mini" />
          </el-tooltip>

          <el-tooltip content="查看SKU列表" placement="top">
            <el-button type="info" icon="el-icon-info" size="mini" />
          </el-tooltip>

          <el-popconfirm
            icon="el-icon-info"
            icon-color="red"
            title="确定删除吗？"
            class="spu-list-confirm"
          >
            <el-tooltip slot="reference" content="删除SPU" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini" />
            </el-tooltip>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[3, 6, 9, 12]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { reqGetSpuList } from '@/api/product/spu'

export default {
  name: 'SpuList',
  data() {
    return {
      loading: false,
      spuList: [],
      currentPage: 1,
      pageSize: 3,
      total: 0
    }
  },
  computed: {
    ...mapState('category', ['category3Id'])
  },
  watch: {
    category3Id: {
      handler(category3Id) {
        if (!category3Id) {
          // 重置数据
          this.spuList = []
          this.total = 0
          this.currentPage = 1
          this.pageSize = 3
          return
        }
        this.getSpuList()
      },
      // 为了添加、修改属性时会重新获取spuList
      // 配和v-if一起使用
      immediate: true
    }
  },
  methods: {
    ...mapMutations('spu', ['SET_SPU_ID']),
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getSpuList()
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getSpuList()
    },
    // 获取SPU列表
    async getSpuList() {
      const { category3Id, currentPage, pageSize } = this
      this.loading = true
      const res = await reqGetSpuList({
        category3Id,
        page: currentPage,
        limit: pageSize
      })
      this.loading = false
      this.spuList = res.records
      this.total = res.total
    },
    showAddSku(spuId) {
      this.SET_SPU_ID(spuId)
      this.$emit('updateIsShow', 3)
    }
  }
}
</script>

<style>
.spu-list-confirm {
  margin-left: 10px;
}
</style>
