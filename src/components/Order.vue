<template>
  <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">{{$t('orderNumber')}}: {{ order.id}}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-subtitle1">{{$t('orderPlaced')}}: {{ getDate(order.date)}}</div>
      </q-card-section>
      <q-card-section>
        <span class="text-subtitle1">{{$t('total')}}: {{ order.price| currency}}</span>
      </q-card-section>
      <q-card-actions>
        <q-btn flat @click="showDetails">{{$t('viewDetails')}}</q-btn>
      </q-card-actions>
      <q-card-section>
        <order-detail
        :hidden="shwDts"
        :orderRow = "singleItemOrder"
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
      this.$axios.get('OrderRows', { params })
        .then(res => (
          Object.keys(res.data).map(function (objectKey, index) {
            var value = res.data[objectKey]
            vue.itemsOrder.push(value)
          })
        ),
        err => (
          console.log(err)
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
    getDate: function (date) {
      var i = new Date(date)
      var mm = i.getMonth()
      var dd = i.getDate()
      if (mm < 10) {
        mm = '0' + mm
      }
      if (dd < 10) {
        dd = '0' + dd
      }
      return dd + '/' + mm + '/' + i.getFullYear()
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
