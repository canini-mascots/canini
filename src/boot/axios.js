import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$apiBase = `//${location.hostname}:${location.port}/api/`
  Vue.prototype.$axios = axios
  axios.defaults.baseURL = Vue.prototype.$apiBase
}
