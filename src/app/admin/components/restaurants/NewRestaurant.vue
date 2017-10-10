<template>
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
      :error="errors.city !== undefined"
      :error-label="errors.city !== undefined ? errors.city[0] : ''"
      class="col-md-6 inputField"
    >
      <q-select
        float-label="Város kiválasztása"
        v-model="restaurant.city"
        inverted
        :color="fieldColor"
        :class="fieldShadow"
        :options="possibleCities"
      />
    </q-field>
    <h6 class="inputField">
      Nyitvatartás
      <div class="row justify-around items-stretch no-margin">
        <open-hours v-for="(day, key) in weekDays" :key="key" :day="day" :id="key" @setHours="setHours"></open-hours>
      </div>
    </h6>
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
          city: null,
          open_hours: {}
        },
        weekDays: [],
        possibleCities: [],
        // Field options
        fieldColor: 'brown-4',
        fieldShadow: 'shadow-4'
      }
    },
    methods: {
      ...mapActions({
        fetchPossibleCities: 'admin/fetchPossibleCities'
      }),
      clearError (fieldName) {
        if (this.errors[fieldName] !== undefined) {
          delete this.errors[fieldName]
        }
      },
      setHours (params) {
        this.restaurant.open_hours[params.id] = {
          from: params.from,
          to: params.to
        }
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
  
  .inputField
    padding 5px 10px
    & .q-input, .q-select
      padding 5px
      border 1px solid $dark
      border-radius 3px
</style>