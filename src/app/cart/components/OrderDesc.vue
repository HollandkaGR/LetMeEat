<template>
  <div>
    <q-input v-model="currentDesc" @keyup="descChanged" inverted color="secondary" float-label="Inverted textarea" type="textarea" max-length="10" />
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    props: ['restId'],
    data () {
      return {
        currentDesc: ''
      }
    },
    computed: {
      ...mapGetters({
        getRestOrderDesc: 'cart/getRestOrderDesc'
      })
    },
    methods: {
      ...mapActions({
        setOrderDesc: 'cart/setOrderDesc'
      }),
      descChanged: function () {
        this.setOrderDesc({
          restId: this.restId,
          orderDesc: this.currentDesc
        })
      }
    },
    mounted: function () {
      this.currentDesc = this.getRestOrderDesc[this.restId]
    }
  }
</script>
