<template>
  <div>
    <!-- <q-input v-model.trim="currentDesc" @blur="descBlur" color="brown-2" :float-label="label" type="textarea" class="no-margin"/> -->
    <q-field
        :count="maxChar"
        helper="Rendelkezésre álló karakterek"
        class=""
      >
        <q-input v-model.lazy="currentDesc" @blur="descBlur" color="brown-8" placeholder="A rendeléssel kapcsolatos megjegyzés" :max-length="maxChar" type="textarea" class="orderDesc">
        </q-input>
      </q-field>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: ['restId'],
    data () {
      return {
        currentDesc: '',
        maxChar: 255
      }
    },
    computed: {
      ...mapGetters({
        getRestOrderDesc: 'cart/getRestOrderDesc'
      }),
      charLeft: function () {
        return this.maxChar - this.currentDesc.trim().length
      }
    },
    methods: {
      ...mapActions({
        setOrderDesc: 'cart/setOrderDesc'
      }),
      descBlur: function () {
        // console.log(this.currentDesc)
        this.setOrderDesc({
          restId: this.restId,
          orderDesc: this.currentDesc.trim()
        })
      }
    },
    mounted: function () {
      this.currentDesc = this.getRestOrderDesc[this.restId]
    }
  }
</script>

<style lang="stylus" scoped>
    
</style>
