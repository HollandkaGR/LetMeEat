<template>
  <div class="row">
    <div v-if="getRestNumber > 1" class="bg-red-8 text-light strong full-width text-center" style="padding: 5px">
      Az alábbi adatokat minden étterem meg fogja kapni!
    </div>

    <div class="col-12">
      <city-picker></city-picker>
    </div>
    
    <div v-if="isCitySelected" class="col-12">
      <street-picker class="col-10 no-margin" :city="city"></street-picker>
    </div>
    <div v-if="isStreetSelected" class="col-12 bg-light row no-padding orderDescWrapper shadow-4">
      <div class="col-12 bg-dark text-light" style="padding: .5em 1em;">
        A szállítással kapcsolatos megjegyzések
      </div>
      <address-desc></address-desc>
    </div>

    <q-stepper-navigation class="col-12 row justify-between">
      <q-btn color="red-8" outline @click="$emit('prevStep')">Vissza</q-btn>
      <q-btn color="green-8" push @click="nextStep" :disable="!orderSubmitable">Cím rögzítése</q-btn>
    </q-stepper-navigation>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import CityPicker from './CityPicker'
  import StreetPicker from './StreetPicker'
  import AddressDesc from './AddressDesc'

  export default {
    components: {
      CityPicker, StreetPicker, AddressDesc
    },
    data () {
      return {
        city: null,
        street: '',
        houseNumber: null,
        addressDesc: '',
        maxChar: 255,
        submitable: false
      }
    },
    computed: {
      ...mapGetters({
        getRestNumber: 'cart/getRestNumber',
        isCitySelected: 'order/isCitySelected',
        isStreetSelected: 'order/isStreetSelected',
        orderSubmitable: 'order/orderSubmitable'
      }),
      charLeft: function () {
        return this.maxChar - this.addressDesc.trim().length
      }
    },
    methods: {
      ...mapActions({
        setOrderAddress: 'cart/setOrderAddress'
      }),
      descBlur: function () {
        if (this.addressDesc.length > 0) {
          this.setOrderAddress({
            city: this.city,
            street: this.street,
            houseNumber: this.houseNumber,
            addressDesc: this.addressDesc
          })
        }
      },
      nextStep () {
        this.$emit('nextStep')
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .q-popover
    background red
</style>
