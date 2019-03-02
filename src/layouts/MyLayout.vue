<template>
  <q-layout view="lHh LpR fFf" class="bg-grey-3">
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
          {{$t($router.currentRoute.name)}}
        </q-toolbar-title><!--
        <q-input dark dense standout v-model="search">
          <template v-slot:append>
            <q-icon v-if="search === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
          </template>
        </q-input>
        <q-btn flat class="q-ml-md" :label="$t('login')" :to="{name: 'login'}" />-->
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
      elevated
    >
      <div class="q-pa-md shadow-1 q-mb-md bg-grey-9" style="color: white;">
        <img src="statics/canini-dark.svg" alt="Canini" class="logo q-mb-md"/>
        <div class="row items-center full-width justify-between">
          <span class="text-subtitle1">{{$t('visitor')}}</span>
          <q-btn flat round dense icon="exit_to_app" :to="{name: 'login'}" :title="$t('login')" />
        </div>
      </div>
      <q-list class="text-body1">
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
      leftDrawerOpen: this.$q.platform.is.desktop,
      search: ''
    }
  },
  methods: {
    openURL
  }
}
</script>

<style scoped>
.logo {
  height: 70px;
  display: block;
}
</style>
