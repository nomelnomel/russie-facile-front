<template>
  <div v-if="days">
    <div ref="swiperMain" v-swiper:swiperMain="swiperOptionsMain" class="mt-8 shadow-2xl">
      <div class="swiper-wrapper">
        <div v-for="(day, i) in days" :key="day.id" class="swiper-slide">
          <div class="flex border flex-col lg:flex-row">
            <div class="flex-1">
              <div class="slider-header">
                <div slot="button-prev" class="prev absolute left-8 top-1/2">
                  <leftArrow/>
                </div>
                <div>
                  <span class="font-bold">Jour {{ i + 1 }}</span> à {{ days.length }}
                </div>
                <div slot="button-next" class="next absolute right-8 top-1/2">
                  <rightArrow/>
                </div>
              </div>
              <div ref="textBox" class="description p-2 m-2">
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
import rightArrow from '~/components/svg-icons/rightArrow'
import leftArrow from '~/components/svg-icons/leftArrow'
import {getStrapiMedia} from '~/utils/medias'

export default {
  name: 'DaysSlider',
  components: {
    rightArrow,
    leftArrow
  },
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
        spaceBetween: 0,
        navigation: {
          nextEl: '.next',
          prevEl: '.prev',
        }
      },
      swiperOptionsAdd: {
        loop: true,
        loopedSlides: 5, // looped slides should be the same
        spaceBetween: 0,
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
  }
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
  font-family: 'Ubuntu Mono', monospace;
}

.gallery-thumbs .swiper-slide-active {
  opacity: 1;
}

.slider-header{
  @apply flex items-center justify-center p-4 text-xl bg-primary text-white relative;

  @screen md{
    @apply p-8;
  }
}

.description {
  max-height: 150px;
  min-height: 150px;
  height: 150px;

  @screen md {
    max-height: 240px;
    min-height: 240px;
    height: 240px;
  }
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: darkgrey;
  }

  &::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
}


.image {
  min-height: 210px;
  max-height: 210px;
  height: 210px;

  @screen md {
    min-height: 367px;
    max-height: 367px;
    height: 367px;
  }

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
  }
}
</style>
