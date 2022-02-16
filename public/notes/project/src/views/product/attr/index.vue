<template>
  <div>
    <CategorySelector :disabled="!isShowAttrList" />
    <AttrList
      v-if="isShowAttrList"
      @updateIsShowAttrList="updateIsShowAttrList"
    />
    <AddOrUpdateAttr
      v-if="!isShowAttrList"
      @updateIsShowAttrList="updateIsShowAttrList"
    />
  </div>
</template>

<script>
import CategorySelector from '@/components/CategorySelector'
import AttrList from './attrList'
import AddOrUpdateAttr from './addOrUpdateAttr'

export default {
  name: 'Attr',
  data() {
    return {
      isShowAttrList: true
    }
  },
  methods: {
    updateIsShowAttrList(isShowAttrList) {
      this.isShowAttrList = isShowAttrList
    }
  },
  components: {
    CategorySelector,
    AttrList,
    AddOrUpdateAttr
  }
}
</script>

<style>
.attr-tag {
  margin-right: 10px;
}
</style>
