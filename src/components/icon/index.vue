<template>
   <div>
     <img :src="imgurl" :style="{width: size + 'rpx', height: size + 'rpx' }"  alt="CAONIMA"/>
   </div>
</template>
<script>
let Base64 = require('js-base64').Base64;
// import {Base64} from 'js-base64'
// 1.读取svg图片
// 2.修改fill属性来改变svg图片的颜色，还要先判断是否有fill属性
// 3. base64 svg编码转换
// 4. imgurl = base64编码地址
export default {
  props: {
    size: {
      type: [Number, String],
      default: 36
    },
    src: [String],
    color: [String]
  },
  data () {
    return {
      imgurl: '',
      color:''
    }
  },
  created () {
    if (this.color) {
      this.getColor()
    }
    // // 1.读取svg图片
    // if (this.color) {
    //   wx.getFileSystemManager().readFile({
    //     filePath: this.src,
    //     encoding: 'binary',
    //     success: (res) => {
    //       let str = ''
    //       const reg = /fill="#[a-zA-Z0-9]{0,6}"/
    //      // 2.修改fill属性来改变svg图片的颜色，还要先判断是否有fill属性
    //      if (reg.test(res.data)) { // fill属性
    //        str = res.data.replace(reg, 'fill="' + this.color + '"')

    //      } else {
    //        str = res.data.replace(/<path\s/g, '<path fill="' + this.color + '" ')
    //      }
    //      const base64 = Base64.encode(str)
    //      this.imgurl = 'data:image/svg+xml;base64,' + base64
    //   }
    // })
    // }

    // // 3. base64 svg编码转换
    // // 4. imgurl = base64编码地址
  },
  watch: {
    color () {
      this.getColor()
    }
  },
  methods: {
    getColor () {
      // 1.读取svg图片
    if (this.color) {
      wx.getFileSystemManager().readFile({
        filePath: this.src,
        encoding: 'binary',
        success: (res) => {
          let str = ''
          const reg = /fill="#[a-zA-Z0-9]{0,6}"/
         // 2.修改fill属性来改变svg图片的颜色，还要先判断是否有fill属性
         if (reg.test(res.data)) { // fill属性
           str = res.data.replace(reg, 'fill="' + this.color + '"')

         } else {
           str = res.data.replace(/<path\s/g, '<path fill="' + this.color + '" ')
         }
         const base64 = Base64.encode(str)
         this.imgurl = 'data:image/svg+xml;base64,' + base64
      }
    })
    }

    // 3. base64 svg编码转换
    // 4. imgurl = base64编码地址
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
