<template>
  <q-card class="my-card">
      <img :src="imageUrl + item.image">
      <q-card-section>
        <span class="text-h6">Item id: {{this.orderRow.id}}</span>
      </q-card-section>
      <q-card-section>
        <span class="text-h6">{{$t('total')}}: {{this.orderRow.price| currency}}</span>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: 'OrderDetail',
  data () {
    return {
      item: null,
      imageUrl: 'https://verdnatura.es/vn-image-data/catalog/200x200/'
    }
  },
  props: {
    orderRow: {
      required: true,
      type: Object
    }
  },
  mounted: function () {
    this.getBuy(this.orderRow.buyId)
  },
  methods: {
    getBuy: function (id) {
      // let vue = this
      this.$axios.get('Buys/' + id)
        .then(res => (
          this.getItem(res.data.itemFk)
        ))
    },
    getItem (id) {
      this.$axios.get('Items/' + id)
        .then(res => (
          this.item = res.data
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
    max-width 250px
</style>
