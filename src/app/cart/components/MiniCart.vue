<template>
  <div>
    <q-btn color="white" class="relative-position text-dark">
      <q-icon name="shopping_cart" size="24px" style="line-height: 36px;"/>
      <span v-if="getRestNumber === 0">Üres</span>
      <span v-else class="strong text-green-8">
        <span v-html="convertCurrency(cartTotal)"/>
      </span>
      <q-tooltip :delay="500">Kosárban lévő termékek értéke: <span v-html="convertCurrency(cartTotal)"/></q-tooltip>

      <!-- Popover a MiniCartra kattintva -->
      <q-popover ref="miniCartPopover" anchor="bottom right" self="top right" max-height="550px" class="bg-light">

        <!-- Csak akkor van tartalom, ha van valami a kosárban -->
        <q-list v-if="getRestNumber > 0" style="min-width: 350px" class="no-border relative-position no-padding">

          <q-list-header style="font-size: 20px;" class="text-black bg-brown-2 text-center no-padding borderBottom">
            A kosár tartalma
          </q-list-header>

          <q-scroll-area style="width: 100%; height: 400px;" class="restScrollArea">

          <!-- A kosárban éttermenként jelenik meg a rendelés -->
          <q-list v-for="restaurant in getCart" :key="restaurant" class="bg-light-green-1 no-padding">
            
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
          </q-scroll-area>
          <q-item class="totalPrice col justify-between bg-brown-2 borderTop borderBottom">
            <q-item-side class="text-dark strong">
              Összesen
            </q-item-side>
            <q-item-main class="text-center col-3 bg-light strong text-dark shadow-3">
              <span v-html="convertCurrency(cartTotal)"/>
            </q-item-main>
          </q-item>
          <div class="row orderBtn">
            <q-btn color="green" class="col-6 offset-3 text-black strong glossy" @click="goToOrders">Rendelés</q-btn>
          </div>
        </q-list>
        <!-- Ha a kosár üres -->
        <div v-else class="emptyCartMsg">
          A kosár üres!
        </div>
      </q-popover>
    </q-btn>
  </div>
</template>

<script>
  import { currencyFormat } from 'src/helpers'
  import { mapGetters, mapActions } from 'vuex'
  import 'quasar-extras/animate/slideOutLeft.css'
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
      goToOrders: function () {
        this.$refs.miniCartPopover.close()
        this.$router.replace({ name: 'cart' })
      },
      convertCurrency: function (value) {
        return currencyFormat(value)
      }
    },
    watch: {
      getRestNumber: function () {
        if (this.getRestNumber === 0) {
          this.$refs.miniCartPopover.close()
        }
      }
    },
    mounted: function () {
      this.fetchCart()
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'
  
  .restScrollArea
    padding 5px

  .restWrapper
    border 1px solid black

  .restName
    padding: 8px 16px

  .changeQuantity
    font-size 22px

  .productTotal
    margin-top 5px
    padding: 5px    

  .emptyCartMsg
    padding 10px
    background $red-8
    color white
    
  .borderBottom
    border-bottom 2px solid $dark
  .borderTop
    border-top 2px solid $dark
    
  .totalPrice
    height 40px
    
  .orderBtn
    margin: 5px 0
    height 40px

</style>
