<template>
  <div class="dayWrapper col-xl-3 col-lg-4 col-md-6 col-xs-12 animate-scale">
    <div class="row justify-around" :class="isOpenToday ? 'bg-green-2 shadow-3' : 'bg-light'">
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
     <div class="col-12">
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
        class="setOpenHours"
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
  import moment from 'moment'

  export default {
    name: 'OpenHours',
    props: ['day', 'id', 'values'],
    data () {
      return {
        isOpenToday: false,
        nyitvatartas: {
          from: '',
          to: ''
        },
        toResponse: {
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
          this.updateHours(this.nyitvatartas)
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
          isOpenToday: this.isOpenToday,
          from: this.toResponse.from,
          to: this.toResponse.to
        })
      },
      updateHours (newVal) {
        Object.keys(newVal).forEach(prop => {
          // console.log(prop + ': ' + moment(newVal[prop]).isValid())
          if (moment(newVal[prop]).isValid()) {
            this.toResponse[prop] = ('0' + moment(newVal[prop]).hours()).slice(-2) + ':' + ('0' + moment(newVal[prop]).minutes()).slice(-2)
          }
          else if (prop === 'from') {
            this.toResponse[prop] = '00:00'
          }
          else {
            this.toResponse[prop] = '23:59'
          }
        })
        this.setOpenHours()
      }
    },
    mounted () {
      if (this.values) {
        let today = new Date()
        this.isOpenToday = this.values.isOpenToday
        this.nyitvatartas.from = today.setHours(this.values.from.split(':')[0], this.values.from.split(':')[1])
        this.nyitvatartas.to = today.setHours(this.values.to.split(':')[0], this.values.to.split(':')[1])
      }
      this.updateHours(this.nyitvatartas)
    }
  }
</script>

<style lang="stylus">
  .setOpenHours
    & .q-input-target
      display block!important
      text-align center
    & i
      position absolute
      right: 0
</style>

<style lang="stylus" scoped>
  @import '~variables'

  .dayWrapper
    padding 10px
    & > div
      border 1px solid $brown-4
      border-radius 5px
      padding 10px
</style>