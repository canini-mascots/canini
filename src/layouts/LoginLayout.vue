<template>
  <q-layout id="bg" class="fullscreen row justify-center items-center layout-view scroll">
    <q-card class="q-pa-md row items-center justify-center">
      <transition name="slide-right">
        <router-view class="child-view"/>
      </transition>
    </q-card>
  </q-layout>
</template>

<style lang="stylus" scoped>
  #bg
    position: fixed
    background-image url("/statics/background.png")
    background-repeat repeat
  .q-card
    border-radius 0
    width 600px
    height 100%
    min-height 580px
  .q-card > *
    width 280px
</style>
