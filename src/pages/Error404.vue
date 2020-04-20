<template>
  <div class="fixed-center text-center">
    <p>
      <img
        src="~assets/not-found.svg"
        style="width: 40vw; max-width: 300px;"
      >
    </p>
    <div class="text-h5">
      {{$t('whereYouGoingCowboy')}}
    </div>
    <p class="text-h3 text-grey-5">
      404
    </p>
    <q-btn
      color="secondary"
      style="width:200px;"
      @click="$router.push('/')">
      {{$t('goBack')}}
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
