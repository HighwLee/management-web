<template>
  <div ref="chartEl" style="height:100%"></div>
</template>

<script>
import * as echarts from 'echarts'
const ChartsBlock =  {
  name: 'ChartsBlock',
  // props: {
  //   option: {
  //     type: Object,
  //     default: () => {}
  //   }
  // },
  data() {
    return {
      chart: null,
      //data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 20, 36, 10, 10, 20, 5, 20, 36, 10]
    }
  },
  watch: {
    option: {
      handler(newValue) {
        this.chart.setOption(newValue)
      },
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chartEl)
    //this.chart.setOption(this.option)
    // 这里模拟后台请求动态变化的数据，每2S改变一次数据
    //setInterval(this.changeOption, 2000)

    //添加改变窗口监听
    this.chart._resize = () => {
      this.chart.resize()
    }
    window.addEventListener('resize',this.chart._resize)
  },
  methods: {
    // changeOption() {
    //   var r = Math.floor(Math.random() * 12)
    //   var d = this.data.slice(r, r + 6)
    //   // eslint-disable-next-line vue/no-mutating-props
    //   this.option.series[0].data = d
    //   console.log(this.option.series[0].data)
    //}
    setOption(option) {
      this.chart && this.chart.setOption(option)
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize',this.chart._resize)
  }
}

ChartsBlock.install = (Vue) => {
  Vue.component(ChartsBlock.name, ChartsBlock)
}

export default ChartsBlock
</script>
