<template>
  <el-card class="container">
    <el-table
      v-loading="loading"
      :data="skuList"
      border
      class="container-table"
    >
      <el-table-column label="序号" width="50" type="index" align="center" />
      <el-table-column prop="skuName" label="名称" />
      <el-table-column prop="skuDesc" label="描述" />
      <el-table-column label="默认图片">
        <template v-slot="{ row }">
          <!-- eslint-disable-next-line -->
          <img
            :src="row.skuDefaultImg"
            :alt="row.skuName"
            style="width: 100px; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column prop="weight" label="重量(KG)" />
      <el-table-column prop="price" label="价格(元)" />
      <el-table-column label="操作" width="300">
        <template v-slot="{ row }">
          <!-- isSale 1: 上架  2: 下架 -->
          <el-button
            :type="row.isSale ? 'info' : 'success'"
            :icon="[`el-icon-${row.isSale ? 'bottom' : 'top'}`]"
            size="mini"
          >
            {{ row.isSale ? '下架' : '上架' }}
          </el-button>
          <el-button type="warning" icon="el-icon-edit" size="mini">
            修改
          </el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="prev, pager, next, jumper, total, sizes"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script>
import { reqGetSkuList } from '@/api/product/sku'

export default {
  name: 'Sku',
  data() {
    return {
      skuList: [],
      loading: false,
      currentPage: 1,
      pageSize: 10,
      total: 0
    }
  },
  mounted() {
    this.getSkuList(this.currentPage, this.pageSize)
  },
  methods: {
    async getSkuList(currentPage, pageSize) {
      const res = await reqGetSkuList(currentPage, pageSize)
      this.skuList = res.records
      this.total = res.total
    },
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getSkuList(this.currentPage, pageSize)
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage
      this.getSkuList(currentPage, this.pageSize)
    }
  }
}
</script>

<style></style>
