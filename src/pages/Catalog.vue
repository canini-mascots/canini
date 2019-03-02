<template>
  <div>
    <q-drawer
      v-model="rightDrawerOpen"
      content-class="bg-grey-2"
      side="right"
      elevated
    >
      <q-list>
        <q-item-label header>{{$t('categories')}}</q-item-label>
        <q-item clickable
          v-for="category in categories"
          :key="category.icon"
          :to="{name: 'catalog', params: {name: category.name}}"
        >
          <q-item-section avatar>
            <q-icon :name="category.icon" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ category.description }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <div class="q-pa-md row justify-center q-gutter-md">
      <q-card
        class="my-card"
        v-for="item in items"
        :key="item.id">
        <img :src="item.image">
        <q-card-section>
          <div class="text-h6">{{item.name}}</div>
          <q-rating size="24px" v-model="item.stars" :max="5" />
        </q-card-section>
        <q-card-section>
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
</style>

<script>
export default {
  name: 'Catalog',
  data () {
    let items = []
    for (let i = 0; i < 50; i++) {
      items.push({
        id: i,
        image: 'statics/lucky-cookie.png',
        name: 'Galletita de la suerte',
        stars: i % 5,
        price: 1.32 * i % 5 + 1,
        description: 'Galletita en de la suerte con un mensaje en su interior.'
      })
    }

    return {
      items,
      rightDrawerOpen: this.$q.platform.is.desktop,
      categories: [
        {
          description: 'Accesories',
          name: 'accesories',
          icon: 'shopping_cart'
        }, {
          description: 'Straps and collars',
          name: 'straps',
          icon: 'person'
        }, {
          description: 'Toys',
          name: 'toys',
          icon: 'cake'
        }, {
          description: 'Comfort',
          name: 'comfort',
          icon: 'airline_seat_flat'
        }, {
          description: 'Transport',
          name: 'transport',
          icon: 'local_shipping'
        }, {
          description: 'Clothing',
          name: 'clothing',
          icon: 'spa'
        }, {
          description: 'Health and hygiene',
          name: 'health',
          icon: 'healing'
        }, {
          description: 'Others',
          name: 'others',
          icon: 'pets'
        }
      ]
    }
  },
  filters: {
    currency: i => i ? i.toFixed(2) + '€' : i
  }
}
</script>
