<template>
  <div>
    <q-card-section>
      <router-link to="/">
        <img
          src="statics/logo.svg"
          alt="Canini"
          class="block"
        />
      </router-link>
    </q-card-section>
    <q-card-section>
      <q-form @submit="onLogin" class="q-gutter-y-md">
        <div class="q-gutter-y-sm">
          <q-input
            v-model="email"
            :label="$t('email')"
            :rules="[ val => !!val || $t('inputEmail')]"
            filled
          />
          <q-input
            v-model="password"
            :label="$t('password')"
            :type="showPwd ? 'password' : 'text'"
            :rules="[ val => !!val || $t('inputPassword')]"
            filled>
            <template v-slot:append>
              <q-icon
                :name="showPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPwd = !showPwd"
              />
            </template>
          </q-input>
          <q-checkbox
            v-model="remember"
            :label="$t('remember')"
            dense
          />
        </div>
        <div class="justify-center">
          <q-btn
            type="submit"
            :label="$t('enter')"
            class="full-width"
            color="black"
            rounded
          />
          <div class="text-center q-mt-xs">
            <router-link to="/login/remember-password" class="link">
              {{$t('notRememberPassword')}}
            </router-link>
          </div>
        </div>
      </q-form>
    </q-card-section>
    <q-card-section>
      <div class="text-center q-mb-xs text-grey-8">
        {{$t('notYetUser')}}
      </div>
      <q-btn
        :label="$t('register')"
        to="/login/register"
        class="full-width"
        color="primary"
        rounded
      />
    </q-card-section>
  </div>
</template>

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
    async onLogin () {
      let params = {
        email: this.email,
        password: this.password
      }
      const res = await this.$axios.post('Customers/login', params)
      this.setToken(res.data.id)
      this.setId(res.data.userId)
      this.getUser(res.data.userId)
    },
    async getUser (id) {
      const res = await this.$axios.get(`Customers/${id}`)
      this.setEmail(res.data.email)
      this.$router.push('/home')
    },
    ...mapMutations('customer', [
      'setToken',
      'setEmail',
      'setId'
    ])
  }
}
</script>
