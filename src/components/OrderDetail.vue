<template>
  <q-card class="my-card">
      <q-card-section>
        <span class="text-h6">Item id: {{this.itemOrder.itemId}}</span>
      </q-card-section>
      <q-card-section>
        <span class="text-h6">Value: {{this.itemOrder.value| currency}}</span>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: 'OrderDetail',
  data () {
    return {
      item: null
    }
  },
  props: {
    itemOrder: {
      required: true,
      type: Object
    }
  },
  mounted: function () {
    this.getItem(this.itemOrder.id)
  },
  methods: {
    getItem: function (id) {
      let vue = this
      this.$axios.get('Items/' + id)
        .then(res => (
          Object.keys(res.data).map(function (objectKey, index) {
            var value = res.data[objectKey]
            vue.item = value
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
</style>
