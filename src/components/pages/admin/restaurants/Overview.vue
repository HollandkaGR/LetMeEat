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
  import { Dialog } from 'quasar'

  export default {
    components: {
      OverviewItem
    },
    data () {
      return {
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
        deleteRestaurant: 'admin/deleteRestaurant',
        unsetVars: 'admin/unsetVars'
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
        Dialog.create({
          title: 'Biztos?',
          message: 'Ha törlöd az éttermet, a kategóriák és a termékek is elvesznek!<br/>Ha inaktívra állítod az éttermet, a vendégek nem fogják látni!',
          buttons: [
            {
              label: 'Mégse',
              handler () {},
              color: 'red-8'
            },
            {
              label: 'Törlés',
              handler: () => {
                this.deleteRestaurant(id)
              },
              color: 'green-4',
              push: true
            }
          ]
        })
      }
    },
    mounted () {
      this.unsetVars()
      this.fetchMyRestaurants()
        .then(() => {

        })
    }
  }
</script>

<style lang="stylus" scoped>
</style>