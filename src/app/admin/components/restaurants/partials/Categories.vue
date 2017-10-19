<template>
  <div>
    <h6>Termékek</h6>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Categories',
    data () {
      return {}
    },
    computed: {
      ...mapGetters({
        getSelectedRestId: 'admin/getSelectedRestId',
        getCategories: 'admin/getCategories'
      })
    },
    methods: {
      ...mapActions({
        fetchCategories: 'admin/fetchCategories'
      })
    },
    mounted: function () {
      this.fetchCategories({
        restId: this.getSelectedRestId
      })
        .then((response) => {
        })
    }
  }
</script>

<style lang="stylus" scoped>
</style>
