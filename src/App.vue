<template>
  <div id="q-app">
    <transition name="slide-right">
      <router-view class="child-view"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
