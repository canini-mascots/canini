import Vue from 'vue'
import Vuex from 'vuex'
import customer from './customer'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  key: 'canini_app'
})
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      customer
    },
    plugins: [vuexLocal.plugin]
  })

  return Store
}
