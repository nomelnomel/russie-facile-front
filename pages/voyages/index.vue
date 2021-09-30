<template>
  <div v-if="towns" class="default-layout">
    <div v-for="town in towns" :key="town.id" class="mb-24">
      <img :src="getStrapiMedia(town.toursContent.image.url)" alt="" class="w-full">
      <nuxt-link :to="`voyages/${town.slug}`"><h2>{{ town.name }}</h2></nuxt-link>
      <p class="mb-8">{{ town.toursContent.description }}</p>
      <div v-if="town.tours.length !== 0">
        <div class="cards-grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4">
          <nuxt-link :to="`voyages/${town.slug}`" class="flex items-center">
            Посмотреть все туры
          </nuxt-link>
          <PreviewCard
            v-for="tour in town.tours.slice(0,3)"
            :key="tour.id"
            :data="tour"
            section-slug="voyages"
            :town-slug="town.slug"
          />
        </div>
      </div>
      <div v-else>
        <p>Для данного направление туров нет</p>
      </div>
    </div>
  </div>
</template>

<script>
import {getStrapiMedia} from '~/utils/medias'
import PreviewCard from '~/components/ui/PreviewCard'
export default {
  name: 'Index',
  components: {
    PreviewCard
  },
  data() {
    return {
      towns: null
    }
  },
  async fetch() {
    this.towns = await this.$strapi.$towns.find({_sort: 'order'})
  },
  methods: {
    getStrapiMedia
  }
}
</script>

<style scoped lang="scss">

</style>
