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
        @search="search"
        :min-characters="3"
      />
    </q-search>
  </div>
  <div class="scroll">
    <cards :searchingFor="etteremSearch"></cards>
  </div>
</div>
</template>

<script>
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
        value: etterem.name
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
      search (terms, done) {
        let resultArray = []
        resultArray = this.parsedEttermek.filter(etterem => {
          return etterem.label.toUpperCase().trim().includes(terms.toUpperCase())
        })
        done(resultArray)
      }
    },
    mounted: function () {
      this.parsedEttermek = parseEttermek(this.ettermek)
    }
  }
</script>

<style lang="stylus">
  @import '~variables'

  h2
    display: block
    font-size: 40px
    letter-spacing: 2px
  
  .q-item-side-right
    position: absolute
    right: 0
    top: 0
    bottom: 0
    padding: 0 5px
    background-color: $brown-4
    display: flex
    justify-content: center
    flex-direction: row
    align-items: center
    min-width: 150px

  .q-item-stamp
    margin: 0
    color: white
    font-weight: bold

</style>
