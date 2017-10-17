<template>
  <div>
    <div class="row justify-between items-center">
      <h5>Új étterem</h5>
      <div class="actionbuttons">
        <q-btn color="red-4" push @click="$router.replace({name: 'ettermeim.index'})">Mégse</q-btn>
        <q-btn color="green-4" push @click="saveThisRestaurant">Mentés</q-btn>
      </div>
    </div>
    <div class="row justify-between formWrapper">
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
        :error="errors['city.id'] !== undefined"
        :error-label="errors['city.id'] !== undefined ? errors['city.id'][0] : ''"
        class="col-md-6 inputField"
      >
        <q-select
          float-label="Város kiválasztása"
          v-model="restaurant.city.id"
          inverted
          :color="fieldColor"
          :class="fieldShadow"
          :options="possibleCities"
          @focus="clearError('city.id')"
        />
      </q-field>
      <div class="separator"/>
      <div class="col-12">
        <h6 class="inputField">
          Nyitvatartás
          <span class="allSameWrapper">
            <q-toggle
              v-model="allDaySame"
              label="Minden nap"
              color="green-4"
            />
          </span>
        </h6>
        <div v-if="allDaySame" class="no-margin pull-left">
          <open-hours day="Minden nap" id="0" @setHours="setAllDayTo"></open-hours>
        </div>
        <div v-else class="row justify-around items-stretch no-margin">
          <open-hours v-for="(day, key) in weekDays" :key="key" :day="day" :id="key" @setHours="setHours"></open-hours>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { week, convertDataToSelect } from 'src/helpers'
  import OpenHours from './partials/OpenHours'

  export default {

    name: 'NewRestaurant',
    components: {
      OpenHours
    },
    data () {
      return {
        errors: {},
        restaurant: {
          name: null,
          city: {
            id: null
          },
          open_hours: {}
        },
        allDaySame: false,
        weekDays: [],
        possibleCities: [],
        // Field options
        fieldColor: 'brown-4',
        fieldShadow: 'shadow-4'
      }
    },
    methods: {
      ...mapActions({
        fetchPossibleCities: 'admin/fetchPossibleCities',
        saveRestaurant: 'admin/saveRestaurant'
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
        this.saveRestaurant({
          context: this
        })
          .then(() => {
            this.$router.replace({ name: 'ettermeim.index' })
          })
      }
    },
    mounted () {
      this.weekDays = week()
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
  
  .separator
    margin 10px 10px
    height 1px
    width 100%
    background $grey
  
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