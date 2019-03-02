<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="slide-right"
      transition-next="slide-left"
      animated
      swipeable
      control-color="black"
      navigation
      padding
      arrows
      height="500px"
      class="bg-grey-10 shadow-1"
    >
      <q-carousel-slide
        v-for="slide in slides"
        :key="slide.icon"
        :img-src="slide.image"
        :name="slide.icon"
        class="column no-wrap">
        <div class="q-mt-md text-h4 text-center">
          {{ $t(slide.text) }}
        </div>
      </q-carousel-slide>
    </q-carousel>
    <div class="q-pa-md row justify-center q-gutter-md">
      <q-card
        class="my-card"
        v-for="offer in offers"
        :key="offer.id">
        <q-img :src="offer.image">
          <div class="text-h6 absolute-top text-center">
            {{$t(offer.description)}}
          </div>
        </q-img>
      </q-card>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn
        fab
        icon="shopping_basket"
        color="accent"
        :to="{name: 'catalog'}"
        :title="$t('startOrder')"
      />
    </q-page-sticky>
  </div>
</template>

<style lang="stylus" scoped>
  .my-card
    width 520px
    max-width 100%
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      slide: 'style',
      slides: [
        {
          image: 'statics/carousel/recommended.png',
          text: 'recommendedByPets',
          icon: 'style'
        }, {
          image: 'statics/carousel/party.png',
          text: 'joinParty',
          icon: 'live_tv'
        }
      ],
      offers: [
        {
          id: 1,
          image: 'statics/resources/kit.png',
          description: 'receiveWithKit'
        }, {
          id: 2,
          image: 'statics/resources/offers.png',
          description: 'tooManyOffers'
        }, {
          id: 3,
          image: 'statics/resources/concentration.png',
          description: 'concentrationGames'
        }, {
          id: 4,
          image: 'statics/resources/veggie.png',
          description: 'veggieMeat'
        }
      ]
    }
  }
}
</script>
