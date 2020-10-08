<template>
<div>msg
  <imooc-tabs :active="1"></imooc-tabs>
</div>
</template>

<script>
import VantTabs from '@/components/tabbar/vant'
export default {
  components: {
    'imooc-tabs': VantTabs
  }
}
</script>

<style lang="scss" scoped>

</style>
