<template>
<div>
<van-tabbar :active="active" @change="onChange"
  active-color="#02D199" inactive-color="#000000"><!--active-color为被点击时激活的颜色，inactive-color为未激活颜色-->
     <van-tabbar-item class="item">
       <van-icon name="icon4" size="24" color="#000000" class-prefix="iconfont"></van-icon>
       <div>首页</div>
     </van-tabbar-item>
     <van-tabbar-item class="item">
        <van-icon name="xiaoxi" size="24" color="#000000" class-prefix="iconfont"></van-icon>
       <div>消息</div>
     </van-tabbar-item>
     <van-tabbar-item class="item">
        <van-icon name="remen" size="24" color="#000000" class-prefix="iconfont"></van-icon>
       <div>热门</div>
     </van-tabbar-item>
     <van-tabbar-item class="item">
        <van-icon name="wode" size="24" color="#000000" class-prefix="iconfont"></van-icon>
       <div>我的</div>
     </van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  props: ['active'],
  data () {
   return {
     list: [
       '/pages/index/main',
       '/pages/msg/main',
       '/pages/hot/main',
       '/pages/center/main'
     ]
   }
  },
  methods: {
    onChange(event) {
      // this.active = event.mp.detail
      // this.active = event.mp.detail
      const index = event.mp.detail
      console.log('跳转了吗')
      wx.switchTab({url: this.list[index]})
      // wx.navigateTo({
      //   url: this.list[index]
      // })
    }
  }
}
</script>

<style lang='scss' scoped>
.item {
  text-align: center;
  align-self: flex-end;
  padding-bottom: 5px;
  div {
    padding-top: 5px;
  }
}
</style>
