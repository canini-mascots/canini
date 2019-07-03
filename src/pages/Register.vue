<template>
  <div class="q-pa-md row justify-center q-gutter-md">
    <q-card>
      <q-card-section>
        <div class="text-h4">{{$t('registerAsNew')}}</div>
      </q-card-section>
      <q-card-section>{{$t('notYetUser')}}</q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input
          v-model="email"
          :label="$t('email')"
          />
        <q-input v-model="password" :label="$t('password')" :type="showPwd ? 'password' : 'text'">
          <template v-slot:append>
            <q-icon
              :name="showPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="showPwd = !showPwd"
            />
          </template>
        </q-input>
        <q-input v-model="repeatPassword" :label="$t('repeatPassword')" :type="showRpPwd ? 'password' : 'text'" >
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
        <q-btn flat :label="$t('register')" @click="onRegister"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style lang="stylus" scoped></style>

<script>
import { showNotif } from 'assets/js/notification.js'
export default {
  name: 'Register',
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
    onRegister: function () {
      let params = {
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      }
      this.$axios.post('customers', params).then(
        response => {
          showNotif('top', 'You have successfully registered.', 'positive', this.$q)
          this.$router.push('/home')
        }
      )
    }
  }
}
</script>
