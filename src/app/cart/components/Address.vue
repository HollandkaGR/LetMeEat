<template>
  <div class="row">
    <div v-if="getRestNumber > 1" class="bg-red text-white" style="padding: 5px">
      Az alábbi adatokat minden étterem meg fogja kapni!
    </div>
    <q-field
      icon="place"
      class="col-12"
    >
      <q-select
        float-label="Város kiválasztása"
        v-model="city"
        color="brown-8"
        :error="$v.city.$invalid"
        :options="[
          {label: 'Pécs', value: '1'},
          {label: 'Pécs', value: '20'}
        ]"
        @change="$v.city.$touch"
      />
    </q-field>
    <q-field
      icon="my_location"
      class="col-10"
      color="brown-8"
      :error="$v.street.$error"
    >
      <q-input v-model.trim="street" color="brown-8" float-label="Út, Utca, Tér" @blur="validateStreet"/>
    </q-field>
    <q-input v-model="houseNumber" color="brown-8" float-label="Házszám" type="number" class="col-2"/>
    <q-field
        icon=""
        :count="maxChar"
        helper="Rendelkezésre álló karakterek"
        class="col-12"
    >
      <q-input
        v-model.lazy="addressDesc"
        @blur="descBlur"
        color="brown-8"
        placeholder="A rendeléssel kapcsolatos megjegyzés"
        :max-length="maxChar"
        type="textarea"
        class="orderDesc"
      >
      </q-input>
    </q-field>

    <q-stepper-navigation class="col-12 row justify-between">
      <q-btn color="red-8" outline @click="$emit('prevStep')">Vissza</q-btn>
      <q-btn color="green-8" push @click="nextStep">Cím rögzítése</q-btn>
    </q-stepper-navigation>
    <pre>{{ $v }}</pre>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { required, minLength, between } from 'vuelidate/lib/validators'
  import { validationMixin } from 'vuelidate'

  export default {
    data () {
      return {
        city: 0,
        street: '',
        houseNumber: null,
        addressDesc: '',
        maxChar: 255,
        submitable: false
      }
    },
    computed: {
      ...mapGetters({
        getRestNumber: 'cart/getRestNumber'
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
        // this.setOrderDesc({
        //   restId: this.restId,
        //   orderDesc: this.currentDesc.trim()
        // })
      },
      nextStep () {
        if (this.$v.$error) {
          console.log('Van még hiba')
        }
        else {
          console.log('Mehetne a submit')
        }
        // $emit('nextStep')
      },
      validateStreet () {
        this.$v.street.$touch()
      }
    },
    mixins: [validationMixin],
    validations: {
      city: {
        between: between(1, 3)
      },
      street: {
        required,
        minLength: minLength(2)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  
</style>
