<template>
  <div>
    <h2 class="no-margin">A kosár tartalma</h2>
    <div class="row">
      <cart class="col-6"></cart>
    </div>
  </div>
</template>

<script>
  import Cart from 'src/app/cart/components/Cart.vue'
  export default {
    data () {
      return {
      }
    },
    components: { Cart }
  }
</script>

<style lang="stylus">

</style>
