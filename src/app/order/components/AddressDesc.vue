<template>
  <q-field
    :count="maxChar"
    helper="Rendelkezésre álló karakterek"
    class="col-12"
    style="padding: .5em 1em"
  >
    <q-input
      v-model.lazy="addressDesc"
      @blur="descBlur"
      color="brown-8"
      placeholder="Kaputelefon kódja, csörgessen a futár stb."
      :max-length="maxChar"
      type="textarea"
      class="orderDesc"
    >
    </q-input>
  </q-field>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    data () {
      return {
        addressDesc: '',
        maxChar: 255
      }
    },
    computed: {
      ...mapGetters({
        getOrderDesc: 'order/getOrderDesc'
      }),
      charLeft: function () {
        return this.maxChar - this.addressDesc.trim().length
      }
    },
    methods: {
      ...mapActions({
        setOrderDesc: 'order/setOrderDesc'
      }),
      descBlur () {
        this.setOrderDesc(this.addressDesc)
      }
    },
    mounted () {
      if (this.getOrderDesc) {
        this.addressDesc = this.getOrderDesc
      }
    }
  }
</script>

<style lang="stylus" scoped>
    
</style>
