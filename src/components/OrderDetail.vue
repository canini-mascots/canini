<template>
  <q-card class="myCard">
    <q-card-section v-if="item" class="itemSection">
      <img id="itemImage" :src="imageUrl + item.image" class="itemAttribute">
      <div class="itemAttribute">
        <span class="text-h6 row">Item id: {{this.orderRow.id}}</span>
        <span class="text-h6 row">{{$t('total')}}: {{this.orderRow.price| currency}}</span>
      </div>
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
  .myCard
    margin-bottom: 1vw;
  .itemSection
    display: table
    width: -webkit-fill-available
  #itemImage
    max-width: 250px
  .itemAttribute
    display: table-cell
    vertical-align: middle

</style>
