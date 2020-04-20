<template>
  <div>
    <q-card-section class="q-mb-md">
      <img src="statics/logo.svg" alt="Canini" />
    </q-card-section>
    <q-card-section>
      <q-item-label id="dontWorry">
        {{$t('newPassword')}}
      </q-item-label>
    </q-card-section>
    <q-card-section>
      <q-input filled v-model="password" :label="$t('password')" :type="showPwd ? 'password' : 'text'">
        <template v-slot:append>
          <q-icon
            :name="showPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPwd = !showPwd"
          />
        </template>
      </q-input>
      <q-input filled  hint="" :error-message="$t('repeatPasswordError')" :error="!this.valid" v-model="repeatPassword" :label="$t('repeatPassword')" :type="showRPwd ? 'password' : 'text'" @blur="checkPasswords()">
        <template v-slot:append>
          <q-icon
            :name="showRPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showRPwd = !showRPwd"
          />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section class="justify-center q-mt-md">
      <q-btn rounded class="full-width" color="black" :label="$t('send')" @click="onSend" :disable="checkInputs()"/>
    </q-card-section>
  </div>
</template>

<style lang="stylus" scoped>
  .remember
    position fixed
    .q-card
      max-width 320px
  #sectionNotYetUser
    margin 0 auto
    text-align center
  #dontWorry {
    font-size 24px
    text-align center
    opacity .6
  }
  #weSendEmail {
    opacity .5
    text-align center
  }
</style>

<script>
export default {
  name: 'SetPassword',
  data () {
    return {
      password: '',
      repeatPassword: '',
      showPwd: true,
      showRPwd: true,
      valid: true
    }
  },
  methods: {
    onSend () {
      let token = this.$route.query.access_token
      let params = {
        newPassword: this.password
      }
      this.$axios.post('customers/reset-password' + '?access_token=' + token, params).then(
        response => {
          this.$router.push('/home')
        }
      )
    },
    checkInputs () {
      if (this.password !== '' && this.repeatPassword !== '') {
        return false
      }
      return true
    },
    checkPasswords () {
      if (this.password === this.repeatPassword) {
        this.valid = true
      } else {
        this.valid = false
      }
    }
  }
}
</script>
