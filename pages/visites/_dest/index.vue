<template class="default-layout-w-sidebar">
  <div v-if="!loading" class="w-full mt-20 px-4 lg:px-0 lg:w-3/4 lg:mt-32">
    <h2>Visites à {{ town.name }}</h2>
    <p v-if="town.excursionsContent"> {{ town.excursionsContent.description }} </p>
    <h2 class="font-bold">Экскурсии:</h2>
    <template v-if="town.excursions.length !== 0">
      <div class="cards-grid xl:grid-cols-3 sm:grid-cols-2">
        <nuxt-link v-for="excursion in town.excursions" :key="excursion.id" :to="`${town.slug}/${excursion.slug}`" class="card">
          <div class="relative">
            <img :src="getStrapiMedia(excursion.preview_image.url)" alt="" class="card__image">
            <div class="card__badge">de {{excursion.price_from}} à {{excursion.price_to}}€</div>
          </div>
          <div class="p-4 flex flex-col h-full justify-between">
            <div class="flex flex-col h-full gap-4">
              <span>{{excursion.title}}</span>
            </div>
            <button class="cta">EN SAVOIR PLUS</button>
          </div>
        </nuxt-link>
      </div>
    </template>
    <div v-else>
      Для данного направления экскурсий нет
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import {getStrapiMedia} from '~/utils/medias'

export default {
  name: 'VoyagesEndpoints',
  layout: 'w_sidebar',
  data() {
    return {
      town: null,
      excursions: null
    }
  },
  async fetch(){
    try {
      await this.$store.dispatch('setLoading', true)
      const data = await this.$strapi.find('towns', {slug: this.$route.params.dest})
      this.town = data[0]
      const sidebar = {...data[0], page: 'visites'}
      console.log(data[0])
      this.$store.commit('sidebar/setSidebar', sidebar)
      this.excursions = await this.$strapi.$excursions.find(item => this.item.towns.find(town => town.slug === this.$route.params.dest))
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
