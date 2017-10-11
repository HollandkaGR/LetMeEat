<template>
  <div>
    <new-restaurant></new-restaurant>
  </div>
</template>

<script>
  import NewRestaurant from 'src/app/admin/components/restaurants/NewRestaurant'
  export default {

    name: 'New',
    components: {
      NewRestaurant
    },
    data () {
      return {

      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>