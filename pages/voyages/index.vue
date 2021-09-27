<template>
  <div v-if="towns" class="default-layout">
    <div v-for="town in towns" :key="town.id" class="mb-24">
      <img :src="getStrapiMedia(town.toursContent.image.url)" alt="" class="w-full">
      <nuxt-link :to="`voyages/${town.slug}`"><h2>{{ town.name }}</h2></nuxt-link>
      <p class="mb-8">{{ town.toursContent.description }}</p>
      <div v-if="town.tours.length !== 0">
<!--        <p class="mb-8">лучшие туры в {{ town.name }}:</p>-->
        <div class="cards-grid grid-cols-4">
          <nuxt-link :to="`voyages/${town.slug}`" class="flex items-center">
            Посмотреть все туры
          </nuxt-link>
          <nuxt-link
            v-for="tour in town.tours.slice(0,3)"
            :key="tour.id"
            :to="`voyages/${town.slug}/${tour.slug}`"
            class="border flex flex-col gap-3 shadow-md"
          >
            <img :src="getStrapiMedia(tour.preview_image.url)" alt="">
            <p class="ml-3">{{ tour.title }}</p>
            <button class="mt-auto">Подробнее -></button>
          </nuxt-link>
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

export default {
  name: 'Index',
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
