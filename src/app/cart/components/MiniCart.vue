<template>
  <div>
    <q-btn color="white" class="relative-position text-dark">
      <q-icon name="shopping_cart"/>
        {{ cartItemCount }}
      <q-tooltip :delay="500">Kosár tartalma {{ cartItemCount }} termék</q-tooltip>
      <!-- Popover a MiniCartra kattintva -->
      <q-popover ref="miniCartPopover" anchor="bottom right" self="top right" max-height="500px">
        <!-- Csak akkor van tartalom, ha van valami a kosárban -->
        <q-list v-if="Object.keys(getCartGroupByRestaurant).length > 0" style="min-width: 350px">

          <q-list-header style="font-size: 20px;" class="text-dark text-center">A kosár tartalma</q-list-header>

          <!-- A kosárban éttermenként jelenik meg a rendelés -->
          <q-list v-for="restaurant in getCartGroupByRestaurant" :key="restaurant" class="bg-light-green-1 no-padding">
            
            <div class="restName text-white bg-green">{{ restaurant.name }}</div>

            <q-item 
              multiline inset-separator
              v-for="item in restaurant.products"
              :key="item"
              class="row items-center justify-between"
            >
              <q-item-main class="col-9">
                <q-item-tile label>{{item.product.name}}</q-item-tile>
                <q-item-tile sublabel lines="2">
                  {{ item.quantity }} adag<br>
                  Egységár: {{ convertCurrency(item.product.price) }},-
                </q-item-tile>
              </q-item-main>
              <div class="rightSide row justify-center col-3">
                <q-btn flat small color="red-8" :disable="item.quantity === 1" class="changeQuantity no-padding col-4" @click="subQuantity(item.product.id)">
                  <q-icon name="remove" size="20px"/>
                </q-btn>
                <q-btn flat small color="dark" class="no-padding col-4" @click="subQuantity(item.product.id, item.quantity)">
                  <q-icon name="not_interested" size="20px"/>
                </q-btn>
                <q-btn flat small color="green-8" class="changeQuantity no-padding col-4" @click="incQuantity(item.product)">
                  <q-icon name="add" size="20px"/>
                </q-btn>
                <div class="productTotal fit text-center bg-brown-4 strong text-white">
                  {{ convertCurrency(item.product.price * item.quantity) }},-
                </div>
              </div>
            </q-item>
            <q-item v-if="Object.keys(getCartGroupByRestaurant).length > 1" class="col justify-between bg-dark">
              <q-item-side class="text-light strong">
                Részösszeg
              </q-item-side>
              <q-item-main class="text-center col-3 bg-light strong text-dark">
                {{ convertCurrency(restaurant.subTotal) }},-
              </q-item-main>
            </q-item>
          </q-list>
          <q-item class="col justify-between">
            <q-item-side>
              Összesen
            </q-item-side>
            <q-item-main class="text-center col-3 bg-dark strong text-white">
              {{ convertCurrency(cartTotal) }},-
            </q-item-main>
          </q-item>
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

  export default {
    computed: {
      ...mapGetters({
        cartItemCount: 'cart/cartItemCount',
        getCartGroupByRestaurant: 'cart/getCartGroupByRestaurant',
        cartTotal: 'cart/cartTotal'
      })
    },
    methods: {
      ...mapActions({
        fetchCart: 'cart/fetchCart',
        addProductToCart: 'cart/addProductToCart',
        removeProductFromCart: 'cart/removeProductFromCart'
      }),
      incQuantity: function (product) {
        this.addProductToCart({
          product: product,
          quantity: 1
        })
      },
      subQuantity: function (id, quantity = 1) {
        this.removeProductFromCart({
          productId: id,
          quantity: quantity
        })
          .then(() => {
            if (this.cartItemCount === 0) {
              this.$refs.miniCartPopover.close()
            }
          })
      },
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

  .changeQuantity
    font-size 22px

  .productTotal
    margin-top 5px
    padding: 5px    

  .emptyCartMsg
    padding 10px
    background $red-8
    color white
</style>
