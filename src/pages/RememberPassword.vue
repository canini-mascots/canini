<template>
  <div class="text-center">
    <q-card-section>
      <img id="image" src="statics/remember-password.svg" alt="Canini" />
    </q-card-section>
    <q-card-section class="q-gutter-md text-grey-8">
      <div class="text-h5">
        <div>
          {{$t('dontWorry')}}
        </div>
        <div>
          {{$t('fillData')}}
        </div>
      </div>
      <q-input filled v-model="email" :label="$t('email')" />
      <div>
        {{$t('weSendEmail')}}
      </div>
    </q-card-section>
    <q-card-section class="justify-center">
      <q-btn
        :label="$t('send')"
        @click="onSend"
        :disable="checkInputs()"
        rounded
        class="full-width"
        color="black"
      />
      <div class="text-center q-mt-xs">
        <router-link to="/login/" class="link">
          {{$t('returnToLogin')}}
        </router-link>
      </div>
    </q-card-section>
  </div>
</template>

<style lang="stylus" scoped>
  #bg
    position: fixed
    background-image url("/statics/background.png")
    background-repeat repeat
  .q-card
    border-radius 12px
    width 380px
  #image
    height 190px
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
