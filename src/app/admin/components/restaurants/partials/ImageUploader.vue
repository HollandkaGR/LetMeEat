<template>
  <div>
    <a class="btn" @click="toggleShow">set avatar</a>
    <my-upload field="restIndexImage"
      :langExt="uploaderLang"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      :width="480"
      :height="270"
      :url="url"
      :params="params"
      :headers="headers"
      img-format="png"
      noCircle
      class="restIndexUploader"
    >
  </my-upload>
  <img :src="imgDataUrl">
</div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload'
  import axios from 'axios'

  export default {

    name: 'ImageUploader',
    components: {
      myUpload
    },
    data () {
      return {
        maxFileSize: 5242880,
        minImageWidth: 240,
        minImageHeight: 135,
        show: false,
        url: axios.defaults.baseURL + '/restaurant/image/upload',
        params: {
          file: 'restIndex'
        },
        headers: {
          Authorization: axios.defaults.headers.common['Authorization']
        },
        imgDataUrl: '' // the datebase64 url of created image
      }
    },
    computed: {
      uploaderLang () {
        return {
          hint: 'Kép hozzáadásához kattintson ide!',
          loading: 'Feltöltés…',
          noSupported: 'A jelenlegi böngésző nem támogatott!',
          success: 'Sikeres feltöltés!',
          fail: 'A feltöltés sikertelen!',
          preview: 'Előnézet',
          btn: {
            off: 'Mégse',
            close: 'Bezár',
            back: 'Vissza',
            save: 'Mentés'
          },
          error: {
            onlyImg: 'Csak kép',
            outOfSize: 'A kép mérete túl nagy, maximum ' + this.maxFileSize / 1024 / 1024 + 'MB lehet!',
            lowestPx: 'A kép túl kicsi, legalább ' + this.minImageWidth + ' széles és ' + this.minImageHeight + ' magasnak kell lennie!'
          }
        }
      }
    },
    methods: {
      toggleShow () {
        this.show = !this.show
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess (imgDataUrl, field) {
        console.log('-------- crop success --------')
        this.imgDataUrl = imgDataUrl
      },
      /**
       * upload success
       *
       * [param] jsonData  server api return data, already json encode
       * [param] field
       */
      cropUploadSuccess (jsonData, field) {
        console.log('-------- upload success --------')
        console.log(jsonData)
        console.log('field: ' + field)
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail (status, field) {
        console.log('-------- upload fail --------')
        console.log(status)
        console.log('field: ' + field)
      }
    }
  }
</script>

<style lang="stylus">
  .restIndexUploader 
    & .vicp-crop
      display flex!important
      justify-content space-around
      & .vicp-crop-right
        display flex
        align-items: center
      & .vicp-preview-item
        margin-right 0!important
        & img
          margin 0!important
    
</style>