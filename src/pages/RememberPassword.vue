<template>
  <div class="text-center">
    <q-card-section>
      <img
        id="image"
        src="statics/remember-password.svg"
        alt="Wau?"
      />
    </q-card-section>
    <q-card-section>
      <q-form @submit="onSend" class="q-gutter-y-md text-grey-8">
        <div class="text-h5">
          <div>
            {{$t('dontWorry')}}
          </div>
          <div>
            {{$t('fillData')}}
          </div>
        </div>
        <q-input
          v-model="email"
          :label="$t('email')"
          :rules="[ val => !!val || $t('inputEmail')]"
          filled
        />
        <div>
          {{$t('weSendEmail')}}
        </div>
        <div>
          <q-btn
            type="submit"
            :label="$t('send')"
            rounded
            class="full-width"
            color="black"
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
    height 190px
</style>

<script>
export default {
  name: 'RememberPasword',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    async onSend () {
      let params = {
        email: this.email
      }
      const res = await this.$axios.post('request-password-reset', params)
      this.$q.notify({
        message: res.data.success.message,
        type: 'positive'
      })
      this.$router.push('login')
    }
  }
}
</script>
