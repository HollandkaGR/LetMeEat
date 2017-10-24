<template>
  <div>
    <h5 v-if="options.newProd">Új termék</h5>
    <h5 v-else>A termék módosítása</h5>
    <div>
      <q-field
        :error="errors.name !== undefined"
        :error-label="errors.name !== undefined ? errors.name[0] : ''"
        class="col-md-6 inputField"
      >
        <q-input
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
          float-label="A termék ára"
          color="brown-4"
          @focus="clearError('price')"
        />
      </q-field>
    </div>
    <div class="row justify-between">
      <q-btn color="red-4" flat @click="modalRef.close()">Mégse</q-btn>
      <q-btn v-if="options.newProd" color="green-4" push @click="saveNewProduct">Felvétel</q-btn>
      <q-btn v-else color="green-4" push @click="updateProduct">Módosítás</q-btn>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  export default {

    name: 'ProductModal',
    props: ['modalRef', 'options'],
    data () {
      return {
        errors: [],
        name: null,
        description: null,
        price: null
      }
    },
    watch: {
      options (newVal) {
        if (newVal.product) {
          this.name = newVal.product.name
          this.description = newVal.product.description
          this.price = newVal.product.price
        }
        else {
          this.clearValues()
        }
      }
    },
    methods: {
      ...mapActions({
        newProduct: 'admin/newProduct'
      }),
      saveNewProduct () {
        this.newProduct({
          data: {
            name: this.name,
            description: this.description,
            price: this.price,
            catId: this.options.catId
          },
          context: this
        })
          .then(() => {
            this.modalRef.close(() => {
              this.clearValues()
            })
          })
      },
      updateProduct () {
        console.log('Módosítás')
      },
      clearValues () {
        this.name = null
        this.description = null
        this.price = null
        this.errors = []
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