<template>
  <q-list class="row justify-center col-4 no-margin">
    <q-item class="col-4">
      <q-item-main>
        {{ day }}
        <div class="isOpenWrapper">
          <q-toggle
            v-model="isOpenToday"
            :label="isOpenToday ? 'Nyitva' : 'Zárva'"
            left-label
            color="green-4"
            inverted
            checked-icon="sentiment very satisfied"
            unchecked-icon="sentiment very dissatisfied"
          />
        </div>
      </q-item-main>
    </q-item>
    <q-item class="col">
      <q-item-main>
        <q-datetime-range 
          v-model="nyitvatartas"
          :disable="!isOpenToday"
          format24h
          inverted
          :error="hasError"
          display-value="Válassz"
          ok-label="Rögzít"
          cancel-label="Mégse"
          clear-label="Töröl"
          :color="isOpenToday ? 'green-4' : 'light'"
          type="time"
          class="datePicker"
        />
        <div style="min-height:20px;">
          <div class="row" v-if="isOpenToday">
            <small class="col-6 text-center">Nyitás</small>
            <small class="col-6 text-center">Zárás</small>
          </div>
        </div>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
  export default {
    name: 'OpenHours',
    props: ['day', 'id'],
    data () {
      return {
        isOpenToday: false,
        nyitvatartas: {
          from: '',
          to: ''
        }
      }
    },
    computed: {
      hasError () {
        return this.isOpenToday && (this.nyitvatartas.from === '' || this.nyitvatartas.to === '')
      },
      errorMsg () {
        if (this.isOpenToday && this.nyitvatartas.from) {
          return 'Az étterem nyitva van, de nincs időpont megadva'
        }
      }
    },
    mounted () {

    }
  }
</script>

<style lang="stylus" scoped>
  .datePicker i
    margin 0!important
    
  .isOpenWrapper
    padding 5px 0
</style>