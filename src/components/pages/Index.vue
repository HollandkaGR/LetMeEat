<template>
  <div>
    Index
  </div>
</template>

<script>
  import { showPopup } from 'src/helpers'

  export default {
    data () {
      return {
      }
    },
    mounted: function () {
      let msg = this.$route.params.message
      if (msg) {
        showPopup(msg.text, msg.type)
      }
    }
  }
</script>

<style lang="stylus">

</style>
