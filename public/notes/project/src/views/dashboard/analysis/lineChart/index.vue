<template>
  <div class="charts" ref="charts"></div>
</template>

<script>
import { mapState } from 'vuex'
import * as echarts from 'echarts'
import resize from '@/mixins/resize'

export default {
  name: 'LineChart',
  mounted() {
    this.myEcharts = echarts.init(this.$refs.charts)
  },
  computed: {
    ...mapState({
      visitTrend: state => state.home.homeData.visitTrend
    })
  },
  watch: {
    visitTrend(visitTrend) {
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
          type: 'line',
          data: visitTrend,
          // 平滑曲线显示
          smooth: true,
          // 拐点样式
          itemStyle: {
            opacity: 0
          },
          // 线样式
          lineStyle: {
            color: '#975fe4'
          },
          // 区域样式
          areaStyle: {
            // 颜色渐变
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#d3bcf4' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#fff' // 100% 处的颜色
                }
              ],
              global: false // 缺省为 false
            }
          },
          // 不响应和触发鼠标事件
          silent: true
        },
        grid: {
          left: 0,
          top: 0,
          bottom: 0,
          right: 0
        }
      })
    }
  },
  mixins: [resize]
}
</script>

<style lang="sass" scoped>
.charts
  width: 100%
  height: 46px
</style>
