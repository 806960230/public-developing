<script>
export default {
  created () {
    // 调用API从本地缓存中获取数据
    /*
     * 平台 api 差异的处理方式:  api 方法统一挂载到 mpvue 名称空间, 平台判断通过 mpvuePlatform 特征字符串
     * 微信：mpvue === wx, mpvuePlatform === 'wx'
     * 头条：mpvue === tt, mpvuePlatform === 'tt'
     * 百度：mpvue === swan, mpvuePlatform === 'swan'
     * 支付宝(蚂蚁)：mpvue === my, mpvuePlatform === 'my'
     */

    let logs
    if (mpvuePlatform === 'my') {
      logs = mpvue.getStorageSync({key: 'logs'}).data || []
      logs.unshift(Date.now())
      mpvue.setStorageSync({
        key: 'logs',
        data: logs
      })
    } else {
      logs = mpvue.getStorageSync('logs') || []
      logs.unshift(Date.now())
      mpvue.setStorageSync('logs', logs)
    }
  },
  log () {
    console.log(`log at:${Date.now()}`)
  }
}
</script>

<style>
@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_2102607_xk65rsgz63e.eot?t=1601121964765'); /* IE9 */
  src: url('//at.alicdn.com/t/font_2102607_xk65rsgz63e.eot?t=1601121964765#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('//at.alicdn.com/t/font_2102607_xk65rsgz63e.woff?t=1601121964765') format('woff'),
  url('//at.alicdn.com/t/font_2102607_xk65rsgz63e.ttf?t=1601121964765') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('//at.alicdn.com/t/font_2102607_xk65rsgz63e.svg?t=1601121964765#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfont-xiaoxi:before {
  content: "\e70f";
}

.iconfont-icon4:before {
  content: "\e660";
}

.iconfont-wode:before {
  content: "\e605";
}

.iconfont-remen:before {
  content: "\e8c9";
}


</style>
