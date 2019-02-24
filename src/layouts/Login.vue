<template>
  <div class="login fullscreen row justify-center items-center bg-primary">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h2 text-center red">Canini</div>
        <div class="text-subtitle text-center">Mascots</div>
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
        <q-btn flat :label="$t('enter')" :to="{name: 'home'}" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<style lang="stylus" scoped>
  .login
    position: fixed;
    .q-card
      width: 320px;
</style>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      remember: false,
      showPwd: true
    }
  }
}
</script>
