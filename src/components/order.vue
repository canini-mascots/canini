<template>
  <q-card class="my-card">
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
</template>

<script>
export default {
  name: 'Order',
  data () {
    return {
      itemsOrder: [],
      items: []
    }
  },
  props: {
    order: {
      required: true,
      type: Object
    }
  },
  mounted: function () {
    this.getItemOrders(this.order.id)
  },
  methods: {
    getItemOrders: function (id) {
      let vue = this
      let params = { filter: { where: { orderId: id } } }
      this.$axios.get('ItemOrders', { params })
        .then(res => (
          Object.keys(res.data).map(function (objectKey, index) {
            var value = res.data[objectKey]
            vue.itemsOrder.push(value)
            vue.getItems(value.itemId)
          })
        ))
    },
    getItems: function (id) {
      let vue = this
      let params = { filter: { where: { id: id } } }
      this.$axios.get('Items', { params })
        .then(res => (
          Object.keys(res.data).map(function (objectKey, index) {
            var value = res.data[objectKey]
            vue.items.push(value)
          })
        ))
    },
    getInbound: function (id) {
      let vue = this
      let params = { filter: { where: { id: id } } }
      this.$axios.get('Items', { params })
        .then(res => (
          Object.keys(res.data).map(function (objectKey, index) {
            var value = res.data[objectKey]
            vue.items.push(value)
          })
        ))
    }
  }
}
</script>

<style lang="stylus" scoped>
  .my-card
    width 100%
    max-width 600px
</style>
