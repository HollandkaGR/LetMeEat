<template>
  <div>
    <div class="row justify-between items-center">
      <h6>Termékek</h6>
      <q-btn outline color="black" @click="openNewCatModal">Új katagória</q-btn>
    </div>
    <q-list v-for="category in getCategories" :key="category.id" class="no-padding categoryWrapper">
      <q-list-header class="bg-brown-4 text-white catName">{{ category.name }}</q-list-header>
      <product v-if="category.products !== 'undefined'" v-for="product in category.products" :key="product.id" :product="product"></product>
    </q-list>
    <q-modal
      ref="newCatModal"
      :content-css="{padding: '50px'}"
      @close="newCatModalClosed"
    >
    <div>
      <q-field
      :error="errors.name !== undefined"
      :error-label="errors.name !== undefined ? errors.name[0] : ''"
      class="col-md-6 inputField"
      >
      <q-input
        type="text"
        inverted
        v-model="newCatName"
        float-label="Az új kategória neve"
        color="brown-4"
        @focus="clearError('name')"
      />
      </q-field>
  </div>
  <div class="row justify-between">
    <q-btn color="red-4" flat @click="$refs.newCatModal.close()">Mégse</q-btn>
    <q-btn color="green-4" @click="saveNewCat">Felvétel</q-btn>
  </div>
</q-modal>
</div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Category from './Category'
  import Product from './Product'

  export default {
    name: 'Categories',
    components: { Category, Product },
    data () {
      return {
        errors: [],
        newCatName: null
      }
    },
    computed: {
      ...mapGetters({
        getSelectedRestId: 'admin/getSelectedRestId',
        getCategories: 'admin/getCategories'
      })
    },
    methods: {
      ...mapActions({
        fetchCategories: 'admin/fetchCategories',
        newCategory: 'admin/newCategory'
      }),
      openNewCatModal: function () {
        this.$refs.newCatModal.open()
      },
      newCatModalClosed: function () {
        this.newCatName = null
        this.errors = []
      },
      saveNewCat: function () {
        this.newCategory({
          data: {
            restId: this.getSelectedRestId,
            name: this.newCatName
          },
          context: this
        })
          .then(() => {
            this.$refs.newCatModal.close()
          })
      },
      clearError (fieldName) {
        if (this.errors[fieldName] !== undefined) {
          delete this.errors[fieldName]
        }
      }
    },
    mounted: function () {
      this.fetchCategories({
        restId: this.getSelectedRestId
      })
        .then(() => {
        })
    }
  }
</script>

<style lang="stylus" scoped>
  .catName
    font-size 18px
</style>
