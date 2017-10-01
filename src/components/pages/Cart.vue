<template>
  <div>
    <h2 class="no-margin">A kosár tartalma</h2>
    <div class="row">
      <div class="col-lg-12 col-xl-6">
        <q-stepper
          v-if="getRestNumber > 0"
          selectedIcon="check"
          color="green-8"
          ref="orderStepper"
          vertical
          class="no-padding"
        >
          <!-- Az utolsó lehetőség a kosár módosítására -->
          <q-step default name="orderDescStep" :disable="orderSubmitted" title="Rendelés véglegesítése" subtitle="Megjegyzések rögzítése">
            <cart @nextStep="nextStep"></cart>
          </q-step>

          <!-- A szállítás címére vonatkozó komponens -->
          <q-step name="adressStep" :disable="orderSubmitted" title="Szállítási cím megadása" subtitle="Megjegyzés rögzítése">
            <order @prevStep="prevStep" @nextStep="nextStep"></order>
          </q-step>
          
          <!-- A rendelés átnézése -->
          <q-step name="submitOrder" :disable="orderSubmitted" title="Rendelés küldése" subtitle="Áttekintés">
            <order-overview @prevStep="prevStep" @submitOrder="submitOrder"></order-overview>
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
  import Order from 'src/app/order/components/Order.vue'
  import OrderOverview from 'src/app/order/components/OrderOverview.vue'

  export default {
    components: {
      Cart,
      Order,
      OrderOverview,
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
        fetchCart: 'cart/fetchCart',
        fetchOrder: 'order/fetchOrder'
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
      this.fetchOrder()
    }
  }
</script>

<style lang="stylus">
  @import '~variables'
  .step-done
    background $green-1
</style>
