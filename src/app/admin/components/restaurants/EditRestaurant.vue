<template>
  <div class="row justify-between formWrapper">
    <div class="row justify-between items-center col-12">
      <h5>{{ restaurant.name }} módosítása</h5>
      <div class="actionbuttons">
        <q-btn color="red-4" push @click="$router.replace({name: 'ettermeim.index'})">Mégse</q-btn>
        <q-btn color="green-4" push @click="saveThisRestaurant">Mentés</q-btn>
      </div>
    </div>
    <q-field
      :error="errors.name !== undefined"
      :error-label="errors.name !== undefined ? errors.name[0] : ''"
      class="col-md-6 inputField"
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
      class="col-md-6 inputField"
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
    <h6 class="inputField">
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
  
  .inputField
    padding 5px 10px
    & .q-input, .q-select
      padding 5px
      border 1px solid $dark
      border-radius 3px
      
  .allSameWrapper
    margin-left 10px
    padding-left 10px
    border-left 2px solid $grey
</style>