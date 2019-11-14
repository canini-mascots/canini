<template>
  <q-layout view="lHh LpR fFf" class="bg-grey-3">
    <q-header elevated>
      <q-toolbar class="bg-grey-9">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title id="toolbarTitle">
          <div id="search">
          <q-input dark dense standout v-model="text" class="q-ml-md">
            <template v-slot:append>
              <q-icon v-if="text === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
            </template>
          </q-input>
          </div>
        </q-toolbar-title>
        <q-btn v-if="!this.$store.state.customer.id" flat class="q-ml-md" :label="$t('login')" :to="{name: 'login'}" />
        <q-btn v-else flat class="q-ml-md" @click="rightDrawerOpen = !rightDrawerOpen">
          <q-icon name="fas fa-user" color="grey-1" />
        </q-btn>
      </q-toolbar>
    </q-header>
    <!-- Global Menu -->
    <q-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-2"
      elevated
    >
      <div class="q-pa-md shadow-1 q-mb-md bg-grey-9" style="color: white;">
        <img src="statics/logo.svg" alt="Canini" class="logo q-mb-md"/>
        <div class="row items-center full-width justify-between">
          <span class="text-subtitle1">{{checkUser()}}</span>
          <q-btn
            flat
            round
            dense
            icon="exit_to_app"
            :to="{name: 'login'}"
            :title="$t('login')"
            v-if="!this.$store.state.customer.email"
            />
          <q-btn
            flat
            round
            dense
            icon="exit_to_app"
            :to="{name: 'login'}"
            :title="$t('logout')"
            @click="logout"
            v-else
            />
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
      </q-list>
    </q-drawer>

    <!--Account Menu -->
    <q-drawer
      v-model="rightDrawerOpen"
      content-class="bg-grey-2"
      side="right"
      overlay
  >
      <q-list class="text-body1">
        <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
              <div class="absolute-bottom bg-transparent">
                <q-avatar size="56px" class="q-mb-sm">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <div class="text-weight-bold">Josep manzanera</div>
                <div>{{$t('coininis')}}: 100</div>
              </div>
            </q-img>
        <q-item clickable :to="{name: 'accountConfiguration'}">
          <q-item-section>
            <q-item-label>{{$t('configuration')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{name: 'orders'}">
          <q-item-section>
            <q-item-label>{{$t('orders')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{name: 'suscriptions'}">
          <q-item-section>
            <q-item-label>{{$t('suscriptions')}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable :to="{name: 'myMascots'}">
          <q-item-section>
            <q-item-label>{{$t('myMascots')}}</q-item-label>
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
import { mapMutations } from 'vuex'
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false, // this.$q.platform.is.desktop
      rightDrawerOpen: false,
      text: ''
    }
  },
  methods: {
    openURL,
    checkUser: function () {
      if (this.$store.state.customer.email) {
        return this.$store.state.customer.email
      } else {
        return this.$t('visitor')
      }
    },
    logout: function () {
      let params = {
        access_token: this.$store.state.customer.token
      }
      this.setCustomer()
      this.$axios.post('customers/logout', params)
    },
    ...mapMutations('customer', ['setToken', 'setEmail', 'setCustomer'])
  }
}
</script>

<style scoped>
.logo {
  height: 120px;
  display: block;
}
#search {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
}
#toolbarTitle {
  margin: 0 auto;
  text-align: center;
}
</style>
