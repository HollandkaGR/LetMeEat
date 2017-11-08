<template>
  <div >
    <q-transition
      appear
      group
      enter="fadeIn"
      leave="fadeOut"
      class="row wrap no-gutter"
      duration="250"
    >
      <div v-for="etterem in filteredEttermek" :key="etterem.id" class="col-sm-12 col-lg-6 col-xl-4 row" style="padding:15px;">
        <q-card class="col-12 column justify-between shadow-15 no-margin">
          <q-card-media overlay-position="full">
            <img :src="'statics/' + etterem.img">
          </q-card-media>
          <q-card-title slot="overlay">
            <span class="text-bold block" style="font-size: 22px; letter-spacing:1.5px;margin-bottom: 10px;">{{ etterem.name }}</span>
            <div slot="subtitle">
              <div>
                <q-rating v-model="etterem.rating" size="14px" color="green" :max="5" @change="rateChanged(etterem.id)" />
                <q-chip small color="green" class="text-black">{{ getStar(etterem.rating) }}</q-chip>
              </div>
            </div>
          </q-card-title>
          <q-card-separator />
          <q-card-main class="row justify-around xs-gutter autoFill">
            <div v-for="kategoria in etterem.categories" :key="kategoria" class="col">
              <q-btn  color="brown-5 full-width" outline small>
                {{ kategoria.name }}
              </q-btn>
            </div>
          </q-card-main>
          <q-card-separator />
          <div class="row justify-between bg-dark text-bold text-black p10">
            <div class="col-12 text-center uppercase text-light openText">Nyitvatartás</div>
            <q-btn big class="col-md-12 col-lg-6 text-bold inset-shadow bg-white p10" v-bind:class="{ 'bg-red-7': !etterem.isOpen }">
              {{ etterem.open_hours[weekday].from }} - {{ etterem.open_hours[weekday].to }}
            </q-btn>
            <q-btn
            flat
            big
            glossy
            class="bg-green-6 col-md-12 col-lg-6"
            @click="checkRestIsOpen(etterem)"
            style="padding: 5px 0;">
            Kínálat
            </q-btn>
          </div>
        </q-card>
      </div>
    </q-transition>
    
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { showLoadingScreen } from 'src/helpers'
  import { Loading, Dialog as Popup } from 'quasar'
  import 'quasar-extras/animate/fadeIn.css'
  import 'quasar-extras/animate/fadeOut.css'
  
  import moment from 'moment'

  export default {
    components: {
      Loading,
      Popup
    },
    props: ['searchingFor'],
    data: function () {
      return {
        ettermek: [],
        filteredEttermek: [],
        errors: [],
        weekday: null
      }
    },
    computed: {
      ...mapGetters({
        getEttermek: 'restaurant/getEttermek',
        getServerTimestamp: 'restaurant/getServerTimestamp',
        orderModalRef: 'restaurant/orderModalRef'
      })
    },
    watch: {
      searchingFor: function () {
        this.checkSearching()
      }
    },
    methods: {
      ...mapActions({
        fetchEttermek: 'restaurant/fetchEttermek',
        resetEttermek: 'restaurant/resetEttermek',
        setSelectedEtterem: 'restaurant/setSelectedEtterem'
      }),
      checkSearching () {
        if (this.searchingFor.trim().length > 2) {
          let filteredEttermek = this.ettermek.filter(etterem => {
            return etterem.name.toUpperCase().includes(this.searchingFor.toUpperCase())
          })
          if (filteredEttermek.size !== 0) {
            this.filteredEttermek = filteredEttermek
          }
        }
        else {
          this.filteredEttermek = this.ettermek
        }
      },
      createConfirm () {
        Popup.create({
          title: 'Az étterem zárva!',
          message: 'Az étterem jelenleg nincs nyitva, így csak a kínálatot tudod megtekinteni, <strong>rendelésre nincs lehetőség</strong>!',
          buttons: [
            {
              label: 'Vissza',
              color: 'negative',
              outline: true,
              handler () {}
            },
            {
              label: 'Rendben',
              color: 'positive',
              outline: true,
              handler: () => {
                this.orderModalRef.open()
              }
            }
          ]
        })
      },
      checkRestIsOpen: function (restaurant) {
        this.setSelectedEtterem(restaurant)
        if (!restaurant.isOpen) {
          this.createConfirm()
        }
        else {
          this.orderModalRef.open()
        }
      },
      getStar (value) {
        return Math.round(value)
      },
      // Backenden endpoint a szavazásra
      rateChanged (id) {
        this.getEttermek.filter(etterem => {
          if (etterem.id === id) {
            return console.log(etterem.id + ': ' + etterem.rating)
          }
        })
      },
      isOpen (from, to) {
        let format = 'HH:mm'
        let now = moment()
        return now.isBetween(moment(from, format), moment(to, format))
      },
      checkIsOpen () {
        this.filteredEttermek.forEach(etterem => {
          etterem.isOpen = this.isOpen(etterem.open_hours[this.weekday].from, etterem.open_hours[this.weekday].to)
        })
      }
    },
    beforeMount () {
      this.resetEttermek()
    },
    mounted () {
      showLoadingScreen()
      this.fetchEttermek().then(() => {
        this.ettermek = this.getEttermek
        this.checkSearching()
        this.weekday = moment.unix(this.getServerTimestamp).weekday() - 1
        this.checkIsOpen()
        setInterval(function () {
          this.checkIsOpen()
        }.bind(this), 10000)
        Loading.hide()
      }).catch(error => {
        this.errors.push(error.message)
        Loading.hide()
      })
    }
  }
</script>

<style lang="stylus">
  @import '~variables'
  
  .modal-header
    background $red-4
    padding 10px
    text-align center
  
  .modal-body
    text-align justify

</style>

<style lang="sass" scoped>
  .autoFill
    -webkit-box-flex: 1
    -webkit-flex: 1
    -ms-flex: 1
    flex: 1

  .openText
    margin-bottom: 10px
    letter-spacing: 2px
    font-size: 1.2em

  .p10
    padding: 10px
</style>
