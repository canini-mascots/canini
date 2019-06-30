<template>
  <div class="login fullscreen row justify-center items-center bg-primary">
    <q-card class="q-pa-md">
      <q-card-section class="q-mb-lg">
        <img src="statics/canini.svg" alt="Canini" />
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input v-model="email" :label="$t('email')" />
        <q-input v-model="password" :label="$t('password')" :type="showPwd ? 'password' : 'text'">
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
        <q-checkbox v-model="remember" :label="$t('remember')" />
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn flat :label="$t('enter')" @click="onLogin"/>
      </q-card-actions>
      <q-card-section class="q-gutter-md">
        <q-item-label id="notYetUser">{{$t('notYetUser')}}</q-item-label>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn flat :label="$t('registerAsNew')" :to="{name: 'register'}" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<style lang="stylus" scoped>
  .login
    position: fixed;
    .q-card
      width: 320px;
  #notYetUser
    opacity: 0.5;
</style>

<script>
import { mapMutations } from 'vuex'
import { showNotif, showError } from 'assets/js/notification.js'
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      remember: false,
      showPwd: true
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
        },
        error => {
          showError(error.response.data.error, this.$q)
        }
      )
    },
    getUser (id) {
      this.$axios.get('customers/' + id + '?access_token=' + this.$store.state.customer.token).then(
        response => {
          this.setEmail(response.data.email)
          showNotif('top', 'You have successfully login.', 'positive', this.$q)
          this.$router.push('/home')
        },
        error => {
          showError(error.response.data.error, this.$q)
        }
      )
    },
    ...mapMutations('customer', ['setToken', 'setEmail', 'setId'])
  }
}
</script>
