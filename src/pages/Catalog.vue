<template>
  <div>
    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      elevated
    >
      <q-list>
        <q-item-label header>{{$t('categories')}}</q-item-label>
        <q-item clickable
          v-for="category in categories"
          :key="category.icon"
          :to="{name: 'catalog', params: {type: category.id}}"
        >
          <q-item-section>
            <q-item-label>{{ category.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <div class="q-pa-md row justify-center q-gutter-md">
      <q-spinner
        v-if="isLoading"
        color="primary"
        size="50px">
      </q-spinner>
      <q-card
        class="my-card"
        v-for="item in items"
        :key="item.id">
        <img :src="imageUrl + item.image">
        <q-card-section>
          <div class="name text-h6">{{item.name}}</div>
          <q-rating size="24px" v-model="item.stars" :max="5" />
        </q-card-section>
        <q-card-section class="description">
          {{item.description}}
        </q-card-section>
        <q-card-section>
          {{item.price | currency}}
        </q-card-section>
        <q-card-actions class="justify-end">
          <q-btn flat>{{$t('more')}}</q-btn>
          <q-btn flat>{{$t('buy')}}</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
  .my-card
    width 100%
    max-width 250px
    .name
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
    .description
      height 40px
      overflow hidden
</style>

<script>
export default {
  name: 'Catalog',
  data () {
    return {
      isLoading: false,
      imageUrl: 'https://verdnatura.es/vn-image-data/catalog/200x200/',
      items: null,
      categories: null,
      rightDrawerOpen: this.$q.platform.is.desktop
    }
  },
  mounted () {
    let params = { filter: { where: { categoryFk: 9 } } }
    this.$axios.get('ItemTypes', { params })
      .then(res => (this.categories = res.data))

    this.loadType(232)
  },
  watch: {
    '$route.params.type': function (type) {
      this.loadType(type)
    }
  },
  methods: {
    loadType (type) {
      this.items = null
      this.isLoading = true

      let params = { filter: { where: { typeFk: type }, limit: 50 } }
      this.$axios.get('Items', { params })
        .then(res => (this.items = res.data))
        .finally(() => (this.isLoading = false))
    }
  },
  filters: {
    currency: i => i ? i.toFixed(2) + '€' : i
  }
}
</script>
