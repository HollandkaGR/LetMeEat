<template>
  <div>
    <div class="row justify-end" style="margin: 10px 0">
      <q-btn small class="bg-green-6 text-light strong" @click="newRest">Új étterem</q-btn>
    </div>
    <q-list inset-separator>
      <overview-item></overview-item>
    </q-list>
  </div>
</template>

<script>
  import OverviewItem from 'src/app/restaurant/components/admin/OverviewItem'

  export default {
    components: {
      OverviewItem
    },
    data () {
      return {
      }
    },
    methods: {
      newRest: function () {
        this.$router.push({ name: 'ettermeim.uj' })
      }
    }
  }
</script>

<style lang="stylus" scoped>
</style>