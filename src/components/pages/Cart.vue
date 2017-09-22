<template>
  <div>
    <h2 class="no-margin">A kosár tartalma</h2>
    <div class="row">
      
      <q-stepper color="brown-4" ref="stepper" alternative-labels>
        <q-step default name="first" title="Rendelés véglegesítése" subtitle="Megjegyzések rögzítése">
          <cart class="col-6"></cart>
          <q-stepper-navigation>
            <q-btn color="secondary" @click="$refs.stepper.next()">Continue</q-btn>
          </q-stepper-navigation>
        </q-step>
        <q-step error name="second" title="Custom channels" subtitle="Alert message">
          <div v-for="n in 10">Step 2</div>
          <q-stepper-navigation>
            <q-btn color="secondary" @click="$refs.stepper.next()">Next</q-btn>
            <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
          </q-stepper-navigation>
        </q-step>
        <q-step name="third" title="Get code">
          <div v-for="n in 3">Step 3</div>
          <q-stepper-navigation>
            <q-btn color="secondary" @click="$refs.stepper.next()">Next</q-btn>
            <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
          </q-stepper-navigation>
        </q-step>
        <q-step name="fifth" disable title="Disabled">
          <div v-for="n in 3">Step 4</div>
          <q-stepper-navigation>
            <q-btn color="secondary" @click="$refs.stepper.next()">Next</q-btn>
            <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
          </q-stepper-navigation>
        </q-step>
        <q-step name="fourth" title="Review and Finalize">
          <div v-for="n in 3">Step 5</div>
          <q-stepper-navigation>
            <q-btn color="secondary" @click="$refs.stepper.goToStep('first')">Restart</q-btn>
            <q-btn color="secondary" flat @click="$refs.stepper.previous()">Back</q-btn>
          </q-stepper-navigation>
        </q-step>
      </q-stepper>
    </div>
  </div>
</template>

<script>
  import {
    QStepper,
    QStep,
    QStepperNavigation
  } from 'quasar'
  import Cart from 'src/app/cart/components/Cart.vue'

  export default {
    components: {
      Cart,
      QStepper,
      QStep,
      QStepperNavigation
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="stylus">

</style>
