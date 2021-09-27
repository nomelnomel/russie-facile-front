<template>
  <div v-if="town" class="default-layout">
    <h2>раздел туров - страница направления</h2>
    {{ town.name }}
    <p v-if="town.toursContent"> {{ town.toursContent.description }} </p>
    <h2 class="font-bold">Программы:</h2>
    <template v-if="town.tours.length !== 0">
      <div class="cards-grid xl:grid-cols-3 sm:grid-cols-2">
        <nuxt-link v-for="tour in town.tours" :key="tour.id" :to="`${town.slug}/${tour.slug}`" class="card">
          <div class="relative">
            <img :src="getStrapiMedia(tour.preview_image.url)" alt="" class="card__image">
            <div class="card__badge">de {{tour.price_from}} à {{tour.price_to}}€</div>
          </div>
          <div class="p-4 flex flex-col">
            <span>{{tour.title}}</span>
            <span>{{tour.daysCount}} jours / {{tour.townsCount}} ville{{tour.townsCount > 1 ? 's' : ''}}</span>
            <button class="cta">EN SAVOIR PLUS</button>
          </div>
        </nuxt-link>
      </div>
    </template>
    <div v-else>
      Для данного направления програм нет
    </div>
  </div>
  <div v-else>
    грузим
  </div>
</template>

<script>
import {getStrapiMedia} from '~/utils/medias'
export default {
  name: "VoyagesEndpoints",
  layout: 'w_sidebar',
  data() {
    return {
      town: null,
      tours: null
    }
  },
  async fetch(){
    try {
      const data = await this.$strapi.find('towns', {slug: this.$route.params.dest})
      this.town = data[0]
      const sidebar = {...data[0], page: 'destination'}
      this.$store.commit('setSidebar', sidebar)
      this.tours = await this.$strapi.$tours.find(item => this.item.towns.find(town => town.slug === this.$route.params.dest))
    }catch (e) {
      console.log(e)
    }
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped lang="scss">

.card{
  @apply border shadow-md hover:shadow-lg rounded-md overflow-hidden;

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

  .cta{
    @apply p-2 mt-4;
    background-color: #31aabb;
  }
}




</style>
