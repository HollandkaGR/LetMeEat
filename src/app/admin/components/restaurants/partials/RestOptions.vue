<template>
  <q-list class="no-padding restOptions">
    <q-list-header class="text-brown-6 strong">Beállítások</q-list-header>
    <q-item v-if ="getSelectedRestaurant.isActive !== undefined" multiline tag="label" class="col row items-center">
      <q-item-main class="col">
        <q-item-tile label>Aktív</q-item-tile>
        <q-item-tile sublabel lines="4">Ha ez a beállítás ki van kapcsolva, az étterem nem lesz látható a vendégek számára</q-item-tile>
      </q-item-main>
      <q-item-side right class="col-1">
        <q-toggle color="green-4" v-model="getSelectedRestaurant.isActive" style="margin:0 auto;"/>
      </q-item-side>
    </q-item>
    <q-item v-if ="getSelectedRestaurant.description !== undefined" multiline tag="label" class="col row items-center">
      <q-item-main class="col">
        <q-item-tile label>Üzenet</q-item-tile>
        <q-item-tile sublabel lines="2">Tájékoztatás, leírás, információ, ami megjelenik a vendégek számára, ha bekapcsoljuk</q-item-tile>
        <q-field
          v-if="getSelectedRestaurant.showMessage" 
          :count="1024"
          class="animate-scale"
        >
          <q-input v-model="getSelectedRestaurant.description" type="textarea" color="brown-8" max-length="1024" :min-rows="1" :max-height="300"></q-input>
        </q-field>
      </q-item-main>
      <q-item-side right class="col-1">
        <q-toggle color="green-4" v-model="getSelectedRestaurant.showMessage" style="margin:0 auto;"/>
      </q-item-side>
    </q-item>
    <q-item multiline class="col row items-center">
      <q-item-main class="col">
        <q-item-tile label>A várható kiszállítási idő (percben)</q-item-tile>
        <q-item-tile sublabel lines="4">Az érték meg fog jelenni a vendégek számára, érdemes mindig a valós időnek megfelelően módosítani</q-item-tile>
      </q-item-main>
      <q-item-side right class="col-md-1 col-sm-2">
        <q-input inverted type="number" color="brown-4" v-model="getSelectedRestaurant.deliveryTime" class="no-margin"/>
      </q-item-side>
    </q-item>
    <q-item multiline class="col row items-center">
      <q-item-main class="col">
        <q-item-tile label>A minimális rendelés összege</q-item-tile>
        <q-item-tile sublabel lines="4">Ezen érték alatti rendelést nem lehet leadni az étterem felé (az esetleges akciókkal csökkentett áron számolva)</q-item-tile>
      </q-item-main>
      <q-item-side right class="col-md-1 col-sm-2">
        <q-input inverted type="number" color="brown-4" v-model="getSelectedRestaurant.minimumOrder" class="no-margin"/>
      </q-item-side>
    </q-item>
    <q-item class="col row items-center">
      <q-item-main class="col">
        <q-item-tile label>Indexkép</q-item-tile>
        <q-item-tile sublabel lines="4">Ez a kép jelenik meg az étterem indexképeként. Ha nincs beállítva semmi, az oldal alapértelmezett képe jelenik meg!<br>
        <span class="strong text-red-4">Minimum felbontás: 640x360, ajánlott képarány 16:9!</span>
        </q-item-tile>
        <image-uploader></image-uploader>
      </q-item-main>
    </q-item>
  </q-list>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ImageUploader from './ImageUploader'

  export default {

    name: 'RestOptions',
    components: {
      ImageUploader
    },
    computed: {
      ...mapGetters({
        getSelectedRestaurant: 'admin/getSelectedRestaurant'
      })
    }
  }
</script>

<style lang="stylus" scoped>
</style>