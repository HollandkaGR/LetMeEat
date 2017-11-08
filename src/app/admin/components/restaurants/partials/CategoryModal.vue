<template>
  <div>
    <div>
      <h5 v-if="options.newCat">Új kategória</h5>
      <h5 v-else>A kategória módosítása</h5>
      <q-field
        :error="errors.name !== undefined"
        :error-label="errors.name !== undefined ? errors.name[0] : ''"
        class="col-md-6 inputField"
      >
        <q-input
          ref="newCatModalInput"
          type="text"
          v-model="category.name"
          float-label="Az kategória neve"
          color="brown-4"
          @focus="clearError('name')"
          @keyup.enter="commitModal"
        />
      </q-field>
    </div>
    <div class="row justify-between">
      <q-btn color="red-4" flat @click="modalRef.close()">Mégse</q-btn>
      <q-btn v-if="options.newCat" color="green-4" push @click="saveNewCat">Felvétel</q-btn>
      <q-btn v-else color="green-4" push @click="updateCat">Módosít</q-btn>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { AdminCategory } from 'src/classes/Category'

  export default {
    name: 'CategoryModal',

    props: ['modalRef', 'options', 'isOpen'],
    data () {
      return {
        errors: [],
        category: new AdminCategory()
      }
    },
    computed: {
      ...mapGetters({
        getSelectedRestId: 'admin/getSelectedRestId'
      })
    },
    watch: {
      isOpen (newVal) {
        if (newVal) {
          this.$refs.newCatModalInput.select()
        }
      },
      options (newVal) {
        this.clearValues()
        if (newVal.category) {
          this.category = Object.assign(Object.create(new AdminCategory()), newVal.category)
        }
      }
    },
    methods: {
      ...mapActions({
        newCategory: 'admin/newCategory',
        updateCategory: 'admin/updateCategory'
      }),
      saveNewCat: function () {
        let data = this.category.toJson()
        data.restId = this.getSelectedRestId
        this.newCategory({
          data,
          context: this
        })
          .then(() => {
            this.modalRef.close()
          })
      },
      updateCat () {
        let data = this.category.toJson()
        data.restId = this.getSelectedRestId

        this.updateCategory({
          data,
          context: this
        })
          .then(() => {
            this.modalRef.close()
          })
      },
      commitModal () {
        if (this.options.newCat) {
          this.saveNewCat()
        }
        else {
          this.updateCat()
        }
      },
      clearValues () {
        this.errors = []
        this.category = new AdminCategory()
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