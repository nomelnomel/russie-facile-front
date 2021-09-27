<template>
  <div v-if="tour" class="lg:w-3/4 md:w-full">
    <h2>{{ tour.title }}</h2>
    <div class="program-header flex gap-8">
      <div>
        <img src="" alt="">
        {{ tour.daysCount }} jours
      </div>
      <div>
        <img src="" alt="">
        {{ tour.townsCount }} ville{{ tour.townsCount > 1 ? 's' : '' }}
      </div>
      <div class="text-blue-600">
        <a href="#">Ссылка на программу</a>
      </div>
    </div>
    <div class="mt-8" v-html="tour.description"></div>

    <swiper ref="SwiperMain" :options="swiperOptionsMain" class="mt-8 shadow-2xl">
      <swiper-slide v-for="(day, i) in tour.days" :key="day.id">
        <div class="flex border">
          <div class="flex-1">
            <div class="flex items-center justify-center p-8 text-xl bg-green-600 text-white relative">
              <div v-if="i > 0" slot="button-prev" class="prev absolute left-8 top-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                </svg>
              </div>
              <div>
                <span class="font-bold">Jour {{ i + 1 }}</span> à {{ tour.days.length }}
              </div>
              <div v-if="i < tour.days.length - 1" slot="button-next" class="next absolute right-8 top-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
            <div class="p-8">
              <div>{{ day.title }}</div>
              <div>{{ day.description }}</div>
            </div>
          </div>
          <div class="flex-1">
            <img :src="getStrapiMedia(day.image.url)" alt="" class="w-full object-cover">
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <swiper ref="swiperAdd" class="swiper gallery-thumbs" :options="swiperOptionsAdd">
      <swiper-slide v-for="i in tour.days.length" :key="i" class="slide-1">
        <span class="border border-black py-2 px-4 rounded-full cursor-pointer">
          {{ i }}
        </span>
      </swiper-slide>
    </swiper>



    <div class="flex mt-16">
        <ul class="flex-1 flex flex-col items-center">
          <h2>Включено</h2>
          <li v-for="item in tour.included.yes.split('\n')" :key="item.id" class="flex mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg> {{item}}
          </li>
        </ul>
        <ul class="flex-1 justify-center items-center">
          <h2>Не включено</h2>
          <li v-for="item in tour.included.no.split('\n')" :key="item.id" class="flex mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>{{item}}
          </li>
        </ul>
    </div>

    <div class="prices">
      <div class="prices-line prices-header">
        <div class="prices-item">
          Количество
        </div>
        <div class="prices-item">
          У жителя
        </div>
        <div class="prices-item">
          Отель 3*
        </div>
        <div class="prices-item">
          Отель 4*
        </div>
      </div>
      <div v-for="price in tour.prices" :key="price.id" class="prices-line">
        <div class="prices-item">
          {{price.number}}
        </div>
        <div class="prices-item">
          {{price.inh}}€
          <span>par persone</span>
        </div>
        <div class="prices-item">
          {{price.hot3}}€
          <span>par persone</span>
        </div>
        <div class="prices-item">
          {{price.hot4}}€
          <span>par persone</span>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    грузим
  </div>
</template>

<script>
import {directive, Swiper, SwiperSlide} from 'vue-awesome-swiper'
import {getStrapiMedia} from '~/utils/medias'

export default {
  name: 'VoyagesEndpoints',
  components: {
    Swiper,
    SwiperSlide,
  },
  directives: {
    swiper: directive
  },
  layout: 'w_sidebar',
  data() {
    return {
      tour: null,
      swiperOptionsMain: {
        loop: true,
        loopedSlides: 5,
        spaceBetween: 10,
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        }
        // Some Swiper option/callback...
      },
      swiperOptionsAdd: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      }
    }
  },
  async fetch() {
    try {
      const data = await (this.$strapi.find('tours', {slug: this.$route.params.slug}))
      const sidebar = {
        page: 'program',
        price_from: data[0].price_from,
        price_to: data[0].price_to
      }
      this.$store.commit('setSidebar', sidebar)
      this.tour = data[0]
    } catch (e) {
      console.log(e)
    }
  },
  mounted() {
      this.$nextTick(() => {
        const SwiperMain = this.$refs.SwiperMain.$swiper
        const swiperAdd = this.$refs.swiperAdd.$swiper
        SwiperMain.controller.control = swiperAdd
        swiperAdd.controller.control = SwiperMain
      })
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped lang="scss">

.tour-container {
}

.prev, .next {
  transform: translateY(-50%);
}

.gallery-thumbs .swiper-slide {
  width: 20%;
  height: 60px;
  opacity: 0.4;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}

.prices{
  @apply flex flex-col mt-16;

  &-line{
    @apply flex;

    &:nth-child(even){
      @apply bg-gray-400;
    }
  }

  &-header{
    @apply text-xl
  }

  &-item{
    @apply flex-1 py-4 flex items-center justify-center flex-col font-bold;

    span{
      @apply text-sm font-normal
    }
  }
}

</style>
