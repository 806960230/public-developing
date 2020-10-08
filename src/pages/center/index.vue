<template>
<div>center
  <imooc-tabs :active="3"></imooc-tabs>
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
