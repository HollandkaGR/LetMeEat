<template>
  <div>
    <h2 class="no-margin">A kosár tartalma</h2>
    <div class="row">
      <div class="col-6">
        <q-stepper v-if="getRestNumber > 0" color="green-8" ref="orderStepper" vertical class="no-padding" selectedIcon="check">
          
          <!-- Az utolsó lehetőség a kosár módosítására -->
          <q-step default name="orderDescStep" :disable="orderSubmitted" title="Rendelés véglegesítése" subtitle="Megjegyzések rögzítése">
            <cart @nextStep="nextStep"></cart>
          </q-step>

          <!-- A szállítás címére vonatkozó komponens -->
          <q-step name="adressStep" :disable="orderSubmitted" title="Szállítási cím megadása" subtitle="Megjegyzés rögzítése">
            <order-address @prevStep="prevStep" @nextStep="nextStep"></order-address>
          </q-step>
          
          <q-step name="submitOrder" :disable="orderSubmitted" title="Rendelés küldése" subtitle="Áttekintés">
            <div v-for="n in 3">Step 3</div>
            <q-stepper-navigation class="row justify-between">
              <q-btn color="red-8" outline @click="$refs.orderStepper.previous()">Vissza</q-btn>
              <q-btn color="green-8" push @click="submitOrder">Rendelés véglegesítése</q-btn>
            </q-stepper-navigation>
          </q-step>
          <q-step name="orderSent" :disable="!orderSubmitted" title="Rendelés elküldve" >
            <div>A rendelés feladva</div>
          </q-step>
          <q-inner-loading :visible="progress" />
        </q-stepper>
        <div v-else>
          <h6>Jelenleg üres, válasszon termékeket az <router-link :to="{ name: 'restaurants' }">éttermeknél</router-link></h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  import {
    QStepper,
    QStep,
    QStepperNavigation
  } from 'quasar'
  import Cart from 'src/app/cart/components/Cart.vue'
  import OrderAddress from 'src/app/cart/components/Address.vue'

  export default {
    components: {
      Cart,
      OrderAddress,
      QStepper,
      QStep,
      QStepperNavigation
    },
    computed: {
      ...mapGetters({
        getRestNumber: 'cart/getRestNumber'
      })
    },
    data () {
      return {
        progress: false,
        orderSubmitted: false
      }
    },
    methods: {
      ...mapActions({
        fetchCart: 'cart/fetchCart'
      }),
      submitOrder: function () {
        this.progress = true
        setTimeout(() => {
          this.progress = false
          this.orderSubmitted = true
          this.$refs.orderStepper.goToStep('orderSent')
        }, 2000)
      },
      prevStep: function () {
        this.$refs.orderStepper.previous()
      },
      nextStep: function () {
        this.$refs.orderStepper.next()
      }
    },
    mounted: function () {
      this.fetchCart()
    }
  }
</script>

<style lang="stylus">
  @import '~variables'
  .step-done
    background $green-1
</style>
