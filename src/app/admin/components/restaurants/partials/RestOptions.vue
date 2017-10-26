<template>
  <q-list class="no-padding restOptions">
    <q-list-header class="text-brown-6 strong">Beállítások</q-list-header>
    <q-item v-if ="getSelectedRestaurant.isActive !== undefined" multiline tag="label" class="col row items-center">
      <q-item-main class="col">
        <q-item-tile label>Aktív</q-item-tile>
        <q-item-tile sublabel lines="4">Ha ez a beállítás ki van kapcsolva, az étterem nem lesz látható a vendégek számára</q-item-tile>
      </q-item-main>
      <q-item-side right class="col-1">
        <q-toggle color="green-4" v-model="getSelectedRestaurant.isActive" />
      </q-item-side>
    </q-item>
    <q-item v-if ="getSelectedRestaurant.description !== undefined" multiline tag="label" class="col row items-start">
      <q-item-main class="col">
        <q-item-tile label>Bemutatkozás</q-item-tile>
        <q-item-tile sublabel lines="2">Az étterem rövid leírása, ami megjelenik a vendégek számára, ha bekapcsoljuk</q-item-tile>
        <q-field
          v-if="getSelectedRestaurant.showMessage" 
          :count="1024"
          class="animate-scale"
        >
          <q-input v-model="getSelectedRestaurant.description" type="textarea" color="brown-8" max-length="1024" :min-rows="1" :max-height="300"></q-input>
        </q-field>
      </q-item-main>
      <q-item-side right class="col-1">
        <q-toggle color="green-4" v-model="getSelectedRestaurant.showMessage" />
      </q-item-side>
    </q-item>
  </q-list>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {

    name: 'RestOptions',

    data () {
      return {
        restaurant: {}
      }
    },
    computed: {
      ...mapGetters({
        getSelectedRestaurant: 'admin/getSelectedRestaurant'
      })
    },
    methods: {
      saveThisRestaurant () {
        this.updateRestaurant({
          data: this.restaurant,
          context: this
        })
          .then(() => {
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>