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
      height="400px"
      class="bg-grey-10 shadow-1"
    >
      <q-carousel-slide
        v-for="slide in slides"
        :key="slide.id"
        :img-src="slide.image"
        :name="slide.id"
        class="column no-wrap"
      >
        <div
          class="text-h6 absolute-top text-center"
          v-if="slide.description"
        >{{$t(slide.description)}}</div>
      </q-carousel-slide>
    </q-carousel>
    <div class="q-pa-md row justify-center q-gutter-md">
      <q-card class="my-card" v-for="offer in offers" :key="offer.id">
        <q-img class="custom-image" ratio="1" position="50% 50%" :src="offer.image">
          <div
            class="text-h6 absolute-top text-center"
            v-if="offer.description"
          >{{$t(offer.description)}}</div>
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
</style>

<script>
export default {
  name: "PageIndex",
  data() {
    return {
      slide: "banner-1",
      slides: [
        {
          image: "statics/carousel/banner-1.png",
          id: "banner-1"
        },
        {
          image: "statics/carousel/banner-2.png",
          id: "banner-2"
        }
      ],
      offers: [
        {
          id: "a",
          image: "statics/resources/noticia-1.png",
          description: null
        },
        {
          id: "b",
          image: "statics/resources/kit.png",
          description: "receiveWithKit"
        },
        {
          id: "c",
          image: "statics/resources/offers.png",
          description: "tooManyOffers"
        },
        {
          id: "d",
          image: "statics/resources/concentration.png",
          description: "concentrationGames"
        },
        {
          id: "e",
          image: "statics/resources/veggie.png",
          description: "veggieMeat"
        }
      ]
    };
  },
  async mounted() {
    let params = { params: { filter: { where: { type: "news" } } } };
    let res = await this.$axios.get("Posts", params);
    this.offers = this.offers.concat(res.data);
    params = { params: { filter: { where: { type: "slider" } } } };
    res = await this.$axios.get("Posts", params);
    this.slides = this.slides.concat(res.data);
  }
};
</script>
