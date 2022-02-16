<template>
  <div class="container">
    <Analysis />
    <Sales />
    <Monitor />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Analysis from './analysis'
import Sales from './sales'
import Monitor from './monitor'

export default {
  name: 'Dashboard',
  components: {
    Analysis,
    Sales,
    Monitor
  },
  mounted() {
    this.getHomeList()
  },
  methods: {
    ...mapActions('home', ['getHomeList'])
  }
}
</script>

<style lang="scss" scoped></style>
