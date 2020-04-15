<template>
  <div class="q-pa-md row justify-center q-gutter-md">
    <q-card>
      <q-card-section>
        <div class="text-h4">{{$t('registerAsNew')}}</div>
      </q-card-section>
      <q-card-section>{{$t('notYetUser')}}</q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input
        outlined
          v-model="email"
          :label="$t('email')"
          hint=""
          :error-message= "$t(emailMessage)"
          :error="emailError"
          />
        <q-input outlined v-model="password" :label="$t('password')" :type="showPwd ? 'password' : 'text'" hint="" :error-message= "$t(pwdMessage)" :error="pwdError">
          <template v-slot:append>
            <q-icon
              :name="showPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPwd = !showPwd"
            />
          </template>
        </q-input>
        <q-input outlined v-model="repeatPassword" :label="$t('repeatPassword')" :type="showRpPwd ? 'password' : 'text'" :rules="[repeatPassword => repeatPassword == password  || $t('repeatPasswordError')]" >
          <template v-slot:append>
            <q-icon
              :name="showRpPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showRpPwd = !showRpPwd"
            />
          </template>
        </q-input>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-checkbox v-model="receiveOffers" :label="$t('receiveOffers')"/>
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn flat :label="$t('register')" @click="onRegister" :disable="checkInputs()"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style lang="stylus" scoped></style>

<script>
import { showNotif, showInputError } from 'assets/js/notification.js'
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
      emailError: false,
      emailMessage: '',
      pwdError: false,
      pwdMessage: ''
    }
  },
  methods: {
    onRegister: function () {
      this.reset()
      let params = {
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      }
      this.$axios.post('customers', params).then(
        response => {
          showNotif('top', this.$t('userRegistered'), 'positive', this.$q)
          this.$router.push('/home')
        },
        error => {
          var errors = showInputError(error.response.data.error, this.$q)
          this.checkErrors(errors)
        }
      )
    },
    checkErrors (errors) {
      var vue = this
      Object.keys(errors).map(function (objectKey, index) {
        var value = errors[objectKey]
        if (objectKey === 'email') {
          vue.emailError = true
          vue.emailMessage = value
        } else {
          vue.pwdError = true
          vue.pwdMessage = value
        }
      })
    },
    checkInputs () {
      if (this.email !== '' && this.password !== '' && this.repeatPassword !== '') {
        return false
      }
      return true
    },
    reset () {
      this.emailError = false
      this.pwdError = false
    }
  }
}
</script>
