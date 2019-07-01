<template>
  <div class="q-pa-md column items-center q-gutter-md">
    <order-item
      :order = "singleOrder"
      v-for="singleOrder in orders"
      :key="singleOrder.id" >
    </order-item>
  </div>
</template>

<style>
</style>

<script>
import orderItem from '../components/Order'
export default {
  name: 'Orders',
  components: {
    orderItem
  },
  data () {
    return {
      orders: this.getOrders()
    }
  },
  methods: {
    getOrders: function () {
      let orders = []
      let params = { filter: { where: { customerId: this.$store.state.customer.id } } }
      this.$axios.get('Orders' + '?access_token=' + this.$store.state.customer.token, { params })
        .then(res => (
          Object.keys(res.data).map(function (objectKey, index) {
            var value = res.data[objectKey]
            orders.push(value)
          })
        ))
      return orders
    }
  }
}
</script>
