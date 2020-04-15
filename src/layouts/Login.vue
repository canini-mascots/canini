<template>
  <q-layout class="login fullscreen row justify-center items-center bg-primary layout-view scroll">
    <q-card id="myCard" class="q-ma-md">
      <q-card-section class="q-mb-lg">
        <img src="statics/logo.svg" alt="Canini" />
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input filled v-model="email" :label="$t('email')" />
        <q-input filled v-model="password" :label="$t('password')" :type="showPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="showPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPwd = !showPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <div class="row">
          <div class="col">
            <q-checkbox id="checkbox" dense v-model="remember" :label="$t('remember')" />
          </div>
          <div class="col">
            <q-item-label id="remember" @click="toRemember">{{$t('notRememberPassword')}}</q-item-label>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="justify-center">
        <q-btn rounded class="full-width" color="black" :label="$t('enter')" @click="onLogin" :disable="checkInputs()"/>
      </q-card-section>
      <q-card-section  id="sectionNotYetUser" class="justify-center items-center">
        <span id="notYetUser">{{$t('notYetUser')}}</span>
      </q-card-section>
      <q-card-section class="justify-center">
        <q-btn rounded class="full-width" color="primary"  :label="$t('register')" :to="{name: 'register'}" />
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<style lang="stylus" scoped>
  #remember {
    cursor pointer
  }
  #myCard {
    border-radius: 12px;
  }
  .login
    position: fixed;
    .q-card
      max-width: 320px;
  #sectionNotYetUser
    margin: 0 auto
    text-align: center
  #notYetUser
    opacity: 0.5;
</style>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      remember: false,
      showPwd: true,
      emailError: false,
      emailMessage: '',
      pwdError: false,
      pwdMessage: ''
    }
  },
  methods: {
    toRemember () {
      this.$router.push('/remember-password')
    },
    onLogin () {
      let params = {
        email: this.email,
        password: this.password
      }
      this.$axios.post('customers/login', params).then(
        response => {
          this.setToken(response.data.id)
          this.setId(response.data.userId)
          this.getUser(response.data.userId)
        }
      )
    },
    getUser (id) {
      this.$axios.get('customers/' + id + '?access_token=' + this.$store.state.customer.token).then(
        response => {
          this.setEmail(response.data.email)
          this.$router.push('/home')
        }
      )
    },
    ...mapMutations('customer', ['setToken', 'setEmail', 'setId']),
    checkInputs () {
      if (this.email !== '' && this.password !== '') {
        return false
      }
      return true
    }
  }
}
</script>
