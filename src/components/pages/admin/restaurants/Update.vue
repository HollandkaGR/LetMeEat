<template>
  <div>
    <edit-restaurant></edit-restaurant>
  </div>
</template>

<script>
  import EditRestaurant from 'src/app/admin/components/restaurants/EditRestaurant'
  
  export default {
    name: 'Update',
    components: {
      EditRestaurant
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>