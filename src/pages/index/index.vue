<template>
  <div>
    <div class="fixed">
      <imooc-search></imooc-search>
      <imooc-nav></imooc-nav>
    </div>
    <!--offsettop设置的是上边距padding值-->
    <imooc-content :lists="lists" :offsetTop="offsetTop" :isEnd="isEnd"></imooc-content>
    <imooc-tabs :active="0"></imooc-tabs>
  <!--list :key不允许是字符串拼接-->

    <!-- <icon src="/static/images/home.svg" size="36" color="#02D199"></icon>
    <van-icon name="close" />
    <van-icon name="shu4" size="40" color="#000fff" class-prefix="iconfont"></van-icon> -->
    <!--active-color为被点击时激活的颜色，inactive-color为未激活颜色-->
  <!-- <van-tabbar :active="active" @change="onChange"
  active-color="#02D199" inactive-color="#000000">
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
  </van-tabbar> -->

  </div>
</template>

<script>
import icon from '@/components/icon/index'
import card from '@/components/card'
import vTabbar from '@/components/tabbar/index'
import VantTabs from '@/components/tabbar/vant'
import SearchBar from '@/components/search/index'
import Tabs from '@/components/tabs/index'
import Content from '@/components/content/index'
import { axios } from '@/utils/request'
import store from './store'
export default {
  // props:['lists'],
  data () {
    return {
      lists: [],
      page: 0,
      limit: 10,
      isEnd: false,
      isRepeat: false,
      catalog: ''
    }
  },
  // 1.获取列表数据，传递该数据给子组件，渲染子组件
  // 2. 顶部标签切换时，拿到分类catalog, 重新请求获取列表数据
  // 3. 下拉加载更多数据，上拉刷新重载数据
  components: {
    card,vTabbar,icon,
    'imooc-tabs': VantTabs,
    'imooc-search':SearchBar,
    'imooc-nav': Tabs,
    'imooc-content':Content
  },
  methods: {
    _getList() {
       if (this.isRepeat) return
       if (this.isEnd) return
       getList({
         catalog: this.catalog,
         page: this.page,
         limit: this.limit,
         sort: 'created'
       }).then((res) => {
          wx.stopPullDownRefresh()
          this.isRepeat = false // 加入一个请求锁，防止用户多次点击，等待数据返回后，再打开
          if (res.code === 200) {
            if (res.data.length < this.limit) {
              this.isEnd = true
            }
            if (this.lists.page === 0) {
              this.lists = res.data
            } else {
              this.lists = this.lists.concat(res.data)
            }
          }
       })
    },
    init () {
       this.page = 0
      //  this.lists = []
       this.isEnd = false
       this.isRepeat = false
    },
    async test () {
      const result = await axios.get(
        'http://localhost:3000/user/getCaptcha?sid=1111'
      )
      console.log('test-> res axios', result)
      // wx.stopPullDownRefresh() 这个用于当下拉重载时，数据重载完成时，结束下拉重载
    },
  watch: {
    catalog (newval, oldval) {
      if (newval !== oldval) {
        this.init()
        this._getList()
      }
    }
  },
  computed: {
    catalog () {
      console.log('catalog----改变了', store.state.catalog)
      return store.state.catalog
    },
    offsetTop () {
      return store.state.contentOffset
    }
  }

  },
  created () {
    // let app = getApp()
  },
  onPullDownRefresh() {  // 下拉重载和上拉加载更多数据，这些函数不能放在methods里面
        this.init()
        this._getList()
  },
  onReachBottom() {
        this.page ++;
        this._getList()
  }
}
</script>

<style lang="scss" scoped>
// .icon {
//   width: 40px;
//   height: 40px;
// }
.fixed {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
}
</style>
