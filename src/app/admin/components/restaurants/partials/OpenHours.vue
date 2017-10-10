<template>
  <div class="dayWrapper col-xl-3 col-lg-4 col-md-6 col-xs-12">
    <div class="row justify-around" :class="isOpenToday ? 'bg-green-2' : 'bg-light'">
      <div>{{ day }}</div>
      <div class="col row justify-end">
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
     <div class="col-auto">
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
        :color="isOpenToday ? 'green-8' : 'light'"
        type="time"
        class="datePicker"
        css="proba"
        @change="updateHours"
      />
      <div style="min-height:20px;">
        <div class="row" v-if="isOpenToday">
          <small class="col-6 text-center">Nyitás</small>
          <small class="col-6 text-center">Zárás</small>
        </div>
      </div>
    </div>
  </div>
</div>
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
    watch: {
      isOpenToday: function () {
        if (!this.isOpenToday) {
          this.nyitvatartas.from = ''
          this.nyitvatartas.to = ''
          this.updateHours()
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
    methods: {
      setOpenHours () {
        this.$emit('setHours', {
          id: this.id,
          from: this.nyitvatartas.from,
          to: this.nyitvatartas.from
        })
      },
      updateHours (newVal) {
        console.log(newVal.to.getHours())
      }
    },
    mounted () {
      this.setOpenHours()
    }
  }
</script>

<style lang="stylus" scoped>
  .dayWrapper
    padding 10px
    & > div
      border 1px solid black
      border-radius 5px
      padding 10px
</style>