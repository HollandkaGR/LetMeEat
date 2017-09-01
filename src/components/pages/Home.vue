<template>
  <div>
      <h2 class="no-margin">Éttermeink</h2>
      <div>
          <cards></cards>
      </div>
  </div>
</template>

<script>
  import Cards from '../../app/restaurant/components/RestaurantCards'

  export default {
    components: {
      Cards
    },
    data: function () {
      return {
      }
    },
    mounted: function () {

    }
  }
</script>
