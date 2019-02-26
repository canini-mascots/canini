<template>
  <div class="q-pa-md row justify-center q-gutter-md">
    <q-card>
      <q-card-section>
        <div class="text-h4">{{$t('registerAsNew')}}</div>
      </q-card-section>
      <q-card-section>
        {{$t('notYetUser')}}
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-input v-model="email" :label="$t('email')" />
        <q-input v-model="password" :label="$t('password')" type="password" />
        <q-input v-model="repeatPassword" :label="$t('repeatPassword')" type="password" />
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <q-checkbox v-model="receiveOffers" :label="$t('receiveOffers')" />
      </q-card-section>
      <q-card-actions class="justify-center">
        <q-btn flat :label="$t('register')" @click="onRegister"/>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style lang="stylus" scoped>
</style>

<script>
export default {
  name: 'Register',
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      receiveOffers: false
    }
  },
  methods: {
    onRegister: function () {
      this.$q.notify(this.$t('userRegistered'))
    }
  }
}
</script>
