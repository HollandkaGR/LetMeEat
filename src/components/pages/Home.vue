<template>
  <div>
    <div class="row justify-between items-center">
      <h2 class="no-margin col">ÉTTERMEINK</h2>
      <q-search 
        v-model="etteremSearch" 
        color="brown-4" 
        placeholder="Keressen rá!" 
        float-label="Ha tudja az étterem nevét..." 
        class="col-lg-6"
      >
      <q-autocomplete
        :static-data="{field: 'name', list: parsedEttermek }"
        :filter="myFilter"
        @selected="selected"
        :min-characters="3"
      />
    </q-search>
  </div>
  <div>
    <cards :searchingFor="etteremSearch"></cards>
  </div>
</div>
</template>

<script>
  import fuzzysearch from 'fuzzysearch'
  import Cards from '../../app/restaurant/components/RestaurantCards'
  import { mapGetters } from 'vuex'
  import {
    QAutocomplete,
    QCard,
    QCardTitle,
    QCardMedia,
    QCardActions,
    QCardSeparator,
    QCardMain,
    QList,
    QItem,
    QItemMain,
    QItemSide,
    QItemTile,
    QRating,
    QSearch,
    QTransition,
    QBtn,
    QIcon
  } from 'quasar'

  function parseEttermek (ettermek) {
    return ettermek.map(etterem => {
      return {
        label: etterem.name,
        stamp: 'Nyitva: ' + etterem.open + ' - ' + etterem.close,
        value: etterem
      }
    })
  }

  export default {
    components: {
      Cards,
      QCard,
      QAutocomplete,
      QCardTitle,
      QCardMedia,
      QCardActions,
      QCardSeparator,
      QCardMain,
      QList,
      QItem,
      QItemMain,
      QItemSide,
      QItemTile,
      QRating,
      QSearch,
      QTransition,
      QBtn,
      QIcon
    },
    data: function () {
      return {
        etteremSearch: '',
        parsedEttermek: []
      }
    },
    computed: {
      ...mapGetters({
        ettermek: 'restaurant/getEttermek'
      })
    },
    methods: {
      myFilter ({ field, list }) {
        const token = this.etteremSearch.toLowerCase()
        return this.parsedEttermek.filter(item => fuzzysearch(token, item['label'].toLowerCase()))
      },
      selected (value) {
        console.log(value)
      }
    },
    mounted: function () {
      this.parsedEttermek = parseEttermek(this.ettermek)
    }
  }
</script>

<style lang="sass" scoped>
  h2
    display: block
    font-size: 40px
    letter-spacing: 2px

  .q-item-stamp
    padding: 2px 5px
    background-color: black
    color: white
    font-weight: bold
</style>
