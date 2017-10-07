<template>
  <q-item>
    <q-item-main>
      <q-item-tile label>John Doe</q-item-tile>
      <q-item-tile sublabel>
        <q-btn color="">Nyitva</q-btn>
      </q-item-tile>
    </q-item-main>
    <q-item-side right>
      <div class="actionButtons">
        <q-btn small flat color="green-4" class="no-padding">
          <q-icon name="mode_edit" size="24px"/>
        </q-btn>
        <q-btn small flat color="red-4" class="no-padding">
          <q-icon name="delete" size="24px"/>
        </q-btn>
      </div>
    </q-item-side>
  </q-item>
</template>

<script>
  export default {

    name: 'OverviewItem',

    data () {
      return {

      }
    }
  }
</script>

<style lang="css" scoped>
</style>