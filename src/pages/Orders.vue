<template>
  <div class="q-pa-md column items-center q-gutter-md">
    <q-card
      class="my-card"
      v-for="order in orders"
      :key="order.id">
      <q-card-section>
        <div class="text-h6">{{order.date}}</div>
      </q-card-section>
      <q-card-section>
        {{order.total}} €
      </q-card-section>
      <q-card-actions>
        <q-btn flat>{{$t('viewDetails')}}</q-btn>
      </q-card-actions>
    </q-card>
  </div>
</template>

<style lang="stylus" scoped>
  .my-card
    width 100%
    max-width 600px
</style>

<script>
export default {
  name: 'Orders',
  data () {
    let orders = []
    for (let i = 0; i < 4; i++) {
      orders.push({
        id: i,
        date: new Date(),
        total: 5 + 1.2 * i
      })
    }

    return { orders }
  }
}
</script>
