import axios from 'axios'

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  axios.defaults.baseURL = 'http://localhost:3000/api/'
}
