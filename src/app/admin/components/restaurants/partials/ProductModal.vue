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
          v-model="name"
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
          v-model="description"
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
          v-model="price"
          float-label="A termék ára (Ft)"
          color="brown-4"
          @focus="clearError('price')"
        />
      </q-field>
    </div>
    <div class="row justify-between" style="margin:15px 0;padding:5px;">
      <q-toggle color="green-4" v-model="inAction" label="Akció" left-label/>
      <q-field
        :error="errors.salePercent !== undefined"
        :error-label="errors.salePercent !== undefined ? errors.salePercent[0] : ''"
        class="inputField no-margin"
      >
        <q-input
          :disable="!inAction"
          v-model="salePercent"
          inverted
          type="number"
          color="red-4"
          :min="1"
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
  export default {

    name: 'ProductModal',
    props: ['modalRef', 'options', 'isOpen'],
    data () {
      return {
        errors: [],
        prodId: null,
        name: null,
        description: null,
        price: null,
        inAction: false,
        salePercent: 0
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
          this.prodId = newVal.product.id
          this.name = newVal.product.name
          this.description = newVal.product.description
          this.price = newVal.product.price
          this.inAction = newVal.product.inAction
          this.salePercent = newVal.product.salePercent
        }
      }
    },
    methods: {
      ...mapActions({
        newProduct: 'admin/newProduct',
        updateProduct: 'admin/updateProduct'
      }),
      saveNewProduct () {
        this.newProduct({
          data: {
            name: this.name,
            description: this.description,
            price: this.price,
            catId: this.options.catId,
            inAction: this.inAction,
            salePercent: this.salePercent
          },
          context: this
        })
          .then(() => {
            this.modalRef.close(() => {
              this.clearValues()
            })
          })
      },
      updateSelectedProduct () {
        this.updateProduct({
          data: {
            prodId: this.prodId,
            name: this.name,
            description: this.description,
            price: this.price,
            catId: this.options.catId,
            inAction: this.inAction,
            salePercent: this.salePercent
          },
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
        this.prodId = null
        this.name = null
        this.description = null
        this.price = null
        this.inAction = false
        this.salePercent = 0
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