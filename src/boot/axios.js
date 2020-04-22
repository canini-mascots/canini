import axios from 'axios'

export default async ({ app, Vue }) => {
  Vue.prototype.$apiBase = `//${location.hostname}:${location.port}/api/`
  Vue.prototype.$axios = axios
  axios.defaults.baseURL = Vue.prototype.$apiBase

  axios.interceptors.request.use(function (config) {
    if (app.store.state.customer.token !== '') {
      config.headers.Authorization = app.store.state.customer.token
    }
    return config
  })
}
