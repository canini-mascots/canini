<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      swipeable
      control-color="white"
      navigation
      padding
      class="bg-grey-10 shadow-1"
    >
      <q-carousel-slide
        v-for="slide in slides"
        :key="slide.id"
        :img-src="slide.image"
        :name="slide.id"
        class="column no-wrap"
      >
        <div class="slide-text q-mt-md text-h4 text-center">
          {{ $te(slide.text) ? $t(slide.text) : slide.text }}
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="q-pa-md row justify-center q-gutter-md">
      <q-card class="my-card" v-for="offer in offers" :key="offer.id">
        <q-img
          class="custom-image"
          ratio="1"
          position="50% 50%"
          :src="offer.image"
        >
          <div class="text-h6 absolute-top text-center" v-if="offer.text">
            {{ $te(offer.text) ? $t(offer.text) : offer.text }}
          </div>
        </q-img>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="shopping_basket"
        color="accent"
        :to="{ name: 'catalog' }"
        :title="$t('startOrder')"
      />
    </q-page-sticky>
  </div>
</template>

<style lang="stylus" scoped>
.my-card {
  width: 600px;
  max-width: 600px;
}

@media (max-width: 633px) {
  .q-carousel__slide {
    background-repeat: no-repeat;
    background-origin: inherit;
    background-size: 300% 100%;
  }

  .q-carousel {
    height: 63.2vw !important;
  }
}

.slide-text {
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  color: white;
}
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      slide: 'banner-1',
      slides: [
        {
          image: 'statics/carousel/banner-1.png',
          id: 'banner-1'
        },
        {
          image: 'statics/carousel/banner-2.png',
          id: 'banner-2'
        }
      ],
      offers: [
        {
          id: 'a',
          image: 'statics/resources/noticia-1.png',
          text: null
        },
        {
          id: 'b',
          image: 'statics/resources/kit.png',
          text: 'receiveWithKit'
        },
        {
          id: 'c',
          image: 'statics/resources/offers.png',
          text: 'tooManyOffers'
        },
        {
          id: 'd',
          image: 'statics/resources/concentration.png',
          text: 'concentrationGames'
        },
        {
          id: 'e',
          image: 'statics/resources/veggie.png',
          text: 'veggieMeat'
        }
      ]
    }
  },
  async mounted () {
    let params = { filter: { where: { type: 'news' } } }
    let res = await this.$axios.get('Posts', { params })
    this.offers = this.offers.concat(res.data)
    params = { filter: { where: { type: 'slider' } } }
    res = await this.$axios.get('Posts', { params })
    this.slides = this.slides.concat(res.data)
  }
}
</script>
