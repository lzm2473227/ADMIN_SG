<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/mixins/resize'

export default {
  name: 'BarChart',
  mounted() {
    this.myEcharts = echarts.init(this.$refs.charts)
    this.myEcharts.setOption({
      xAxis: {
        // 等分
        type: 'category',
        // 去掉两边留白
        boundaryGap: false,
        // 不显示
        show: false
      },
      yAxis: {
        show: false
      },
      series: {
        type: 'bar',
        data: [20, 30, 10, 15, 25, 37, 22, 30, 10, 15, 25, 25]
      },
      grid: {
        left: 10,
        top: 0,
        bottom: 0,
        right: 10
      }
    })
  },
  mixins: [resize]
}
</script>

<style lang="sass" scoped>
.charts
  width: 100%
  height: 46px
</style>
