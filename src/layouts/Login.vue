<template>
  <q-layout id="bg" class="fullscreen row justify-center items-center layout-view scroll">
    <q-card class="q-pa-xl">
      <q-card-section>
        <img src="statics/logo.svg" alt="Canini" />
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input filled
          v-model="email"
          :label="$t('email')"
        />
        <q-input filled
          v-model="password"
          :label="$t('password')"
          :type="showPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="showPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPwd = !showPwd"
            />
          </template>
        </q-input>
        <q-checkbox dense v-model="remember" :label="$t('remember')" />
        <div class="justify-center">
          <q-btn
            :label="$t('enter')"
            @click="onLogin"
            :disable="checkInputs()"
            class="full-width"
            color="black"
            rounded
          />
          <div class="text-center q-mt-xs">
            <router-link to="remember-password">
              {{$t('notRememberPassword')}}
            </router-link>
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-center q-mb-xs text-grey-8">
          {{$t('notYetUser')}}
        </div>
        <q-btn
          :label="$t('register')"
          to="register"
          class="full-width"
          color="primary"
          rounded
        />
      </q-card-section>
    </q-card>
  </q-layout>
</template>

<style lang="stylus" scoped>
  #bg
    position: fixed
    background-image url("/statics/background.png")
    background-repeat repeat
  .q-card
    border-radius 12px
    width: 380px
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
