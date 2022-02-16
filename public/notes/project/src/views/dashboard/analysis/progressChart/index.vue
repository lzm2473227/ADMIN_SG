<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import * as echarts from 'echarts'
import resize from '@/mixins/resize'

export default {
  name: 'ProgressChart',
  mounted() {
    this.myEcharts = echarts.init(this.$refs.charts)
    this.myEcharts.setOption({
      xAxis: {
        // 去掉两边留白
        boundaryGap: false,
        // 不显示
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        // 等分
        type: 'category',
        show: false
      },
      series: {
        type: 'bar',
        data: [78],
        // 柱条的宽度
        barWidth: 10,
        // 背景样式
        backgroundStyle: {
          // 背景色
          color: 'rgba(0,0,0,.1)'
        },
        // 展示背景
        showBackground: true,
        // 柱条样式
        itemStyle: {
          color: 'yellowgreen'
        },
        // 柱条显示的内容
        label: {
          show: true, // 显示
          formatter: '|', // 显示的具体内容
          position: 'right', // 内容的位置
          color: 'yellowgreen' // 颜色
        }
      },
      grid: {
        left: 0,
        top: 0,
        bottom: 0,
        right: 0
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
