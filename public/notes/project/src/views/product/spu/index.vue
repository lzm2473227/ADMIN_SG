<template>
  <div>
    <CategorySelector :disabled="isShow !== 1" />
    <SpuList v-if="isShow === 1" @updateIsShow="updateIsShow" />
    <AddOrUpdateSpu v-if="isShow === 2" @updateIsShow="updateIsShow" />
    <AddSku v-if="isShow === 3" @updateIsShow="updateIsShow" />
  </div>
</template>

<script>
import CategorySelector from '@/components/CategorySelector'
import SpuList from './spuList'
import AddOrUpdateSpu from './addOrUpdateSpu'
import AddSku from './addSku'

export default {
  name: 'Spu',
  components: {
    CategorySelector,
    SpuList,
    AddOrUpdateSpu,
    AddSku
  },
  data() {
    return {
      // 1 SpuList 显示
      // 2 AddOrUpdateSpu 显示
      // 3 AddSku 显示
      isShow: 1
    }
  },
  methods: {
    updateIsShow(isShow) {
      this.isShow = isShow
    }
  }
}
</script>

<style></style>
