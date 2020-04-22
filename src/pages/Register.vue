<template>
  <div>
    <q-card-section class="text-center">
      <img
        id="image"
        src="statics/register.svg"
        alt="Welcome!"
      />
    </q-card-section>
    <q-card-section>
      <q-form @submit="onRegister" class="q-gutter-y-md">
        <div class="text-grey-8 text-h5 text-center">
          {{$t('fillData')}}
        </div>
        <div class="q-gutter-y-sm">
          <q-input
            v-model="email"
            :label="$t('email')"
            :error="errors.email.error"
            :error-message="errors.email.message"
            hint=""
            filled
            />
          <q-input
            v-model="password"
            :label="$t('password')"
            :type="showPwd ? 'password' : 'text'"
            :error="errors.password.error"
            :error-message="errors.password.message"
            hint=""
            filled>
            <template v-slot:append>
              <q-icon
                :name="showPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showPwd = !showPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="repeatPassword"
            :label="$t('repeatPassword')"
            :type="showRpPwd ? 'password' : 'text'"
            :rules="[value => value == password || $t('repeatPasswordError')]"
            hint=""
            filled>
            <template v-slot:append>
              <q-icon
                :name="showRpPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showRpPwd = !showRpPwd"
              />
            </template>
          </q-input>
          <q-checkbox
            v-model="receiveOffers"
            :label="$t('receiveOffers')"
            dense
          />
        </div>
        <div>
          <q-btn
            type="submit"
            :label="$t('register')"
            class="full-width"
            color="black"
            rounded
          />
          <div class="text-center q-mt-xs">
            <router-link to="/login/" class="link">
              {{$t('return')}}
            </router-link>
          </div>
        </div>
      </q-form>
    </q-card-section>
  </div>
</template>

<style lang="stylus" scoped>
  #image
    height 150px
</style>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      receiveOffers: false,
      showPwd: true,
      showRpPwd: true,
      errors: {
        email: {},
        password: {}
      }
    }
  },
  methods: {
    async onRegister () {
      this.reset()
      try {
        await this.$axios.post('Customers', {
          email: this.email,
          password: this.password
        })
        this.$q.notify({
          message: this.$t('userRegistered'),
          type: 'positive'
        })
        this.$router.push('/home')
      } catch (err) {
        this.checkErrors(err)
        throw err
      }
    },
    checkErrors (err) {
      const isValidationError = err.response && err.response.status === 422
      if (!isValidationError) return

      const errors = {}
      const messages = err.response.data.error.details.messages

      for (let key in messages) {
        for (let message of messages[key]) {
          errors[key] = {
            error: true,
            message
          }
        }
      }

      this.$set(this, 'errors', errors)
    },
    reset () {
      this.emailError = false
      this.pwdError = false
    }
  }
}
</script>
