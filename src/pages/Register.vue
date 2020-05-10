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
      <q-form @submit="onRegister" ref="form" class="q-gutter-y-md">
        <div class="text-grey-8 text-h5 text-center">
          {{$t('fillData')}}
        </div>
        <div class="q-gutter-y-sm">
          <q-input
            v-model="email"
            :label="$t('email')"
            :rules="[() => errs.email]"
            @input="errs.email = null"
            hint=""
            filled
          />
          <q-input
            v-model="password"
            :label="$t('password')"
            :type="showPwd ? 'password' : 'text'"
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
    height 250px
</style>

<script>
import Form from '../components/Form.js'

export default {
  name: 'Register',
  mixins: [Form],
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      receiveOffers: false,
      showPwd: true,
      showRpPwd: true
    }
  },
  methods: {
    async onRegister () {
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
        this.checkErrors(err, this.$refs.form)
      }
    }
  }
}
</script>
