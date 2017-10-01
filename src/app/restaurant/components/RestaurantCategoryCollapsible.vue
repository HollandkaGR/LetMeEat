<template>
  <q-collapsible ref="colRef" :label="kategoria.name" v-bind:class="{ 'collapsible-opened': kinyitva }" class="bg-brown-2 round-borders collapsible">
    <product v-for="product in kategoria.products" v-bind="{ product }" :key="product"></product>
  </q-collapsible>
</template>

<script>
  import Product from './RestaurantProductCard'
  export default {
    components: {
      Product
    },
    data: function () {
      return {
        kinyitva: false
      }
    },
    watch: {
      openColl () {
        if (this.openColl) {
          this.$refs.colRef.open()
        }
        else {
          this.$refs.colRef.close()
        }
      }
    },
    props: [ 'kategoria', 'openColl' ],
    methods: {
      open: function () {
        this.kinyitva = true
      },
      close: function () {
        this.kinyitva = false
      }
    }
  }
</script>

<style lang="stylus">
  .collapsible 
    .q-item-label
      font-size 20px
      letter-spacing 2px
</style>

<style lang="stylus" scoped>
  @import '~variables'
  
  .collapsible
    transition background .5s ease-out
    border 1px solid black

  .collapsible-opened
    background $light!important
   
</style>
