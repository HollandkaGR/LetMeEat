<template>
  <div class="row justify-between formWrapper">
    <div class="row justify-between items-center col-12">
      <h5>{{ restaurant.name }} módosítása</h5>
      <div class="actionbuttons">
        <q-btn color="red-4" push @click="$router.replace({name: 'ettermeim.index'})">Vissza</q-btn>
        <q-btn color="green-4" push @click="saveThisRestaurant">Mentés</q-btn>
      </div>
    </div>
    <q-field
      :error="errors.name !== undefined"
      :error-label="errors.name !== undefined ? errors.name[0] : ''"
      class="col-md-6 sectionWrapper"
    >
      <q-input
        type="text"
        inverted
        v-model="restaurant.name"
        float-label="Az étterem neve"
        :color="fieldColor"
        :class="fieldShadow"
        @focus="clearError('name')"
      />
    </q-field>

    <q-field
      v-if ="restaurant.city !== undefined"
      :error="errors.city !== undefined"
      :error-label="errors.city !== undefined ? errors.city[0] : ''"
      class="col-md-6 sectionWrapper"
    >
      <q-select
        float-label="Város kiválasztása"
        v-model="restaurant.city.id"
        inverted
        :color="fieldColor"
        :class="fieldShadow"
        :options="possibleCities"
      />
    </q-field>
    <div class="separator"/>
    <div class="sectionWrapper col-12">
      <q-list class="no-padding restOptions">
        <q-list-header class="text-brown-6 strong">Beállítások</q-list-header>
          <q-item v-if ="restaurant.isActive !== undefined" multiline tag="label" class="col row items-center">
            <q-item-main class="col">
              <q-item-tile label>Aktív</q-item-tile>
              <q-item-tile sublabel lines="4">Ha ez a beállítás ki van kapcsolva, az étterem nem lesz látható a vendégek számára</q-item-tile>
            </q-item-main>
            <q-item-side right class="col-1">
              <q-toggle color="green-4" v-model="restaurant.isActive" />
            </q-item-side>
          </q-item>
          <q-item v-if ="restaurant.description !== undefined" multiline tag="label" class="col row items-start">
            <q-item-main class="col">
              <q-item-tile label>Bemutatkozás</q-item-tile>
              <q-item-tile sublabel lines="2">Az étterem rövid leírása, ami megjelenik a vendégek számára, ha bekapcsoljuk</q-item-tile>
              <q-field
                v-if="restaurant.showMessage" 
                :count="1024"
                class="animate-scale"
              >
                <q-input v-model="restaurant.description" type="textarea" color="brown-8" max-length="1024" :min-rows="1" :max-height="300"></q-input>
              </q-field>
            </q-item-main>
            <q-item-side right class="col-1">
              <q-toggle color="green-4" v-model="restaurant.showMessage" />
            </q-item-side>
          </q-item>
      </q-list>
    </div>
    <div class="separator"/>
    <h6 class="sectionWrapper">
      Nyitvatartás
      <span class="allSameWrapper">
        <q-toggle
          v-model="allDaySame"
          label="Minden nap"
          color="green-4"
        />
      </span>
      <div v-if="allDaySame" class="">
        <open-hours day="Minden nap" id="0" @setHours="setAllDayTo"></open-hours>
      </div>
      <div v-else class="row justify-around items-stretch no-margin">
        <open-hours v-for="(day, key) in weekDays" :key="key" :day="day" :id="key" :values="restaurant.open_hours[key]" @setHours="setHours"></open-hours>
      </div>
    </h6>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { week, convertDataToSelect } from 'src/helpers'
  import OpenHours from './partials/OpenHours'

  export default {

    name: 'EditRestaurant',
    components: {
      OpenHours
    },
    data () {
      return {
        errors: {},
        allDaySame: false,
        restaurant: {},
        weekDays: [],
        possibleCities: [],
        // Field options
        fieldColor: 'brown-4',
        fieldShadow: 'shadow-4'
      }
    },
    computed: {
      ...mapGetters({
        getSelectedRestaurant: 'admin/getSelectedRestaurant'
      })
    },
    methods: {
      ...mapActions({
        fetchPossibleCities: 'admin/fetchPossibleCities',
        updateRestaurant: 'admin/updateRestaurant'
      }),
      clearError (fieldName) {
        if (this.errors[fieldName] !== undefined) {
          delete this.errors[fieldName]
        }
      },
      setHours (params) {
        this.restaurant.open_hours[params.id] = {
          isOpenToday: params.isOpenToday,
          from: params.from,
          to: params.to
        }
      },
      setAllDayTo (params) {
        for (var i = 0; i < 7; i++) {
          this.restaurant.open_hours[i] = {
            isOpenToday: params.isOpenToday,
            from: params.from,
            to: params.to
          }
        }
      },
      saveThisRestaurant () {
        this.updateRestaurant({
          data: this.restaurant,
          context: this
        })
          .then(() => {
            this.$router.replace({ name: 'ettermeim.index' })
          })
      }
    },
    mounted () {
      this.weekDays = week()
      this.restaurant = this.getSelectedRestaurant

      // A város megjelenítése késhet, mert request, ezért beadjuk a jelenlegi várost az opciók közé, a háttérben pedig frissül
      this.possibleCities = convertDataToSelect([this.getSelectedRestaurant.city], 'name', 'id')

      this.fetchPossibleCities()
        .then(response => {
          this.possibleCities = convertDataToSelect(response, 'name', 'id')
        })
        .catch(() => {
          console.log('Nem lehet lekérdezni a városokat!')
        })
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'
  
  .sectionWrapper
    padding 5px 10px
    & .q-input, .q-select
      padding 5px
      border 1px solid $dark
      border-radius 3px
      
  .allSameWrapper
    margin-left 10px
    padding-left 10px
    border-left 2px solid $grey
    
  .separator
    margin 10px auto
    height 2px
    width 60%
    background $grey
    
  .restOptions
    & .q-item
      transition background-color .1s linear
      &:hover
        background rgba(161, 136, 127, 0.2)
</style>