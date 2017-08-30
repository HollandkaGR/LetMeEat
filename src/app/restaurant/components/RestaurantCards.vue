<template>
  <div class="row wrap md-gutter">
    <div v-for="etterem in ettermek" :key="etterem.id" class="col-sm-12 col-lg-6 col-xl-4 row">
      <q-card class="col-12 column justify-between shadow-10">
        <q-card-media overlay-position="full">
        <img :src="'statics/' + etterem.img">
        </q-card-media>
        <q-card-title slot="overlay">
          <p class="no-margin">{{ etterem.name }}</p>
          <div>
            <q-rating v-model="etterem.rating" size="20px" color="green" :max="5" />
            <q-chip small color="green" class="text-black">{{ getStar(etterem.rating) }}</q-chip>
          </div>
          <div slot="right">
            <q-icon name="place" /> 250 ft
          </div>
        </q-card-title>
        <q-card-separator />
        <q-card-main class="row justify-around xs-gutter autoFill">
          <div v-for="kategoria in etterem.categories" :key="kategoria" class="col">
            <q-btn  color="brown-5 full-width" outline small>
              {{ kategoria }}
            </q-btn>
          </div>
        </q-card-main>
        <q-card-separator />
        <q-card-actions class="row justify-around">
          <q-btn round class="bg-brown-4" small><q-icon color="white" name="alarm" /></q-btn>
          <q-btn flat>5:30PM</q-btn>
          <q-btn flat>7:30PM</q-btn>
          <q-btn flat v-bind:class="[ etterem.isOpen ? 'bg-green' : 'bg-red' ]">Rendelés</q-btn>
        </q-card-actions>
      </q-card>
    </div>
    <!-- <restaurantOrderModal v-bind="{ modalOpened: modalOpened}" v-on:modalClosed="closeModal"></restaurantOrderModal> -->
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import RestaurantOrderModal from './RestaurantOrderModal'
  import { showLoadingScreen } from 'src/helpers'
  import {
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
    QBtn,
    QIcon,
    Loading
  } from 'quasar'
  import moment from 'moment'

  export default {
    components: {
      RestaurantOrderModal,
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
      QBtn,
      QIcon,
      Loading
    },
    data: function () {
      return {
        modalOpened: false,
        categories: [
          'Levesek', 'Szárnyasok', 'Előételek', 'Desszertek', 'Pizzák', 'Marhaételek'
        ],
        ettermek: [],
        errors: [],
        categoriesToString (values) {
          return values.join(', ')
        }
      }
    },
    methods: {
      ...mapActions({
        fetchEttermek: 'restaurant/fetchEttermek',
        fetchProducts: 'restaurant/fetchProducts',
        resetEttermek: 'restaurant/resetEttermek'
      }),
      openModal: function () {
        this.modalOpened = true
      },
      closeModal: function () {
        this.modalOpened = false
      },
      showProducts: function (restId) {
        this.modalOpened = true
      },
      randomPlaceholder () {
        let min = 0
        let max = 3
        let imgNumber = Math.floor(Math.random() * (max - min)) + min
        console.log(imgNumber)
        return this.placeholders[imgNumber]
      },
      getStar (value) {
        return Math.round(value)
      },
      isOpen (open, close) {
        let format = 'HH:mm'
        let now = moment()
        return now.isBetween(moment(open, format), moment(close, format))
      },
      checkIsOpen () {
        this.ettermek.forEach(etterem => {
          etterem.isOpen = this.isOpen(etterem.open, etterem.close)
        })
      }
    },
    beforeMount () {
      this.resetEttermek()
    },
    mounted () {
      showLoadingScreen()
      this.fetchEttermek().then(() => {
        Loading.hide()
      }).catch(error => {
        this.errors.push(error.message)
        Loading.hide()
      })
      this.ettermek = [
        {
          id: 1,
          name: 'Felekken',
          categories: ['Levesek', 'Szárnyasok', 'Előételek', 'Desszertek', 'Pizzák', 'Marhaételek'],
          img: '1600x900.png',
          rating: 1,
          open: '12:29',
          close: '12:39',
          isOpen: false
        },
        {
          id: 2,
          name: 'Felekken1',
          categories: ['Levesek', 'Előételek', 'Pizzák'],
          img: '1600x900.png',
          rating: 2,
          open: '9:30',
          close: '21:30',
          isOpen: false
        },
        {
          id: 3,
          name: 'Felekken2',
          categories: ['Levesek', 'Szárnyasok', 'Előételek', 'Desszertek', 'Pizzák', 'Marhaételek'],
          img: '1600x900.png',
          rating: 4,
          open: '9:30',
          close: '22:30',
          isOpen: false
        },
        {
          id: 4,
          name: 'Felekken3',
          categories: ['Levesek', 'Szárnyasok', 'Előételek', 'Desszertek', 'Pizzák', 'Marhaételek'],
          img: '1600x900.png',
          rating: 3,
          open: '9:30',
          close: '22:00',
          isOpen: false
        }
      ]
      this.checkIsOpen()
      setInterval(function () {
        this.checkIsOpen()
      }.bind(this), 10000)
    }
  }
</script>

<style lang="sass" scoped>
  .autoFill
    -webkit-box-flex: 1;
    -webkit-flex: 1;
    -ms-flex: 1;
    flex: 1;
</style>
