<template>
<div v-if="days">
  <div ref="swiperMain" v-swiper:swiperMain="swiperOptionsMain" class="mt-8 shadow-2xl">
    <div class="swiper-wrapper">
      <div v-for="(day, i) in days" :key="day.id" class="swiper-slide">
        <div class="flex border flex-col lg:flex-row">
          <div class="flex-1">
            <div class="flex items-center justify-center p-8 text-xl bg-primary text-white relative">
              <div v-if="i > 0" slot="button-prev" class="prev absolute left-8 top-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"/>
                </svg>
              </div>
              <div>
                <span class="font-bold">Jour {{ i + 1 }}</span> à {{ days.length }}
              </div>
              <div v-if="i < days.length - 1" slot="button-next" class="next absolute right-8 top-1/2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
            </div>
              <div ref="textBox" class="description px-4 py-2 mr-2 mt-2">
                {{ day.description }}
              </div>
          </div>
          <div class="flex-1 image">
            <img :src="getStrapiMedia(day.image.url)" alt="" class="w-full object-cover">
          </div>
        </div>
      </div>
    </div>
  </div>
  <div ref="swiperAdd" v-swiper:swiperAdd="swiperOptionsAdd" class="swiper gallery-thumbs">
    <div class="swiper-wrapper">
      <div v-for="i in days.length" :key="i" class="slide-1 swiper-slide">
        <span class="border border-black py-2 px-4 rounded-full cursor-pointer">
          {{ i }}
        </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {getStrapiMedia} from '~/utils/medias'

export default {
  name: 'DaysSlider',
  props: {
    days: {
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      swiperOptionsMain: {
        loop: true,
        loopedSlides: 5,
        spaceBetween: 10,
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        }
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
  mounted() {
      this.$nextTick(() => {
        const swiperMain = this.swiperMain
        const swiperAdd = this.swiperAdd
        swiperMain.controller.control = swiperAdd
        swiperAdd.controller.control = swiperMain
      })
  },
  methods: {
    getStrapiMedia,
  },
}
</script>

<style scoped lang="scss">
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

.description{
  max-height: 240px;
  min-height: 240px;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background-color: darkgrey;
  }
  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}


.image{
  min-height: 367px;
  max-height: 367px;

  img{
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
