<template>
  <div @keyup.enter="commitModal">
    <h5 v-if="options.newProd">Új termék</h5>
    <h5 v-else>A termék módosítása</h5>
    <div>
      <q-field
        :error="errors.name !== undefined"
        :error-label="errors.name !== undefined ? errors.name[0] : ''"
        class="col-md-6 inputField"
      >
        <q-input
          ref="newProdModalInput"
          type="text"
          v-model="product.name"
          float-label="A termék neve"
          color="brown-4"
          @focus="clearError('name')"
        />
      </q-field>
      <q-field
        :error="errors.description !== undefined"
        :error-label="errors.description !== undefined ? errors.description[0] : ''"
        class="col-md-6 inputField"
      >
        <q-input
          type="text"
          v-model="product.description"
          float-label="A termék leírása"
          color="brown-4"
          @focus="clearError('description')"
        />
      </q-field>
      <q-field
        :error="errors.price !== undefined"
        :error-label="errors.price !== undefined ? errors.price[0] : ''"
        class="col-md-6 inputField"
      >
        <q-input
          type="number"
          v-model="product.price"
          float-label="A termék ára (Ft)"
          color="brown-4"
          @focus="clearError('price')"
        />
      </q-field>
    </div>
    <div class="row justify-between" style="margin:15px 0;padding:5px;">
      <q-toggle color="green-4" v-model="product.inAction" label="Akció" left-label/>
      <q-field
        :error="errors.salePercent !== undefined"
        :error-label="errors.salePercent !== undefined ? errors.salePercent[0] : ''"
        class="inputField no-margin"
      >
        <q-input
          :disable="!product.inAction"
          v-model="product.salePercent"
          inverted
          type="number"
          color="red-4"
          :min="0"
          :max="100"
          suffix="%"
          @focus="clearError('salePercent')"
        >
          <q-tooltip :offset="[0, 10]">Az akció mértéke százalékban</q-tooltip>
        </q-input>
      </q-field>
    </div>
    <div class="row justify-between">
      <q-btn color="red-4" flat @click="modalRef.close()">Mégse</q-btn>
      <q-btn v-if="options.newProd" color="green-4" push @click="saveNewProduct">Felvétel</q-btn>
      <q-btn v-else color="green-4" push @click="updateSelectedProduct">Módosítás</q-btn>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import { AdminProduct } from 'src/classes/Product'

  export default {

    name: 'ProductModal',
    props: ['modalRef', 'options', 'isOpen'],
    data () {
      return {
        errors: [],
        product: new AdminProduct()
      }
    },
    computed: {
      computedSalePercent: function () {
        return this.product.salePercent.length === 0 ? 0 : this.product.salePercent
      }
    },
    watch: {
      isOpen (newVal) {
        if (newVal) {
          this.$refs.newProdModalInput.select()
        }
      },
      options (newVal) {
        this.clearValues()
        if (newVal.product) {
          this.product = Object.assign(Object.create(new AdminProduct()), newVal.product)
        }
      }
    },
    methods: {
      ...mapActions({
        newProduct: 'admin/newProduct',
        updateProduct: 'admin/updateProduct'
      }),
      saveNewProduct () {
        this.product.salePercent = this.computedSalePercent
        let data = this.product.toJson()
        data.catId = this.options.catId

        this.newProduct({
          data,
          context: this
        })
          .then(() => {
            this.modalRef.close(() => {
              this.clearValues()
            })
          })
      },
      updateSelectedProduct () {
        this.product.salePercent = this.computedSalePercent
        let data = this.product.toJson()
        data.catId = this.options.catId

        this.updateProduct({
          data,
          context: this
        })
          .then(() => {
            this.modalRef.close(() => {
              this.clearValues()
            })
          })
      },
      commitModal () {
        if (this.options.newProd) {
          this.saveNewProduct()
        }
        else {
          this.updateSelectedProduct()
        }
      },
      clearValues () {
        this.errors = []
        this.product = new AdminProduct()
      },
      clearError (fieldName) {
        if (this.errors[fieldName] !== undefined) {
          delete this.errors[fieldName]
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>