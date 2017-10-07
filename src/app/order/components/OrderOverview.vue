<template>
  <div>
    <div>
      <q-list class="no-padding">
        <q-list-header
          class="orderSection glossy"
        >
          Termékek a kosárban
        </q-list-header>
        <!-- Padding miatt itemen belül hozzuk létre a listát -->
        <q-item>
          <q-item-main>
            <q-list
              v-for="order in cart"
              :key="order"
              class="no-padding"
              >
              <q-list-header
                class="bg-dark text-light strong uppercase restName glossy"
                style="font-size: 20px;"
              >
                {{ order.restaurant.name }}
              </q-list-header>
              <q-item
                v-for="item in order.products"
                :key="item"
              >
                <q-item-main>
                  <q-item-tile label>{{ item.product.name }}</q-item-tile>
                  <q-item-tile sublabel>{{ item.quantity }} adag</q-item-tile>
                </q-item-main>
                <q-item-side
                  right
                  v-html="convertCurrency(item.product.price * item.quantity)"
                  class="pricePlate shadow-5"
                />
              </q-item>
              <q-item v-if="gotOrderDesc(order.restaurant.id)" class="bg-blue-grey-1">
                <q-item-main>
                  <q-item-tile label class="text-black strong">Üzenet az étteremnek</q-item-tile>
                  <span class="text-dark light-paragraph">{{ order.orderDesc }}</span>
                </q-item-main>
              </q-item>
              <q-item
                v-if="getRestNumber > 1"
                class="bg-dark glossy"
              >
                <q-item-main class="text-white">
                  Részösszeg
                </q-item-main>
                <q-item-side
                  right
                  v-html="convertCurrency(order.subTotal)"
                  class="pricePlate shadow-3"
                />
              </q-item>
            </q-list>
          </q-item-main>
        </q-item>
        <q-item class="col justify-between totalDisplay glossy">
          <q-item-side class="text-dark strong">
            Fizetendő
          </q-item-side>
          <q-item-main class="col-3 pricePlate shadow-3">
            <span v-html="convertCurrency(cartTotal)"/>
          </q-item-main>
        </q-item>
      </q-list>
      <q-list class="no-padding">
        <q-list-header
          class="orderSection glossy"
        >
          Szállítási adatok
        </q-list-header>
        <q-item>
          <q-item-side icon="account_box"/>
          <q-item-main class="text-truncate">
            <table class="q-table full-width horizontal-separator orderTable">
              <tbody>
                <tr>
                  <td class="text-left tableProp">Név:</td>
                  <td class="text-left">{{ getUsersName }}</td>
                </tr>
                <tr>
                  <td class="text-left">Telefonszám:</td>
                  <td class="text-left">+36-30-493-0040</td>
                </tr>
                <tr>
                  <td class="text-left">Email:</td>
                  <td class="text-left">holika69@gmail.com</td>
                </tr>
              </tbody>
            </table>
          </q-item-main>
        </q-item>
        <q-item-separator color="red"/>
        <q-item>
          <q-item-side icon="place"/>
          <q-item-main>
            <table class="q-table full-width horizontal-separator orderTable">
              <tbody>
                <tr>
                  <td class="text-left tableProp">Település:</td>
                  <td class="text-left">{{ getOrderAddress.city }}</td>
                </tr>
                <tr>
                  <td class="text-left">Cím:</td>
                  <td class="text-left">{{ getOrderAddress.street }} {{ getOrderAddress.houseNumber }}</td>
                </tr>
                <tr v-if="getOrderAddress.description">
                  <td class="text-left">Megjegyzés:</td>
                  <td class="text-left">{{ getOrderAddress.description }}</td>
                </tr>
              </tbody>
            </table>
          </q-item-main>
        </q-item>
      </q-list>
    </div>
    <q-stepper-navigation class="row justify-between">
      <q-btn color="red-8" outline @click="$emit('prevStep')">Vissza</q-btn>
      <q-btn color="green-8" push @click="$emit('submitOrder')">Rendelés küldése</q-btn>
    </q-stepper-navigation>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { currencyFormat } from 'src/helpers'

  export default {
    data () {
      return {

      }
    },
    computed: {
      ...mapGetters({
        getUsersName: 'auth/getUsersName',
        cart: 'cart/getCart',
        getRestNumber: 'cart/getRestNumber',
        cartTotal: 'cart/cartTotal',
        getOrderAddress: 'order/getOrderAddress'
      })
    },
    methods: {
      convertCurrency: function (value) {
        return currencyFormat(value)
      },
      gotOrderDesc (restId) {
        return this.cart[restId].orderDesc.length > 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import '~variables'

  .orderSection
    background $brown-2
    color black
    font-size 1.5em
    font-weigth bold
    letter-spacing 2px

  .restName
    padding 0 1rem
    letter-spacing 2px
    
  // .orderTable
  //   border 1px solid rgba(0, 0, 0, 20)
  
  .pricePlate
    text-align center
    background $brown-4
    font-weight bold
    color white
    border-radius 3px
    padding 5px 10px
    min-width 80px

  .orderTable
    & tr:last-child > td
      border-bottom none!important
    & .tableProp
      width 150px

</style>
