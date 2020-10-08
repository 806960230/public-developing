<template>
  <div class="black">
    <cover-view class="tab-bar">
      <cover-view class="tab-bar-border"></cover-view>
      <cover-view
        v-for="(item,index) in list"
        :key="index"
        class="tab-bar-item"
        :data-path="item.pagePath"
        :data-index="index"
        @click="switchTab(item,index)"
      >
        <!-- <icon :src="item.iconPath" size="75" :color="selected !== index ? color : selectedColor"></icon> -->
        <cover-image :src="selected === index ? item.selectedIconPath : item.iconPath"></cover-image>
        <cover-view :style="{'color': selected === index ? selectedColor : color}">{{item.text}}</cover-view>
      </cover-view>
    </cover-view>
  </div>
</template>
<script>
import Icon from '@/components/icon/index'
export default {
  name: 'tabbar',
  components: {
   Icon
  },
  data () {
    return {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      "text": "首页",
      "pagePath": "/pages/index/main",
      "iconPath": "/static/images/home.png",
      "selectedIconPath": "/static/images/home_active.png"
    }, {
      "text": "消息",
      "pagePath": "/pages/index/main",
      "iconPath": "/static/images/tab_icon_message_normal@2x.png",
      "selectedIconPath": "/static/images/tab_icon_message_active@2x.png"
    },{
      "text": "热门",
      "pagePath": "/pages/index/main",
      "iconPath": "/static/images/hot.png",
      "selectedIconPath": "/static/images/hot_active.png"
    },{
      "text": "我的",
      "pagePath": "/pages/index/main",
      "iconPath": "/static/images/tab_icon_my@3x.png",
      "selectedIconPath": "/static/images/tab_icon_my_active@3x.png"
    }]
    //  list: [{
    //   pagePath: "/index/index",
    //   iconPath: "/static/images/home.svg",
    //   selectedIconPath: "/static/image/icon_component_HL.png",
    //   text: "首页"
    // }, {
    //   pagePath: "/index/index2",
    //   iconPath: "/static/images/home.svg",
    //   selectedIconPath: "/static/image/icon_API_HL.png",
    //   text: "消息"
    // }]
    }
  },
  methods: {
     switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.selected = data.index

    }
  }
};
</script>

<style lang="scss" scoped>

.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 48px;
  background: white;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: rgba(0, 0, 0, 0.33);
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 1px;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

}

.tab-bar-item cover-image {
  width: 27px;
  height: 27px;

}

.tab-bar-item cover-view {
  font-size: 10px;

}

</style>
