<template>
  <q-layout class="remember fullscreen row justify-center items-center bg-primary layout-view scroll">
    <q-card id="myCard" class="q-pa-md q-ma-md">
      <q-card-section class="q-mb-md">
        <img src="statics/logo.svg" alt="Canini" />
      </q-card-section>
      <q-card-section>
        <q-item-label id="dontWorry">
          {{$t('dontWorry')}}
        </q-item-label>
      </q-card-section>
      <q-card-section>
        <q-input filled v-model="email" :label="$t('email')" />
      </q-card-section>
      <q-card-section>
        <q-item-label id="weSendEmail">
          {{$t('weSendEmail')}}
        </q-item-label>
      </q-card-section>
      <q-card-section class="justify-center q-mt-md">
        <q-btn rounded class="full-width" color="black" :label="$t('send')" @click="onSend" :disable="checkInputs()"/>
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<style lang="stylus" scoped>
  #myCard {
    border-radius: 12px;
  }
  .remember
    position: fixed;
    .q-card
      max-width: 320px;
  #sectionNotYetUser
    margin: 0 auto
    text-align: center
  #dontWorry {
    font-size: 24px;
    text-align center
    opacity 0.6
  }
  #weSendEmail {
    opacity 0.5
    text-align center
  }
</style>

<script>
import { showNotif } from 'assets/js/notification.js'
export default {
  name: 'RememberPasword',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    onSend () {
      var q = this.$q
      let params = {
        email: this.email
      }
      this.$axios.post('request-password-reset', params).then(
        response => {
          showNotif('top', response.data.success.message, 'positive', q)
          this.$router.push('login')
        }
      )
    },
    checkInputs () {
      if (this.email !== '') {
        return false
      }
      return true
    }
  }
}
</script>
