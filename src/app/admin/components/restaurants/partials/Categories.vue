<template>
  <div class="row justify-between items-center">
    <h6>Termékek</h6>
    <q-btn outline color="black" @click="createNewCat">Új katagória</q-btn>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import { Dialog } from 'quasar'

  export default {
    name: 'Categories',
    data () {
      return {
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
      createNewCat: function () {
        Dialog.create({
          title: 'Új kategória',
          form: {
            name: {
              type: 'text',
              label: 'Textbox',
              model: ''
            }
          },
          buttons: [
            'Mégse',
            {
              label: 'Mentés',
              handler: (data) => {
                this.saveNewCat(data.name)
              }
            }
          ]
        })
      },
      saveNewCat: function (name) {
        this.newCategory({
          restId: this.getSelectedRestId,
          name: name
        })
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
</style>
