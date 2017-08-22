<template>
  <div>
    <q-tabs>
      <q-route-tab
      icon="mail"
      to="/bejelentkezes"
      exact
      slot="title"    
      />
      <q-route-tab
      icon="alarm"
      to="/alarms"
      exact
      slot="title"
      />
    </q-tabs>
  </div>
</template>

<script>
  import { QTabs, QTab, QTabPane, QSelect, QRouteTab } from 'quasar'
  import UserDetails from 'src/app/auth/components/userDetails'

  export default {
    components: { QTabs, QTab, QTabPane, UserDetails, QSelect, QRouteTab },
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus">

</style>
