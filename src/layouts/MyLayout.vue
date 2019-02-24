<template>
  <q-layout view="hHh LpR fFf" class="bg-grey-3">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          Canini Mascots
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
      elevated
    >
      <q-list>
        <q-item-label header>Menu</q-item-label>
        <q-item clickable :to="{name: 'home'}">
          <q-item-section>
            <q-item-label>{{$t('home')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{name: 'catalog'}">
          <q-item-section>
            <q-item-label>{{$t('catalog')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{name: 'orders'}">
          <q-item-section>
            <q-item-label>{{$t('orders')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{name: 'conditions'}">
          <q-item-section>
            <q-item-label>{{$t('conditions')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{name: 'about'}">
          <q-item-section>
            <q-item-label>{{$t('about')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{name: 'register'}">
          <q-item-section>
            <q-item-label>{{$t('register')}}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
