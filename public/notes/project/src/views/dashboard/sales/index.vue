<template>
  <el-card class="sales">
    <div slot="header" class="sales-header">
      <el-tabs class="sales-tab" v-model="tabName">
        <el-tab-pane label="销售额" name="sale"></el-tab-pane>
        <el-tab-pane label="访问量" name="visit"></el-tab-pane>
      </el-tabs>
      <div class="sales-date">
        <span class="sales-date-text" @click="setDay">今日</span>
        <span class="sales-date-text" @click="setWeek">本周</span>
        <span class="sales-date-text" @click="setMonth">本月</span>
        <span class="sales-date-text" @click="setYear">本年</span>
        <el-date-picker
          v-model="date"
          class="sales-date-picker"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="mini"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
    </div>

    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="18">
        <div class="charts" ref="charts"></div>
      </el-col>
      <el-col :xs="24" :sm="12" :md="6">
        <div class="rank-title">门店{{ title }}排名</div>
        <ul class="rank-list">
          <li
            v-for="(item, index) in tabName === 'sale'
              ? homeData.orderRank
              : homeData.userRank"
            :key="index"
          >
            <span
              :class="{ 'rank-index': true, 'rank-index-deep': index < 3 }"
              >{{ item.no }}</span
            >
            <span class="rank-name">{{ item.name }}</span>
            <span class="rank-value">{{ item.money }}</span>
          </li>
        </ul>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import resize from '@/mixins/resize'

export default {
  name: 'Sales',
  data() {
    return {
      tabName: 'sale',
      date: ''
    }
  },
  mounted() {
    this.myEcharts = echarts.init(this.$refs.charts)
    this.myEcharts.setOption({
      title: {
        text: this.title + '趋势',
        textStyle: {
          fontSize: 14
        },
        top: 20
      },
      tooltip: {
        trigger: 'axis',
        // axisPointer: {
        //   type: 'shadow', // 阴影类型，不能调整大小
        // },
        axisPointer: {
          type: 'line', // 线段类型，可以调整大小
          lineStyle: {
            color: 'rgba(0, 0, 0, .1)',
            type: 'solid',
            width: 46
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: [
          '1月',
          '2月',
          '3月',
          '4月',
          '5月',
          '6月',
          '7月',
          '8月',
          '9月',
          '10月',
          '11月',
          '12月'
        ],
        axisTick: {
          alignWithLabel: true
        }
      },
      yAxis: {
        type: 'value'
      },
      series: {
        name: '访问量',
        type: 'bar',
        barWidth: 30,
        data: [10, 52, 200, 334, 390, 330, 220, 52, 200, 334, 390, 123]
      }
    })
  },
  mixins: [resize],
  computed: {
    ...mapState('home', ['homeData']),
    title() {
      return this.tabName === 'sale' ? '销售额' : '访问量'
    }
  },
  watch: {
    title(title) {
      const {
        orderFullYearAxis,
        orderFullYear,
        userFullYearAxis,
        userFullYear
      } = this.homeData

      // 多次setOption，将配置合并
      this.myEcharts.setOption({
        title: {
          text: title + '趋势'
        },
        xAxis: {
          data: title === '销售额' ? orderFullYearAxis : userFullYearAxis
        },
        series: { data: title === '销售额' ? orderFullYear : userFullYear }
      })
    }
  },
  methods: {
    setDay() {
      const time = dayjs().format('YYYY-MM-DD')
      this.date = [time, time]
    },
    setWeek() {
      const start = dayjs()
        .day(1)
        .format('YYYY-MM-DD')

      const end = dayjs()
        .day(7)
        .format('YYYY-MM-DD')

      this.date = [start, end]
    },
    setMonth() {
      const start = dayjs()
        .date(1)
        .format('YYYY-MM-DD')
      const end = dayjs()
        .endOf('month')
        .format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setYear() {
      const start = dayjs()
        .startOf('year')
        .format('YYYY-MM-DD')
      const end = dayjs()
        .endOf('year')
        .format('YYYY-MM-DD')
      this.date = [start, end]
    }
  }
}
</script>

<style lang="sass" scoped>
.sales
  margin-bottom: 10px
.sales-header
  display: flex
  justify-content: space-between
.sales-tab
  font-size: 18px
.sales-date-picker
  width: 250px
  margin-left: 10px
.sales-date
  display: flex
  padding: 10px 0
  align-items: center
.sales-date-text
  font-size: 14px
  margin-right: 20px
  &.active
    color: #1890ff
.charts
  width: 100%
  height: 300px
.rank-title
  font-size: 14px
  color: #000
.rank-list
  list-style: none
  margin-top: 20px
  padding: 0 10px 0 0
  li
    line-height: 20px
    margin-bottom: 20px
.rank-index
  font-size: 14px
  display: inline-block
  width: 20px
  height: 20px
  background-color: #fafafa
  color: #000
  border-radius: 50%
  text-align: center
  line-height: 20px
  &.rank-index-deep
    background-color: #000
    color: #fff
.rank-name
  margin-left: 30px
.rank-value
  float: right
</style>
