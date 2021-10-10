<template>
  <div v-if="!loading" class="w-full mt-24 px-4 lg:w-2/3 lg:mt-32 lg:pr-0 xl:w-3/4 xl:pr-16 2xl:pr-0">
    <div class="mb-4 pb-4 border-b border-dashed border-gray-300">
      <h2>{{ tour.title }}</h2>
      <div class="program-header flex gap-4 md:gap-8">
        <div class="flex items-center gap-1">
          <calendar />{{ tour.daysCount }} jours
        </div>
        <div class="flex items-center gap-1">
          <geo />{{ tour.townsCount }} ville{{ tour.townsCount > 1 ? 's' : '' }}
        </div>
        <div v-if="false" class="text-blue-600">
          <a href="#">Ссылка на программу</a>
        </div>
      </div>
      <div v-html="tour.description"></div>
    </div>
    <DaysSlider :days="tour.days"/>

    <div class="flex mt-4 md:mt-8 flex-col gap-4 md:flex-row md:gap-8 lg:gap-16">
        <ul class="flex-1 flex flex-col pr-2">
          <h2 class="mb-2 lg:mb-4">Inclus</h2>
          <li v-for="item in tour.included.yes.split('\n')" :key="item.id" class="flex mb-2 md:mb-4">
            <plus /> {{item}}
          </li>
        </ul>
        <ul class="flex-1 justify-center pr-2 md:items-center">
          <h2 class="mb-2 lg:mb-4">Non inclus</h2>
          <li v-for="item in tour.included.no.split('\n')" :key="item.id" class="flex mb-2 md:mb-4">
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
          Chez l’habitant
        </div>
        <div class="prices-item">
          Hôtel 3*
        </div>
        <div class="prices-item">
          Hôtel 4*
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
  <loading v-else/>
</template>

<script>
import {mapGetters} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'
import plus from '~/components/svg-icons/plus'
import minus from '~/components/svg-icons/minus'
import geo from '~/components/svg-icons/geo'
import calendar from '~/components/svg-icons/calendar'
import DaysSlider from '~/components/ui/DaysSlider'
import loading from '~/components/svg-icons/loading'

export default {
  name: 'VoyagesEndpoints',
  components: {
    plus,
    minus,
    geo,
    calendar,
    DaysSlider,
    loading
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
  @apply flex flex-col mt-4;

  @screen md{
    @apply mt-8
  }

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
