<template>
  <q-card class="bg-light">
    <q-card-title>
      <span class="text-bold">
        {{ product.name }}
      </span>
      <span slot="subtitle">
        {{ product.description }}
      </span>
      <div slot="right" class="column items-center xs-gutter">
        <div>
          Mennyiség
          <q-select
          v-model="select"
          :options="productCounter"
          class="no-margin"
          />
        </div>
        <q-btn color="brown-4" small icon="add_shopping_cart">
          Kosárba
        </q-btn>
      </div>
    </q-card-title>
  </q-card>
</template>

<script>
  import { QSelect } from 'quasar'
  import { productCounter } from 'src/helpers'

  export default {
    components: {
      QSelect
    },
    data: function () {
      return {
        select: '1',
        productCounter: productCounter()
      }
    },
    props: [ 'product' ]
  }
</script>
