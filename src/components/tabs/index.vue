<template>
   <van-tabs class="custom-tab" :active="activeTab" @change="onTabChange" @click="onTap">
    <van-tab :title="tab.value" v-for="(tab,index) in tabs" :key="index">
    </van-tab>
  </van-tabs>
</template>

<script>
export default {
  data () {
    return {
      active:0,
      activeTab: 0,
      tabs:[
      {
        key: '',
        value:'首页'
      },
      {
        key: 'ask',
        value:'提问'
      },
      {
        key: 'share',
        value:'分享'
      },
      {
        key: 'advise',
        value:'建议'
      },
      {
        key: 'discuss',
        value:'讨论'
      }]
    }
  },
  methods: {
    onTabChange(event) {
    this.activeTab = event.mp.detail
    wx.showToast({
      title: `切换到标签${event.mp.detail.name}`,
      icon: 'none'
    })
   },
  }
}
</script>

<style lang="scss" scoped>
.custom-tab {
  --tabs-default-color: #02d199;
  --tabs-bottom-bar-color: #02d199;
  --tab-active-text-color: #02d199;
  --tab-text-color: #666666;
}
</style>
