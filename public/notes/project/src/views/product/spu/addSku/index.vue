<template>
  <el-card class="container">
    <el-form label-width="80px">
      <el-form-item label="SPU名称">
        <span>{{ spu.spuName }}</span>
      </el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="请输入SKU名称" v-model="sku.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input-number
          v-model="sku.price"
          class="add-sku-inputNumber"
          controls-position="right"
          :min="0"
          placeholder="请输入价格"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="重量">
        <el-input-number
          v-model="sku.weight"
          class="add-sku-inputNumber"
          controls-position="right"
          :min="0"
          placeholder="请输入重量"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input
          v-model="sku.skuDesc"
          placeholder="请输入SKU描述"
          type="textarea"
          :rows="3"
        ></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-row>
          <el-col
            v-for="(attr, index) in attrList"
            :key="attr.id"
            :xs="24"
            :sm="12"
            :md="8"
            class="add-sku-col"
          >
            <el-form-item :label="attr.attrName">
              <!--
                收集四个数据：
                  attrId: 0,
                  attrName: "string",
                  valueId: 0,
                  valueName: "string",

                  绑定的数据是 skuAttrValueList 数组中某一项值
                  v-model="sku.skuAttrValueList[index]"
               -->
              <el-select
                placeholder="请选择平台属性值"
                v-model="sku.skuAttrValueList[index]"
              >
                <el-option
                  v-for="attrValue in attr.attrValueList"
                  :key="attrValue.id"
                  :label="attrValue.valueName"
                  :value="
                    `${attr.id}:${attr.attrName}:${attrValue.id}:${attrValue.valueName}`
                  "
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-row>
          <!--
            {
              "baseSaleAttrId": 0,
              "id": 0,
              "saleAttrName": "string",
              "spuId": 0,
              "spuSaleAttrValueList": [
                {
                  "baseSaleAttrId": 0,
                  "id": 0,
                  "isChecked": "string",
                  "saleAttrName": "string",
                  "saleAttrValueName": "string",
                  "spuId": 0
                }
              ]
            }
           -->
          <el-col
            v-for="(saleAttr, index) in spu.spuSaleAttrList"
            :key="saleAttr.id"
            :xs="24"
            :sm="12"
            :md="8"
            class="add-sku-col"
          >
            <el-form-item :label="saleAttr.saleAttrName">
              <el-select
                placeholder="请选择销售属性值"
                v-model="sku.skuSaleAttrValueList[index]"
              >
                <el-option
                  v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                  :key="saleAttrValue.id"
                  :label="saleAttrValue.saleAttrValueName"
                  :value="
                    `${saleAttr.id}:${saleAttr.saleAttrName}:${saleAttrValue.id}:${saleAttrValue.saleAttrValueName}`
                  "
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="SKU图片">
        <el-table
          :data="spuImageList"
          border
          class="container-table"
          @selection-change="handleSelectionChange"
        >
          <el-table-column width="50" type="selection" align="center">
          </el-table-column>
          <el-table-column label="图片">
            <template v-slot="{ row }">
              <img :src="row.imgUrl" :alt="row.imgName" class="add-sku-img" />
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"> </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                type="primary"
                size="mini"
                v-show="row.isDefault === '0'"
                @click="setDefaultImage(row)"
                >设置默认图片</el-button
              >
              <el-button
                type="success"
                size="mini"
                disabled
                v-show="row.isDefault === '1'"
                >默认图片</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import { reqGetSpuInfo, reqGetSpuImageList } from '@/api/product/spu'
import { reqGetAttrList } from '@/api/product/attr'
import { reqSaveSku } from '@/api/product/sku'

export default {
  name: 'AddSku',
  async mounted() {
    const { spuId, category1Id, category2Id, category3Id } = this

    const [spuRes, spuImageListRes, attrListRes] = await Promise.allSettled([
      reqGetSpuInfo(spuId),
      reqGetSpuImageList(spuId),
      reqGetAttrList({
        category1Id,
        category2Id,
        category3Id
      })
    ])

    if (spuRes.status === 'fulfilled') {
      this.spu = spuRes.value
    } else {
      this.$message({
        type: 'error',
        message: '获取SPU数据失败'
      })
    }
    if (spuImageListRes.status === 'fulfilled') {
      this.spuImageList = spuImageListRes.value.map(img => {
        return {
          ...img,
          isDefault: '0'
        }
      })
    } else {
      this.$message({
        type: 'error',
        message: '获取SPU图片列表数据失败'
      })
    }
    if (attrListRes.status === 'fulfilled') {
      this.attrList = attrListRes.value
    } else {
      this.$message({
        type: 'error',
        message: '获取平台属性列表数据失败'
      })
    }
  },
  data() {
    return {
      spu: {},
      spuImageList: [],
      attrList: [],
      sku: {
        // 价格
        price: 0,
        // 平台属性列表
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   attrName: "string",
          //   valueId: 0,
          //   valueName: "string",
          // },
        ],
        // 默认图片
        skuDefaultImg: '',
        // 描述
        skuDesc: '',
        // 选中图片列表
        skuImageList: [
          // {
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          // },
        ],
        skuName: '',
        // 销售属性列表
        skuSaleAttrValueList: [
          // {
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          // },
        ],
        // spuId: 0,
        weight: 0
      }
    }
  },
  computed: {
    ...mapState('spu', ['spuId']),
    ...mapState('category', ['category1Id', 'category2Id', 'category3Id'])
  },
  methods: {
    handleSelectionChange(val) {
      // 收集图片数据
      this.sku.skuImageList = val
    },
    setDefaultImage(row) {
      this.spuImageList.forEach(img => (img.isDefault = '0'))
      row.isDefault = '1'
    },
    async submit() {
      const { category3Id, spuId } = this
      const {
        weight,
        price,
        skuAttrValueList,
        skuImageList,
        skuDesc,
        skuName,
        skuSaleAttrValueList
      } = this.sku

      const data = {
        category3Id,
        price,
        skuAttrValueList: skuAttrValueList.filter(Boolean).map(attr => {
          const [attrId, attrName, valueId, valueName] = attr.split(':')
          return {
            attrId,
            attrName,
            valueId,
            valueName
          }
        }),
        // 注意：必须要选中默认图片
        skuDefaultImg: skuImageList.find(img => img.isDefault === '1').imgUrl,
        skuDesc,
        skuImageList,
        skuName,
        skuSaleAttrValueList: skuSaleAttrValueList
          .filter(Boolean)
          .map(saleAttr => {
            const [
              saleAttrId,
              saleAttrName,
              saleAttrValueId,
              saleAttrValueName
            ] = saleAttr.split(':')
            return {
              saleAttrId,
              saleAttrName,
              saleAttrValueId,
              saleAttrValueName
            }
          }),
        spuId,
        weight
      }

      await reqSaveSku(data)

      this.$message({
        type: 'success',
        message: '添加SKU成功'
      })

      this.cancel()
    },
    cancel() {
      this.$emit('updateIsShow', 1)
    }
  }
}
</script>

<style lang="scss">
.add-sku-inputNumber {
  width: 100%;
}
.add-sku-col {
  margin-bottom: 10px;
}
.add-sku-img {
  width: 150px;
  height: 150px;
}
</style>
