import axios from 'axios'
import { showError } from 'assets/js/notification.js'
export default async ({ app, Vue }) => {
  Vue.prototype.$axios = axios
  axios.defaults.baseURL = 'http://localhost:3000/api/'

  axios.interceptors.request.use(function (config) {
    if (app.store.state.customer.token !== '') {
      config.headers.Authorization = app.store.state.customer.token
    }
    return config
  })

  window.onunhandledrejection = function (event) {
    if (event.reason.response.data.error) {
      showError(event.reason.response.data.error, Vue.prototype.$q)
      event.preventDefault()
    }
  }
}
