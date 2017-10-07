import axios from 'axios'
import router from './../router'
import { showPopup } from 'src/helpers'

// main.js-be integrálva

// Define api link
axios.defaults.baseURL = 'http://letmeeat.dev'

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  console.log('request hiba')
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.message === 'Network Error') {
    showPopup('Nincs kapcsolat a szerverrel!')
  }
  else if (error.message.includes('401') && router.currentRoute.name !== 'login') {
    showPopup('Újra be kell jelentkezned!', 'warning')
  }
  return Promise.reject(error)
})
