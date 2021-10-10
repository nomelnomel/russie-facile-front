<template>
  <div v-if="!loading" class="w-full mt-20 px-4 lg:w-3/4 lg:mt-32">
    <div>
      <h2>{{ tour.title }}</h2>
      <div class="program-header flex gap-8">
        <div>
          {{ tour.daysCount }} jours
        </div>
        <div>
          {{ tour.townsCount }} ville{{ tour.townsCount > 1 ? 's' : '' }}
        </div>
        <div class="text-blue-600">
          <a href="#">Ссылка на программу</a>
        </div>
      </div>
      <div class="mt-8" v-html="tour.description"></div>
    </div>
    <DaysSlider :days="tour.days"/>
    <div class="flex mt-16 flex-col pl-4 gap-4 md:flex-row md:gap-16">
        <ul class="flex-1 flex flex-col pr-4">
          <h2 class="mb-2">Включено</h2>
          <li v-for="item in tour.included.yes.split('\n')" :key="item.id" class="flex mb-4">
            <plus /> {{item}}
          </li>
        </ul>
        <ul class="flex-1 justify-center pr-4 md:items-center">
          <h2 class="mb-2">Не включено</h2>
          <li v-for="item in tour.included.no.split('\n')" :key="item.id" class="flex mb-4">
            <minus />{{item}}
          </li>
        </ul>
    </div>

    <div id="prices" class="prices">
      <div class="prices-line prices-header">
        <div class="prices-item">
          Personnes
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
</template>

<script>
import {mapGetters} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'
import plus from '~/components/svg-icons/plus'
import minus from '~/components/svg-icons/minus'
import DaysSlider from '~/components/ui/DaysSlider'

export default {
  name: 'VoyagesEndpoints',
  components: {
    plus,
    minus,
    DaysSlider
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
      await this.$store.dispatch('setLoading', true)
      const data = await (this.$strapi.find('tours', {slug: this.$route.params.slug}))
      const sidebar = {
        page: 'program',
        price_from: data[0].price_from,
        price_to: data[0].price_to,
        title: data[0].title
      }
      this.$store.commit('sidebar/setSidebar', sidebar)
      this.tour = data[0]
    } catch (e) {
      console.log(e)
    } finally {
      await this.$store.dispatch('setLoading', false)
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },

  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped lang="scss">

.tour-container {
}



.prices{
  @apply flex flex-col mt-16;

  &-line{
    @apply flex;

    &:nth-child(even){
      @apply bg-green-50
    }
  }

  &-header{
    @apply text-sm;

    @screen md{
     @apply text-xl;
    }
  }

  &-item{
    @apply flex-1 py-4 flex items-center text-center justify-center flex-col font-bold border border-black;

    @screen md{
      @apply text-xl
    }

    &:first-child{
      max-width: 90px;
      @screen md{
        max-width: unset;
      }
    }

    span{
      @apply text-sm font-normal
    }
  }
}

</style>
