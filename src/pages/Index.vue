<template>
  <div>
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      height="500px"
      class="bg-black text-white shadow-1"
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
  </div>
</template>

<style lang="stylus" scoped>
  .my-card
    width 100%
    max-width 600px
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    let offers = []
    for (let i = 0; i < 4; i++) {
      offers.push({
        id: i,
        image: 'https://petsandmoneysummit.com/sites/default/files/styles/cover_image_full/public/event_cover_images/pets_and_money_hero_image_-_minus_guinea.png?itok=JA-jklht',
        description: 'tooManyOffers'
      })
    }

    return {
      offers,
      slide: 'style',
      slides: [
        {
          image: 'https://avada.theme-fusion.com/veterinarian/wp-content/uploads/sites/80/2016/11/pets_big.png',
          text: 'recommendedByPets',
          icon: 'style'
        }, {
          image: 'https://www.thepostoakhotel.com/img/gallery/pets-lg.jpg',
          text: 'concentrationGames',
          icon: 'live_tv'
        }, {
          image: 'https://az760333.vo.msecnd.net/-/media/property/skamania-lodge/resort-overview/pet-friendly-skamania-pet-policies-crpd1440x600.jpg?ts=19bf6d5c-89e4-4236-94a9-b51c33d9c0ed',
          text: 'receiveWithKit',
          icon: 'layers'
        }, {
          image: 'https://www.condorferries.co.uk/media/2455/taking-your-pet-5.jpg',
          text: 'recommendedByPets',
          icon: 'terrain'
        }
      ]
    }
  }
}
</script>
