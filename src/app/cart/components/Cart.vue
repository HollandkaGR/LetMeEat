<template>
  <div>
    <!-- Csak akkor van tartalom, ha van valami a kosárban -->
    <q-list v-if="getRestNumber > 0" class="no-border relative-position no-padding">

      <!-- A kosárban éttermenként jelenik meg a rendelés -->
      <div v-for="restaurant in getCart" :key="restaurant" >
        <q-list class="bg-light-green-1 no-padding">

          <div class="restName text-black bg-green strong">{{ restaurant.restaurant.name }}</div>
          <product :restaurant="restaurant"></product>

          <q-item v-if="getRestNumber > 1" class="col justify-between bg-grey-4">
            <q-item-side class="text-dark strong">
              Részösszeg
            </q-item-side>
            <q-item-main class="text-center col-3 bg-light strong text-dark shadow-4">
              <span v-html="convertCurrency(restaurant.subTotal)"/>
            </q-item-main>
          </q-item>
        </q-list>
        <div class="col bg-light row no-padding orderDescWrapper shadow-4">

          <div v-if="getRestNumber > 1" class="col-12 bg-dark text-light" style="padding: .5em 1em;">Megjegyzés, amit CSAK a(z) {{ restaurant.restaurant.name }} lát majd, a rendelést illetően</div>
          <div v-else class="col-12 bg-dark text-light" style="padding: .5em 1em;">Megjegyzés, a rendelést illetően</div>

          <order-desc :restId="restaurant.restaurant.id" class="col" style="padding: .5em 1em;"></order-desc>
        </div>
      </div>
      <q-item class="col justify-between totalDisplay">
        <q-item-side class="text-dark strong">
          Összesen
        </q-item-side>
        <q-item-main class="text-center col-3 bg-light strong text-dark shadow-3">
          <span v-html="convertCurrency(cartTotal)"/>
        </q-item-main>
      </q-item>
    </q-list>
    <q-stepper-navigation class="row justify-center">
      <q-btn color="green-8" push @click="$emit('nextStep')">Cím megadása</q-btn>
    </q-stepper-navigation>
  </div>
</template>

<script>
  import { currencyFormat } from 'src/helpers'
  import { mapGetters, mapActions } from 'vuex'
  import Product from 'src/app/cart/components/Product'
  import OrderDesc from 'src/app/cart/components/OrderDesc'

  export default {
    components: {
      Product, OrderDesc
    },
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        cartItemCount: 'cart/cartItemCount',
        getCart: 'cart/getCart',
        cartTotal: 'cart/cartTotal',
        getRestNumber: 'cart/getRestNumber'
      })
    },
    methods: {
      ...mapActions({
        fetchCart: 'cart/fetchCart'
      }),
      convertCurrency: function (value) {
        return currencyFormat(value)
      }
    },
    mounted: function () {
      this.fetchCart()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'
  .restName
    padding: 8px 16px

  .orderDescWrapper
    margin 20px 0

</style>
