<template>
  <div v-if="!loading" class="w-full mt-20 px-4 lg:px-0 lg:w-3/4 lg:mt-32">
    <h2>Voyages à {{ town.name }}</h2>
    <p v-if="town.toursContent"> {{ town.toursContent.description }} </p>
    <h2 class="font-bold">Программы:</h2>
    <template v-if="town.tours.length !== 0">
      <div class="cards-grid xl:grid-cols-3 sm:grid-cols-2">
        <nuxt-link v-for="tour in town.tours" :key="tour.id" :to="`${town.slug}/${tour.slug}`" class="card relative">
          <div class="">
            <img :src="getStrapiMedia(tour.preview_image.url)" alt="" class="card__image">
            <div class="card__badge font-bold">de {{tour.price_from}} à {{tour.price_to}}€</div>
          </div>
          <div class="p-4 flex flex-col h-full justify-between">
            <div class="flex flex-col h-full gap-4">
              <span class="font-bold">{{tour.title}}</span>
              <span class="mt-auto absolute top-2 left-2 bg-green-200 p-2 font-bold">{{tour.daysCount}} jours</span>
            </div>
            <button class="cta">EN SAVOIR PLUS</button>
          </div>
        </nuxt-link>
      </div>
    </template>
    <div v-else>
      Для данного направления програм нет
    </div>
  </div>
  <loading v-else/>
</template>

<script>
import {mapGetters} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'
import loading from '~/components/svg-icons/loading'
export default {
  name: "VoyagesEndpoints",
  components: {
    loading
  },
  layout: 'w_sidebar',
  data() {
    return {
      town: null,
      tours: null
    }
  },
  async fetch(){
    await this.$store.dispatch('setLoading', true)
    try {
      const data = await this.$strapi.find('towns', {slug: this.$route.params.dest})
      this.town = data[0]
      const sidebar = {...data[0], page: 'voyages'}
      console.log(data[0])
      this.$store.commit('sidebar/setSidebar', sidebar)
      this.tours = await this.$strapi.$tours.find(item => this.item.towns.find(town => town.slug === this.$route.params.dest))
    }catch (e) {
      console.log(e)
    }finally {
      await this.$store.dispatch('setLoading', false)
    }
  },
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    getStrapiMedia
  },
}
</script>

<style scoped lang="scss">

.card{
  @apply border shadow-md hover:shadow-lg rounded-md overflow-hidden flex flex-col h-full;

  &:hover{
    .cta{
      background-color: #14cfe9;
    }
  }
  &__image{
    @apply object-cover w-full xl:max-h-52 sm:max-h-48;
    max-width: unset;
  }

  &__badge{
    @apply absolute top-2 right-2 bg-blue-100 p-2
  }

}
</style>
