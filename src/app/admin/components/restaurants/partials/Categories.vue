<template>
  <div>
    <div class="row justify-between items-center" style="margin-bottom: 10px;">
      <h6>Termékek</h6>
      <q-btn outline color="black" @click="openNewCatModal">Új katagória</q-btn>
    </div>
    <div v-if="getCategories.length === 0">
      Még nincs Egyetlen kategória sem az éttermedben, vigyünk fel 
      <q-btn flat color="green-4" @click="openNewCatModal" class="no-padding">
        újat
      </q-btn>
      ?
    </div>
    <q-list
      v-else
      v-for="category in getCategories"
      :key="category.id"
      class="no-padding categoryWrapper shadow-2 no-border"
      animate-scale
    >
      <q-list-header class="bg-brown-4 text-white catName row justify-between catHeader">
        <div>
          {{ category.name }}
        </div>
        <div class="actionIcons">
          <q-btn small flat color="black" class="no-padding" @click="addProduct(category.id)">
            <q-icon name="add" size="24px"/>
          </q-btn>
          <q-btn small flat color="black" class="no-padding" @click="editCategory(category.id)">
            <q-icon name="mode_edit" size="24px"/>
          </q-btn>
          <q-btn small flat color="black" class="no-padding" @click="removeCategory(category.id)">
            <q-icon name="delete_forever" size="24px"/>
          </q-btn>
        </div>
      </q-list-header>
      <q-item v-if="category.products.length === 0" class="bg-red-1">
        <div>Még nincs termék a kategóriában</div>
      </q-item>
      <product v-else v-for="product in category.products" :key="product.id" :product="product" @editProduct="editProduct"></product>
    </q-list>

    <!-- Új kategória -->
    <q-modal
      ref="catModal"
      :content-css="{width: '400px', padding: '10px'}"
    >
      <category-modal
        :modalRef="$refs.catModal"
        :options="catOptions"
      />
    </q-modal>

    <!-- Termék modal -->
    <q-modal
      ref="prodModal"
      :content-css="{width: '400px', padding: '10px'}"
    >
      <product-modal
        :modalRef="$refs.prodModal"
        :options="prodOptions"
      />
    </q-modal>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { Dialog } from 'quasar'
  import Product from './Product'
  import CategoryModal from './CategoryModal'
  import ProductModal from './ProductModal'

  export default {
    name: 'Categories',
    components: { CategoryModal, Product, ProductModal },
    data () {
      return {
        catOptions: {
          category: null,
          newCat: false
        },
        prodOptions: {
          catId: null,
          product: null,
          newProd: false
        }
      }
    },
    computed: {
      ...mapGetters({
        getSelectedRestId: 'admin/getSelectedRestId',
        getCategories: 'admin/getCategories',
        getCategory: 'admin/getCategory'
      })
    },
    methods: {
      ...mapActions({
        fetchCategories: 'admin/fetchCategories',
        deleteCategory: 'admin/deleteCategory'
      }),
      openNewCatModal: function () {
        let newOptions = {
          category: null,
          newCat: true
        }
        this.catOptions = newOptions
        this.$refs.catModal.open()
      },
      editCategory (catId) {
        let newOptions = {
          category: this.getCategory(catId),
          newCat: false
        }
        this.catOptions = newOptions
        this.$refs.catModal.open()
      },
      removeCategory (id) {
        Dialog.create({
          title: 'Biztos?',
          message: 'Biztosan törlöd a ' + this.getCategory(id).name + ' kategóriát?',
          buttons: [
            {
              label: 'Mégse',
              handler () {},
              color: 'red-8'
            },
            {
              label: 'Törlés',
              handler: () => {
                this.deleteCategory({
                  data: {
                    catId: id
                  },
                  context: this
                })
                  .catch(error => {
                    console.log(error)
                  })
              },
              color: 'green-4',
              push: true
            }
          ]
        })
      },
      addProduct (catId) {
        let newOptions = {
          catId: catId,
          newProd: true,
          product: null
        }
        this.prodOptions = newOptions
        this.$refs.prodModal.open()
      },
      editProduct (product) {
        let newOptions = {
          catId: product.category_id,
          newProd: false,
          product: product
        }
        this.prodOptions = newOptions
        this.$refs.prodModal.open()
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
  .catHeader
    padding 0 10px
    
  .catName
    font-size 18px
</style>
