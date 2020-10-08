<template>
   <div class="search" :style="{'padding-top':barHeight + 'px'}">
     <van-search
        :value="value"
        shape="round"
        placeholder="请输入搜索关键词"
      />
   </div>
</template>

<script>
import store from '@/pages/index/store'
export default {
  data () {
    return {
      value: '',
      barHeight: 0,
    }
  },
  onLoad: function() {
    this.getNavBarHeight()
    // this.test();
  },
  methods: {
      getNavBarHeight () {
     let statusBarHeight = 0
     wx.getSystemInfo({ // 这个小程序原生的函数，可以获取很多信息
       success: (result) => {
         statusBarHeight = result.statusBarHeight
         let isiOS = result.system.indexOf('iOS') > -1 // 如果大于-1，则是IOS系统
         if (isiOS) {
           this.barHeight = statusBarHeight + 5;

         } else {
           this.barHeight = statusBarHeight + 7;
         }
         store.commit('setContentOffset', this.barHeight + 88)
       }
     })
   }
  },

}
</script>

<style lang="scss" scoped>
.search{
  width:70%;
  --search-padding:0; // 把vant上search自带的padding值设置为0
  padding-left: 25px;
  padding-bottom: 8px;
  @media (max-width:320px) { // 小于320px的宽度就把width写成60%
    width: 60%;
  }
}
</style>
