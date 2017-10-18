<template>
  <div>
    <div class="row justify-end" style="margin: 10px 0">
      <q-btn small class="bg-green-6 text-light strong" @click="newRest">Új étterem</q-btn>
    </div>
    <q-list v-if="getMyRestaurants.length > 0" inset-separator>
      <overview-item
        v-for="restaurant in getMyRestaurants"
        :key="restaurant.id"
        :restaurant="restaurant"
        @editRestaurant="editRestaurant"
        @deleteRestaurant="deleteThisRestaurant"
      />
    </q-list>
    <h5 v-else>Még nincs étterme, vigyen fel újat!</h5>
  </div>
</template>

<script>
  import OverviewItem from 'src/app/admin/components/restaurants/OverviewItem'
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
      OverviewItem
    },
    data () {
      return {
        restaurantToEdit: null
      }
    },
    computed: {
      ...mapGetters({
        getMyRestaurants: 'admin/getMyRestaurants',
        getRestaurant: 'admin/getRestaurant'
      })
    },
    methods: {
      ...mapActions({
        fetchMyRestaurants: 'admin/fetchMyRestaurants',
        setSelectedRestaurant: 'admin/setSelectedRestaurant',
        deleteRestaurant: 'admin/deleteRestaurant'
      }),
      newRest: function () {
        this.$router.push({ name: 'ettermeim.uj' })
      },
      editRestaurant: function (id) {
        // actionsnél húzzuk be a restaurantot, a kategóriákkal és minden mással együtt
        this.setSelectedRestaurant(this.getRestaurant(id))
          .then(() => {
            this.$router.push({ name: 'ettermeim.update' })
          })
      },
      deleteThisRestaurant: function (id) {
        this.deleteRestaurant({id})
      }
    },
    mounted () {
      this.fetchMyRestaurants()
        .then(() => {

        })
    }
  }
</script>

<style lang="stylus" scoped>
</style>