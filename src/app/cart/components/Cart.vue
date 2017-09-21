<template>
  <div>
    <!-- Csak akkor van tartalom, ha van valami a kosárban -->
      <q-list v-if="getRestNumber > 0" style="min-width: 350px" class="no-border relative-position no-padding">

        <!-- A kosárban éttermenként jelenik meg a rendelés -->
        <q-list v-for="restaurant in getCart" :key="restaurant" class="bg-light-green-1 no-padding">
          
          <div class="restName text-black bg-green strong">{{ restaurant.restaurant.name }}</div>
          <product :restaurant="restaurant"></product>

          <q-item v-if="getRestNumber > 1" class="col justify-between bg-grey-4">
            <q-item-side class="text-dark strong">
              Részösszeg
            </q-item-side>
            <q-item-main class="text-center col-3 bg-light strong text-dark shadow-4">
              {{ convertCurrency(restaurant.subTotal) }},-
            </q-item-main>
          </q-item>
        </q-list>
        <q-item class="totalPrice col justify-between bg-brown-2 borderTop borderBottom">
          <q-item-side class="text-dark strong">
            Összesen
          </q-item-side>
          <q-item-main class="text-center col-3 bg-light strong text-dark shadow-3">
            {{ convertCurrency(cartTotal) }},-
          </q-item-main>
        </q-item>
      </q-list>
      <!-- Ha a kosár üres -->
      <div v-else class="emptyCartMsg">
        A kosár üres!
      </div>
  </div>
</template>

<script>
  import { currencyFormat } from 'src/helpers'
  import { mapGetters, mapActions } from 'vuex'
  import Product from 'src/app/cart/components/Product'

  export default {
    components: {
      Product
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
  .restName
    padding: 8px 16px

</style>
