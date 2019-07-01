<template>
  <q-card class="my-card">
      <q-card-section>
        <span class="text-h6">ID: {{order.id}}</span>
      </q-card-section>
      <q-card-section>
        <span>{{order.date}}</span>
      </q-card-section>
      <q-card-section>
        {{order.value| currency}}
      </q-card-section>
      <q-card-actions>
        <q-btn flat @click="showDetails">{{$t('viewDetails')}}</q-btn>
      </q-card-actions>
      <q-card-section>
        <order-detail
        :hidden="shwDts"
        :itemOrder = "singleItemOrder"
        v-for="singleItemOrder in itemsOrder"
        :key="singleItemOrder.id" >
        </order-detail>
      </q-card-section>
    </q-card>
</template>

<script>
import orderDetail from '../components/OrderDetail'
export default {
  name: 'Order',
  data () {
    return {
      itemsOrder: [],
      items: [],
      shwDts: true
    }
  },
  components: {
    orderDetail
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
    showDetails: function () {
      this.shwDts = !this.shwDts
    },
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
    }
  },
  filters: {
    currency: i => i ? i.toFixed(2) + '€' : i
  }
}
</script>

<style lang="stylus" scoped>
  .my-card
    width 100%
    max-width 600px
</style>
