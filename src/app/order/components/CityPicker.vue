<template>
  <q-field
    icon="place"
    class="col-12"
  >
    <q-select
      float-label="Város kiválasztása"
      v-model="city"
      inverted
      :color="city === null ? 'red-4' : 'green-4'"
      :options="[
        {label: 'Pécs', value: 'Pécs'},
        {label: 'Mohács', value: 'Mohács'},
      ]"
      @change="cityChanged"
    />
  </q-field>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    data () {
      return {
        city: null
      }
    },
    computed: {
      ...mapGetters({
        getCity: 'order/getCity'
      })
    },
    methods: {
      ...mapActions({
        setCity: 'order/setCity',
        resetAddress: 'order/resetAddress'
      }),
      cityChanged (newVal) {
        this.resetAddress()
        this.$nextTick(function () {
          this.setCity(newVal)
        })
      }
    },
    mounted () {
      if (this.getCity) {
        this.city = this.getCity
      }
    }
  }
</script>

<style lang="stylus" scoped>
  
</style>
